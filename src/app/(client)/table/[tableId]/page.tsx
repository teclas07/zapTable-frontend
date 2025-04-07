'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Menu } from '@/types';

export default function TablePage() {
  const searchParams = useSearchParams();
  const table = searchParams.get('table');
  const [menus, setMenus] = useState<Menu[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMenus() {
      if (!table) return;
      
      try {
        const response = await fetch(`/api/restaurants/${table}/menus`);
        if (!response.ok) throw new Error('Falha ao carregar menus');
        
        const data = await response.json();
        setMenus(data.filter((menu: Menu) => menu.active));
      } catch (error) {
        console.error('Error fetching menus:', error);
        setError('Não foi possível carregar os menus disponíveis');
      } finally {
        setIsLoading(false);
      }
    }

    fetchMenus();
  }, [table]);

  // Função auxiliar para renderizar o conteúdo com base no estado
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      );
    }
    
    if (error) {
      return (
        <Card className="p-6 text-center bg-red-50">
          <p className="text-red-600">{error}</p>
        </Card>
      );
    }
    
    return (
      <AnimatePresence>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menus.map((menu, index) => (
            <motion.div
              key={menu.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="h-full"
            >
              <Card className="h-full flex flex-col">
                {menu.photo && (
                  <div className="w-full h-48 relative overflow-hidden rounded-t-lg">
                    <Image
                      src={menu.photo}
                      alt={menu.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                )}
                <CardHeader>
                  <h2 className="text-xl font-semibold">{menu.name}</h2>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{menu.description}</p>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => window.location.href = `/menu/${menu.id}?table=${table}`}
                  >
                    Ver Menu
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    );
  };

  if (!table) {
    return (
      <Card className="p-6 text-center">
        <h2 className="text-xl font-bold mb-4">Erro ao identificar a mesa</h2>
        <p className="text-gray-600 mb-4">Certifique-se de que está a escanear um QR Code válido.</p>
      </Card>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Mesa {table}</h1>
        {renderContent()}
      </div>
    </div>
  );
} 