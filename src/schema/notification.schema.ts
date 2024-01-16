import { Schema } from 'mongoose';
import { ENUM } from 'src/common/enum';

export interface INotification extends Document {
  senderId: string;
  receiverIds: string;
  title: string;
  description: string;
  notificationType: number;
  recipientType: number;
  isSent: boolean;
}

export const NotificationSchema = new Schema(
  {
    senderId: { type: Schema.Types.ObjectId },
    receiverIds: [{ type: Schema.Types.ObjectId }],
    title: { type: Schema.Types.String },
    description: { type: Schema.Types.String, required: true },
    notificationType: { type: Schema.Types.Number, enum: Object.values(ENUM.NOTIFICATION_TYPE) },
    isSent: { type: Schema.Types.Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: ENUM.COLLECTIONS.NOTIFICATION,
  }
);
