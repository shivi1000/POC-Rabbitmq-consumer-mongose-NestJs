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
    const env = process.env.NODE_ENV || false;
    if (!env) process.exit(100);
    admin.initializeApp({
      credential: admin.credential.cert(resolve(process.cwd(), `firebase.${env}.json`)),
      databaseURL: this.configService.get<string>('FIREBASE_DATABASE_URL'),
    });
  }
}
