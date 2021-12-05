import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ERROR_KEYS } from 'src/shared/models/error-keys.enum';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { CaffService } from './caff.service';

@Controller('caff')
export class CaffController {

    constructor(private readonly caffService: CaffService) {}

    @UseGuards(JwtAuthGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadAnimation(@Request() req, @UploadedFile() file: Express.Multer.File) {
        return this.caffService.parseCaffToGif(file.filename, req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('search')
    searchAnimations(@Request() req, @Query('keywords') keywords: string) {
        return this.caffService.searchAnimations(keywords ? JSON.parse(keywords) : null);
    }

    @UseGuards(JwtAuthGuard)
    @Get('detail/:id')
    getAnimationDetails(@Request() req, @Param('id') id: number) {
        return this.caffService.getAnimationDetail(id, req.user.isAdmin);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    deleteAnimationDetails(@Request() req, @Param('id') id: number) {
        if (!req.user.isAdmin) {
            throw new BadRequestException(ERROR_KEYS.NO_PERMISSION);
        }
        return this.caffService.deleteAnimation(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('add-comment/:id')
    addComment(@Request() req, @Param('id') id: number, @Body() body: {content: string }) {
        return this.caffService.createComment(req.user.id, id, body.content);
    }

    @UseGuards(JwtAuthGuard)
    @Post('hide-comment/:id')
    hideComment(@Request() req, @Param('id') id: number) {
        return this.caffService.hideComment(id, req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete-comment/:id')
    deleteComment(@Request() req, @Param('id') id: number) {
        if (!req.user.isAdmin) {
            throw new BadRequestException(ERROR_KEYS.NO_PERMISSION);
        }
        return this.caffService.deleteComment(id);
    }
}
