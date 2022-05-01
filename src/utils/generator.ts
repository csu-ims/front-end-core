import { Container } from "typescript-ioc";

function classDecoratorOf(func: Function):ClassDecorator{
    return (target)=>{ Container.bind(func).to(target) };
}

export { classDecoratorOf }