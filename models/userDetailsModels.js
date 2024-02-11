import validator from "validator";
import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";

const user_buyers_schema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
      massage: "Firstname must be reqired.",
    },
    lastname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
      massage: "Lastname must be reqired.",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      validate(value) {
        if (
          !validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          })
        ) {
          throw new Error("Password must be strong!");
        }
      },
    },
    phoneNumber: {
      type: String,
      sparse: true,
      unique: true,
      minlength: 10,
    },
    // Buyer-specific Fields
    isSeller: {
      type: Boolean,
      default: false,
    },
    // Additional fields for buyer details
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
    },
    // ...

    // Transaction History
    transactions: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        transactionType: {
          type: String,
          enum: ["buy"],
        },
        transactionDate: {
          type: Date,
          default: Date.now,
        },
        // Additional transaction details as needed
        // ...
      },
    ],
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

user_buyers_schema.methods.generatingTokens = async function () {
  try {
    let token = jwt.sign(
      { _id: this._id },
      "MustafaMJMustafaMJMustafaMJMustafaMJ",
    );

    this.tokens.unshift({ token, createdAt: new Date() });

    this.tokens = this.tokens.slice(0, 3);

    this.save();
    return token;
  } catch (error) {
    throw error;
  }
};

const user_buyers = mongoose.model("user_buyers", user_buyers_schema);

export { user_buyers };
