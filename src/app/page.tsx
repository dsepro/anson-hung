
"use client";

import { useState, useEffect } from 'react';
import { AppHeader } from '@/components/layout/app-header';
import { LeftSidebar } from '@/components/dashboard/left-sidebar';
import { MainContentArea } from '@/components/dashboard/main-content-area';
import { RightSidebar } from '@/components/dashboard/right-sidebar';
import { AppFooter } from '@/components/layout/app-footer';
import { PersonalStatementDisplay } from '@/components/layout/personal-statement-display'; // New import
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export const translations = {
  en: {
    loadingText: "Loading Dashboard...",
    // AppHeader
    nutriTrackTitle: "NutriTrack",
    myAccount: "My Account",
    profile: "Profile",
    settings: "Settings",
    logOut: "Log out",
    switchToChineseButtonText: "繁體中文",
    readPersonalStatement: "Read My Personal Statement Here",
    // Personal Statement
    personalStatementDialogTitle: "Personal Statement",
    personalStatementWhyTitle: "Why I would like to become a dietitian",
    personalStatementWhyBody: "Eating is something we do every day, yet food is far more than fuel—it's a fundamental component of well-being, a preventive measure against chronic diseases, and a gateway to better quality of life. By helping people make informed food choices, we can improve their wellbeing. In Hong Kong, the aging population poses a significant public health challenge, making effective nutrition strategies essential. As the demand for dietitians grows, I am eager to join this field, aiming to enhance health outcomes for individuals of all ages and support the community in making better dietary choices.",
    personalStatementExperienceTitle: "Relevant experience and strength",
    personalStatementExperienceBody: "My past work and volunteer experience at hospitals and community centers has given me a deep understanding of the role of a dietitian in both clinical and community settings. Through these experiences, I have learned how dietitians assess nutritional needs, develop tailored plans, and support individuals in making healthier choices. This hands-on exposure has solidified my commitment to this profession.\nI possess a diverse set of relevant skills and strengths that are essential for becoming a dietitian. My strong communication skills enable me to convey complex nutritional information clearly and effectively, ensuring that patients understand their dietary needs and recommendations. I also excel in active listening, which allows me to truly understand patients’ concerns and preferences.",
    personalStatementGoalsTitle: "My career goals",
    personalStatementGoalsBody: "I am passionate about working on the front lines of healthcare to provide tailored dietary guidance that empowers individuals to make informed and sustainable changes. My goal is to offer patient-centered nutrition plans that consider each patient's medical condition, lifestyle, and cultural context. I also aim to take part in primary intervention strategies that reduce the incidence of preventable diseases through early nutritional support and public education. I am eager to develop outreach programs that promote food literacy, healthy eating habits, and community wellness. Moreover, I am enthusiastic about the growing role of digital health tools and artificial intelligence in dietetics. From personalized meal planning apps to predictive analytics for nutritional risk assessment, I see tremendous potential for technology to enhance care delivery.",
    personalStatementReasonsTitle: "Reasons for applying for this course",
    personalStatementReasonsBody: "I am drawn to this program for its excellent reputation in the field, as well as its emphasis on both academic and practical training. The opportunity to engage in a full-time placement in a hospital is particularly appealing. Training in local settings will benefit my long-term goal of practicing in Hong Kong by helping me understand the regional healthcare systems, patient expectations, and food cultures. This knowledge will enable me to provide more relevant and effective care in the future. Moreover, the part-time structure of the first year aligns well with my current professional commitments and gives me the flexibility to remain active in the field while deepening my academic knowledge.",
    personalStatementConclusionTitle: "Conclusion",
    personalStatementConclusionBody: "With my strong background in nutrition and a clear vision for the future, I believe I am well-suited for this program. I am eager to learn from the professionals at HKUSPACE and integrate their insights to promote better health and well-being in our communities.",
    personalStatementThanks: "Thank you for considering my application. I look forward to discussing my application and aspirations in more detail during an interview.",
    closeButtonText: "Close",
    // LeftSidebar
    chatWithDietitian: "Chat with Dietitian",
    userConditionExample: "Type 2 Diabetes, Hypertension",
    // DailyGoalsCard
    dailyGoalsTitle: "Daily Goals",
    calories: "Calories",
    protein: "Protein",
    carbs: "Carbs",
    fat: "Fat",
    sodium: "Sodium",
    // DietitianRecommendationsCard
    dietitianRecommendationsTitle: "Dietitian Recommendations",
    // MainContentArea
    // TodaysMealsSection
    todaysMealsTitle: "Today's Meals",
    addFood: "Add Food",
    breakfast: "Breakfast",
    lunch: "Lunch",
    dinner: "Dinner",
    snacks: "Snacks",
    kcalUnit: "kcal",
    noMealsLogged: "No {mealType} logged yet.",
    // QuickAddFoodSection
    quickAddFoodTitle: "Quick Add Food",
    oatmeal: "Oatmeal",
    salad: "Salad",
    apple: "Apple",
    milk: "Milk",
    more: "More",
    takePhoto: "Take Photo",
    scanBarcode: "Scan Barcode",
    // NutritionSummarySection
    nutritionSummaryTitle: "Nutrition Summary",
    nutritionSummaryPlaceholder: "Detailed nutrition summary chart will be displayed here.",
    // RightSidebar
    // MealPlanningCard
    mealPlanningTitle: "Meal Planning",
    weeklyPlanTab: "Weekly Plan",
    recipesTab: "Recipes",
    weekOf: "Week of {date}",
    viewAll: "View All",
    createMealPlan: "Create Meal Plan",
    yourRecipes: "Your Recipes",
    addNewRecipe: "Add New Recipe",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    // HealthMetricsCard
    healthMetricsTitle: "Health Metrics",
    bloodGlucose: "Blood Glucose",
    bloodPressure: "Blood Pressure",
    weight: "Weight",
    statusSlightlyHigh: "Slightly High",
    statusNormal: "Normal",
    statusValueWithUnit: "{value} {unit}",
    statusValueOnly: "{value}",
    timeToday: "Today",
    timeYesterday: "Yesterday",
    // Language Selector (Now button)
    language: "Language", // Retained for consistency, though UI element changes
    // Footer
    footerCredit: "This demo webpage was created and designed by Anson Hung for the application to Postgraduate Diploma in Human Nutrition and Postgraduate Diploma in Dietetics.",
  },
  zh: {
    loadingText: "正在載入儀表板...",
    // AppHeader
    nutriTrackTitle: "營養追蹤",
    myAccount: "我的帳戶",
    profile: "個人資料",
    settings: "設定",
    logOut: "登出",
    switchToEnglishButtonText: "English",
    readPersonalStatement: "請在此瀏覽我的個人自述",
    // Personal Statement (Using English text as placeholder for body content)
    personalStatementDialogTitle: "個人自述",
    personalStatementWhyTitle: "為何我想成為一名營養師",
    personalStatementWhyBody: "Eating is something we do every day, yet food is far more than fuel—it's a fundamental component of well-being, a preventive measure against chronic diseases, and a gateway to better quality of life. By helping people make informed food choices, we can improve their wellbeing. In Hong Kong, the aging population poses a significant public health challenge, making effective nutrition strategies essential. As the demand for dietitians grows, I am eager to join this field, aiming to enhance health outcomes for individuals of all ages and support the community in making better dietary choices.",
    personalStatementExperienceTitle: "相關經驗與能力",
    personalStatementExperienceBody: "My past work and volunteer experience at hospitals and community centers has given me a deep understanding of the role of a dietitian in both clinical and community settings. Through these experiences, I have learned how dietitians assess nutritional needs, develop tailored plans, and support individuals in making healthier choices. This hands-on exposure has solidified my commitment to this profession.\nI possess a diverse set of relevant skills and strengths that are essential for becoming a dietitian. My strong communication skills enable me to convey complex nutritional information clearly and effectively, ensuring that patients understand their dietary needs and recommendations. I also excel in active listening, which allows me to truly understand patients’ concerns and preferences.",
    personalStatementGoalsTitle: "我的職業目標",
    personalStatementGoalsBody: "I am passionate about working on the front lines of healthcare to provide tailored dietary guidance that empowers individuals to make informed and sustainable changes. My goal is to offer patient-centered nutrition plans that consider each patient's medical condition, lifestyle, and cultural context. I also aim to take part in primary intervention strategies that reduce the incidence of preventable diseases through early nutritional support and public education. I am eager to develop outreach programs that promote food literacy, healthy eating habits, and community wellness. Moreover, I am enthusiastic about the growing role of digital health tools and artificial intelligence in dietetics. From personalized meal planning apps to predictive analytics for nutritional risk assessment, I see tremendous potential for technology to enhance care delivery.",
    personalStatementReasonsTitle: "申請此課程的原因",
    personalStatementReasonsBody: "I am drawn to this program for its excellent reputation in the field, as well as its emphasis on both academic and practical training. The opportunity to engage in a full-time placement in a hospital is particularly appealing. Training in local settings will benefit my long-term goal of practicing in Hong Kong by helping me understand the regional healthcare systems, patient expectations, and food cultures. This knowledge will enable me to provide more relevant and effective care in the future. Moreover, the part-time structure of the first year aligns well with my current professional commitments and gives me the flexibility to remain active in the field while deepening my academic knowledge.",
    personalStatementConclusionTitle: "結論",
    personalStatementConclusionBody: "With my strong background in nutrition and a clear vision for the future, I believe I am well-suited for this program. I am eager to learn from the professionals at HKUSPACE and integrate their insights to promote better health and well-being in our communities.",
    personalStatementThanks: "感謝您考慮我的申請。我期待在面試中更詳細地討論我的申請和期望。",
    closeButtonText: "關閉",
    // LeftSidebar
    chatWithDietitian: "與營養師聊天",
    userConditionExample: "二型糖尿病，高血壓",
    // DailyGoalsCard
    dailyGoalsTitle: "每日目標",
    calories: "卡路里",
    protein: "蛋白質",
    carbs: "碳水化合物",
    fat: "脂肪",
    sodium: "鈉",
    // DietitianRecommendationsCard
    dietitianRecommendationsTitle: "營養師建議",
    // MainContentArea
    // TodaysMealsSection
    todaysMealsTitle: "今日膳食",
    addFood: "新增食物",
    breakfast: "早餐",
    lunch: "午餐",
    dinner: "晚餐",
    snacks: "零食",
    kcalUnit: "千卡",
    noMealsLogged: "{mealType}尚未記錄。",
    // QuickAddFoodSection
    quickAddFoodTitle: "快速新增食物",
    oatmeal: "燕麥片",
    salad: "沙拉",
    apple: "蘋果",
    milk: "牛奶",
    more: "更多",
    takePhoto: "拍照新增",
    scanBarcode: "掃描條碼",
    // NutritionSummarySection
    nutritionSummaryTitle: "營養總結",
    nutritionSummaryPlaceholder: "詳細的營養總結圖表將在此處顯示。",
    // RightSidebar
    // MealPlanningCard
    mealPlanningTitle: "膳食計劃",
    weeklyPlanTab: "週計劃",
    recipesTab: "食譜",
    weekOf: "{date}週",
    viewAll: "查看全部",
    createMealPlan: "建立膳食計劃",
    yourRecipes: "您的食譜",
    addNewRecipe: "新增食譜",
    monday: "星期一",
    tuesday: "星期二",
    wednesday: "星期三",
    // HealthMetricsCard
    healthMetricsTitle: "健康指標",
    bloodGlucose: "血糖",
    bloodPressure: "血壓",
    weight: "體重",
    statusSlightlyHigh: "略高",
    statusNormal: "正常",
    statusValueWithUnit: "{value} {unit}",
    statusValueOnly: "{value}",
    timeToday: "今天",
    timeYesterday: "昨天",
    // Language Selector (Now button)
    language: "語言",
    // Footer
    footerCredit: "此示範用網頁由洪鉉鈴製作和設計 供報考人類營養學深造文憑/營養治療學深造文憑用",
  }
};

