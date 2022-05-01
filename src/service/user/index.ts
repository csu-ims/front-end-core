import { User } from "@/domain/user";
import { Singleton } from "typescript-ioc";

@Singleton
export abstract class UserService {
    abstract user?: User;
    abstract update: (user: User) => void;
}