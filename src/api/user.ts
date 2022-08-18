import { pipe } from "fp-ts/lib/function";
import { get } from "./base";
import { User } from "@/types/domain/user";

export const fetchUserProfile = pipe('/user/profile',get<User>);