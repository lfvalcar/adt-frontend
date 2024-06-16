import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import React, { useState } from 'react'
import { getCookie } from '../../Cookies/Cookie';
import dataGroups from '@/data/dataGroups';
import { appConfig } from '@/config/appConfig';

export const ModalConfirmDeleteGroups = (selectedKeys: any) => {
  const [data, setData] = useState<any>();  
  
  for(let i in selectedKeys){
        var result = selectedKeys[i]
    }

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    
    const onDeleteGroups = async (selectedCns:any) => {
        const token = getCookie('token');
        if (token) {
          const result = await dataGroups.delete(selectedCns, token);
          if(result != undefined){
            if(result.status === 200){
              window.location.href = (`${appConfig.url}/dashboard/groups`);
            }
            setData(result)
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
                            <p>¡No has seleccionado ningún grupo!</p>
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
                            {data && data.statusCode && (<p>{data.message}</p>)}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                NO
                            </Button>
                        <Button color="primary" onClick={() => onDeleteGroups(selectedKeys)}>
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
