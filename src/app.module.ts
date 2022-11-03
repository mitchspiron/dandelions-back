import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthUserModule } from './auth-user/auth-user.module';
import { AtGuard } from './common/guards';
import { UserRoleModule } from './user-role/user-role.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailModule } from './mailer/mailer.module';
import { PostCategoryModule } from './post-category/post-category.module';

@Module({
  imports: [
    PrismaModule,
    AuthUserModule,
    UserRoleModule,
    MailModule,
    PostCategoryModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
