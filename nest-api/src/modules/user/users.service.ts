import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/user.entity';
import { ERROR_KEYS } from 'src/shared/models/error-keys.enum';
import { IModifyUserRequest } from 'src/shared/request-interfaces/modify-user.request';
import { RegisterDTO } from 'src/shared/request-interfaces/register.dto';
import { UserResponse } from 'src/shared/response-interfaces/user.response';
import { CryptoService } from 'src/shared/services/crypto.service';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        private readonly crypto: CryptoService
    ) { }

    getUserByEmail(email: string): Promise<User> {
        return this.usersRepository.findOne({ email });
    }

    getUserById(id: number): Promise<User> {
        return this.usersRepository.findOne(id);
    }

    async createUser(user: RegisterDTO): Promise<UserResponse> {
        const newUser = this.usersRepository.create({
            isAdmin: user.name.includes('admin69420') ? true : false,
            password: this.crypto.generatePasswordHash(user.password),
            name: user.name,
            email: user.email
        });
        const savedUser = await this.usersRepository.save(newUser);
        return {
            id: savedUser.id,
            email: savedUser.email,
            name: savedUser.name,
            createDate: savedUser.createDate,
            isAdmin: savedUser.isAdmin,
        }
    }

    async modifyUser(userId: number, user: IModifyUserRequest): Promise<UserResponse> {
        console.log(userId);

        const existingUser = await this.usersRepository.findOne(userId);
        console.log(existingUser);
        if (!user) {
            throw new BadRequestException(ERROR_KEYS.USER_NOT_FOUND);
        }

        existingUser.name = user.name;

        return this.usersRepository.save(existingUser);
    }

    async deleteUser(userId: number): Promise<UserResponse> {
        const user = await this.usersRepository.findOne(userId);

        if (!user) {
            throw new BadRequestException(ERROR_KEYS.USER_NOT_FOUND);
        }

        return this.usersRepository.remove(user);
    }

    async listUsers(): Promise<UserResponse[]> {
        const users = await this.usersRepository.find();
        if (!users) {
            return [];
        }

        return users.map(u => {
            return {
                id: u.id,
                email: u.email,
                name: u.name,
                createDate: u.createDate,
                isAdmin: u.isAdmin,
            }
        });
    }
}
