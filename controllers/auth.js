import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import consumers from "../models/consumer.js";
import organisers from "../models/organisation.js";

export const conSignup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existinguser = await consumers.findOne({ email });
    if (existinguser) {
      return res.status(404).json({ message: "User already exist." });
    }

    const hashedPassword = bcrypt.hashSync(password, 12);
    const newUser = await users.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json("Something went wrong...");
  }
};

export const conLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existinguser = await consumers.findOne({ email });
    if (!existinguser) {
      return res.status(404).json({ message: "User don't Exist." });
    }

    const isPasswordCrt = bcrypt.compareSync(password, existinguser.password);
    if (!isPasswordCrt) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existinguser, token });
  } catch (error) {
    res.status(500).json("Something went wrong...");
  }
};

export const orgSignup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existinguser = await organisers.findOne({ email });
    if (existinguser) {
      return res.status(404).json({ message: "User already exist." });
    }

    const hashedPassword = bcrypt.hashSync(password, 12);
    const newUser = await users.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json("Something went wrong...");
  }
};

export const orgLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existinguser = await organisers.findOne({ email });
    if (!existinguser) {
      return res.status(404).json({ message: "User don't Exist." });
    }

    const isPasswordCrt = bcrypt.compareSync(password, existinguser.password);
    if (!isPasswordCrt) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existinguser, token });
  } catch (error) {
    res.status(500).json("Something went wrong...");
  }
};
