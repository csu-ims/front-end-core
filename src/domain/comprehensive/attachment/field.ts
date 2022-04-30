type Field<T> = {
    name: string
    value: T
}
type SelectField = Field<string> & {
    selections: Array<string>
}
type DateField = Field<Date> & {
    format: 'yyyy' | 'yyyy-mm' | 'yyyy-mm-dd'
}

export { Field, SelectField, DateField }