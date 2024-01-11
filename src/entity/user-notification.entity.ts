import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { IUserNotification } from 'src/schema/userNotification.schema';
import { Dao } from 'src/providers/database/dao.provider';

@Injectable()
export class UserNotificationEntity extends Dao {
  constructor(@Inject('USER_NOTIFICATION_MODEL') private userNotificationModel: Model<IUserNotification>) {
    super(userNotificationModel);
  }
}
