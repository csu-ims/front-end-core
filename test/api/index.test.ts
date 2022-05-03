import { fetchCaptchaImage, loginBy } from "@/api/login";
import { useFakeBackEnd } from "test/test_tools/fakeBackEnd";
import { fakeReliance } from "../test_tools/fakeReliance";

test('fetchCaptchaImage api test',async ()=>{
    fakeReliance.before([useFakeBackEnd]);
    expect(fetchCaptchaImage()).resolves.toHaveProperty(['img','uuid']);
    fetchCaptchaImage().then( res => {
        expect(res.uuid).toBeDefined();
    });
    fakeReliance.after();
})