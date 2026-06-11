const supabase = require("../config/supabse.js");

const uploadDocument = async (req, res) => {
  try {
    const file = req.file;
    console.log("FILE:", req.file);
    console.log("USER:", req.user);
    if (!file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const fileName =
      Date.now() + "-" + file.originalname;

    const { error } = await supabase.storage
      .from("documents")
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("documents")
      .getPublicUrl(fileName);

    const { data: documentData, error: dbError } =
      await supabase
        .from("documents")
        .insert([
          {
            owner_id: req.user.id,
            file_name: file.originalname,
            file_url: publicUrl,
          },
        ])
        .select();

    if (dbError) throw dbError;

    res.status(201).json({
      success: true,
      document: documentData[0],
    });
  }catch (error) {
  console.error("UPLOAD ERROR:");
  console.error(error);

  res.status(500).json({
    error: error.message,
  });
}
};

module.exports = {
  uploadDocument,
};