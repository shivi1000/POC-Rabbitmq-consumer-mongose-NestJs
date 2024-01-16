import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { INotification } from 'src/schema/notification.schema';
import { Dao } from 'src/providers/database/dao.provider';

@Injectable()
export class NotificationEntity extends Dao {
  constructor(@Inject('NOTIFICATION_MODEL') private notificationModel: Model<INotification>) {
    super(notificationModel);
  }
}
