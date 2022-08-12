import { dataTypes, IFormExtraFields, IFormItem } from 'types/file'
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
        case 'ls':
            return "Linear Scale";
        case "mcg":
            return "Multiple Choice Grid";
        case 'cg':
            return "Checkbox Grid";
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

    let arr: { [key: string]: any } = {}
    for (let col of colsArr) {
        arr[col] = {}
        let newType = undefined;
        // adding extra fields
        if (firstSheet[`${col}2`] && firstSheet[`${col}2`].v && typeof firstSheet[`${col}2`].v === 'string') {
            const extraData = firstSheet[`${col}2`].v.split(';').reduce((extraFields: IFormExtraFields, currItem: string) => {
                if (currItem.includes('t=')) {
                    const data: { [key: string]: dataTypes } = { 'boolean': 'b', 'checkbox': 'cb', 'date': 'd', "dropdown": 'dd', 'number': 'n', 'radio': 'r', 'text': 's', 'linearscale': 'ls', 'multiplechoicegrid': "mcg", 'checkboxgrid': 'cg' };
                    extraFields.type = (data[currItem.split("=")[1].toLocaleLowerCase()]);
                }
                if (currItem === 'required') {
                    extraFields.required = true;
                }
                if (currItem === 'shuffle') {
                    extraFields.shuffle = true;
                }
                if (currItem.includes('scale=')) {
                    const scaleSplitArr: string[] = currItem.split("=");
                    const occuranceOfDash = scaleSplitArr[1].match(/\-/g)?.length
                    if (occuranceOfDash && occuranceOfDash == 1) {
                        const [firstNo, lastNo] = scaleSplitArr[1].split('-')
                        if (!isNaN(+firstNo) && !isNaN(+lastNo)) {
                            extraFields.range = { low: +firstNo, high: +lastNo }
                        }
                    }
                }
                if (currItem.includes('llabel=')) {
                    extraFields.lowLabel = (currItem.split("=")[1])
                }
                if (currItem.includes('hlabel=')) {
                    extraFields.highLabel = (currItem.split('=')[1])
                }
                if (currItem.includes('cols=')) {
                    const colValues = currItem.split('=')[1];
                    extraFields.cols = colValues.split(',').filter(value => !!value);
                }
                return extraFields
            }, {});
            if (extraData.hasOwnProperty('type')) {
                newType = extraData.type
                delete extraData.type;
            }
            if (Object.keys(extraData).length > 0) {
                arr[col]['extra'] = extraData;
            }
        }
        for (let i = firstLineNo + 2; i <= lastLineNo; i++) {
            const colNoKey = `${col}${i}`
            if (firstSheet[colNoKey]) {
                const { t: type, v: value } = firstSheet[colNoKey];
                arr[col][i] = { type: newType || type, value }
            }
        }

    }
    const colDataWithType: IFormItem[] = (Object.entries(arr).map(([colName, colData]) => {
        const formItem: IFormItem = {} as IFormItem;
        formItem.col = colName;
        formItem.title = firstSheet[`${colName}1`].v;
        let extraDataFromFields = {}
        if (colData.hasOwnProperty('extra')) {
            extraDataFromFields = colData.extra;
            delete colData.extra;
        }
        const colTypesWithCount: {
            types?: {
                [key: string]: number
            }
        } = Object.entries(colData).reduce((dataArr: { types?: { [key: string]: number } }, [rowName, rowData]) => {
            if (!dataArr.hasOwnProperty('types')) {
                dataArr.types = {};
            }
            if (dataArr.types) {
                if (dataArr.types.hasOwnProperty((rowData as { type: string }).type)) {
                    dataArr.types[(rowData as { type: string }).type]++;
                } else {
                    dataArr.types[(rowData as { type: string }).type] = 1;
                }
            }
            return dataArr
        }, {});


        if (colTypesWithCount.types) {
            let type, count;
            if (Object.entries(colTypesWithCount.types).length > 1) {
                [type, count] = Object.entries(colTypesWithCount.types).sort(([firstType, firstTypeCount], [secondType, secondTypeCount]) => {
                    if (firstTypeCount > secondTypeCount) return -1;
                    else return 1;
                })[0];
            } else {
                [type, count] = Object.entries(colTypesWithCount.types)[0]
            }
            formItem.type = type as dataTypes;
            formItem.count = count;
        }


        if (formItem.type === 'r' || formItem.type === 'dd' || formItem.type === 'cb' || formItem.type === 'ls' || formItem.type === 'mcg' || formItem.type === 'cg') {
            const values: any[] = []
            for (let i = 3; firstSheet[`${colName}${i}`]; i++) {
                const currCellValue: { v: any } = firstSheet[`${colName}${i}`];
                if (currCellValue.v) {
                    let currValue: any;
                    if (typeof currCellValue.v === 'string') {
                        currValue = currCellValue.v.trim().toLowerCase();
                        if (values.indexOf(currValue) == -1) {
                            values.push(currValue);
                        }
                    } else {
                        currValue = currCellValue.v;
                        if (values.indexOf(currValue) == -1) {
                            values.push(currValue);
                        }
                    }
                }
            }
            formItem.extra = { v: values }
        }
        // add extra fields to any other fields like required
        if (Object.keys(extraDataFromFields).length || (formItem.extra && Object.keys(formItem.extra).length)) {
            formItem.extra = { ...extraDataFromFields, ...formItem?.extra }
        }
        return formItem;
    }));

    return colDataWithType;
} 