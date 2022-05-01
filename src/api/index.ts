import { BackEndFoundation } from "@/reliance/foundation";
import { Container } from "typescript-ioc";

const backend = ()=>Container.get(BackEndFoundation);

export { backend }