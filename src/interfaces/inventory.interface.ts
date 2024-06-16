import { IColumn } from "./common.interface";

export interface Iventory {
    computerName: string;
    osVersion: string;
    operatingSystem: string;
    totalPhysicalMemoryGB: number;
    processorCores: number;
    processorModel: string;
    processorArchitecture: number;
    processorThreads: number;
    processorClockSpeedGHz: number;
    ipAddress: string;
    macAddress: string;
    networkAdapterDescription?: string;
    freeDiskSpaceGB: number;
    usedDiskSpaceGB: number;
    diskModel: string;
    totalDiskSpaceGB: number;
    [key: string]: string | number | undefined | null | bigint;
}

export const ColumInventory:IColumn[] = [
    {
        key: "computerName",
        label: "Nombre Equipo",
        sortable: false
    },
    {
        key: "osVersion",
        label: "Versión Sistema Operativo",
        sortable: false
    },
    {
        key: "operatingSystem",
        label: "Sistema Operativo",
        sortable: false
    },
    {
        key: "totalPhysicalMemoryGB",
        label: "Total Memoria RAM (GB)",
        sortable: false
    },
    {
        key: "processorCores",
        label: "Nº Núcleos del procesador",
        sortable: false
    },
    {
        key: "processorModel",
        label: "Modelo Procesador",
        sortable: false
    },
    {
        key: "processorArchitecture",
        label: "Arquitectura Procesador (bits)",
        sortable: false
    },
    {
        key: "processorThreads",
        label: "Nº Hilos del Procesador",
        sortable: false
    },
    {
        key: "processorClockSpeedGHz",
        label: "Velocidad del Reloj del Procesador (GHz)",
        sortable: false
    },
    {
        key: "ipAddress",
        label: "Dirección IP",
        sortable: false
    },
    {
        key: "macAddress",
        label: "Dirección MAC",
        sortable: false
    },
    {
        key: "networkAdapterDescription",
        label: "Descripción del Adaptador de Red",
        sortable: false
    },
    {
        key: "freeDiskSpaceGB",
        label: "Espacio Libre del Disco (GB)",
        sortable: false
    },
    {
        key: "usedDiskSpaceGB",
        label: "Espacio Utilizado del Disco (GB)",
        sortable: false
    },
    {
        key: "diskModel",
        label: "Modelo del Disco",
        sortable: false
    },
    {
        key: "totalDiskSpaceGB",
        label: "Total Espacio del Disco (GB)",
        sortable: false
    },
];

export default ColumInventory