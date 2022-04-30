import { Container } from "typescript-ioc"
import { AuthService, UserService } from "@/application/ports"

const UseAuthService: ClassDecorator = (target)=>{
    Container.bind(AuthService).to(target);
}

const UseUserService: ClassDecorator = (target)=>{
    Container.bind(UserService).to(target);
}

export { UseAuthService, UseUserService }