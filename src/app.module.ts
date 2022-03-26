import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { ParcelsModule } from './parcels/parcels.module';
import { OwnersModule } from './owners/owners.module';
import { LinesModule } from './lines/lines.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    AuthModule,
    MailModule,
    ProjectsModule,
    UsersModule,
    ParcelsModule,
    OwnersModule,
    LinesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
