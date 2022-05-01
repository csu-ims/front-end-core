import { Container } from "typescript-ioc";

function classProviderOf(func: Function):ClassDecorator{
    return (target)=>{ Container.bind(func).to(target) };
}

export { classProviderOf }