import { Option } from "fp-ts/lib/Option";
import { User } from "./domain/user"
import { config } from "./export";

export interface SystemState {
    isLoggedIn: boolean;
    Authorization: Option<string>;
    User: Option<User>;
    config: Option<config>;
}