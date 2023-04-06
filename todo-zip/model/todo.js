var mongoose = require("mongoose");
const categoryList = ["gym", "school", "work"];
var TodoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

TodoSchema.statics.getCategoryList = function getCategoryList() {
  return categoryList;
};
//gym
TodoSchema.statics.isValidCategory = function isValidCategory(categoryItem) {
  if (categoryList.indexOf(categoryItem) == -1) {
    return false;
  }
  return true;
};

var todoModel = mongoose.model("todo", TodoSchema);
module.exports = todoModel;
