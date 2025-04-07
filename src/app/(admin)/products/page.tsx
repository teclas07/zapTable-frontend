'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Heading } from '@/components/ui/heading';

export default function ProductsPage() {
  const [open, setOpen] = useState(false);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [ingredientIds, setIngredientIds] = useState<number[]>([]);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    }

    async function fetchIngredients() {
      const response = await fetch('/api/ingredients');
      const data = await response.json();
      setIngredients(data);
    }

    fetchCategories();
    fetchIngredients();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: productName, description: productDescription, categoryId, ingredientIds }),
      });

      if (response.ok) {
        // Reset form and close dialog
        setProductName('');
        setProductDescription('');
        setCategoryId(null);
        setIngredientIds([]);
        setOpen(false);
      } else {
        console.error('Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className="p-6">
      <Heading title="Gerenciar Produtos" />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Adicionar Produto</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Novo Produto</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="productName">Nome do Produto</Label>
              <Input
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="productDescription">Descrição</Label>
              <Input
                id="productDescription"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="categoryId">Categoria</Label>
              <select
                id="categoryId"
                value={categoryId || ''}
                onChange={(e) => setCategoryId(Number(e.target.value))}
                required
              >
                <option value="" disabled>Selecione uma categoria</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="ingredientIds">Ingredientes</Label>
              <select
                id="ingredientIds"
                multiple
                value={ingredientIds}
                onChange={(e) => {
                  const selectedOptions = Array.from(e.target.selectedOptions, option => Number(option.value));
                  setIngredientIds(selectedOptions);
                }}
              >
                {ingredients.map((ingredient) => (
                  <option key={ingredient.id} value={ingredient.id}>{ingredient.name}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Criar Produto</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
} 