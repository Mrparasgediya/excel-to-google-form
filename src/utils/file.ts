// import { dataTypes, IColData, IFormItem } from 'types/file'
import { dataTypes, IColData, IFormItem } from 'types/file'
import { WorkSheet } from 'xlsx'

export const fileValidExtensions: string[] = ['.xlsx'];

export const getFullTypeOfFileType = (type: dataTypes) => {
    switch (type) {
        case 'b':
            return 'Boolean';
        case 'cb':
            return "Checkbox";
        case 'd':
            return "Date";
        case 'dd':
            return "Dropdown";
        case 'n':
            return "Number";
        case 'r':
            return "Radio";
        case 's':
            return 'Text';
        default:
            return "Invalid";
    }
}


export const isValidFileAccept = (fileName: string): boolean => fileValidExtensions.some((currentExtension) => fileName.endsWith(currentExtension))

const getArrayMatchesRegEx = (array: string[], regex: RegExp) => array.map(item => {
    const regExArr = item.match(regex)
    if (!regExArr) {
        return null;
    }
    return regExArr[0];
})

const getColNames = (firstCharCode: number, lastCharCode: number): string[] => {
    const charArr: string[] = [];
    for (let i = firstCharCode; i <= lastCharCode; i++) {
        charArr.push(String.fromCharCode(i));
    }
    return charArr;
}

export const readWorksheet = (worksheet: WorkSheet): IFormItem[] => {
    // const jsonData = XLSX.utils.sheet_to_json(worksheet)
    const firstSheet = worksheet.Sheets[worksheet.SheetNames[0]];
    const lineRef = firstSheet['!ref']
    const columnsArr = lineRef?.split(":")!;
    const [firstLineNo, lastLineNo]: number[] = getArrayMatchesRegEx(columnsArr, /[0-9]+/).map(item => +item!);
    const [firstCol, lastCol] = getArrayMatchesRegEx(columnsArr, /[A-Z]+/);
    const colsArr = getColNames(firstCol?.charCodeAt(0)!, lastCol?.charCodeAt(0)!);
    const data: IColData = {}

    for (let col of colsArr) {
        data[col] = {}
        for (let i = firstLineNo + 2; i <= lastLineNo; i++) {
            const colNoKey = `${col}${i}`
            if (firstSheet[colNoKey]) {
                const { t: type, v: value } = firstSheet[colNoKey];
                data[col][i] = { type, value }
            }
        }
    }

    const colDataWithType: IFormItem[] = (Object.entries(data).map(([colName, colData]): IFormItem => {
        const typeWithCount = Object.entries(colData).reduce((dataItems: any, [colItemKey, colItemData]) => {
            if (!dataItems.hasOwnProperty(colItemData.type)) {
                dataItems[colItemData.type] = 1;
            } else {
                dataItems[colItemData.type] = dataItems[colItemData.type] + 1;
            }
            return dataItems;
        }, {});
        return {
            col: colName,
            type: Object.keys(typeWithCount)[0] as dataTypes,
            count: typeWithCount[Object.keys(typeWithCount)[0]]
        };
    })).map((item: IFormItem): IFormItem => {
        item.title = firstSheet[`${item.col}1`].v;
        if (firstSheet[`${item.col}2`]) {
            const extraFields = firstSheet[`${item.col}2`].v.split(";").reduce((obj: { [key: string]: any }, key: string) => {
                const [innerKey, innerValue] = key.split("=");
                if (innerKey || innerValue) {
                    return {
                        ...obj,
                        [innerKey]: innerValue.includes(',') ? innerValue.split(',') : innerKey === 'v' ? [innerValue] : innerValue
                    }
                } else {
                    return obj
                }
            }, {});
            if (extraFields.hasOwnProperty('t')) {
                item.type = extraFields.t === 'radio' ? 'r' : extraFields.t === 'checkbox' ? 'cb' : extraFields.t === 'dropdown' ? 'dd' : item.type;
                delete extraFields.t;
            }
            item.extra = extraFields;
        }
        return item;
    });
    return colDataWithType;
} 