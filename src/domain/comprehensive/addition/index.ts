import { imguri, uuid } from "../../../utils/type"
import { PolicyType } from "../policy/type"

export type Addition<T extends PolicyType> = {
    uuid: uuid
    typeId : T['uuid']
    value: number // 加分分值
    name: string //加分名称
    uri: imguri
    attachment: T['attachment']
}