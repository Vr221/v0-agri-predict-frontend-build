"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "hi" | "or"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Header
    agriPredict: "AgriPredict",
    notifications: "Notifications",
    myAccount: "My Account",
    profile: "Profile",
    settings: "Settings",
    logout: "Logout",

    // Sidebar
    dashboard: "Dashboard",
    myFarms: "My Farms",
    dataEntry: "Data Entry",
    aiPredictions: "AI Predictions",
    analytics: "Analytics",
    weatherForecast: "Weather Forecast",
    adminDashboard: "Admin Dashboard",
    governmentData: "Government Data",

    // Dashboard
    welcome: "Welcome to AgriPredict",
    aiPoweredFarming: "AI-Powered Farming Insights",
    totalFarms: "Total Farms",
    activePredictions: "Active Predictions",
    dataPoints: "Data Points",
    accuracy: "Accuracy",
    quickActions: "Quick Actions",
    addNewFarm: "Add New Farm",
    enterData: "Enter Data",
    generatePrediction: "Generate Prediction",
    viewAnalytics: "View Analytics",
    recentActivity: "Recent Activity",
    currentWeather: "Current Weather",
    viewFullForecast: "View Full Forecast",

    // Weather Forecast
    weatherForecastTitle: "Weather Forecast",
    realTimeWeather: "Real-time weather data and agricultural insights",
    selectLocation: "Select Location",
    chooseLocation: "Choose a location to view weather forecast",
    selectDistrict: "Select District",
    chooseDistrict: "Choose a district in Odisha",
    refresh: "Refresh",
    backToDashboard: "Back to Dashboard",
    currentWeatherTitle: "Current Weather",
    humidity: "Humidity",
    windSpeed: "Wind Speed",
    precipitation: "Precipitation",
    pressure: "Pressure",
    visibility: "Visibility",
    agriculturalRecommendations: "Agricultural Recommendations",
    aiPoweredSuggestions: "AI-powered farming suggestions based on current weather",
    sevenDayForecast: "7-Day Forecast",
    extendedOutlook: "Extended weather outlook for planning",
    hourlyForecast: "24-Hour Temperature & Precipitation",
    hourlyBreakdown: "Hourly breakdown for today",
    soilData: "Soil Data",
    soilInformation: "Soil characteristics and recommendations for",
    dataSource: "Data Source: Open-Meteo Weather API",
    dataSourceInfo:
      "Real-time weather data updated hourly. Forecasts are based on multiple weather models including NOAA GFS, DWD ICON, and MeteoFrance ARPEGE for maximum accuracy.",

    // Soil Data
    soilType: "Soil Type",
    soilPH: "Soil pH",
    organicCarbon: "Organic Carbon",
    nitrogen: "Nitrogen",
    phosphorus: "Phosphorus",
    potassium: "Potassium",
    suitableCrops: "Suitable Crops",
    recommendations: "Recommendations",

    // Weather Suggestions
    highTempAlert: "High Temperature Alert",
    highTempMessage:
      "Increase irrigation frequency. Consider shade nets for sensitive crops. Avoid fertilizer application.",
    lowTempAlert: "Low Temperature Alert",
    lowTempMessage: "Protect sensitive crops from cold. Delay transplanting. Consider frost protection measures.",
    optimalTemp: "Optimal Temperature",
    optimalTempMessage: "Good conditions for most farming activities. Ideal for transplanting and field operations.",
    heavyRainfall: "Heavy Rainfall",
    heavyRainfallMessage: "Avoid field operations. Check drainage systems. Postpone pesticide/fertilizer application.",
    rainExpected: "Rain Expected Tomorrow",
    rainExpectedMessage:
      "Plan indoor activities. Delay irrigation. Good time for rain-fed crop sowing if soil is prepared.",
    dryWeather: "Dry Weather",
    dryWeatherMessage: "Good for harvesting and field preparation. Monitor soil moisture. Plan irrigation schedule.",
    highHumidity: "High Humidity",
    highHumidityMessage: "Increased disease risk. Monitor for fungal infections. Ensure good air circulation in crops.",
    strongWinds: "Strong Winds",
    strongWindsMessage: "Avoid spraying operations. Provide support to tall crops. Secure farm structures.",
    idealConditions: "Ideal Farming Conditions",
    idealConditionsMessage:
      "Perfect for planting, transplanting, and field operations. Good time for fertilizer application.",

    // Weather descriptions
    clearSky: "Clear sky",
    partlyCloudy: "Partly cloudy",
    rainy: "Rainy",
    snow: "Snow",
    thunderstorm: "Thunderstorm",
  },
  hi: {
    // Header
    agriPredict: "एग्रीप्रेडिक्ट",
    notifications: "सूचनाएं",
    myAccount: "मेरा खाता",
    profile: "प्रोफ़ाइल",
    settings: "सेटिंग्स",
    logout: "लॉग आउट",

    // Sidebar
    dashboard: "डैशबोर्ड",
    myFarms: "मेरे खेत",
    dataEntry: "डेटा प्रविष्टि",
    aiPredictions: "एआई भविष्यवाणियां",
    analytics: "विश्लेषण",
    weatherForecast: "मौसम पूर्वानुमान",
    adminDashboard: "व्यवस्थापक डैशबोर्ड",
    governmentData: "सरकारी डेटा",

    // Dashboard
    welcome: "एग्रीप्रेडिक्ट में आपका स्वागत है",
    aiPoweredFarming: "एआई-संचालित कृषि अंतर्दृष्टि",
    totalFarms: "कुल खेत",
    activePredictions: "सक्रिय भविष्यवाणियां",
    dataPoints: "डेटा बिंदु",
    accuracy: "सटीकता",
    quickActions: "त्वरित कार्य",
    addNewFarm: "नया खेत जोड़ें",
    enterData: "डेटा दर्ज करें",
    generatePrediction: "भविष्यवाणी उत्पन्न करें",
    viewAnalytics: "विश्लेषण देखें",
    recentActivity: "हाल की गतिविधि",
    currentWeather: "वर्तमान मौसम",
    viewFullForecast: "पूर्ण पूर्वानुमान देखें",

    // Weather Forecast
    weatherForecastTitle: "मौसम पूर्वानुमान",
    realTimeWeather: "वास्तविक समय मौसम डेटा और कृषि अंतर्दृष्टि",
    selectLocation: "स्थान चुनें",
    chooseLocation: "मौसम पूर्वानुमान देखने के लिए एक स्थान चुनें",
    selectDistrict: "जिला चुनें",
    chooseDistrict: "ओडिशा में एक जिला चुनें",
    refresh: "रीफ्रेश करें",
    backToDashboard: "डैशबोर्ड पर वापस जाएं",
    currentWeatherTitle: "वर्तमान मौसम",
    humidity: "आर्द्रता",
    windSpeed: "हवा की गति",
    precipitation: "वर्षा",
    pressure: "दबाव",
    visibility: "दृश्यता",
    agriculturalRecommendations: "कृषि सिफारिशें",
    aiPoweredSuggestions: "वर्तमान मौसम के आधार पर एआई-संचालित कृषि सुझाव",
    sevenDayForecast: "7-दिन का पूर्वानुमान",
    extendedOutlook: "योजना के लिए विस्तारित मौसम दृष्टिकोण",
    hourlyForecast: "24-घंटे का तापमान और वर्षा",
    hourlyBreakdown: "आज के लिए प्रति घंटा विवरण",
    soilData: "मिट्टी डेटा",
    soilInformation: "मिट्टी की विशेषताएं और सिफारिशें",
    dataSource: "डेटा स्रोत: ओपन-मेटियो मौसम एपीआई",
    dataSourceInfo:
      "वास्तविक समय मौसम डेटा प्रति घंटा अपडेट किया जाता है। पूर्वानुमान अधिकतम सटीकता के लिए NOAA GFS, DWD ICON, और MeteoFrance ARPEGE सहित कई मौसम मॉडल पर आधारित हैं।",

    // Soil Data
    soilType: "मिट्टी का प्रकार",
    soilPH: "मिट्टी पीएच",
    organicCarbon: "जैविक कार्बन",
    nitrogen: "नाइट्रोजन",
    phosphorus: "फास्फोरस",
    potassium: "पोटेशियम",
    suitableCrops: "उपयुक्त फसलें",
    recommendations: "सिफारिशें",

    // Weather Suggestions
    highTempAlert: "उच्च तापमान चेतावनी",
    highTempMessage: "सिंचाई की आवृत्ति बढ़ाएं। संवेदनशील फसलों के लिए छाया जाल पर विचार करें। उर्वरक अनुप्रयोग से बचें।",
    lowTempAlert: "कम तापमान चेतावनी",
    lowTempMessage: "संवेदनशील फसलों को ठंड से बचाएं। प्रत्यारोपण में देरी करें। पाला संरक्षण उपायों पर विचार करें।",
    optimalTemp: "इष्टतम तापमान",
    optimalTempMessage: "अधिकांश कृषि गतिविधियों के लिए अच्छी स्थिति। प्रत्यारोपण और क्षेत्र संचालन के लिए आदर्श।",
    heavyRainfall: "भारी वर्षा",
    heavyRainfallMessage: "क्षेत्र संचालन से बचें। जल निकासी प्रणाली की जांच करें। कीटनाशक/उर्वरक अनुप्रयोग स्थगित करें।",
    rainExpected: "कल बारिश की उम्मीद",
    rainExpectedMessage:
      "इनडोर गतिविधियों की योजना बनाएं। सिंचाई में देरी करें। यदि मिट्टी तैयार है तो वर्षा आधारित फसल बुवाई के लिए अच्छा समय।",
    dryWeather: "शुष्क मौसम",
    dryWeatherMessage: "कटाई और क्षेत्र तैयारी के लिए अच्छा। मिट्टी की नमी की निगरानी करें। सिंचाई कार्यक्रम की योजना बनाएं।",
    highHumidity: "उच्च आर्द्रता",
    highHumidityMessage: "बीमारी का खतरा बढ़ गया। फंगल संक्रमण के लिए निगरानी करें। फसलों में अच्छी हवा परिसंचरण सुनिश्चित करें।",
    strongWinds: "तेज हवाएं",
    strongWindsMessage: "छिड़काव संचालन से बचें। लंबी फसलों को सहारा प्रदान करें। खेत संरचनाओं को सुरक्षित करें।",
    idealConditions: "आदर्श कृषि स्थितियां",
    idealConditionsMessage: "रोपण, प्रत्यारोपण और क्षेत्र संचालन के लिए एकदम सही। उर्वरक अनुप्रयोग के लिए अच्छा समय।",

    // Weather descriptions
    clearSky: "साफ आकाश",
    partlyCloudy: "आंशिक रूप से बादल",
    rainy: "बारिश",
    snow: "बर्फ",
    thunderstorm: "आंधी",
  },
  or: {
    // Header
    agriPredict: "ଏଗ୍ରିପ୍ରେଡିକ୍ଟ",
    notifications: "ବିଜ୍ଞପ୍ତି",
    myAccount: "ମୋ ଖାତା",
    profile: "ପ୍ରୋଫାଇଲ୍",
    settings: "ସେଟିଂସ୍",
    logout: "ଲଗ୍ ଆଉଟ୍",

    // Sidebar
    dashboard: "ଡ୍ୟାସବୋର୍ଡ",
    myFarms: "ମୋର ଚାଷ ଜମି",
    dataEntry: "ତଥ୍ୟ ପ୍ରବେଶ",
    aiPredictions: "ଏଆଇ ପୂର୍ବାନୁମାନ",
    analytics: "ବିଶ୍ଳେଷଣ",
    weatherForecast: "ପାଣିପାଗ ପୂର୍ବାନୁମାନ",
    adminDashboard: "ଆଡମିନ୍ ଡ୍ୟାସବୋର୍ଡ",
    governmentData: "ସରକାରୀ ତଥ୍ୟ",

    // Dashboard
    welcome: "ଏଗ୍ରିପ୍ରେଡିକ୍ଟକୁ ସ୍ୱାଗତ",
    aiPoweredFarming: "ଏଆଇ-ଚାଳିତ କୃଷି ଅନ୍ତର୍ଦୃଷ୍ଟି",
    totalFarms: "ମୋଟ ଚାଷ ଜମି",
    activePredictions: "ସକ୍ରିୟ ପୂର୍ବାନୁମାନ",
    dataPoints: "ତଥ୍ୟ ବିନ୍ଦୁ",
    accuracy: "ସଠିକତା",
    quickActions: "ଶୀଘ୍ର କାର୍ଯ୍ୟ",
    addNewFarm: "ନୂତନ ଚାଷ ଜମି ଯୋଡନ୍ତୁ",
    enterData: "ତଥ୍ୟ ପ୍ରବେଶ କରନ୍ତୁ",
    generatePrediction: "ପୂର୍ବାନୁମାନ ସୃଷ୍ଟି କରନ୍ତୁ",
    viewAnalytics: "ବିଶ୍ଳେଷଣ ଦେଖନ୍ତୁ",
    recentActivity: "ସାମ୍ପ୍ରତିକ କାର୍ଯ୍ୟକଳାପ",
    currentWeather: "ବର୍ତ୍ତମାନର ପାଣିପାଗ",
    viewFullForecast: "ସମ୍ପୂର୍ଣ୍ଣ ପୂର୍ବାନୁମାନ ଦେଖନ୍ତୁ",

    // Weather Forecast
    weatherForecastTitle: "ପାଣିପାଗ ପୂର୍ବାନୁମାନ",
    realTimeWeather: "ବାସ୍ତବ ସମୟ ପାଣିପାଗ ତଥ୍ୟ ଏବଂ କୃଷି ଅନ୍ତର୍ଦୃଷ୍ଟି",
    selectLocation: "ସ୍ଥାନ ଚୟନ କରନ୍ତୁ",
    chooseLocation: "ପାଣିପାଗ ପୂର୍ବାନୁମାନ ଦେଖିବାକୁ ଏକ ସ୍ଥାନ ଚୟନ କରନ୍ତୁ",
    selectDistrict: "ଜିଲ୍ଲା ଚୟନ କରନ୍ତୁ",
    chooseDistrict: "ଓଡିଶାରେ ଏକ ଜିଲ୍ଲା ଚୟନ କରନ୍ତୁ",
    refresh: "ସତେଜ କରନ୍ତୁ",
    backToDashboard: "ଡ୍ୟାସବୋର୍ଡକୁ ଫେରନ୍ତୁ",
    currentWeatherTitle: "ବର୍ତ୍ତମାନର ପାଣିପାଗ",
    humidity: "ଆର୍ଦ୍ରତା",
    windSpeed: "ପବନ ବେଗ",
    precipitation: "ବୃଷ୍ଟିପାତ",
    pressure: "ଚାପ",
    visibility: "ଦୃଶ୍ୟତା",
    agriculturalRecommendations: "କୃଷି ସୁପାରିଶ",
    aiPoweredSuggestions: "ବର୍ତ୍ତମାନର ପାଣିପାଗ ଉପରେ ଆଧାରିତ ଏଆଇ-ଚାଳିତ କୃଷି ପରାମର୍ଶ",
    sevenDayForecast: "୭-ଦିନର ପୂର୍ବାନୁମାନ",
    extendedOutlook: "ଯୋଜନା ପାଇଁ ବିସ୍ତୃତ ପାଣିପାଗ ଦୃଷ୍ଟିକୋଣ",
    hourlyForecast: "୨୪-ଘଣ୍ଟା ତାପମାତ୍ରା ଏବଂ ବୃଷ୍ଟିପାତ",
    hourlyBreakdown: "ଆଜି ପାଇଁ ଘଣ୍ଟା ଅନୁସାରେ ବିବରଣୀ",
    soilData: "ମାଟି ତଥ୍ୟ",
    soilInformation: "ମାଟିର ବୈଶିଷ୍ଟ୍ୟ ଏବଂ ସୁପାରିଶ",
    dataSource: "ତଥ୍ୟ ଉତ୍ସ: ଓପନ୍-ମେଟିଓ ପାଣିପାଗ API",
    dataSourceInfo:
      "ବାସ୍ତବ ସମୟ ପାଣିପାଗ ତଥ୍ୟ ପ୍ରତି ଘଣ୍ଟାରେ ଅପଡେଟ୍ ହୁଏ। ସର୍ବାଧିକ ସଠିକତା ପାଇଁ NOAA GFS, DWD ICON, ଏବଂ MeteoFrance ARPEGE ସହିତ ଏକାଧିକ ପାଣିପାଗ ମଡେଲ ଉପରେ ପୂର୍ବାନୁମାନ ଆଧାରିତ।",

    // Soil Data
    soilType: "ମାଟି ପ୍ରକାର",
    soilPH: "ମାଟି pH",
    organicCarbon: "ଜୈବିକ କାର୍ବନ",
    nitrogen: "ନାଇଟ୍ରୋଜେନ",
    phosphorus: "ଫସଫରସ",
    potassium: "ପୋଟାସିୟମ",
    suitableCrops: "ଉପଯୁକ୍ତ ଫସଲ",
    recommendations: "ସୁପାରିଶ",

    // Weather Suggestions
    highTempAlert: "ଉଚ୍ଚ ତାପମାତ୍ରା ସତର୍କତା",
    highTempMessage: "ଜଳସେଚନ ବାରମ୍ବାରତା ବୃଦ୍ଧି କରନ୍ତୁ। ସମ୍ବେଦନଶୀଳ ଫସଲ ପାଇଁ ଛାୟା ଜାଲ ବିଚାର କରନ୍ତୁ। ସାର ପ୍ରୟୋଗରୁ ଦୂରେଇ ରୁହନ୍ତୁ।",
    lowTempAlert: "କମ୍ ତାପମାତ୍ରା ସତର୍କତା",
    lowTempMessage: "ସମ୍ବେଦନଶୀଳ ଫସଲକୁ ଥଣ୍ଡାରୁ ରକ୍ଷା କରନ୍ତୁ। ପ୍ରତିରୋପଣରେ ବିଳମ୍ବ କରନ୍ତୁ। ଶୀତ ସୁରକ୍ଷା ପଦକ୍ଷେପ ବିଚାର କରନ୍ତୁ।",
    optimalTemp: "ଉତ୍କୃଷ୍ଟ ତାପମାତ୍ରା",
    optimalTempMessage: "ଅଧିକାଂଶ କୃଷି କାର୍ଯ୍ୟକଳାପ ପାଇଁ ଭଲ ଅବସ୍ଥା। ପ୍ରତିରୋପଣ ଏବଂ କ୍ଷେତ୍ର କାର୍ଯ୍ୟ ପାଇଁ ଆଦର୍ଶ।",
    heavyRainfall: "ପ୍ରବଳ ବର୍ଷା",
    heavyRainfallMessage: "କ୍ଷେତ୍ର କାର୍ଯ୍ୟରୁ ଦୂରେଇ ରୁହନ୍ତୁ। ଜଳ ନିଷ୍କାସନ ବ୍ୟବସ୍ଥା ଯାଞ୍ଚ କରନ୍ତୁ। କୀଟନାଶକ/ସାର ପ୍ରୟୋଗ ସ୍ଥଗିତ କରନ୍ତୁ।",
    rainExpected: "ଆସନ୍ତାକାଲି ବର୍ଷା ଆଶା",
    rainExpectedMessage:
      "ଘର ଭିତରର କାର୍ଯ୍ୟକଳାପ ଯୋଜନା କରନ୍ତୁ। ଜଳସେଚନରେ ବିଳମ୍ବ କରନ୍ତୁ। ଯଦି ମାଟି ପ୍ରସ୍ତୁତ ହୋଇଛି ତେବେ ବର୍ଷା ଆଧାରିତ ଫସଲ ବୁଣିବା ପାଇଁ ଭଲ ସମୟ।",
    dryWeather: "ଶୁଷ୍କ ପାଣିପାଗ",
    dryWeatherMessage: "ଅମଳ ଏବଂ କ୍ଷେତ୍ର ପ୍ରସ୍ତୁତି ପାଇଁ ଭଲ। ମାଟିର ଆର୍ଦ୍ରତା ନିରୀକ୍ଷଣ କରନ୍ତୁ। ଜଳସେଚନ କାର୍ଯ୍ୟସୂଚୀ ଯୋଜନା କରନ୍ତୁ।",
    highHumidity: "ଉଚ୍ଚ ଆର୍ଦ୍ରତା",
    highHumidityMessage: "ରୋଗ ବିପଦ ବୃଦ୍ଧି। ଫଙ୍ଗଲ ସଂକ୍ରମଣ ପାଇଁ ନିରୀକ୍ଷଣ କରନ୍ତୁ। ଫସଲରେ ଭଲ ବାୟୁ ସଞ୍ଚାଳନ ସୁନିଶ୍ଚିତ କରନ୍ତୁ।",
    strongWinds: "ପ୍ରବଳ ପବନ",
    strongWindsMessage: "ସ୍ପ୍ରେ କାର୍ଯ୍ୟରୁ ଦୂରେଇ ରୁହନ୍ତୁ। ଲମ୍ବା ଫସଲକୁ ସହାୟତା ପ୍ରଦାନ କରନ୍ତୁ। ଚାଷ ସଂରଚନା ସୁରକ୍ଷିତ କରନ୍ତୁ।",
    idealConditions: "ଆଦର୍ଶ କୃଷି ଅବସ୍ଥା",
    idealConditionsMessage: "ରୋପଣ, ପ୍ରତିରୋପଣ ଏବଂ କ୍ଷେତ୍ର କାର୍ଯ୍ୟ ପାଇଁ ସମ୍ପୂର୍ଣ୍ଣ। ସାର ପ୍ରୟୋଗ ପାଇଁ ଭଲ ସମୟ।",

    // Weather descriptions
    clearSky: "ସ୍ୱଚ୍ଛ ଆକାଶ",
    partlyCloudy: "ଆଂଶିକ ମେଘୁଆ",
    rainy: "ବର୍ଷା",
    snow: "ତୁଷାର",
    thunderstorm: "ବଜ୍ରପାତ",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("agripredict-language") as Language
    if (savedLanguage && ["en", "hi", "or"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("agripredict-language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
