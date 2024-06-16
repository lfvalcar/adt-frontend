'use client'
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tooltip } from "@nextui-org/react";
import EditIcon from "@/public/Icons/EditIcon";
import ModalTabsOus from "@/components/Tabs/ModalTabsOus";

export const ModalFormOusUpdate = (ou: any) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="relative flex items-center gap-2">
        <Tooltip content="Editar Unidad Organizativa">
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <Button radius="sm" size="sm" onPress={onOpen} endContent={<EditIcon/>}/>
          </span>
        </Tooltip>
      </div>
      <Modal
        size='xl'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="bottom-center" 
      >
        <ModalContent
        >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Actualizar registro</ModalHeader>
              <ModalBody>
                <ModalTabsOus ou={ou}/>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}