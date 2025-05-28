
"use client";

import type { Translations } from '@/lib/translations'; // Updated import

interface AppFooterProps {
  translations: Translations;
}

export function AppFooter({ translations }: AppFooterProps) {
  return (
    <footer className="bg-card shadow-sm py-4 mt-auto border-t border-border/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs text-muted-foreground whitespace-pre-line">
          {translations.footerCredit}
        </p>
      </div>
    </footer>
  );
}


    