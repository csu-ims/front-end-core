import { uuid } from "../../base";
import { Attachment } from "../attachment";

export type PolicyType = {
    uuid: uuid
    weight: number;
    name: string;
    attachment: Attachment;
}