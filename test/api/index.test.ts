import { fetchCaptchaImage, loginBy } from "@/api/login";
import { fakeReliance } from "../test_tools/fakeReliance";

test('fetchCaptchaImage api test',async ()=>{
    fakeReliance.before();
    expect(fetchCaptchaImage()).resolves.toHaveProperty(['img','uuid']);
    fetchCaptchaImage().then( res => {
        expect(res.uuid).toBeDefined();
    });
    fakeReliance.after();
})