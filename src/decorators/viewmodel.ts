import { AuthModel } from "@/reliance/viewmodel/AuthModel";
import { classDecoratorOf } from "@/utils/generator";

const UseAuthModel = classDecoratorOf(AuthModel);

export { UseAuthModel }