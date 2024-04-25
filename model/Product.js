const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: [true, "Title must be require."],
  },
  description: { type: String },
  price: {
    type: Number,
    require: [true, "Price must be require."],
    min: [1, "Wrong Min Price"],
  },
  discountPercentage: {
    type: Number,
    require: [true, "Discount Percentage must be require."],
    min: [0, "Wrong Min Discount Percentage"],
    max: [100, "Wrong Max Discount Percentage"],
  },
  rating: {
    type: Number,
    min: [0, "Wrong Min Rating"],
    max: [100, "Wrong Max Rating"],
    default: 0,
  },
  stock: {
    type: Number,
    require: [true, "Stock must be require."],
    min: [0, "Wrong Min Stock"],
    default: 0,
  },
  brand: { type: String, required: [true, "Brand name must be require."] },
  category: {
    type: String,
    required: [true, "Category name must be require."],
  },
  thumbnail: { type: String, required: [true, "Thumbnail must be require."] },
  images: [String],
  deleted: { type: Boolean, default: false },
});

// for change _id to id and delete __v in response
const virtual = productSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

productSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
  },
});

exports.Product = mongoose.model("Product", productSchema);
