import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EntityModule } from 'src/entity/entity.module';
import { RabbitMQ } from './rabbit.service';
import { Consumer } from './rabbit.consumer';
import { RabbitNotificationService } from './rabbit-notification.service';
import { NotificationService } from '../firebase/notification.service';
import { FirebaseService } from '../firebase/firebase.service';

@Module({
  imports: [ConfigModule.forRoot(), EntityModule],
  providers: [RabbitMQ, Consumer, ConfigService, NotificationService, FirebaseService, RabbitNotificationService],
})
export class RabbitModule implements OnModuleInit {
  constructor(private readonly rabbitMQ: RabbitMQ) {}

  async onModuleInit() {
    await this.rabbitMQ.createConnection();
  }
}
