import { pipe } from "fp-ts/lib/function";
import { get, post } from "@/api/base";

test('RESTFul get', async ()=>{
    const res = await pipe('https://httpbin.org/get',get)();
    expect(res._tag === 'Right');
    console.log('get result:',res);
});

test('RESTFul post', async ()=>{
    const res = (await pipe('https://httpbin.org/post',post)({ test: 'test' })()) as any;
    expect(res._tag === 'Right');
    console.log('post result:',res);
});