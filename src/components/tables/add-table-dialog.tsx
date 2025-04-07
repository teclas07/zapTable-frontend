'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export function AddTableDialog() {
  const [open, setOpen] = useState(false);
  const [tableNumber, setTableNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/tables', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          table_number: parseInt(tableNumber),
          restaurant_id: 1, // Você precisará passar o restaurant_id correto
        }),
      });

      if (response.ok) {
        const table = await response.json();
        setQrCode(`${window.location.origin}/table/${table.id}`);
      }
    } catch (error) {
      console.error('Erro ao criar mesa:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Mesa
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Nova Mesa</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="tableNumber">Número da Mesa</Label>
            <Input
              id="tableNumber"
              type="number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              placeholder="Digite o número da mesa"
              disabled={isLoading}
            />
          </div>
          {qrCode && (
            <div className="flex flex-col items-center gap-4">
              <QRCodeSVG value={qrCode} size={200} />
              <Button
                type="button"
                variant="outline"
                onClick={() => window.print()}
              >
                Imprimir QR Code
              </Button>
            </div>
          )}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading || !tableNumber}>
              {isLoading ? 'Criando...' : 'Criar Mesa'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 