import { none, some, getOrElse } from "fp-ts/Option";
import { pipe } from "fp-ts/function";
import { system } from "../../src/module/System";
import { SystemState } from "../../src/types/module";

test('system singleton',()=>{
    let current: SystemState = { Authorization:none, User:none, isLoggedIn: false, config: none };
    system.subscribe((state)=>current=state);
    pipe(()=>({ Authorization: some('test'), User: none, isLoggedIn: false, config: none }),system.update);
    expect( pipe(current.Authorization,getOrElse(()=>'false1')) === pipe(system.state.Authorization,getOrElse(()=>'false2')) );
})