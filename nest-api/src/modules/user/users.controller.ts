import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ERROR_KEYS } from 'src/shared/models/error-keys.enum';
import { RegisterDTO } from 'src/shared/request-interfaces/register.dto';
import { UserResponse } from 'src/shared/response-interfaces/user.response';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Post('modify/:id')
    async modify(@Request() req, @Param('id') id: number, @Body() user: RegisterDTO): Promise<UserResponse> {
        return this.usersService.modifyUser(id, user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('list')
    listUsers(@Request() req): Promise<UserResponse[]> {
        return this.usersService.listUsers();
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    deleteUser(@Request() req, @Param('id') id): Promise<UserResponse> {
        if (req.user.id === id) {
            throw new BadRequestException(ERROR_KEYS.CANNOT_DELETE_OWN_USER);
        }
        return this.usersService.deleteUser(id);
    }
}
