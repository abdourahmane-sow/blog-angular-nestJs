import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { catchError, map, Observable, of } from "rxjs";
import { User } from "../model/user.interface";
import { UserService } from "../service/user.service";

@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() user: User): Observable<User | Object> {
    return this.userService.create(user).pipe(
      map((user: User) => user),
      catchError((err) => of({ error: err.message }))
    );
  }

  @Post("login")
  login(@Body() user: User): Observable<Object> {
    return this.userService.login(user).pipe(
      map((jwt: string) => {
        return { access_token: jwt };
      })
    );
  }

  @Get(":id")
  findOne(@Param() param): Observable<User> {
    return this.userService.findOne(param.id);
  }

  @Get()
  findAll(): Observable<User[]> {
    return this.userService.findAll();
  }

  @Delete(":id")
  delete(@Param("id") id: string): Observable<any> {
    return this.userService.delete(Number(id));
  }

  @Put(":id")
  updateOne(@Param("id") id: string, @Body() user: User): Observable<any> {
    return this.userService.updateOne(Number(id), user);
  }
}
