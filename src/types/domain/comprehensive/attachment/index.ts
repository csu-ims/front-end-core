import { Field, SelectField, DateField } from "./field";

export type Attachment = Array<Field<string> | SelectField | DateField>