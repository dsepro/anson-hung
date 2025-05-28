
"use client";
import Link from 'next/link';
import { Leaf, ChevronDown, Edit3, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Translations, Language } from '@/lib/translations';

interface AppHeaderProps {
  currentLanguage: Language;
  onToggleLanguage: () => void;
  userName: string;
  translations: Translations;
}

export function AppHeader({
  currentLanguage,
  onToggleLanguage,
  userName,
  translations
}: AppHeaderProps) {

  const openPersonalStatementInNewWindow = () => {
    window.open('/personal-statement', '_blank');
  };

  const buttonText = currentLanguage === 'en' ? translations.switchToChineseButtonText : translations.switchToEnglishButtonText;

  return (
    <header className="bg-card shadow-sm sticky top-0 z-40 py-3">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary mb-2 sm:mb-0">
          <Leaf className="h-6 w-6 sm:h-7 sm:w-7" />
          <span className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl whitespace-nowrap">
            {translations.nutriTrackTitle}
          </span>
        </Link>

        <div className="flex flex-col items-stretch w-full sm:w-auto sm:flex-row sm:items-center gap-3 mt-3 sm:mt-0">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button
              variant="outline"
              onClick={onToggleLanguage}
              className="h-9 text-xs sm:text-sm px-2 sm:px-3 w-full sm:w-auto min-w-[100px] sm:min-w-[110px]"
              aria-label={currentLanguage === 'en' ? "Switch to Traditional Chinese" : "Switch to English"}
            >
              {buttonText}
            </Button>
            <Button
              variant="outline"
              onClick={openPersonalStatementInNewWindow}
              className="h-9 text-xs sm:text-sm px-2 sm:px-3 w-full sm:w-auto"
              aria-label={translations.readPersonalStatement}
            >
              <Edit3 className="mr-1.5 h-4 w-4" />
              {translations.readPersonalStatement}
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 h-10 px-2 w-full sm:w-auto justify-center sm:justify-start">
                <Avatar className="h-8 w-8 bg-primary text-primary-foreground flex items-center justify-center" data-ai-hint="profile avatar user">
                   <User className="h-5 w-5" />
                </Avatar>
                <span className="inline text-sm font-medium">{userName}</span>
                <ChevronDown className="h-4 w-4 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{translations.myAccount}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{translations.profile}</DropdownMenuItem>
              <DropdownMenuItem>{translations.settings}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{translations.logOut}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
