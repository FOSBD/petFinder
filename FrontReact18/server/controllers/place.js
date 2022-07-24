/* export const createPlace = async (req, res) => {
  //testing resource access
  res
    .status(201)
    .json({ success: true, result: { id: 123, title: "test place" } });
}; */

import Place from "../models/Place.js";
import tryCatch from "./utils/tryCatch.js";

export const createPlace = tryCatch(async (req, res) => {
  const { id: uid, name: uName, photoURL: uPhoto } = req.user;
  const newPlace = new Place({ ...req.body, uid, uName, uPhoto });
  await newPlace.save();
  res.status(201).json({ success: true, result: newPlace });
});

export const getPlaces = tryCatch(async (req, res) => {
  const places = await Place.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: places });
});
