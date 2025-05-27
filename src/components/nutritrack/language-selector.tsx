
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from 'lucide-react';
import type { Language } from '@/app/page';

interface LanguageSelectorProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  className?: string;
}

export function LanguageSelector({ language, onLanguageChange, className }: LanguageSelectorProps) {
  return (
    <Select value={language} onValueChange={(value: Language) => onLanguageChange(value)}>
      <SelectTrigger className={className ? className : "w-auto min-w-[120px] sm:min-w-[130px] text-sm h-9"}>
        <Globe className="mr-1.5 h-4 w-4 sm:mr-2" />
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="zh">繁體中文</SelectItem>
      </SelectContent>
    </Select>
  );
}
