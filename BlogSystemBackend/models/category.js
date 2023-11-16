import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  }
  // Additional fields can be added as necessary
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
