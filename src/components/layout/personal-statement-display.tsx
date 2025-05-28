
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Translations } from "@/app/page";

interface PersonalStatementDisplayProps {
  isOpen: boolean;
  onClose: () => void;
  translations: Translations;
}

export function PersonalStatementDisplay({ isOpen, onClose, translations }: PersonalStatementDisplayProps) {
  if (!isOpen) {
    return null;
  }

  const statementSections = [
    { titleKey: 'personalStatementWhyTitle', bodyKey: 'personalStatementWhyBody' },
    { titleKey: 'personalStatementExperienceTitle', bodyKey: 'personalStatementExperienceBody' },
    { titleKey: 'personalStatementGoalsTitle', bodyKey: 'personalStatementGoalsBody' },
    { titleKey: 'personalStatementReasonsTitle', bodyKey: 'personalStatementReasonsBody' },
    { titleKey: 'personalStatementConclusionTitle', bodyKey: 'personalStatementConclusionBody' },
  ] as const;


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            {translations.personalStatementDialogTitle}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow"> {/* ScrollArea will take available vertical space */}
          <div className="space-y-6 py-4 px-2 sm:px-4 text-foreground/90 leading-relaxed"> {/* Added horizontal padding to content */}
            {statementSections.map(section => (
              <div key={section.titleKey}>
                <h2 className="text-lg font-semibold text-primary mb-2">
                  {translations[section.titleKey]}
                </h2>
                {/* For the body, translations[section.bodyKey] will correctly pick up English text 
                    even if UI language is Chinese, due to setup in page.tsx translations.zh object */}
                {translations[section.bodyKey].split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-3 text-sm sm:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
             <div>
                <p className="mb-3 text-sm sm:text-base italic">
                    {translations.personalStatementThanks}
                </p>
             </div>
          </div>
        </ScrollArea>
        <DialogFooter className="mt-auto pt-4 border-t"> {/* Ensure footer is at the bottom */}
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={onClose}>
              {translations.closeButtonText}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

    