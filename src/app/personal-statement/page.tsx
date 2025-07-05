
// src/app/personal-statement/page.tsx
import Link from 'next/link';
import { translations } from '@/lib/translations'; 
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function PersonalStatementPage() {
  // Personal statement content and its titles are always displayed in English
  const statementContent = translations['en']; 
  const uiTranslations = translations[translations.en.language === 'en' ? 'en' : 'zh']; // For button text

  const whySection = { titleKey: 'personalStatementWhyTitle', bodyKey: 'personalStatementWhyBody' };
  
  const visionSectionTitle = statementContent.personalStatementExperienceTitle;

  const visionSubSections = [
    { titleKey: 'digitalHealthToolTitle', targetKey: 'digitalHealthToolTarget', bodyKey: 'digitalHealthToolBody' },
    { titleKey: 'communityNutritionTitle', targetKey: 'communityNutritionTarget', bodyKey: 'communityNutritionBody' },
    { titleKey: 'aiIntegrationTitle', targetKey: 'aiIntegrationTarget', bodyKey: 'aiIntegrationBody' },
  ] as const;

  const whyThisProgramSection = { titleKey: 'personalStatementReasonsTitle', bodyKey: 'personalStatementReasonsBody' };
  const conclusionSection = { titleKey: 'personalStatementConclusionTitle', bodyKey: 'personalStatementConclusionBody' };

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
      
      <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-6 text-center">
        {statementContent.personalStatementDialogTitle}
      </h1>

      <div className="space-y-6 text-foreground/90 leading-relaxed bg-card p-6 sm:p-8 rounded-lg shadow-lg">
        {/* Why Dietetics Section */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-3">
            {statementContent[whySection.titleKey]}
          </h2>
          {statementContent[whySection.bodyKey].split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-sm sm:text-base">
              {paragraph}
            </p>
          ))}
        </div>

        {/* My Career Vision Section */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-3">
            {visionSectionTitle}
          </h2>
          <div className="space-y-4">
            {visionSubSections.map(section => (
              <div key={section.titleKey}>
                <h3 className="text-lg font-semibold text-primary/90 mb-1">
                  {statementContent[section.titleKey]} 
                  <span className="text-sm font-normal text-muted-foreground ml-2">
                    {statementContent[section.targetKey]}
                  </span>
                </h3>
                {statementContent[section.bodyKey].split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-sm sm:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Why This Programme Section */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-3">
            {statementContent[whyThisProgramSection.titleKey]}
          </h2>
          {statementContent[whyThisProgramSection.bodyKey].split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-sm sm:text-base">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Conclusion Section */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-3">
            {statementContent[conclusionSection.titleKey]}
          </h2>
          {statementContent[conclusionSection.bodyKey].split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-sm sm:text-base">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
