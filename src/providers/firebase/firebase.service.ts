import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  /**
   * @name send
   * @description sends notifications to registration tokens
   * @param registrationTokens tokens to send notification, string or array of strings
   * @param payload the payload object
   */
  async sendPush(registrationTokens: any, payload: any, options: any = {}) {
    try {
      console.info('Send Push', 'registrationTokens', registrationTokens, 'payload', payload);
      if (registrationTokens) {
        options = {
          priority: 'high',
        };
        const notificationData = await admin.messaging().sendToDevice(registrationTokens, payload, options);
        console.info(notificationData.results, '!!!!!!!!!!!!!1Notifications Result!!!!');
      } else {
        console.info('INFO: Notification not sent because there were no device tokens');
      }
    } catch (error) {
      console.error('Notification error:', error);
    }
  }
}
