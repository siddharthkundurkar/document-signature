const supabase =
  require("../config/supabse");

const getAuditHistory =
  async (req, res) => {
    try {
      const { documentId } =
        req.params;

      const {
        data,
        error,
      } = await supabase
        .from("audit_logs")
        .select("*")
        .eq(
          "document_id",
          documentId
        )
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

      if (error)
        throw error;

      res.json({
        success: true,
        history: data,
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
  getAuditHistory,
};