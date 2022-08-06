import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { Repository } from "typeorm";
import { userEntity } from "../entity/user.entity";
import {User} from "../model/user.interface";

@Injectable()
export class UserService {
    constructor(@InjectRepository(userEntity) private readonly userRepository: Repository<userEntity>){

    }
    
    create(user: User):Observable<User>{
        return from(this.userRepository.save(user));
    }

    findAll():Observable<User[]> {
        return from(this.userRepository.find());
    }

    findOne(id: number): Observable<User> {
        return from(this.userRepository.findOneBy({id}));
    }

    delete(id: number):Observable<any>{
        return from(this.userRepository.delete(id));
    }

    updateOne(id: number, user:User):Observable<any> {
        return from(this.userRepository.update(id,user));
    }
}