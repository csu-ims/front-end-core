import { handlequery , LeaveApplication , Leaveapplies , GetLeaveQuery , PostLeaveQuery , DetailedLeaveapplies , GetDetailedLeaveQuery } from "../domain/business/leave"
import { http } from "@/api/index";
import { baseResponse, date , uuid , authorization } from "@/domain/base";
const fetchLeaveInfo = async <GetLeaveQuery extends void>(param: GetLeaveQuery) =>{
    return await http().get<baseResponse & {totalItem: number,totalPage: number} & {leaveapplies: typeof Leaveapplies}>('/business/leave/getLeavingApplyList',undefined,param);
}
const sumLeaveApply = async <PostLeaveQuery extends void, authorization extends void>(param: PostLeaveQuery, Authorization: authorization ) => {
    return await http().post<baseResponse & {uuid: uuid}>('/business/leave/newLeaveApply',param,Authorization);
}
const updateLeaveApply = async <PostLeaveQuery extends void, authorization extends void>(param: PostLeaveQuery, Authorization: authorization ) => {
    return await http().post<baseResponse & {uuid: uuid}>('/business/leave/updateLeaveApply',param,Authorization);
}
const fetchDtailedLeaveInfo = async <GetDetailedLeaveQuery extends void>(param: GetDetailedLeaveQuery) =>{
    return await http().get<baseResponse & {detailedLeaveapplies: typeof DetailedLeaveapplies}>('/business/leave/getLeaveApplyDetail',undefined,param);
}
const handleLeaveApply = async <handlequery extends void,authorization extends void>(param:handlequery,Authorization: authorization) => {
    return await http().post<baseResponse>('/business/leave/handleLeaveApply',undefined,Authorization);
}


export {fetchLeaveInfo,sumLeaveApply,updateLeaveApply}