'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Heading } from '@/components/ui/heading';

export default function IngredientsPage() {
  const [open, setOpen] = useState(false);
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientDescription, setIngredientDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/ingredients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: ingredientName, description: ingredientDescription }),
      });

      if (response.ok) {
        // Reset form and close dialog
        setIngredientName('');
        setIngredientDescription('');
        setOpen(false);
      } else {
        console.error('Failed to create ingredient');
      }
    } catch (error) {
      console.error('Error creating ingredient:', error);
    }
  };

  return (
    <div className="p-6">
      <Heading title="Gerenciar Ingredientes" />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Adicionar Ingrediente</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Novo Ingrediente</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="ingredientName">Nome do Ingrediente</Label>
              <Input
                id="ingredientName"
                value={ingredientName}
                onChange={(e) => setIngredientName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="ingredientDescription">Descrição</Label>
              <Input
                id="ingredientDescription"
                value={ingredientDescription}
                onChange={(e) => setIngredientDescription(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Criar Ingrediente</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
} 