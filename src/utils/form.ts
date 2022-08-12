import { IFormItem } from "types/file";

export const getRequestForForm = (testData: IFormItem[]) => {
    const data = (testData.map((item, idx) => {

        const createItem: { item: { title: string | undefined, questionItem?: any, questionGroupItem?: any }, location: { index: number } } = {
            item: {
                title: item.title,
            },
            location: {
                index: idx
            }
        }

        const question: { [key: string]: any } = {
            // check is field is required or not
            required: item.extra && item.extra.hasOwnProperty('required') || false
        }
        if (item.type === 'd') {
            question['dateQuestion'] = {
                includeYear: true
            }
        }

        if (item.type === 'n' || item.type === 's') {
            question['textQuestion'] = {}
        }

        if (item.extra && item.extra.v) {
            if (item.type === 'r') {
                question['choiceQuestion'] = {
                    type: 'RADIO',
                    options: item.extra && (item.extra.v).map((item: string) => ({ value: item })),
                    shuffle: item.extra && item.extra.hasOwnProperty('shuffle')
                }
            }
            if (item.type === 'cb') {
                question['choiceQuestion'] = {
                    type: 'CHECKBOX',
                    options: item.extra && (item.extra.v).map((item: string) => ({ value: item })),
                    shuffle: item.extra && item.extra.hasOwnProperty('shuffle')
                }
            }

            if (item.type === 'dd') {
                question['choiceQuestion'] = {
                    type: 'DROP_DOWN',
                    options: item.extra && (item.extra.v).map((item: string) => ({ value: item })),
                    shuffle: item.extra && item.extra.hasOwnProperty('shuffle')
                }
            }
        }

        if (item.type === 'ls') {
            if (item.extra && item.extra.range && item.extra.range.low && item.extra.range.high) {
                const { lowLabel, highLabel, range: { high, low } } = item.extra;
                const scaleQUestionOptios: { low: number, high: number, lowLabel?: string, highLabel?: string } = { low, high }
                if (lowLabel) scaleQUestionOptios.lowLabel = lowLabel
                if (highLabel) scaleQUestionOptios.highLabel = highLabel;
                question['scaleQuestion'] = scaleQUestionOptios;
            }
        }
        if (item.type === 'mcg') {
            if (item.extra && item.extra.cols && item.extra.v && item.extra.cols.length && item.extra.v.length) {
                createItem.item.questionGroupItem = {
                    questions: item.extra.v.map(currQuestion => ({
                        "rowQuestion": {
                            title: currQuestion
                        },
                        required: question.required
                    })),
                    grid: {
                        columns: {
                            type: 'RADIO',
                            options: item.extra.cols.map(item => ({ value: item }))
                        }
                    }
                }
            }
        }

        if (item.type !== 'mcg') {
            createItem.item.questionItem = {
                question
            }
        }

        return {
            createItem
        };
    }));

    return data
}