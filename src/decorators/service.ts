import { AuthService, UserService } from "@/application/ports"
import { BackEndFoundation } from "@/reliance/foundation";
import { classDecoratorOf } from "@/utils/generator";

const UseBackEndService: ClassDecorator = classDecoratorOf(BackEndFoundation);

const UseAuthService: ClassDecorator = classDecoratorOf(AuthService);

const UseUserService: ClassDecorator = classDecoratorOf(UserService);

export { UseBackEndService ,UseAuthService, UseUserService }