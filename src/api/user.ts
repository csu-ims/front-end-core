import { User } from "@/domain/user";
import { baseResponse } from "@/domain/base";
import { backend } from ".";

const getProfile = async () => {
    return await backend().get<baseResponse & { data: User }>('/user/profile');
}

export { getProfile }