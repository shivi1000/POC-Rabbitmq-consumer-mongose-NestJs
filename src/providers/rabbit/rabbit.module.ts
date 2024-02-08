import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EntityModule } from 'src/entity/entity.module';
import { RabbitMQ } from './rabbit.service';
import { Consumer } from './rabbit.consumer';
import { RabbitNotificationService } from './rabbit-notification.service';
import { NotificationService } from '../firebase/notification.service';
import { FirebaseService } from '../firebase/firebase.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from '../email/email.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EntityModule,
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get<string>('HOST') ?? 'smtp.gmail.com',
          auth: {
            user: config.get<string>('EMAIL') ?? 'xyz@gmail.com',
            pass: config.get<string>('PASSWORD') ?? 'gw gyz kd dmdp',
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [RabbitMQ, Consumer, ConfigService, NotificationService, FirebaseService, RabbitNotificationService, EmailService],
})
export class RabbitModule implements OnModuleInit {
  constructor(private readonly rabbitMQ: RabbitMQ) {}

  async onModuleInit() {
    await this.rabbitMQ.createConnection();
  }
}
