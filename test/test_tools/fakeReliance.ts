import { Container } from "typescript-ioc";
import { Snapshot } from "typescript-ioc";
import { debugLoger } from "./debugLoger";
import { useFakeBackEnd } from "./fakeBackEnd";

interface f {
    snapshot: Snapshot | null
    before: Function
    after: Function
}

/**
 * @summary provide the test unit the reliances that needed.
 * 
 */
const fakeReliance: f = {
    snapshot: null,
    before(reliances: [Function] = [useFakeBackEnd]){
        this.snapshot = Container.snapshot();
       for(let reliance of reliances){
           reliance();
       }
    },
    after(){
        if(!this.snapshot){
            debugLoger("snapshot not ready");
            return;
        }
        this.snapshot.restore();
    }
}

export { fakeReliance }