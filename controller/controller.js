import axios from "axios";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const signIn = async (req, res) => {
  const body = req.body;
  console.log(body);
  const response = await axios.post("https://dextraa.vercel.app/api/login", {
    email: body.email,
    password: body.password,
  });
  console.log(response.data);
  response.data.user.latitude = 13;
  response.data.user.longitude = 80;

  const signed = jwt.sign(
    {
      data: response.data,
    },
    config.JWT_SECRET,
    { expiresIn: 30 * 24 * 60 * 60 }
  );

  res.set("X-Auth",signed);
  return res.status(200).json({ data: response.data });
};
