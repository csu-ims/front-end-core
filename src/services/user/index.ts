import { User } from "@/domain/user";
import { Singleton } from "typescript-ioc";
import { BaseUserService } from "./UserService";

@Singleton
abstract class UserService {
    abstract user?: User;
    abstract update: (user: User) => void;
}

export { UserService, BaseUserService }