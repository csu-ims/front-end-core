import { Either } from "fp-ts/lib/Either";
import { some } from "fp-ts/lib/Option";
/**
 * 
 * @param e the [Either] being assumed that is 'right'
 * @throw recieved left
 * @returns [some] of right value
 */
export const assumeRight = (errorMessage = '') => <E, A>(e: Either<E, A>) => {
    if (e._tag === 'Left') {
        throw Error(`[ensure.ts/ensure] throw erro because recieved left of Either. | error message: ${errorMessage}`);
    }
    return e.right;
}