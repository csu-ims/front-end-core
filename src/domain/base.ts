type uuid = string;
type timestamp = number;
type imgUri = string;
type imgBase64string = string;
type baseResponse = { msg: string, code: number };
type htttpRequest = <response = baseResponse,query = void,form = void>(url:string,q?:query,f?:form)=> Promise<response>;
type phonenumber = string;

export { phonenumber, uuid, timestamp, imgUri, imgBase64string, baseResponse, htttpRequest };