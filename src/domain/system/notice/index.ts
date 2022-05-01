import { uuid } from "@/domain/base"

export type Notice = {
    noticeId: uuid
    title: string
    content: string
    publishTime: Date
}