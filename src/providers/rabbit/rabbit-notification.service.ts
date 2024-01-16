import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { NotificationService } from '../firebase/notification.service';
import { CreateNotificationDto } from '../dto/notification.dto';

@Injectable()
export class RabbitNotificationService {
  constructor(private readonly notificationService: NotificationService, private readonly firebaseService: FirebaseService) {}

  async sendNotification(data: any) {
    const createNotificationDto: CreateNotificationDto = data.createNotificationDto;
    const [notificationBody, staticDeviceTokens] = await this.notificationService.sendPush(createNotificationDto);
    if (Array.isArray(staticDeviceTokens)) {
      await this.firebaseService.sendBulkPush(staticDeviceTokens, notificationBody);
    } else {
      console.error('Invalid staticDeviceTokens:', staticDeviceTokens);
    }
  }
}
