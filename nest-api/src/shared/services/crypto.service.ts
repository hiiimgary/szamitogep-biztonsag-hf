import { Injectable } from '@nestjs/common';
import { scryptSync, randomBytes, timingSafeEqual } from 'crypto';

@Injectable()
export class CryptoService {


    generatePasswordHash(password: string) {
        const salt = randomBytes(16).toString('hex');
        const hash = scryptSync(password, salt, 64).toString('hex');
        return `${salt}:${hash}`;
    }

    comparePasswordToHash(hash: string, password: string): boolean {
        const [salt, key] = hash.split(':');
        const hashedBuffer = scryptSync(password, salt, 64);

        const keyBuffer = Buffer.from(key, 'hex');

        return timingSafeEqual(hashedBuffer, keyBuffer);
    }
}
