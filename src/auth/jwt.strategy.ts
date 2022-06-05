import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "./constants";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor()
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        })
    }

    // we should force type safety here in real app
    async validate(payload: any){
        return {userId: payload.sub, username: payload.username}
    }
}