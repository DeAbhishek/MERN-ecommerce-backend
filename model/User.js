const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Sorry this email id is already registered."],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password must be require."],
  },
  role: {
    type: String,
    required: [true, "Role must be require."],
    default: "user",
  },
  addresses: {
    type: [
      {
        email: { type: String },
        name: { type: String, required: [true, "Name must be require."] },
        phone: { type: Number, required: [true, "Phone must be require."] },
        street: { type: String, required: [true, "Address must be require."] },
        city: { type: String, required: [true, "City must be require."] },
        state: { type: String, required: [true, "State must be require."] },
        pincode: { type: Number, required: [true, "Pincode must be require."] },
      },
    ],
  },
  orders: { type: Schema.Types.Mixed },
});

// for change _id to id and delete __v in response

const virtual = userSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

userSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
  },
});

exports.User = mongoose.model("User", userSchema);
