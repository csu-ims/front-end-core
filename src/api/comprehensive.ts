import { AddPolicyParams, AddPolicyTypeParams, AddWorkflowParams, BaseResponse, MutWorkflowParams, WorkflowParams } from "@/types/api";
import { pipe } from "fp-ts/lib/function"
import { del, post, put } from "./base";

export const deleteWorkFlow = pipe(
    '/comprehensive/workflow',
    del<WorkflowParams,BaseResponse>
)

export const addPolicyType = pipe(
    '/comprehensive/policy/type',
    put<AddPolicyTypeParams,BaseResponse>
)

export const addPolicy = pipe(
    '/comprehensive/policy',
    put<AddPolicyParams,BaseResponse>
)

export const addWorkflow = pipe(
    '/comprehensive/workflow',
    put<AddWorkflowParams,BaseResponse>
)

export const mutWorkflow = pipe(
    '/comprehensive/workflow',
    post<MutWorkflowParams,BaseResponse>
)