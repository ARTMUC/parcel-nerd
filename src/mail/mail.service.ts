import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmationEmail(user: User) {
    const { emailConfirmationToken, id, name, email } = user;
    const url = `http://localhost:3000/auth/confirm-email`;
    const confirmationEmailText = url + '/' + emailConfirmationToken + '/' + id;
    const confirmationEmailHTML = `<a href=\"${url}/${emailConfirmationToken}/${id}\">Hello ${name} click here to confirm email </a>`;

    await this.mailerService.sendMail({
      // to: user.email,
      to: 'artmuc911@gmail.com', // for testing only
      subject: 'Welcome to CookBook! Confirm your Email',
      text: confirmationEmailText,
      html: confirmationEmailHTML
    });
  }
}
