const { PDFDocument } =
  require("pdf-lib");

const supabase =
  require("../config/supabse");

const generateSignedPdf =
  async (req, res) => {
    try {
      const { documentId } =
        req.body;

      // Get document
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

      // Get signatures
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

      // Download original PDF
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

      // Add signatures
      for (const sig of signatures) {
        if (
          !sig.signature_image
        )
          continue;

        const page =
          pdfDoc.getPage(
            (sig.page_number || 1) -
              1
          );

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
            x:
              sig.x_position ||
              100,
            y:
              page.getHeight() -
              (sig.y_position ||
                100) -
              50,
            width: 120,
            height: 50,
          }
        );
      }

      // Generate final PDF
      const finalPdf =
        await pdfDoc.save();

      const pdfBuffer =
        Buffer.from(
          finalPdf
        );

      // Upload to Supabase Storage
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

      // Get public URL
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

      // Save URL in documents table
      const {
        error: updateError,
      } = await supabase
        .from("documents")
        .update({
          signed_pdf_url:
            signedPdfUrl,
        })
        .eq(
          "id",
          documentId
        );

      if (updateError)
        throw updateError;

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
};