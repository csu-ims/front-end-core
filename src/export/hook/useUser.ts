import { fetchUserProfile } from "@/api/user";
import { isNone, none, Option, some } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/function";
import { useState } from "react";
import { User } from "@/types/domain/user";
import { assumeRight } from "@/utils/either";
import { system } from "@/module/System";

export default function useUser() {

    const [user,setUser] = useState<Option<User>>(none);

    const fetch = async () => {
        pipe(
            (await fetchUserProfile()),
            assumeRight(),
            user => system.update((s)=>({ ...s, User: some(user) }))
        );
    };

    system.subscribe((s)=>{
        if ( isNone(s.User) ) {
            fetch();
            return;
        }
        setUser(s.User);
    });
    
    return [user];
}