import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService, ResponseUser } from "./auth.service";

//pattern of sub-classing and implementing strategy-specific validation is consistent, elegant and extensible.
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        // we don't have any options specified in super() but we can pass options if required
        super();
    }

    async validate(username: string, password: string): Promise<ResponseUser>{
        const user = await this.authService.validateUser(username, password)
        if(!user)
        {
            throw new UnauthorizedException()
        }
        return user;
    }

}
