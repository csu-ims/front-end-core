import { uuid } from "@/types/domain/base"

export type Notice = {
    noticeId: uuid
    title: string
    content: string
    publishTime: Date
}