export type Translations = typeof translations.en;
export type Language = keyof typeof translations;

export default function NutriTrackDashboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [showPersonalStatement, setShowPersonalStatement] = useState(false); // New state
  const currentTranslations = translations[language];

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'zh' : 'en');
  };

  const togglePersonalStatement = () => {
    setShowPersonalStatement(prevState => !prevState);
  };

  if (!isClient) {
    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <p className="ml-4 text-lg text-primary">{translations.en.loadingText}</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <AppHeader
        currentLanguage={language}
        onToggleLanguage={toggleLanguage}
        onTogglePersonalStatement={togglePersonalStatement}
        userName="John Doe" // This should ideally come from user data
        translations={currentTranslations}
      />

      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <LeftSidebar translations={currentTranslations} />
        <MainContentArea translations={currentTranslations} language={language} />
        <RightSidebar translations={currentTranslations} />
      </div>

      <AppFooter translations={currentTranslations} />

      <PersonalStatementDisplay
        isOpen={showPersonalStatement}
        onClose={togglePersonalStatement}
        translations={currentTranslations}
      />

      {isLoading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <Loader2 className="h-12 w-12 text-primary animate-spin" />
          <p className="ml-4 text-lg text-primary">{currentTranslations.loadingText}</p>
        </div>
      )}
    </div>
  );
}

    