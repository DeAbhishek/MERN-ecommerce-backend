const mongoose = require("mongoose");
const { Schema } = mongoose;
const cartSchema = new Schema({
 
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
