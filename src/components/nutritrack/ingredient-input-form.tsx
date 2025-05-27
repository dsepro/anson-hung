"use client";

import { useState, type FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface IngredientInputFormProps {
  onAddIngredient: (ingredient: string) => void;
}

export function IngredientInputForm({ onAddIngredient }: IngredientInputFormProps) {
  const [ingredientName, setIngredientName] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ingredientName.trim()) {
      onAddIngredient(ingredientName.trim());
      setIngredientName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <Input
        type="text"
        placeholder="e.g., 1 cup of rice"
        value={ingredientName}
        onChange={(e) => setIngredientName(e.target.value)}
        className="flex-grow"
        aria-label="Ingredient Name"
      />
      <Button type="submit" variant="default" size="icon" aria-label="Add Ingredient">
        <PlusCircle />
      </Button>
    </form>
  );
}
