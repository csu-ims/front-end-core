import { handlequery , LeaveApplication , Leaveapplies , Get_leave_query , Post_leave_query , DetailedLeaveapplies , Get_detailed_leave_query } from "./index"
import { http } from "@/api/index";
import { baseResponse, date , uuid , authorization } from "@/domain/base";
const fetchLeaveInfo = async <Get_leave_query extends void>(param: Get_leave_query) =>{
    return await http().get<baseResponse & {totalItem: number,totalPage: number} & {leaveapplies: typeof Leaveapplies}>('/business/leave/getLeavingApplyList',undefined,param);
}
const sumLeaveApply = async <Post_leave_query extends void, authorization extends void>(param: Post_leave_query, Authorization: authorization ) => {
    return await http().post<baseResponse & {uuid: uuid}>('/business/leave/newLeaveApply',param,Authorization);
}
const updateLeaveApply = async <Post_leave_query extends void, authorization extends void>(param: Post_leave_query, Authorization: authorization ) => {
    return await http().post<baseResponse & {uuid: uuid}>('/business/leave/updateLeaveApply',param,Authorization);
}
const fetchDtailedLeaveInfo = async <Get_detailed_leave_query extends void>(param: Get_detailed_leave_query) =>{
    return await http().get<baseResponse & {detailedLeaveapplies: typeof DetailedLeaveapplies}>('/business/leave/getLeaveApplyDetail',undefined,param);
}
const handleLeaveApply = async <handlequery extends void,authorization extends void>(param:handlequery,Authorization: authorization) => {
    return await http().post<baseResponse>('/business/leave/handleLeaveApply',undefined,Authorization);
}


export {fetchLeaveInfo,sumLeaveApply,updateLeaveApply}