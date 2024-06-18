import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import React from 'react'
import { getCookie } from '../../Cookies/Cookie';
import dataUsers from '@/data/dataUsers';
import { appConfig } from '@/config/appConfig';

export const ModalConfirmDeleteUsers = (selectedKeys: any) => {
    for(let i in selectedKeys){
        var result = selectedKeys[i]
    }

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    
    const onDeleteUsers = async (selectedUids:any) => {
        const token = getCookie('token');
        if (token) {
          const result = await dataUsers.delete(selectedUids, token);
          if(result != undefined){
            window.location.href = (`${appConfig.url}/dashboard/users`);
          }
        } else {
          window.location.href = (`${appConfig.url}/login`);
        }
    };
  
    return (
      <>
        <Button onPress={onOpen} color="danger">Borrar Entrada/s</Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="bottom-center" 
        >
          <ModalContent
          >
            {(onClose) => (
              <>                
                <ModalHeader className="flex flex-col gap-1">Advertencia</ModalHeader>
                {result.length === 0 && (
                    <>
                        <ModalBody>
                            <p>¡No has seleccionado ningún usuario!</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Volver
                            </Button>
                        </ModalFooter>
                    </>
                )}
                {result.length > 0 && (
                    <>
                        <ModalBody>
                            <p>¿Estás seguro de que sea continuar con esta operación?</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                NO
                            </Button>
                        <Button color="primary" onClick={() => onDeleteUsers(selectedKeys)}>
                            SÍ
                        </Button>
                        </ModalFooter>
                    </>
                )}
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
}
