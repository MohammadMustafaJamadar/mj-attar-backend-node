import validator from "validator";

const validateUserInput = (user) => {
  const { user_firstname, user_lastname, user_email, user_password } = user;

  if (!user_firstname || !user_lastname || !user_email || !user_password) {
    return { isValid: false, message: "All fields are required." };
  }

  if(user_firstname.length<3 || user_lastname.length<3){
    return { isValid: false, message: "Name must be at least 3 characters long." };
  }

  if (!validator.isEmail(user_email)) {
    return { isValid: false, message: "Invalid email address." };
  }

  if (
    !validator.isStrongPassword(user_password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    return {
      isValid: false,
      message: `Password must be at least 8 characters long and include 
         at least one lowercase letter, one uppercase letter, one number, and one symbol.`,
    };
  }

  return { isValid: true, message: "Validation successful." };
};

export { validateUserInput };
