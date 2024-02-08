import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfirmChannel } from 'amqplib';
import { ENUM } from 'src/common/enum';
import { RabbitNotificationService } from './rabbit-notification.service';
import { EmailService } from '../email/email.service';
@Injectable()
export class Consumer {
  constructor(
    private readonly configService: ConfigService,
    private readonly rabbitNotificationService: RabbitNotificationService,
    private readonly emailService: EmailService
  ) {}
  async startConsume(channel: ConfirmChannel) {
    const QUEUE: any = this.configService.get<string>('RABBIT_MQ_QUEUE') ?? 'demo_queue';
    await channel.assertExchange(QUEUE, 'direct', { durable: false });
    channel.consume(
      QUEUE,
      async (msg: any) => {
        console.info('******************************** Rabbit START ******************************************');
        if (msg && msg.content) {
          try {
            const data = JSON.parse(msg.content.toString());
            console.info('Channel =======>', data.channel);
            console.info('Payload =======>', data);
            if (data.channel == ENUM.CHANNEL_TYPE.EMAIL) {
              await this.processEmailPayload(data);
            }
            this.acknowledgeChannel(data);
            channel.ack(msg);
          } catch (error) {
            console.log('Consumer Error', error.message);
            channel.nack(msg, false, false);
          }
        } else {
          channel.nack(msg, false, false);
        }
        console.info('******************************** Rabbit ENDS ******************************************');
      },
      { noAck: false }
    );
  }

  async processEmailPayload(payload: any) {
    try {
      console.log('----------------------->', payload.user);
      if (typeof payload.user === 'string') {
        payload.user = JSON.parse(payload.user);
        console.log('payoload of usr-0---------->', payload.user);
      }
      for (const userEmail of payload.user) {
        const fileContent = Buffer.from(payload.file.buffer.data, 'base64');
        await this.emailService.sendBookingPDF(fileContent, userEmail);
      }
    } catch (error) {
      console.error('Error processing email payload:', error);
    }
  }
  async acknowledgeChannel(data: any) {
    switch (data.channel) {
      case ENUM.CHANNEL_TYPE.PUSH:
        {
          await this.rabbitNotificationService.sendNotification(data);
        }
        break;
      default:
        break;
    }
  }
}
