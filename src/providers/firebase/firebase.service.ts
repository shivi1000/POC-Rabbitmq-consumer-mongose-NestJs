import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  async sendBulkPush(staticDeviceTokens: string[], payload: any, options: any = {}) {
    try {
      if (staticDeviceTokens.length <= 0) {
        console.info('INFO: Bulk Notification not sent because there were no device tokens');
        return;
      }
      options = {
        priority: 'high',
      };

      const batchSize = 10;

      // Loop through the array in batches
      for (let i = 0; i < staticDeviceTokens.length; i += batchSize) {
        const batch = staticDeviceTokens.slice(i, i + batchSize);
        try {
          console.info('sendBulkPush', 'batch', batch, 'payload', payload);
          const notificationData = await admin.messaging().sendToDevice(batch, payload, options);
          console.info(notificationData.results, '!!!!!!!!!!!!! Bulk Notifications Result !!!!');
        } catch (error) {
          console.error('Notification error:', error);
        }
      }
    } catch (error) {
      console.error('Notification error:', error);
    }
  }
}
