import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthUserModule } from './auth-user/auth-user.module';
import { AtGuard } from './common/guards';
import { UserRoleModule } from './user-role/user-role.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailModule } from './mailer/mailer.module';
import { PostCategoryModule } from './post-category/post-category.module';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';
import { EnterpriseModule } from './enterprise/enterprise.module';
import { MulterModule } from '@nestjs/platform-express';
import { EvenementModule } from './evenement/evenement.module';
import { EventRegistrationModule } from './event-registration/event-registration.module';
import { CommentModule } from './comment/comment.module';
import { ResponseModule } from './response/response.module';

@Module({
  controllers: [AppController],
  imports: [
    PrismaModule,
    AuthUserModule,
    UserRoleModule,
    MailModule,
    PostCategoryModule,
    UsersModule,
    PostModule,
    EnterpriseModule,
    MulterModule.register({
      dest: './images',
    }),
    EvenementModule,
    EventRegistrationModule,
    CommentModule,
    ResponseModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
