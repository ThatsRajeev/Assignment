import mongoose from 'mongoose';
import { Schema } from "mongoose";

const RobotSchema = new Schema({
    isConnected:{
      type: Boolean,
      required: true
    },
    isCharging:{
        type: Boolean,
        required: true
    },
    percentCharge:{
        type: Number,
        min: [0, 'wrong min charge'],
        max: [100, 'wrong max charge'],
        required: true
    },
    isMoving:{
        type: Boolean,
        required: true,
    },
});

RobotSchema.virtual('id').get(function() {
  return this._id.toHexString();
});
RobotSchema.set('toJSON',{
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {delete ret._id}
})

const Robot = mongoose.model('Robot',RobotSchema)
export default Robot;
