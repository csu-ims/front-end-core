import { Option } from "fp-ts/lib/Option";
import { User } from "./domain/user"

export interface SystemState {
    isLoggedIn: boolean;
    Authorization: Option<string>;
    User: Option<User>;
}