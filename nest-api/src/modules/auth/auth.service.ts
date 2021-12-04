import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from 'src/shared/services/crypto.service';
import { UsersService } from '../user/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly cryptoService: CryptoService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.getUserByEmail(email);

        if (user && this.cryptoService.comparePasswordToHash(user.password, password)) {
            const {password, ...rest} = user;
            return rest;
        }

        return null;
    }

    async generateJwt(userId: number, email: string, isAdmin: boolean): Promise<string> {
        const payload = { email, sub: userId, isAdmin: isAdmin };
        return this.jwtService.sign(payload);
    }
}
