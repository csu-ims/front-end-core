import { uuid } from "@/utils/type"

export type Notice = {
    noticeId: uuid
    title: string
    content: string
    publishTime: Date
}