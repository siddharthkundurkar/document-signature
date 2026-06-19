const { PDFDocument } =
  require("pdf-lib");

const supabase =
  require("../config/supabse");

const generateSignedPdfInternal =
  async (
    documentId,
    auditData = {}
  ) => {
    // Get Document

    const {
      data: document,
      error: documentError,
    } = await supabase
      .from("documents")
      .select("*")
      .eq("id", documentId)
      .single();

    if (documentError)
      throw documentError;

    // Get Fields / Signatures

    const {
      data: signatures,
      error: signatureError,
    } = await supabase
      .from("signatures")
      .select("*")
      .eq(
        "document_id",
        documentId
      );

    if (signatureError)
      throw signatureError;

    // Download PDF

    const pdfResponse =
      await fetch(
        document.file_url
      );

    const pdfBytes =
      await pdfResponse.arrayBuffer();

    const pdfDoc =
      await PDFDocument.load(
        pdfBytes
      );

    // Draw Fields

    for (const sig of signatures) {
      const page =
        pdfDoc.getPage(
          (sig.page_number || 1) -
            1
        );

      const x =
        sig.x_position ||
        100;

      const y =
        page.getHeight() -
        (sig.y_position ||
          100);

      // Signature Image

      if (
        sig.field_type ===
          "signature" &&
        sig.signature_image
      ) {
        const imageBytes =
          Buffer.from(
            sig.signature_image.replace(
              /^data:image\/png;base64,/,
              ""
            ),
            "base64"
          );

        const image =
          await pdfDoc.embedPng(
            imageBytes
          );

        page.drawImage(
          image,
          {
            x,
            y: y - 50,
            width: 120,
            height: 50,
          }
        );
      }

      // Name / Email / Date

      else if (
        sig.field_value
      ) {
        page.drawText(
          sig.field_value,
          {
            x,
            y,
            size: 12,
          }
        );
      }
    }

    // Save PDF

    const finalPdf =
      await pdfDoc.save();

    const pdfBuffer =
      Buffer.from(
        finalPdf
      );

    // Upload PDF

    const fileName =
      `signed-${documentId}-${Date.now()}.pdf`;

    const {
      error: uploadError,
    } = await supabase.storage
      .from(
        "signed-documents"
      )
      .upload(
        fileName,
        pdfBuffer,
        {
          contentType:
            "application/pdf",
          upsert: true,
        }
      );

    if (uploadError)
      throw uploadError;

    const {
      data: publicUrlData,
    } = supabase.storage
      .from(
        "signed-documents"
      )
      .getPublicUrl(
        fileName
      );

    const signedPdfUrl =
      publicUrlData.publicUrl;

    // Update Document

    const {
      error: updateError,
    } = await supabase
      .from("documents")
      .update({
        signed_pdf_url:
          signedPdfUrl,
        status: "Signed",
      })
      .eq(
        "id",
        documentId
      );

    if (updateError)
      throw updateError;

    // Audit Trail

    await supabase
      .from("audit_logs")
      .insert([
        {
          document_id:
            documentId,

          action:
            "DOCUMENT_COMPLETED",

          actor_email:
            auditData.actor_email ||
            "Owner",

          ip_address:
            auditData.ip_address ||
            null,

          user_agent:
            auditData.user_agent ||
            null,

          created_at:
            new Date().toISOString(),
        },
      ]);

    return signedPdfUrl;
  };

const generateSignedPdf =
  async (req, res) => {
    try {
      const { documentId } =
        req.body;

      const signedPdfUrl =
        await generateSignedPdfInternal(
          documentId,
          {
            actor_email:
              req.user?.email,

            ip_address:
              req.headers[
                "x-forwarded-for"
              ] ||
              req.socket
                ?.remoteAddress ||
              req.ip,

            user_agent:
              req.headers[
                "user-agent"
              ],
          }
        );

      return res
        .status(200)
        .json({
          success: true,
          signedPdfUrl,
        });
    } catch (error) {
      console.log(
        "PDF GENERATION ERROR:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,
          error:
            error.message,
        });
    }
  };

module.exports = {
  generateSignedPdf,
  generateSignedPdfInternal,
};