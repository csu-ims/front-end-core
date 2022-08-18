import { Policy } from "../policy"

export type WorkFlow = {
    policyId: Policy['uuid']
    dataCreateBedginTime: Date
    dataCreateEndTime: Date
    dataAuditBeginTime: Date
    dataAuditEndTime: Date
    dataPublicBeginTime: Date
    datePublicEndTime: Date
    grade: string // 辅导员所管年级（如：2021）
}