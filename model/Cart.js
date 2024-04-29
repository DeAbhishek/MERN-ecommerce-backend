const mongoose = require("mongoose");
const { Schema } = mongoose;
const cartSchema = new Schema({
  quantity: { type: Number, required: true },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    unique: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// for change _id to id and delete __v in response

const virtual = cartSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

cartSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model("Cart", cartSchema);
