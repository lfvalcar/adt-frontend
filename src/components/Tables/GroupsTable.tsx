'use client'
import React, { FC } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Selection,
  SortDescriptor
} from "@nextui-org/react";
import { ChevronDownIcon } from "@/public/Icons/ChevronDownIcon";
import {capitalize} from "@/lib/utils";
import { IGroup } from "@/interfaces/groups.interface";
import { IColumn } from "@/interfaces/common.interface";
import { ModalFormGroupsFilter } from "../Modals/groups/ModalFormGroupsFilter";
import { ModalFormGroupsPost } from "../Modals/groups/ModalFormGroupsPost";
import { ModalFormUsersUpdate } from "../Modals/groups/ModalFormGroupsUpdate";
import { ModalConfirmDeleteGroups } from "../Modals/groups/ModalConfirmDeleteGroups";

interface Props {
    rows: IGroup[],
    columns: IColumn[]
  }

const INITIAL_VISIBLE_COLUMNS = ["cn", "ou", "description"];

export const GroupsTable:FC<Props> = ({rows, columns}) => {
  type Group = typeof rows[0];
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const selectedKeysArray = Array.from(selectedKeys);
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.key));
  }, [visibleColumns,columns]);

  const sortedItems = React.useMemo(() => {
    return [...rows].sort((a: Group, b: Group) => {
      const first = a[sortDescriptor.column as keyof Group] as string;
      const second = b[sortDescriptor.column as keyof Group] as string;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, rows]);

  const renderCell = React.useCallback((group: Group, columnKey: React.Key) => {
    
    const regex = /ou=([^,]+)/; // Expresión regular para capturar el valor después de "ou="
    const match = group.dn.match(regex);
    if(match?.length === 2){
      group.ou = match[1];
    }

    const cellValue = group[columnKey as keyof Group];

    switch (columnKey) {
        case "actions":
            return (
              <ModalFormUsersUpdate group={group.cn}/>
            );
      default:
        return cellValue;
    }
  }, []);

  const RefreshPage = () => {
    window.location.reload();
  }

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Columnas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.key} className="capitalize">
                    {capitalize(column.label)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <ModalFormGroupsFilter/>
            <ModalFormGroupsPost/>
            <ModalConfirmDeleteGroups selectedKeys={selectedKeysArray}/>
            <Button color="default" onClick={RefreshPage}>Refrescar Página</Button>
          </div>
        </div>
        <div className="space-x-4 flex">
          <span className="text-default-400 text-small">Total {rows.length} grupos</span>
          <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "Todos los grupos seleccionados"
            : `${selectedKeys.size} seleccionados`}
        </span>
        </div>
      </div>
    );
  }, [
    selectedKeysArray,
    columns,
    visibleColumns,
    rows.length,
    selectedKeys,
    rows.length,
    page
  ]);

  return (
    <Table
      aria-label="Tabla grupos"
      isHeaderSticky
      bottomContentPlacement="outside"
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.key}
            align={column.key === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
        <TableBody items={sortedItems}>
          {(item) => (
            <TableRow key={item.cn}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
    </Table>
  );
}

export default GroupsTable