import mongoose from 'mongoose';
import { Schema } from "mongoose";

const timeSchema = new Schema({
  hours: {
    type: Number,
    required: true
  },
  minutes: {
    type: Number,
    requied: true,
  }
});

const timerSchema = new Schema({
  days: {
    type: Number,
    required: true
  },
  time: {
    type: timeSchema,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  }
})

const ParameterSchema = new Schema({
    timer1: {
      type: timerSchema,
      required: true
    },
    timer2: {
      type: timerSchema,
      required: true
    }
});

ParameterSchema.virtual('id').get(function() {
  return this._id.toHexString();
});
ParameterSchema.set('toJSON',{
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {delete ret._id}
})

const Parameter = mongoose.model('Parameter',ParameterSchema)
export default Parameter;
