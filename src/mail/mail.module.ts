import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('EMAIL_SERVER'),
          secureConnection: false,
          port: 587,
          tls: {
            rejectUnauthorized: false
          },
          auth: {
            user: configService.get('EMAIL_LOGIN'),
            pass: configService.get('EMAIL_PASSWORD')
          }
        },
        defaults: {
          from: configService.get('EMAIL_FROM')
        }
      })
    })
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
