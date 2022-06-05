import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import {JwtService} from '@nestjs/jwt'

export interface ResponseUser {
    username: string,
    userId: number
}

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
        ){}

    async validateUser(username: string, pass: string): Promise<ResponseUser>{
        const user = await this.usersService.findOne(username)

        
        if(user && user.password === pass){
            // password is extracted explicitly and ...result refers to everything that is left in user which is User data type 
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(user: ResponseUser){
        const payload = {username: user.username, sub: user.userId}
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
