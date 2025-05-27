
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  language: 'en' | 'zh';
  onLanguageChange: (lang: 'en' | 'zh') => void;
  className?: string;
}

export function LanguageSelector({ language, onLanguageChange, className }: LanguageSelectorProps) {
  return (
    <Select value={language} onValueChange={(value: 'en' | 'zh') => onLanguageChange(value)}>
      <SelectTrigger className={className ? className : "w-[110px] sm:w-[120px] text-sm h-9"}>
        <Globe className="mr-1.5 h-4 w-4 sm:mr-2" />
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="zh">中文</SelectItem>
      </SelectContent>
    </Select>
  );
}
