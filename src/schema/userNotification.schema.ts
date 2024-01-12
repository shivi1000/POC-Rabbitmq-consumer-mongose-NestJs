import mongoose, { Schema } from 'mongoose';
import { ENUM } from 'src/common/enum';

export interface IUserNotification extends Document {
  title: string;
  description: string;
  notificationType: number;
  recipientType: number;
  isRead: boolean;
  deviceToken: string;
  notificationDetails: object;
}

const SenderDetails = new Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, required: false },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    profilePic: { type: String, trim: true },
    email: { type: String, trim: true, required: false },
    mobileNo: { type: String, trim: true, required: false },
  },
  {
    _id: false,
  }
);

const ReceiverDetails = new Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, required: false },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    email: { type: String, trim: true, required: false },
    mobileNo: { type: String, trim: true, required: false },
  },
  {
    _id: false,
  }
);

export const UserNotificationSchema = new Schema(
  {
    title: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String, required: true },
    notificationType: { type: Schema.Types.Number, enum: Object.values(ENUM.NOTIFICATION_TYPE) },
    isRead: { type: Schema.Types.Boolean, default: false },
    senderDetails: { type: SenderDetails, default: {} },
    receiverDetails: { type: ReceiverDetails, default: {} },
    notificationDetails: { type: Object, default: {} },
    deviceToken: { type: String, trim: true, required: false },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: ENUM.COLLECTIONS.USER_NOTIFICATION,
  }
);
