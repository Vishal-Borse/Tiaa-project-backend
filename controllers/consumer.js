import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Consumer from "../models/consumer";
const saltRounds = 10;

const consumerSignup = async (req, res) => {
  const {
    consumerFirstName,
    consumerLastName,
    consumerEmail,
    consumerPassword,
    consumerPhone,
    consumerAadharNo,
    consumerState,
    consumerCity,
    consumerAge,
  } = req.body;
  console.log(req.body);
  try {
    if (
      !consumerFirstName ||
      !consumerLastName ||
      !consumerEmail ||
      !consumerPassword ||
      !consumerPhone ||
      !consumerAadharNo ||
      !consumerState ||
      !consumerCity ||
      !consumerAge
    ) {
      return res.status(422).json({
        message: "Fill all fields",
      });
    }
    const existingConsumer = await Consumer.findOne({
      email: consumerEmail,
    });
    if (existingConsumer) {
      return res.status(400).json({
        message: "Consumer already Exist!",
      });
    }

    const hashedPassword = await bcrypt.hash(userPassword, saltRounds);

    const consumer = new Consumer({
      firstName: consumerFirstName,
      lastName: consumerLastName,
      email: consumerEmail,
      password: hashedPassword,
      phone: consumerPhone,
      aadharNo: consumerAadharNo,
      state: consumerState,
      city: consumerCity,
      age: consumerAge,
    });

    await Consumer.create(consumer);
    res.status(201).json({
      message: "Consumer created",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const consumerSignin = async (req, res) => {
  const { consumerEmail, consumerPassword } = req.body;

  console.log(req.body);

  let token;
  try {
    if (!consumerEmail || !consumerPassword) {
      return res.status(422).json({
        message: "Fill all fields",
      });
    }
    const existingConsumer = await Consumer.findOne({ email: consumerEmail });

    if (!existingConsumer) {
      return res.status(404).json({
        message: "consumer not found",
      });
    }

    const matchPassword = await bcrypt.compare(
      consumerPassword,
      existingConsumer.password
    );

    if (!matchPassword) {
      return res.status(400).json({
        message: "Invalid Credinals",
      });
    }

    token = jwt.sign(
      { consumerId: existingConsumer._id },
      process.env.SECRETKEY1
    );

    res.cookie("jwtoken", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,

      sameSite: process.env["NODE_ENV"] === "production" ? "none" : "lax", // must be 'none' to enable cross-site delivery
      secure: process.env["NODE_ENV"] === "production", // must be true if sameSite='none',
    });

    res.status(201).json({
      message: "Consumer Logged in successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};

module.exports = {
  consumerSignup,
  consumerSignin,
};
