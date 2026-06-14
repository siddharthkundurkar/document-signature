const supabase = require("../config/supabse.js");

const createSignature = async (req, res) => {
  try {
    const {
      document_id,
      page_number,
      x_position,
      y_position,
      signer_email,
    } = req.body;

    const { data, error } =
      await supabase
        .from("signatures")
        .insert([
          {
            document_id,
            page_number,
            x_position,
            y_position,
            signer_email,
          },
        ])
        .select();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    res.status(201).json({
  success: true,
  signature: data[0],
});
  }
};


const saveSignaturePosition = async (
  req,
  res
) => {
  try {
    const {
      documentId,
      x,
      y,
      page,
    } = req.body;

    const { data, error } =
      await supabase
        .from("signatures")
        .insert([
          {
            document_id: documentId,
            x_position: x,
            y_position: y,
            page_number: page,
          },
        ])
        .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    res.status(201).json({
  success: true,
  signature: data[0],
});
  }
};


 

module.exports = {
  createSignature,
   saveSignaturePosition,
};
