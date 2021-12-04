import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { CaffController } from './caff.controller';
import { CaffService } from './caff.service';
import { multerOptions } from '../../shared/multer-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Caff } from './caff.entity';
import { Comment } from './comment.entity';
import { Tag } from './tag.entity';

@Module({
  controllers: [CaffController],
  imports: [
    TypeOrmModule.forFeature([
      Caff,
      Comment,
      Tag
    ]),
    MulterModule.registerAsync({
      useFactory: () => multerOptions
    }),
  ],
  providers: [CaffService]
})
export class CaffModule {}
