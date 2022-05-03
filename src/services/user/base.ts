import { User } from "@/domain/user";

export abstract class UserService {
    abstract user?: User;
    abstract update: (user: User) => void;
}