const supabase =
  require("../config/supabse");

const inviteSigner =
  async (req, res) => {
    try {
      const {
        documentId,
        email,
      } = req.body;

      const { data, error } =
        await supabase
          .from("signers")
          .insert([
            {
              document_id:
                documentId,
              email,
            },
          ])
          .select();

      if (error)
        throw error;

      res.status(201).json({
        success: true,
        signer: data[0],
      });
    } catch (error) {
      res.status(500).json({
        error:
          error.message,
      });
    }
  };

module.exports = {
  inviteSigner,
};