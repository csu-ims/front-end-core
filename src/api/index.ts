import { HttpFoundation } from "@/foundations";
import { Container } from "typescript-ioc";

const http = () =>Container.get(HttpFoundation);

export { http }