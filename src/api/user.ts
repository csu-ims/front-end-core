import { User } from "@/domain/user";
import { baseResponse } from "@/domain/base";
import { http } from ".";

const getProfile = async () => {
    return await http().get<baseResponse & { data: User }>('/user/profile');
}

export { getProfile }