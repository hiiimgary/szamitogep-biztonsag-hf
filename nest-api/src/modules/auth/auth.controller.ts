import { BadRequestException, Body, ConflictException, Controller, Get, HttpStatus, Post, Request, Res, UseGuards } from '@nestjs/common';
import { RegisterDTO } from 'src/shared/request-interfaces/register.dto';
import { UsersService } from '../user/users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local/local-auth.guard';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { Response } from 'express';
import { UserResponse } from 'src/shared/response-interfaces/user.response';
import { ERROR_KEYS } from 'src/shared/models/error-keys.enum';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
        private readonly httpService: HttpService
    ) { }


    @UseGuards(LocalAuthGuard)
    @Post('login')
    async emailLogin(@Request() req): Promise<{user: UserResponse, token: string}> {
        const accessToken = await this.authService.generateJwt(req.user.id, req.user.email, req.user.isAdmin);
        return {
            user: {
                id: req.user.id,
                email: req.user.email,
                name: req.user.name,
                createDate: req.user.createDate,
                isAdmin: req.user.isAdmin,
            },
            token: accessToken
        };
    }

    @Post('register')
    async register(@Res({passthrough: true}) res: Response, @Body() user: RegisterDTO) {
        const captchaResponse = await firstValueFrom(
            this.httpService.post(
                `https://www.google.com/recaptcha/api/siteverify`,
                `secret=6Lerrm8dAAAAAEgNz8eJYe1tF_uXC7B9swSL2akz&response=${user.recaptcha}`,
                { headers: {'Content-Type': 'application/x-www-form-urlencoded'} }
            )
        );

        if (captchaResponse.data.success) {
            const registeredUser = await this.usersService.getUserByEmail(user.email);
            if (registeredUser) {
                throw new BadRequestException(ERROR_KEYS.EMAIL_ALREADY_EXISTS);
            }
            await this.usersService.createUser(user);
    
            res.status(HttpStatus.CREATED);
            return [];
        } else {
            throw new BadRequestException(ERROR_KEYS.RECAPTCHA_KEY_INVALID);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('is-logged-in')
    async isLoggedIn(@Request() req): Promise<UserResponse> {
        const user = await this.usersService.getUserById(req.user.id);
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            createDate: user.createDate,
            isAdmin: user.isAdmin,
        }
    }
}
