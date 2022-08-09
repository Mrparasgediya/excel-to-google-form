export type dataTypes = 'b' | 'e' | 'n' | 'd' | 's' | 'z' | 'r' | 'cb' | 'dd';
export interface IColData {
    [key: string]: {
        [key: string]: {
            value: string,
            type: dataTypes
        }
    }
}

export interface IFormItem {
    col: string,
    type: dataTypes,
    count: number,
    title?: string,
    extra?: {
        v: string[],
        [key: string]: any
    }
}
