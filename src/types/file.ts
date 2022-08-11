export type dataTypes = 'b' | 'e' | 'n' | 'd' | 's' | 'z' | 'r' | 'cb' | 'dd' | 'ls';

export interface IFormExtraFields { v?: any[], required?: boolean, type?: dataTypes, shuffle?: boolean, range?: { low: number, high: number }, lowLabel?: string, highLabel?: string }

export interface IFormItem {
    col: string,
    type: dataTypes,
    count?: number,
    title?: string,
    extra?: IFormExtraFields;
}
