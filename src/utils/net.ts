import { errorCode } from "@/types/export";

export const netErrorToErrorCode = (e: Error): errorCode => {
    console.debug(`[useLogin.ts/login] request fail at: ${e.message}`);
    return 'NET';
};