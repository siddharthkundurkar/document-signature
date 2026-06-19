const supabase =
  require("../config/supabse");

const getProfileFields =
  async (req, res) => {
    try {
      const userId =
        req.user.id;

      const {
        data,
        error,
      } = await supabase
        .from("users")
        .select(
          "name,email"
        )
        .eq("id", userId)
        .single();

      if (error)
        throw error;

      res.json({
        success: true,
        profile: {
          full_name:
            data.name,
          email:
            data.email,
        },
      });
    } catch (error) {
      console.log(
        "PROFILE ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        error:
          error.message,
      });
    }
  };

module.exports = {
  getProfileFields,
};