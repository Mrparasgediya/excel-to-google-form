import { IFormItem } from "types/file";
import { readWorksheet } from "./file";

export const getRequestForForm = (testData: IFormItem[]) => {
    return (testData.map((item, idx) => {
        const question: { [key: string]: any } = {
            // check is field is required or not
            required: item.extra && item.extra.hasOwnProperty('required')
        }
        if (item.type === 'd') {
            question['dateQuestion'] = {
                includeYear: true
            }
        }

        if (item.type === 'n' || item.type === 's') {
            question['textQuestion'] = {}
        }

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

        return {
            createItem: {
                item: {
                    title: item.title,
                    questionItem: {
                        question
                    }
                },
                location: {
                    index: idx
                }
            }
        };
    }));
}