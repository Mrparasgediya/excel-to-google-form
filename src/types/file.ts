export type dataTypes = 'b' | 'e' | 'n' | 'd' | 's' | 'z' | 'r' | 'cb' | 'dd';

export interface IFormItem {
    col: string,
    type: dataTypes,
    count?: number,
    title?: string,
    extra?: {
        v: string[],
        [key: string]: any
    }
}
