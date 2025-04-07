'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Heading } from '@/components/ui/heading';

export default function MenusPage() {
  const [open, setOpen] = useState(false);
  const [menuName, setMenuName] = useState('');
  const [menuDescription, setMenuDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/menus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: menuName, description: menuDescription }),
      });

      if (response.ok) {
        // Reset form and close dialog
        setMenuName('');
        setMenuDescription('');
        setOpen(false);
      } else {
        console.error('Failed to create menu');
      }
    } catch (error) {
      console.error('Error creating menu:', error);
    }
  };

  return (
    <div className="p-6">
      <Heading title="Gerenciar Menus" />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Adicionar Menu</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Novo Menu</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="menuName">Nome do Menu</Label>
              <Input
                id="menuName"
                value={menuName}
                onChange={(e) => setMenuName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="menuDescription">Descrição</Label>
              <Input
                id="menuDescription"
                value={menuDescription}
                onChange={(e) => setMenuDescription(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Criar Menu</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
} 