import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { ENUM } from 'src/common/enum';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  mobileNo: number;
  token: string;
  password: string;
  otp: any;
}

export const UserSchema = new mongoose.Schema(
  {
    firstName: { type: Schema.Types.String, required: true },
    lastName: { type: Schema.Types.String, required: true },
    email: { type: String },
    mobileNo: { type: Schema.Types.String },
    token: String,
    password: { type: String, required: true },
    otp: {
      otp: Number,
      expireTime: Date,
      isVerified: Boolean,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: ENUM.COLLECTIONS.USER,
  }
);
