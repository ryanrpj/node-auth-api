import mongoose from 'mongoose';
const {Schema} = mongoose;

const userSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        email: String,
        password: {type: String, select: false}
    }
);

const UserModel = mongoose.model('user', userSchema);

export default UserModel;