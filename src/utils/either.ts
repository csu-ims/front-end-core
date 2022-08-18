import { Either } from "fp-ts/lib/Either";
/**
 * @throw recieved left
 * @returns [some] of right value
 */
export const assumeRight = (onLeftMessage = '') => <E, A>(e: Either<E, A>) => {
    if (e._tag === 'Left') {
        throw Error(`[ensure.ts/ensure] throw erro because recieved left of Either. | error message: ${onLeftMessage}`);
    }
    return e.right;
}