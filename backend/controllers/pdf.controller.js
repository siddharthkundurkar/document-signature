const { PDFDocument } =
  require("pdf-lib");

const fetch = require("node-fetch");

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
      } = await supabase
        .from("documents")
        .select("*")
        .eq("id", documentId)
        .single();

      // Get signatures
      const {
        data: signatures,
      } = await supabase
        .from("signatures")
        .select("*")
        .eq(
          "document_id",
          documentId
        );

      const pdfBytes =
        await fetch(
          document.file_url
        ).then((res) =>
          res.arrayBuffer()
        );

      const pdfDoc =
        await PDFDocument.load(
          pdfBytes
        );

      for (const sig of signatures) {
        if (
          !sig.signature_image
        )
          continue;

        const page =
          pdfDoc.getPage(
            sig.page_number - 1
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
            x: sig.x_position,
            y: page.getHeight() -
              sig.y_position -
              50,
            width: 120,
            height: 50,
          }
        );
      }

      const finalPdf =
        await pdfDoc.save();

      res.setHeader(
        "Content-Type",
        "application/pdf"
      );

      res.send(
        Buffer.from(finalPdf)
      );
    } catch (error) {
      console.log(error);

      res.status(500).json({
        error:
          error.message,
      });
    }
  };
  