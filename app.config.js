import "dotenv/config";

export default {
  expo: {
    name: "Yap-2-Do",
    slug: "yap-2-do",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "com.alexthedev01.yap2do",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      openaiApiKey: process.env.OPENAI_API_KEY,
      eas: {
        projectId: "afd2a740-f6c1-4bd8-9441-00e09e2c7be5",
      },
    },
    plugins: [
      "expo-font",
      "expo-av",
      [
        "expo-av",
        {
          microphonePermission: "Allow Yap-2-Do to access your microphone.",
        },
      ],
    ],
  },
};
