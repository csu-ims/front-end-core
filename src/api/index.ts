import { BackEndFoundation } from "@/foundations";
import { Container } from "typescript-ioc";

const backend = ()=>Container.get(BackEndFoundation);

export { backend }