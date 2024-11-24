import mongoose from 'mongoose';
import { Schema } from "mongoose";

const UserSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    org:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
});

UserSchema.virtual('id').get(function() {
  return this._id.toHexString();
});
UserSchema.set('toJSON',{
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {delete ret._id}
})

const User = mongoose.model('user2',UserSchema)
export default User;
