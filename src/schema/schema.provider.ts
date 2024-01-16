import { Connection } from 'mongoose';
import { NotificationSchema } from './notification.schema';
import { ENUM } from 'src/common/enum';

export const schemaProviders = [
  {
    provide: 'NOTIFICATION_MODEL',
    useFactory: (connection: Connection) => connection.model(ENUM.COLLECTIONS.NOTIFICATION, NotificationSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
