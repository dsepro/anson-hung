
"use client";

import { useState, useEffect } from 'react';
import { AppHeader } from '@/components/layout/app-header';
import { LeftSidebar } from '@/components/dashboard/left-sidebar';
import { MainContentArea } from '@/components/dashboard/main-content-area';
import { RightSidebar } from '@/components/dashboard/right-sidebar';
import { AppFooter } from '@/components/layout/app-footer'; // Import AppFooter

import { useToast } from '@/hooks/use-toast'; 
import { Loader2 } from 'lucide-react'; 

const translations = {
  en: {
    loadingText: "Loading Dashboard...",
    // AppHeader
    nutriTrackTitle: "NutriTrack",
    myAccount: "My Account",
    profile: "Profile",
    settings: "Settings",
    logOut: "Log out",
    // LeftSidebar
    chatWithDietitian: "Chat with Dietitian",
    userConditionExample: "Type 2 Diabetes, Hypertension", // Added for EN
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
    // Language Selector
    language: "Language",
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
    // LeftSidebar
    chatWithDietitian: "與營養師聊天",
    userConditionExample: "二型糖尿病，高血壓", // User condition is dynamic data, placeholder for translation
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
    noMealsLogged: "{mealType}尚未記錄。", // Adjusted translation
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
    // Language Selector
    language: "語言",
    // Footer
    footerCredit: "此示範用網頁由洪鉉玲製作和設計 供報考 人類營養學深造文憑/營養治療學深造文憑用",
  }
};

export type Translations = typeof translations.en;
export type Language = keyof typeof translations;

export default function NutriTrackDashboardPage() {
  const [isLoading, setIsLoading] = useState(false); 
  const [language, setLanguage] = useState<Language>('en');
  const currentTranslations = translations[language];

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);


  if (!isClient) {
    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <p className="ml-4 text-lg text-primary">{translations.en.loadingText}</p> {/* Default to EN on server */}
        </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <AppHeader language={language} onLanguageChange={setLanguage} userName="John Doe" translations={currentTranslations} />
      
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <LeftSidebar translations={currentTranslations} />
        <MainContentArea translations={currentTranslations} language={language} />
        <RightSidebar translations={currentTranslations} />
      </div>
      
      <AppFooter translations={currentTranslations} /> {/* Add AppFooter */}

      {isLoading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <Loader2 className="h-12 w-12 text-primary animate-spin" />
          <p className="ml-4 text-lg text-primary">{currentTranslations.loadingText}</p>
        </div>
      )}
    </div>
  );
}

