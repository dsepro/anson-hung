
"use client";

import { useState, useEffect } from 'react';
import { AppHeader } from '@/components/layout/app-header';
import { LeftSidebar } from '@/components/dashboard/left-sidebar';
import { MainContentArea } from '@/components/dashboard/main-content-area';
import { RightSidebar } from '@/components/dashboard/right-sidebar';
import { AppFooter } from '@/components/layout/app-footer';
// import { useToast } from '@/hooks/use-toast'; // useToast currently unused
import { Loader2 } from 'lucide-react';
import { translations, type Translations, type Language } from '@/lib/translations';


export default function NutriTrackDashboardPage() {
  const [_isLoading, setIsLoading] = useState(false); 
  const [language, setLanguage] = useState<Language>('en');
  const currentTranslations = translations[language];

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'zh' : 'en');
  };

  if (!isClient) {
    // Display a consistent loading state that doesn't depend on `currentTranslations` yet
    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <p className="ml-4 text-base sm:text-lg text-primary">{translations.en.loadingText}</p> {/* Default to English for initial load */}
        </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <AppHeader
        currentLanguage={language}
        onToggleLanguage={toggleLanguage}
        userName={currentTranslations.userNameDisplay}
        translations={currentTranslations}
      />

      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <LeftSidebar translations={currentTranslations} />
        <MainContentArea translations={currentTranslations} language={language} />
        <RightSidebar translations={currentTranslations} />
      </div>

      <AppFooter translations={currentTranslations} />

    </div>
  );
}


    
