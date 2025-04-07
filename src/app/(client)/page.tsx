'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function HomePage() {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async () => {
    setIsScanning(true);
    // Simular leitura do QR code
    setTimeout(() => {
      router.push('/table/1?table=1');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Card className="p-6 text-center w-[350px]">
        <h2 className="text-xl font-bold mb-4">Bem-vindo ao Restaurante</h2>
        <p className="text-gray-600 mb-6">
          Escaneie o QR code da sua mesa para começar seu pedido
        </p>
        <Button 
          onClick={handleScan}
          disabled={isScanning}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          {isScanning ? 'Escaneando...' : 'Escanear QR Code'}
        </Button>
      </Card>
    </div>
  );
} 