import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirebaseService } from './firebase.service';
import * as admin from 'firebase-admin';
import { resolve } from 'path';
import { NotificationService } from './notification.service';
import { EntityModule } from 'src/entity/entity.module';

@Module({
  imports: [ConfigModule.forRoot(), EntityModule],
  providers: [NotificationService, FirebaseService],
  exports: [NotificationService, FirebaseService],
})
export class FirebaseModule {
  constructor(private readonly configService: ConfigService) {
    admin.initializeApp({
      credential: admin.credential.cert(resolve(process.cwd(), `firebase.dev.json`)),
    });
  }
}
