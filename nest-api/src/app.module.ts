import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core/router';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/user/users.module';
import { SharedModule } from './shared/shared.module';
import { CaffModule } from './modules/caff/caff.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public/media'),
      serveRoot: '/public/media'
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
    SharedModule,
    AuthModule,
    UsersModule,
    CaffModule,
    RouterModule.register([
      {
        path: 'api/v1',
        children: [
          AuthModule,
          UsersModule,
          CaffModule
        ]
      }
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
