import { IColumn } from "./common.interface";

export interface IOu {
    ou: string;
    description?: string;
    [key: string]: string | number | undefined | null | bigint;
}

export interface IUpdateOu {
    action: string;
    fields: string[];
}

export const ColumOu:IColumn[] = [
    {
        key: "ou",
        label: "Unidad Organizativa",
        sortable: true
    },
    {
        key: "description",
        label: "Descripción",
        sortable: false
    }
];

export default ColumOu