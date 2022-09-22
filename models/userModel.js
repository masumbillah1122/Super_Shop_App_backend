import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  image: { type: String, required: true },
  isAdmin: { type: Boolean, default: false, required: true },
}, {
    timestamps: true // for date
});

const User = mongoose.model('User', UserSchema);
export default User;