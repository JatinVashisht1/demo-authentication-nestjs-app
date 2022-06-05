import { Injectable } from '@nestjs/common';


// make sure to store password in encrypted form in a real application
interface User{
    userId: number,
    username: string,
    password: string
}

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            userId: 1,
            username: 'John',
            password: 'changeme'
        },
        {
            userId: 2,
            username: 'Maria',
            password: 'guess'
        }
    ]

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user=> user.username === username)
    }
}

