import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfirmChannel } from 'amqplib';
import { ENUM } from 'src/common/enum';
import { RabbitNotificationService } from './rabbit-notification.service';
@Injectable()
export class Consumer {
  constructor(private readonly configService: ConfigService, private readonly rabbitNotificationService: RabbitNotificationService) {}
  async startConsume(channel: ConfirmChannel) {
    const QUEUE: any = this.configService.get<string>('RABBIT_MQ_QUEUE');
    channel.consume(
      QUEUE,
      async (msg: any) => {
        console.info('******************************** Rabbit START ******************************************');
        if (msg && msg.content) {
          try {
            const data = JSON.parse(msg.content.toString());
            console.info('Channel =======>', data.channel);
            console.info('Payload =======>', data);
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
