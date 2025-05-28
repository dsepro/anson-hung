
// src/app/personal-statement/page.tsx
import { translations } from '@/app/page'; // Import translations from the main page
import { ScrollArea } from "@/components/ui/scroll-area"; // For potential future use if content becomes very long

export default function PersonalStatementPage() {
  // Personal statement content and its titles are always displayed in English
  // The main page title for this route ("Personal Statement") comes from metadata in layout.tsx
  const statementContent = translations['en']; 

  const statementSections = [
    { titleKey: 'personalStatementWhyTitle', bodyKey: 'personalStatementWhyBody' },
    { titleKey: 'personalStatementExperienceTitle', bodyKey: 'personalStatementExperienceBody' },
    { titleKey: 'personalStatementGoalsTitle', bodyKey: 'personalStatementGoalsBody' },
    { titleKey: 'personalStatementReasonsTitle', bodyKey: 'personalStatementReasonsBody' },
    { titleKey: 'personalStatementConclusionTitle', bodyKey: 'personalStatementConclusionBody' },
  ] as const; // Use 'as const' for better type inference on keys

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-3xl">
      {/* The H1 title for the page itself is "Personal Statement", set in layout metadata */}
      {/* If a dynamic title was needed here from translations, it would be:
          <h1 className="text-3xl font-bold text-primary mb-8 text-center">
            {statementContent.personalStatementDialogTitle}
          </h1> 
      */}
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
