import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENUM } from 'src/common/enum';
import { UserNotificationEntity } from 'src/entity/user-notification.entity';

@Injectable()
export class NotificationService {
  NOTIFICATION_BADGE;
  constructor(private readonly userNotificationEntity: UserNotificationEntity, private readonly configService: ConfigService) {
    this.NOTIFICATION_BADGE = this.configService.get<string>('NOTIFICATION_BADGE');
  }

  async userPush(pushData: any) {
    try {
      const payload = {
        title: pushData.title ? pushData.title : '',
        description: pushData.description ? pushData.description : '',
        notificationType: ENUM.NOTIFICATION_TYPE.PUSH,
        receiverDetails: pushData.receiverDetails,
        senderDetails: pushData.senderDetails,
        notificationDetails: pushData.notificationDetails ? pushData.notificationDetails : '',
        deviceToken: pushData.deviceToken,
        notificationOf: pushData.notificationOf.toString(),
      };
      const fireBaseNotification = {
        notification: {
          body: payload.description,
          icon: this.NOTIFICATION_BADGE,
          title: payload.title,
          notificationOf: payload.notificationOf,
        },
        data: {
          title: pushData.title ? pushData.title : pushData.description,
          description: pushData.description,
          images: pushData.description?.images ? pushData.description.images : '',
          notificationType: ENUM.NOTIFICATION_TYPE.PUSH.toString(),
          notificationDetails: JSON.stringify(pushData.notificationDetails ? pushData.notificationDetails : ''),
          notificationOf: pushData.notificationOf.toString(),
        },
      };
      await this.userNotificationEntity.saveData(payload);

      return [pushData.deviceToken, fireBaseNotification];
    } catch (error) {
      return [[], {}];
    }
  }
}
