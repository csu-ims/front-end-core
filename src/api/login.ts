import { baseResponse, imgBase64string, uuid } from "@/domain/base";
import { backend } from ".";

const fetchCaptchaImage = async () => {
    return await backend().get<{ img: imgBase64string, uuid: uuid } & baseResponse>('/login/captchaImage');
}
const loginBy = async <T>(input: T, uuid: string) => {
    return await backend().post<baseResponse, void, typeof input & { uuid: uuid }>('/login', undefined, { ...input, uuid });
}

export { fetchCaptchaImage, loginBy }