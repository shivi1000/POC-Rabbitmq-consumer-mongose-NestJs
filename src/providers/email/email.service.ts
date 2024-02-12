import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer'; // Import only MailerService
import { ConfigService } from '@nestjs/config';

@Injectable()
// @UseInterceptors(ErrorInterceptor)
export class EmailService {
  constructor(private readonly mailerService: MailerService, private readonly configservice: ConfigService) {}

  async sendBookingPDF(file: any, userEmail: string) {
    console.log('Email inititate', userEmail);
    const mailOptions = {
      from: 'prashant.sharma@appinventiv.com',
      to: userEmail,
      subject: 'Demo',
      attachments: [
        {
          filename: 'demo.csv',
          content: file,
          contentType: 'application/csv',
        },
      ],
    };
    try {
      await this.mailerService.sendMail(mailOptions);
      console.log('CSV File sent successfully.');
    } catch (error) {
      console.error('Error sending csv file:', error);
      throw error;
    }
  }
}
