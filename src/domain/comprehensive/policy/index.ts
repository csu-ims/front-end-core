import { uuid } from "../../../utils/type"
import { PolicyType } from "./type"

export type Policy = {
    uuid: uuid
    additionTypes: Array<PolicyType["uuid"]>
    formula: string
    subDateCreateStage: string
    subDateAuditStage: string
    subDatePublicStage: string
}