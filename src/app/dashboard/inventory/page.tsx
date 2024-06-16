'use client'
import React from "react";
import InventoryView from "@/components/InventoryView";
import ColumInventory from "@/interfaces/inventory.interface";

const InventoryPage = () => {

    return (
      <InventoryView fields={ColumInventory} entry={null}/>
    );
}

export default InventoryPage

