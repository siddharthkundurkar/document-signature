const crypto = require("crypto");
const nodemailer = require("nodemailer");

const supabase =
  require("../config/supabse");

const {
  generateSignedPdfInternal,
} = require("./pdf.controller");

const inviteSigner =
  async (req, res) => {
    try {
      const {
        documentId,
        email,
      } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          error:
            "Email is required",
        });
      }

      const token =
        crypto.randomUUID();

      const {
        data,
        error,
      } = await supabase
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

      await supabase
        .from("documents")
        .update({
          status:
            "Pending Signature",
        })
        .eq(
          "id",
          documentId
        );

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
      console.log(
        "INVITE SIGNER ERROR:",
        error
      );

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
        error:
          documentError,
      } = await supabase
        .from("documents")
        .select("*")
        .eq(
          "id",
          signer.document_id
        )
        .single();

      if (documentError)
        throw documentError;

      res.json({
        success: true,
        signer,
        document,
      });
    } catch (error) {
      console.log(
        "GET TOKEN ERROR:",
        error
      );

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

      await supabase
        .from("signer_links")
        .update({
          status: "signed",
        })
        .eq("token", token);

      await supabase
        .from("documents")
        .update({
          status: "Completed",
        })
        .eq(
          "id",
          signer.document_id
        );

      await supabase
        .from("audit_logs")
        .insert([
          {
            document_id:
              signer.document_id,
            actor_email:
              signer.signer_email,
            action:
              "DOCUMENT_SIGNED",
            ip_address:
              req.clientIp ||
              req.ip,
            user_agent:
              req.headers[
                "user-agent"
              ],
          },
        ]);

      console.log(
        "Generating Signed PDF..."
      );

      const signedPdfUrl =
        await generateSignedPdfInternal(
          signer.document_id
        );

      console.log(
        "Signed PDF URL:",
        signedPdfUrl
      );

      res.status(200).json({
        success: true,
        signedPdfUrl,
      });
    } catch (error) {
      console.log(
        "COMPLETE SIGN ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        error:
          error.message,
      });
    }
  };
const rejectSigning =
  async (req, res) => {
    try {
      const { token } =
        req.params;

      const { reason } =
        req.body;

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

      await supabase
        .from("signer_links")
        .update({
          status: "rejected",
          rejection_reason:
            reason,
        })
        .eq("token", token);

      await supabase
        .from("documents")
        .update({
          status: "Rejected",
        })
        .eq(
          "id",
          signer.document_id
        );

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
  rejectSigning,
};