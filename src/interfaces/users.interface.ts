import { IColumn } from "./common.interface";

export interface IUser {
    uid: string;
    ou: string; 
    givenName: string;
    sn: string;
    cn: string;
    userPassword?: string;
    mail: string;
    mobile: string;
    st: string;
    title: string;
    l: string;
    group?: string;
    telephoneNumber?: string;
    description?: string;
    [key: string]: string | number | undefined | null | bigint;
}

export interface IUpdateUser {
    action: string;
    fields: string[];
}

export const ColumUser:IColumn[] = [
    {
        key: "uid",
        label: "Identificador",
        sortable: true
    },
    {
        key: "ou",
        label: "Unidad Organizativa",
        sortable: true
    },
    {
        key: "givenName",
        label: "Nombre",
        sortable: true
    },
    {
        key: "sn",
        label: "Segundo Nombre",
        sortable: true
    },
    {
        key: "cn",
        label: "Nombre Completo",
        sortable: true
    },
    {
        key: "mail",
        label: "Correo Electrónico",
        sortable: true
    },
    {
        key: "mobile",
        label: "Teléfono Personal",
        sortable: false
    },
    {
        key: "st",
        label: "Estado/Provincia",
        sortable: true
    },
    {
        key: "title",
        label: "Título/Cargo",
        sortable: true
    },
    {
        key: "l",
        label: "Localidad",
        sortable: true
    },
    {
        key: "telephoneNumber",
        label: "Teléfono Trabajo",
        sortable: true
    },
    {
        key: "group",
        label: "Grupo",
        sortable: true
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

export default ColumUser