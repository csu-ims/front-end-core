import { system } from "@/module/System";
import { config } from "@/types/export";
import { pipe } from "fp-ts/function";
import { getOrElse } from "fp-ts/Option";

export { default as useUser } from "@/export/hook/useUser";
export { default as useLogin } from "@/export/hook/useLogin";

export const Core = {
    get config() {
        return pipe(system.state.config,getOrElse<config>(()=>{ throw Error("[Core.config] core config not set.")}));
    },
    set config(config:config) {
        system.update((s)=>({ ...s, config: { ...s.config, ...config }}));
    }
}