import {LeaveApplication,Leaveapplies,Get_leave_query} from "./index"
import { http } from "@/api/index";
import {baseResponse} from "@/domain/base";
const fetchLeaveInfo = async <Get_leave_query extends void>(param: Get_leave_query) =>{
    return await http().get<baseResponse & {totalItem: number,totalPage: number} & LeaveApplication>('/business/leave/getLeavingApplyList',undefined,param);
}

export {fetchLeaveInfo}