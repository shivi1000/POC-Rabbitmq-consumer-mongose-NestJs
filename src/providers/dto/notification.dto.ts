import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ENUM } from 'src/common/enum';

export class CreateNotificationDto {
  @IsNumber()
  @IsNotEmpty()
  @IsEnum([ENUM.NOTIFICATION_TYPE.PUSH])
  notificationType: number;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  isSent: boolean;

  @IsOptional()
  receiverIds?: string[];
}
