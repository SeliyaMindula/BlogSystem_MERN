import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
  // Tags may not need additional fields, but can be expanded if necessary
});

const Tag = mongoose.model('Tag', tagSchema);

export default Tag;
