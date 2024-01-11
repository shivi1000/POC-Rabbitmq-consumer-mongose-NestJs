import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { NotificationService } from '../firebase/notification.service';
import { CONSTANT } from 'src/common/constant';

@Injectable()
export class RabbitNotificationService {
  constructor(private readonly notificationService: NotificationService, private readonly firebaseService: FirebaseService) {}

  async sendUserNotification(data: any) {
    const pushData: any = data.pushData;
    if (pushData.title == undefined) {
      pushData.title = CONSTANT.APP_NAME;
    }
    const [deviceTokens, notificationBody] = await this.notificationService.userPush(pushData);
    console.info('sendUserNotification : ', 'deviceTokens : ', deviceTokens, 'notificationBody : ', notificationBody);
    await this.firebaseService.sendPush(deviceTokens, notificationBody);
  }
}
