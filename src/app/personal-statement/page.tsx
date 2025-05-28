
// src/app/personal-statement/page.tsx
import Link from 'next/link';
import { translations } from '@/lib/translations'; 
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function PersonalStatementPage() {
  // Personal statement content and its titles are always displayed in English
  const statementContent = translations['en']; 
  const uiTranslations = translations[translations.en.language === 'en' ? 'en' : 'zh']; // For button text

  const statementSections = [
    { titleKey: 'personalStatementWhyTitle', bodyKey: 'personalStatementWhyBody' },
    { titleKey: 'personalStatementExperienceTitle', bodyKey: 'personalStatementExperienceBody' },
    { titleKey: 'personalStatementGoalsTitle', bodyKey: 'personalStatementGoalsBody' },
    { titleKey: 'personalStatementReasonsTitle', bodyKey: 'personalStatementReasonsBody' },
    { titleKey: 'personalStatementConclusionTitle', bodyKey: 'personalStatementConclusionBody' },
  ] as const; 

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-3xl">
      <div className="mb-6">
        <Button asChild variant="outline" size="sm">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {uiTranslations.returnToAppButtonText || translations.en.returnToAppButtonText}
          </Link>
        </Button>
      </div>
      
      <div className="space-y-6 text-foreground/90 leading-relaxed bg-card p-6 sm:p-8 rounded-lg shadow-lg">
        {statementSections.map(section => (
          <div key={section.titleKey}>
            <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-3">
              {statementContent[section.titleKey]}
            </h2>
            {statementContent[section.bodyKey].split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-sm sm:text-base">
                {paragraph}
              </p>
            ))}
          </div>
        ))}
        <div>
          <p className="mt-6 mb-3 text-sm sm:text-base italic">
            {statementContent.personalStatementThanks}
          </p>
        </div>
      </div>
    </div>
  );
}
