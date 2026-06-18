const crypto = require("crypto");
const nodemailer = require("nodemailer");

const supabase =
  require("../config/supabse");

const inviteSigner =
  async (req, res) => {
    try {
      const {
        documentId,
        email,
      } = req.body;

      const token =
        crypto.randomUUID();

      const { data, error } =
        await supabase
          .from("signer_links")
          .insert([
            {
              document_id:
                documentId,
              signer_email:
                email,
              token,
            },
          ])
          .select();

      if (error)
        throw error;

      const signingLink =
        `http://localhost:5173/sign/${token}`;

      const transporter =
        nodemailer.createTransport({
          service: "gmail",
          auth: {
            user:
              process.env.EMAIL_USER,
            pass:
              process.env.EMAIL_PASS,
          },
        });

      await transporter.sendMail({
        from:
          process.env.EMAIL_USER,
        to: email,
        subject:
          "Document Signature Request",
        html: `
          <h2>Document Signature Request</h2>

          <p>You have been invited to sign a document.</p>

          <a href="${signingLink}">
            Sign Document
          </a>
        `,
      });

      res.status(200).json({
        success: true,
        token,
        signingLink,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        error:
          error.message,
      });
    }
  };
  const getDocumentByToken =
  async (req, res) => {
    try {
      const { token } =
        req.params;

      const {
        data: signer,
        error,
      } = await supabase
        .from("signer_links")
        .select("*")
        .eq("token", token)
        .single();

      if (error)
        throw error;

      const {
        data: document,
      } = await supabase
        .from("documents")
        .select("*")
        .eq(
          "id",
          signer.document_id
        )
        .single();

      res.json({
        success: true,
        signer,
        document,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error:
          error.message,
      });
    }
  };
  const completeSigning =
  async (req, res) => {
    try {
      const { token } =
        req.params;

      await supabase
        .from("signer_links")
        .update({
          status: "signed",
        })
        .eq("token", token);

      res.json({
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error:
          error.message,
      });
    }
  };

  module.exports = {
  inviteSigner,
  getDocumentByToken,
  completeSigning,
};