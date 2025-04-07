'use client';

import { useState } from 'react';
import { TablesHeader } from '@/components/tables/tables-header';
import { TablesGrid } from '@/components/tables/tables-grid';
import { AddTableDialog } from '@/components/tables/add-table-dialog';

export default function TablesPage() {
  const [restaurantName] = useState('Seu Restaurante');
  const businessId = '1'; // ID padrão ou você pode obter de um contexto global

  return (
    <div className="p-6">
      <TablesHeader businessId={businessId} />
      
      <div className="flex justify-end my-4">
        <AddTableDialog />
      </div>
      
      <div className="mt-4">
        <TablesGrid businessId={businessId} restaurantName={restaurantName} />
      </div>
    </div>
  );
} 