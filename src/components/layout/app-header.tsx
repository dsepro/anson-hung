
"use client";
import Link from 'next/link';
import { Leaf, ChevronDown, Edit3, User } from 'lucide-react'; // Added User
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar'; // Removed AvatarImage, AvatarFallback
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Translations, Language } from '@/app/page';

interface AppHeaderProps {
  currentLanguage: Language;
  onToggleLanguage: () => void;
  userName: string;
  // userAvatar?: string; // No longer used for display
  translations: Translations;
}

export function AppHeader({
  currentLanguage,
  onToggleLanguage,
  userName,
  // userAvatar, // No longer used
  translations
}: AppHeaderProps) {
  // const userInitials = userName // Not needed if icon is always shown
  //   .split(' ')
  //   .map(n => n[0])
  //   .join('')
  //   .toUpperCase();

  const openPersonalStatement = () => {
    window.open('/personal-statement', '_blank');
  };

  const buttonText = currentLanguage === 'en' ? translations.switchToChineseButtonText : translations.switchToEnglishButtonText;


  return (
    <header className="bg-card shadow-sm sticky top-0 z-40 h-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-primary">
          <Leaf className="h-7 w-7" />
          <span>{translations.nutriTrackTitle}</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            onClick={onToggleLanguage}
            className="h-9 text-xs sm:text-sm px-2 sm:px-3 w-auto min-w-[100px] sm:min-w-[110px]"
            aria-label={currentLanguage === 'en' ? "Switch to Traditional Chinese" : "Switch to English"}
          >
            {buttonText}
          </Button>
          <Button
            variant="outline"
            onClick={openPersonalStatement}
            className="h-9 text-xs sm:text-sm px-2 sm:px-3"
            aria-label={translations.readPersonalStatement}
          >
            <Edit3 className="mr-1.5 h-4 w-4" />
            {translations.readPersonalStatement}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 h-10 px-2">
                <Avatar className="h-8 w-8 bg-muted text-muted-foreground flex items-center justify-center" data-ai-hint="profile avatar">
                   <User className="h-5 w-5" />
                </Avatar>
                <span className="hidden sm:inline text-sm font-medium">{userName}</span>
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
