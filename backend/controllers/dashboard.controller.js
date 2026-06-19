const supabase = require("../config/supabse.js");

const getDashboardStats =
  async (req, res) => {
    try {

      const {
        count: totalDocs,
      } = await supabase
        .from("documents")
        .select("*", {
          count: "exact",
          head: true,
        });

      const {
        count: pendingDocs,
      } = await supabase
        .from("documents")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("status", "Pending");

      const {
        count: signedDocs,
      } = await supabase
        .from("documents")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("status", "Signed");

      const {
        count: rejectedDocs,
      } = await supabase
        .from("documents")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("status", "Rejected");

      const completionRate =
        totalDocs > 0
          ? Math.round(
              (signedDocs /
                totalDocs) *
                100
            )
          : 0;

      res.json({
        totalDocs,
        pendingDocs,
        signedDocs,
        rejectedDocs,
        completionRate,
      });

    } catch (error) {
      console.log(
        "DASHBOARD ERROR:",
        error
      );

      res.status(500).json({
        error:
          error.message,
      });
    }
  };

module.exports = {
  getDashboardStats,
};