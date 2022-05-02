type uuid = string;
type timestamp = number;
type imguri = string;
type imgBase64string = string;
type baseResponse = { msg: string, code: number };
type htttpRequest = <response = baseResponse,query = void,form = void>(url:string,q?:query,f?:form)=> Promise<response>;
type phonenumber = string;
type date = { year: string, month:string ,day:string }
export { phonenumber, uuid, timestamp, imguri, imgBase64string, baseResponse, htttpRequest, date};