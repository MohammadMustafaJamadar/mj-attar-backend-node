import { user_buyers } from "../models/userDetailsModels.js";
import { validateUserInput } from "../utils/validation.js";

const user_signup_controller = async (req, res) => {
  try {
    const { user_firstname, user_lastname, user_email, user_password } =
      req.body;

    const validation = validateUserInput({
      user_firstname,
      user_lastname,
      user_email,
      user_password,
    });

    if (!validation.isValid) {
      res.status(400).json({ message: validation.message });
      return;
    } else {
      const existingUser = await user_buyers.findOne({ email: user_email });
      if (existingUser) {
        res.status(400).json({
          message:
            "User with this email already exists. Please use a different email.",
        });
      } else {
        const user_buyers_registration = new user_buyers({
          firstname: user_firstname,
          lastname: user_lastname,
          email: user_email,
          password: user_password,
        });

        const registerd = await user_buyers_registration.save();

        res.json({
          data: user_buyers_registration,
          message: "User registration successful.",
        });
      }
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error. Please try again later." });
  }
};

export { user_signup_controller };
