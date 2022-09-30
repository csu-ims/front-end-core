export interface CaptchaImageResponse extends BaseResponse { img: string, uuid: string };

export interface LoginParams  { userId:string, password:string, code:string, uuid:string };

export interface LoginResponse extends BaseResponse { token:string };

// comprehensive

export interface WorkflowParams { uuid:string };

export interface AddPolicyTypeParams { weight: number, name:string, attachment: string }; 

export interface AddPolicyParams {
    /**
     * 政策允许使用的加分类别
     */
    additionTypes: string;
    /**
     * 计算公式
     */
    formula: string;
    /**
     * 数据审核子阶段描述
     */
    subDataAuditStage: string;
    /**
     * 数据生成子阶段描述
     */
    subDataCreateStage: string;
    /**
     * 数据公开子阶段描述
     */
    subDataPublicStage: string;
}

export interface AddWorkflowParams {
    /**
     * 数据审核阶段开始时间
     */
    dataAuditBeginTime: number;
    /**
     * 数据审核阶段结束时间
     */
    dataAuditEndTime: number;
    /**
     * 数据生成阶段开始时间
     */
    dataCreateBeginTime: number;
    /**
     * 数据生成阶段结束时间
     */
    dataCreateEndTime: number;
    /**
     * 数据公开阶段开始时间
     */
    dataPublicBeginTime: number;
    /**
     * 数据公开阶段结束时间
     */
    dataPublicEndTime: number;
    /**
     * 辅导员所管年级（如：2021）
     */
    grade: string;
    /**
     * 应用政策ID
     */
    policyId: string;
}

export interface MutWorkflowParams extends WorkflowParams {
    /**
     * 数据审核阶段开始时间
     */
    dataAuditBeginTime: number;
    /**
     * 数据审核阶段结束时间
     */
    dataAuditEndTime: number;
    /**
     * 数据生成阶段开始时间
     */
    dataCreateBeginTime: number;
    /**
     * 数据生成阶段结束时间
     */
    dataCreateEndTime: number;
    /**
     * 数据公开阶段开始时间
     */
    dataPublicBeginTime: number;
    /**
     * 数据公开阶段结束时间
     */
    dataPublicEndTime: number;

}

export type BaseResponse = { msg:string, code:number }