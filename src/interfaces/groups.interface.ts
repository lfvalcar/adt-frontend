import { IColumn } from "./common.interface";

export interface IGroup {
    dn: string;
    cn: string;
    ou: string;
    listMembers?: string;
    description?: string;
    [key: string]: string | number | undefined | null | bigint;
}

export interface IUpdateGroup {
    action: string;
    fields: string[];
}

export const ColumGroup:IColumn[] = [
    {
        key: "cn",
        label: "Nombre",
        sortable: true
    },
    {
        key: "ou",
        label: "Unidad Organizativa",
        sortable: true
    },
    {
        key: "listMembers",
        label: "Miembros",
        sortable: false
    },
    {
        key: "description",
        label: "Descripción",
        sortable: false
    },
    {
        key: "actions",
        label: "Acciones",
        sortable: false
    }
];

export default ColumGroup