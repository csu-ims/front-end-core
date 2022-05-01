import { LeaveApplication } from "@/domain/business/leave";
import { Singleton } from "typescript-ioc";

namespace Student {
    @Singleton
    export abstract class BusinessService {
        /**
         * @param application 要保存的草稿
         */
        abstract stash: (application: LeaveApplication) => Promise<boolean>;
        /**
         * @param application 要提交的请假申请
         */
        abstract commit: (application: LeaveApplication) => Promise<boolean>;
        /**
         * @param id 要取消的请假申请id
         */
        abstract revoke: (id: LeaveApplication['id']) => Promise<boolean>;
        /**
         * @param pageNum 页面索引
         * @param pageSize 页面显示个数
         */
        abstract fetchApplications: (pageNum: number, pageSize: number) => Promise<Array<LeaveApplication>>;
    }
}