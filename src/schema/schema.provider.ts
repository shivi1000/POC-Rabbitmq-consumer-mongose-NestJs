import { Connection } from 'mongoose';
import { UserSchema } from './users.schema';
import { ENUM } from 'src/common/enum';
import { UserNotificationSchema } from './userNotification.schema';

export const schemaProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) => connection.model(ENUM.COLLECTIONS.USER, UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'USER_NOTIFICATION_MODEL',
    useFactory: (connection: Connection) => connection.model(ENUM.COLLECTIONS.USER_NOTIFICATION, UserNotificationSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
