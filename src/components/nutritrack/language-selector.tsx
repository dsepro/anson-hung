
"use client";

import { Button } from "@/components/ui/button";
import { Globe } from 'lucide-react';
import type { Language, Translations } from '@/app/page';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onToggleLanguage: () => void;
  translations: Translations;
  className?: string;
}

export function LanguageSelector({ currentLanguage, onToggleLanguage, translations, className }: LanguageSelectorProps) {
  const buttonText = currentLanguage === 'en' ? translations.switchToChineseButtonText : translations.switchToEnglishButtonText;

  return (
    <Button
      variant="outline"
      onClick={onToggleLanguage}
      className={className ? className : "w-auto min-w-[100px] sm:min-w-[110px] text-sm h-9 px-3"}
      aria-label={currentLanguage === 'en' ? "Switch to Traditional Chinese" : "Switch to English"}
    >
      <Globe className="mr-1.5 h-4 w-4 sm:mr-2" />
      {buttonText}
    </Button>
  );
}

    