import { user_buyers } from "../models/userDetailsModels.js";

const user_login_controller = async (req, res) => {
  try {
    const { user_email, user_password } = req.body;
    const existingUser = await user_buyers.findOne({ email: user_email });
    if (!user_email.trim() || !user_password.trim()) {
      res.status(400).json({
        message: "Invalid input. Please provide both email and password.",
      });
    }

    if (!existingUser) {
      res
        .status(400)
        .json({ message: "User does not exist. Please register first." });
    } else {
      if (existingUser.password !== user_password) {
        res.status(400).json({
          message:
            "Invalid credentials. Please double-check your email and password.",
        });
      } else {
        const token = await existingUser.generatingTokens();
        console.log(token);
        res.status(200).json({ message: "Login successful." });
      }
      
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error. Please try again later." });
  }
};

export { user_login_controller };
