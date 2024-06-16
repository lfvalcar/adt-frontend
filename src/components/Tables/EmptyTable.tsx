'use client'
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody
} from "@nextui-org/react";
import { ModalFormUsersPost } from "../Modals/users/ModalFormUsersPost";
import { ModalFormUsersFilter } from "../Modals/users/ModalFormUsersFilter";

export const EmptyTable = () => {
  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <div className="flex gap-3">
            <ModalFormUsersFilter/>
            <ModalFormUsersPost/>
          </div>
        </div>
        <div className="space-x-4 flex">
          <span className="text-default-400 text-small">Total 0 usuarios</span>
        </div>
      </div>
    );
  }, [
  ]);

  return (
    <Table
      aria-label="Tabla usuarios"
      bottomContentPlacement="outside"
      topContent={topContent}
      topContentPlacement="outside"
    >
      <TableHeader>
          <TableColumn>
            NO DATA
          </TableColumn>
      </TableHeader>
        <TableBody emptyContent={"Nada que mostrar"}>
          {[]}
        </TableBody>
    </Table>
  );
}

export default EmptyTable