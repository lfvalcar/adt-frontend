'use client'
import React from "react";
import InventoryView from "@/components/InventoryView";
import ColumInventory from "@/interfaces/inventory.interface";

export const InventoryPage = () => {

    return (
      <InventoryView fields={ColumInventory}/>
    );
}

export default InventoryPage

