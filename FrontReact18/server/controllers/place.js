export const createPlace = async (req, res) => {
  //testing resource access
  res
    .status(201)
    .json({ success: true, result: { id: 123, title: "test place" } });
};