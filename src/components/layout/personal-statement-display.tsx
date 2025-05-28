
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
      <DialogContent className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-2xl font-bold text-primary">
            {translations.personalStatementDialogTitle}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow min-h-0 h-0"> {/* Added h-0 */}
          <div className="space-y-6 py-4 px-2 sm:px-4 text-foreground/90 leading-relaxed">
            {statementSections.map(section => (
              <div key={section.titleKey}>
                <h2 className="text-lg font-semibold text-primary mb-2">
                  {translations[section.titleKey]}
                </h2>
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
        <DialogFooter className="mt-auto pt-4 border-t flex-shrink-0"> {/* Added flex-shrink-0 */}
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

