import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationService {
  NOTIFICATION_BADGE;
  constructor(private readonly configService: ConfigService) {
    this.NOTIFICATION_BADGE = this.configService.get<string>('NOTIFICATION_BADGE');
  }

  async sendPush(createNotificationDto: any) {
    try {
      const notificationBody = {
        title: createNotificationDto.title ? createNotificationDto.title : '',
        description: createNotificationDto.description ? createNotificationDto.description : '',
        notificationType: createNotificationDto.notificationType,
        recipientType: createNotificationDto.recipientType,
        isRead: false,
      };

      // (replace with your logic to fetch or generate device tokens)
      const staticDeviceTokens = [
        'cOjDuuj9HEF_l3pQV-8ql4:APA91bFyLOQzXRD1Dq95AF9QbhJ2wu-yfjXv5-qBa1jevH0OaFU77hDQBbQpqmPinL9bGQ2ZwS2yxV_cbQ8xY3eZYTX6LMQ1wSMYTwDZx4KC55Z5pj55rCn7MegqQa6b-JRF3ti76oTA',
        'cOjDuuj9HEF_l3pQV-8ql4:APA91bFyLOQzXRD1Dq95AF9QbhJ2wu-yfjXv5-qBa1jevH0OaFU77hDQBbQpqmPinL9bGQ2ZwS2yxV_cbQ8xY3eZYTX6LMQ1wSMYTwDZx4KC55Z5pj55rCn7MegqQa6b-JRF3ti76oTB',
        'cOjDuuj9HEF_l3pQV-8ql4:APA91bFyLOQzXRD1Dq95AF9QbhJ2wu-yfjXv5-qBa1jevH0OaFU77hDQBbQpqmPinL9bGQ2ZwS2yxV_cbQ8xY3eZYTX6LMQ1wSMYTwDZx4KC55Z5pj55rCn7MegqQa6b-JRF3ti76oTC',
        'cOjDuuj9HEF_l3pQV-8ql4:APA91bFyLOQzXRD1Dq95AF9QbhJ2wu-yfjXv5-qBa1jevH0OaFU77hDQBbQpqmPinL9bGQ2ZwS2yxV_cbQ8xY3eZYTX6LMQ1wSMYTwDZx4KC55Z5pj55rCn7MegqQa6b-JRF3ti76oTD',
        'cOjDuuj9HEF_l3pQV-8ql4:APA91bFyLOQzXRD1Dq95AF9QbhJ2wu-yfjXv5-qBa1jevH0OaFU77hDQBbQpqmPinL9bGQ2ZwS2yxV_cbQ8xY3eZYTX6LMQ1wSMYTwDZx4KC55Z5pj55rCn7MegqQa6b-JRF3ti76oTE',
        'cOjDuuj9HEF_l3pQV-8ql4:APA91bFyLOQzXRD1Dq95AF9QbhJ2wu-yfjXv5-qBa1jevH0OaFU77hDQBbQpqmPinL9bGQ2ZwS2yxV_cbQ8xY3eZYTX6LMQ1wSMYTwDZx4KC55Z5pj55rCn7MegqQa6b-JRF3ti76oTF',
        'cOjDuuj9HEF_l3pQV-8ql4:APA91bFyLOQzXRD1Dq95AF9QbhJ2wu-yfjXv5-qBa1jevH0OaFU77hDQBbQpqmPinL9bGQ2ZwS2yxV_cbQ8xY3eZYTX6LMQ1wSMYTwDZx4KC55Z5pj55rCn7MegqQa6b-JRF3ti76oTG',
        'cOjDuuj9HEF_l3pQV-8ql4:APA91bFyLOQzXRD1Dq95AF9QbhJ2wu-yfjXv5-qBa1jevH0OaFU77hDQBbQpqmPinL9bGQ2ZwS2yxV_cbQ8xY3eZYTX6LMQ1wSMYTwDZx4KC55Z5pj55rCn7MegqQa6b-JRF3ti76oTH',
        'cOjDuuj9HEF_l3pQV-8ql4:APA91bFyLOQzXRD1Dq95AF9QbhJ2wu-yfjXv5-qBa1jevH0OaFU77hDQBbQpqmPinL9bGQ2ZwS2yxV_cbQ8xY3eZYTX6LMQ1wSMYTwDZx4KC55Z5pj55rCn7MegqQa6b-JRF3ti76oTI',
        'cOjDuuj9HEF_l3pQV-8ql4:APA91bFyLOQzXRD1Dq95AF9QbhJ2wu-yfjXv5-qBa1jevH0OaFU77hDQBbQpqmPinL9bGQ2ZwS2yxV_cbQ8xY3eZYTX6LMQ1wSMYTwDZx4KC55Z5pj55rCn7MegqQa6b-JRF3ti76oTK',
        'cOjDuuj9HEF_l3pQV-8ql4:APA91bFyLOQzXRD1Dq95AF9QbhJ2wu-yfjXv5-qBa1jevH0OaFU77hDQBbQpqmPinL9bGQ2ZwS2yxV_cbQ8xY3eZYTX6LMQ1wSMYTwDZx4KC55Z5pj55rCn7MegqQa6b-JRF3ti76oTL',
        'cOjDuuj9HEF_l3pQV-8ql4:APA91bFyLOQzXRD1Dq95AF9QbhJ2wu-yfjXv5-qBa1jevH0OaFU77hDQBbQpqmPinL9bGQ2ZwS2yxV_cbQ8xY3eZYTX6LMQ1wSMYTwDZx4KC55Z5pj55rCn7MegqQa6b-JRF3ti76oTM',
        'cOjDuuj9HEF_l3pQV-8ql4:APA91bFyLOQzXRD1Dq95AF9QbhJ2wu-yfjXv5-qBa1jevH0OaFU77hDQBbQpqmPinL9bGQ2ZwS2yxV_cbQ8xY3eZYTX6LMQ1wSMYTwDZx4KC55Z5pj55rCn7MegqQa6b-JRF3ti76oTN',
        'cOjDuuj9HEF_l3pQV-8ql4:APA91bFyLOQzXRD1Dq95AF9QbhJ2wu-yfjXv5-qBa1jevH0OaFU77hDQBbQpqmPinL9bGQ2ZwS2yxV_cbQ8xY3eZYTX6LMQ1wSMYTwDZx4KC55Z5pj55rCn7MegqQa6b-JRF3ti76oTO',
        'cOjDuuj9HEF_l3pQV-8ql4:APA91bFyLOQzXRD1Dq95AF9QbhJ2wu-yfjXv5-qBa1jevH0OaFU77hDQBbQpqmPinL9bGQ2ZwS2yxV_cbQ8xY3eZYTX6LMQ1wSMYTwDZx4KC55Z5pj55rCn7MegqQa6b-JRF3ti76oTP',
        'cOjDuuj9HEF_l3pQV-8ql4:APA91bFyLOQzXRD1Dq95AF9QbhJ2wu-yfjXv5-qBa1jevH0OaFU77hDQBbQpqmPinL9bGQ2ZwS2yxV_cbQ8xY3eZYTX6LMQ1wSMYTwDZx4KC55Z5pj55rCn7MegqQa6b-JRF3ti76oTQ',
        'cOjDuuj9HEF_l3pQV-8ql4:APA91bFyLOQzXRD1Dq95AF9QbhJ2wu-yfjXv5-qBa1jevH0OaFU77hDQBbQpqmPinL9bGQ2ZwS2yxV_cbQ8xY3eZYTX6LMQ1wSMYTwDZx4KC55Z5pj55rCn7MegqQa6b-JRF3ti76oTR',
        'cOjDuuj9HEF_l3pQV-8ql4:APA91bFyLOQzXRD1Dq95AF9QbhJ2wu-yfjXv5-qBa1jevH0OaFU77hDQBbQpqmPinL9bGQ2ZwS2yxV_cbQ8xY3eZYTX6LMQ1wSMYTwDZx4KC55Z5pj55rCn7MegqQa6b-JRF3ti76oTS',
        'cOjDuuj9HEF_l3pQV-8ql4:APA91bFyLOQzXRD1Dq95AF9QbhJ2wu-yfjXv5-qBa1jevH0OaFU77hDQBbQpqmPinL9bGQ2ZwS2yxV_cbQ8xY3eZYTX6LMQ1wSMYTwDZx4KC55Z5pj55rCn7MegqQa6b-JRF3ti76oTT',
        'cOjDuuj9HEF_l3pQV-8ql4:APA91bFyLOQzXRD1Dq95AF9QbhJ2wu-yfjXv5-qBa1jevH0OaFU77hDQBbQpqmPinL9bGQ2ZwS2yxV_cbQ8xY3eZYTX6LMQ1wSMYTwDZx4KC55Z5pj55rCn7MegqQa6b-JRF3ti76oTU',
      ];

      const fireBaseNotification = {
        notification: {
          body: notificationBody.description,
          icon: this.NOTIFICATION_BADGE,
          title: notificationBody.title,
        },
        data: {
          title: createNotificationDto.title ? createNotificationDto.title : '',
          description: createNotificationDto.description ? createNotificationDto.description : '',
          images: createNotificationDto.images ? createNotificationDto.images : '',
          notificationType: createNotificationDto.notificationType.toString(),
        },
      };
      return [fireBaseNotification, staticDeviceTokens];
    } catch (error) {
      return [[], []];
    }
  }
}
