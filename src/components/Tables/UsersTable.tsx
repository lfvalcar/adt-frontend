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
import { ChevronDownIcon } from "../../public/Icons/ChevronDownIcon";
import {capitalize} from "../../lib/utils";
import { IUser } from "@/interfaces/users.interface";
import { IColumn } from "@/interfaces/common.interface";
import { ModalFormUsersPost } from "../Modals/users/ModalFormUsersPost";
import { ModalFormUsersFilter } from "../Modals/users/ModalFormUsersFilter";
import { ModalFormUsersUpdate } from "../Modals/users/ModalFormUsersUpdate";
import { ModalConfirmDeleteUsers } from "../Modals/users/ModalConfirmDeleteUsers";

interface Props {
    rows: IUser[],
    columns: IColumn[]
  }

const INITIAL_VISIBLE_COLUMNS = ["uid", "ou", "cn", "mail","group","actions"];

export const UsersTable:FC<Props> = ({rows, columns}) => {
  type User = typeof rows[0];
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const selectedKeysArray = Array.from(selectedKeys);
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    direction: "ascending",
  });

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.key));
  }, [visibleColumns,columns]);

  const sortedItems = React.useMemo(() => {
    return [...rows].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as string;
      const second = b[sortDescriptor.column as keyof User] as string;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, rows]);

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
        case "actions":
            return (
              <ModalFormUsersUpdate uid={user.uid}/>
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
            <ModalFormUsersFilter/>
            <ModalFormUsersPost/>
            <ModalConfirmDeleteUsers selectedKeys={selectedKeysArray}/>
            <Button color="default" onClick={RefreshPage}>Refrescar Página</Button>
          </div>
        </div>
        <div className="space-x-4 flex">
          <span className="text-default-400 text-small">Total {rows.length} usuarios</span>
          <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "Todos los usuarios seleccionados"
            : `${selectedKeys.size} seleccionados`}
        </span>
        </div>
      </div>
    );
  }, [
    columns,
    selectedKeysArray,
    visibleColumns,
    rows.length,
    selectedKeys
  ]);

  return (
    <Table
      aria-label="Tabla usuarios"
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
            <TableRow key={item.uid}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
    </Table>
  );
}

export default UsersTable