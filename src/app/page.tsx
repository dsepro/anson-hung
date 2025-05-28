
"use client";

import { useState, useEffect } from 'react';
import { AppHeader } from '@/components/layout/app-header';
import { LeftSidebar } from '@/components/dashboard/left-sidebar';
import { MainContentArea } from '@/components/dashboard/main-content-area';
import { RightSidebar } from '@/components/dashboard/right-sidebar';
import { AppFooter } from '@/components/layout/app-footer';
// import { useToast } from '@/hooks/use-toast'; // useToast currently unused
import { Loader2 } from 'lucide-react';

export const translations = {
  en: {
    loadingText: "Loading Dashboard...",
    // AppHeader
    nutriTrackTitle: "NutriTrack",
    userNameDisplay: "Chan Tai Man", // User name
    myAccount: "My Account",
    profile: "Profile",
    settings: "Settings",
    logOut: "Log out",
    switchToChineseButtonText: "繁體中文",
    readPersonalStatement: "Read My Personal Statement Here",
    // Personal Statement Dialog (Titles for the statement itself are always English)
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
    closeButtonText: "Close", // Though dialog is removed, key can remain
    // LeftSidebar
    chatWithDietitian: "Chat with Dietitian",
    userConditionExample: "Type 2 Diabetes, Hypertension", // Added English for this
    // DailyGoalsCard
    dailyGoalsTitle: "Daily Goals",
    calories: "Calories",
    protein: "Protein",
    carbs: "Carbs",
    fat: "Fat",
    sodium: "Sodium",
    // DietitianRecommendationsCard
    dietitianRecommendationsTitle: "Dietitian Recommendations",
    recTextLeafyGreens: "Try to include more leafy greens in your lunch to help manage blood sugar levels.",
    recTextSodium: "Consider reducing sodium intake by avoiding processed foods.",
    recTextCalcium: "Your calcium intake is below recommended levels. Try adding more dairy or fortified alternatives.",
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
    mealNameOatmealWithBerries: "Oatmeal with Berries",
    mealNameOrangeJuice: "Orange Juice",
    mealNameGrilledChickenSalad: "Grilled Chicken Salad",
    mealNameWholeGrainBread: "Whole Grain Bread",
    mealNameApple: "Apple",
    mealNameVegetableSoup: "Vegetable Soup",
    mealNameBakedSalmon: "Baked Salmon",
    // QuickAddFoodSection
    quickAddFoodTitle: "Quick Add Food",
    oatmeal: "Oatmeal",
    salad: "Salad",
    // apple: "Apple", // Already in TodaysMealsSection names
    milk: "Milk",
    more: "More",
    takePhoto: "Take Photo",
    scanBarcode: "Scan Barcode",
    // NutritionSummarySection
    nutritionSummaryTitle: "Nutrition Summary",
    carbohydratesChartLabel: "Carbs (g)",
    proteinChartLabel: "Protein (g)",
    fatChartLabel: "Fat (g)",
    vitaminCChartLabel: "Vit C (mg)",
    ironChartLabel: "Iron (mg)",
    calciumChartLabel: "Calcium (mg)",
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
    recipeChickenStirFry: "Chicken Stir-fry",
    recipeQuinoaSalad: "Quinoa Salad",
    recipeLentilSoup: "Lentil Soup",
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
    language: "Language", // Generic key, actual button text is switchToChineseButtonText/switchToEnglishButtonText
    // Footer
    footerCredit: "This demo webpage was created and designed by Anson Hung for the application to Postgraduate Diploma in Human Nutrition and Postgraduate Diploma in Dietetics.",
  },
  zh: {
    loadingText: "正在載入儀表板...",
    // AppHeader
    nutriTrackTitle: "營養追蹤",
    userNameDisplay: "陳大文", // User name
    myAccount: "我的帳戶",
    profile: "個人資料",
    settings: "設定",
    logOut: "登出",
    switchToEnglishButtonText: "English",
    readPersonalStatement: "請在此瀏覽我的個人自述",
    // Personal Statement Dialog (Titles for the statement itself are always English)
    personalStatementDialogTitle: "個人自述", // This title is translated
    personalStatementWhyTitle: "Why I would like to become a dietitian", // English Title
    personalStatementWhyBody: "Eating is something we do every day, yet food is far more than fuel—it's a fundamental component of well-being, a preventive measure against chronic diseases, and a gateway to better quality of life. By helping people make informed food choices, we can improve their wellbeing. In Hong Kong, the aging population poses a significant public health challenge, making effective nutrition strategies essential. As the demand for dietitians grows, I am eager to join this field, aiming to enhance health outcomes for individuals of all ages and support the community in making better dietary choices.",
    personalStatementExperienceTitle: "Relevant experience and strength", // English Title
    personalStatementExperienceBody: "My past work and volunteer experience at hospitals and community centers has given me a deep understanding of the role of a dietitian in both clinical and community settings. Through these experiences, I have learned how dietitians assess nutritional needs, develop tailored plans, and support individuals in making healthier choices. This hands-on exposure has solidified my commitment to this profession.\nI possess a diverse set of relevant skills and strengths that are essential for becoming a dietitian. My strong communication skills enable me to convey complex nutritional information clearly and effectively, ensuring that patients understand their dietary needs and recommendations. I also excel in active listening, which allows me to truly understand patients’ concerns and preferences.",
    personalStatementGoalsTitle: "My career goals", // English Title
    personalStatementGoalsBody: "I am passionate about working on the front lines of healthcare to provide tailored dietary guidance that empowers individuals to make informed and sustainable changes. My goal is to offer patient-centered nutrition plans that consider each patient's medical condition, lifestyle, and cultural context. I also aim to take part in primary intervention strategies that reduce the incidence of preventable diseases through early nutritional support and public education. I am eager to develop outreach programs that promote food literacy, healthy eating habits, and community wellness. Moreover, I am enthusiastic about the growing role of digital health tools and artificial intelligence in dietetics. From personalized meal planning apps to predictive analytics for nutritional risk assessment, I see tremendous potential for technology to enhance care delivery.",
    personalStatementReasonsTitle: "Reasons for applying for this course", // English Title
    personalStatementReasonsBody: "I am drawn to this program for its excellent reputation in the field, as well as its emphasis on both academic and practical training. The opportunity to engage in a full-time placement in a hospital is particularly appealing. Training in local settings will benefit my long-term goal of practicing in Hong Kong by helping me understand the regional healthcare systems, patient expectations, and food cultures. This knowledge will enable me to provide more relevant and effective care in the future. Moreover, the part-time structure of the first year aligns well with my current professional commitments and gives me the flexibility to remain active in the field while deepening my academic knowledge.",
    personalStatementConclusionTitle: "Conclusion", // English Title
    personalStatementConclusionBody: "With my strong background in nutrition and a clear vision for the future, I believe I am well-suited for this program. I am eager to learn from the professionals at HKUSPACE and integrate their insights to promote better health and well-being in our communities.",
    personalStatementThanks: "Thank you for considering my application. I look forward to discussing my application and aspirations in more detail during an interview.", // English Text
    closeButtonText: "關閉", // Though dialog is removed, key can remain
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
    recTextLeafyGreens: "嘗試在午餐中加入更多綠葉蔬菜，有助於控制血糖水平。",
    recTextSodium: "考慮通過避免加工食品來減少鈉的攝入量。",
    recTextCalcium: "您的鈣攝入量低於建議水平。嘗試添加更多乳制品或強化替代品。",
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
    mealNameOatmealWithBerries: "燕麥配漿果",
    mealNameOrangeJuice: "橙汁",
    mealNameGrilledChickenSalad: "烤雞沙律",
    mealNameWholeGrainBread: "全麥麵包",
    mealNameApple: "蘋果",
    mealNameVegetableSoup: "蔬菜湯",
    mealNameBakedSalmon: "烤三文魚",
    // QuickAddFoodSection
    quickAddFoodTitle: "快速新增食物",
    oatmeal: "燕麥片",
    salad: "沙律",
    // apple: "蘋果", // Already in TodaysMealsSection names
    milk: "牛奶",
    more: "更多",
    takePhoto: "拍照新增",
    scanBarcode: "掃描條碼",
    // NutritionSummarySection
    nutritionSummaryTitle: "營養總結",
    carbohydratesChartLabel: "碳水 (克)",
    proteinChartLabel: "蛋白 (克)",
    fatChartLabel: "脂肪 (克)",
    vitaminCChartLabel: "維他命C (毫克)",
    ironChartLabel: "鐵質 (毫克)",
    calciumChartLabel: "鈣質 (毫克)",
    // RightSidebar
    // MealPlanningCard
    mealPlanningTitle: "膳食計劃",
    weeklyPlanTab: "週計劃",
    recipesTab: "食譜",
    weekOf: "{date}週", // Example: "五月 15日週"
    viewAll: "查看全部",
    createMealPlan: "建立膳食計劃",
    yourRecipes: "您的食譜",
    addNewRecipe: "新增食譜",
    recipeChickenStirFry: "中式炒雞柳",
    recipeQuinoaSalad: "藜麥沙律",
    recipeLentilSoup: "扁豆湯",
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
    language: "語言", // Generic key, actual button text is switchToChineseButtonText/switchToEnglishButtonText
    // Footer
    footerCredit: "此示範用網頁由洪鉉鈴製作和設計 供報考人類營養學深造文憑/營養治療學深造文憑用",
  }
};

export type Translations = typeof translations.en;
export type Language = keyof typeof translations;

export default function NutriTrackDashboardPage() {
  const [_isLoading, setIsLoading] = useState(false); // isLoading not actively used for a global spinner now
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
            <p className="ml-4 text-lg text-primary">{translations.en.loadingText}</p> {/* Default to English for initial load */}
        </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <AppHeader
        currentLanguage={language}
        onToggleLanguage={toggleLanguage}
        userName={currentTranslations.userNameDisplay}
        // userAvatar prop removed
        translations={currentTranslations}
      />

      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <LeftSidebar translations={currentTranslations} />
        <MainContentArea translations={currentTranslations} language={language} />
        <RightSidebar translations={currentTranslations} />
      </div>

      <AppFooter translations={currentTranslations} />

      {/* isLoading && ( // Global spinner can be re-enabled if needed
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <Loader2 className="h-12 w-12 text-primary animate-spin" />
          <p className="ml-4 text-lg text-primary">{currentTranslations.loadingText}</p>
        </div>
      )*/}
    </div>
  );
}
