import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/providers/database/db.module';
import { schemaProviders } from 'src/schema/schema.provider';
import { NotificationEntity } from './notification.entity';

@Module({
  imports: [DatabaseModule],
  providers: [...schemaProviders, NotificationEntity],
  exports: [NotificationEntity],
})
export class EntityModule {}
