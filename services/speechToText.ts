import Constants from "expo-constants";
import { useState } from "react";

const openaiApiKey = Constants.expoConfig?.extra?.openaiApiKey;

export async function speechToText(uri: string): Promise<string> {
  const formData = new FormData();
  formData.append("file", {
    uri,
    name: "userRecording.m4a",
    type: "audio/m4a",
  } as any);
  formData.append("model", "whisper-1");

  try {
    const response = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openaiApiKey}`,
        },
        body: formData,
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Error in speech to text conversion:", error);
    throw error;
  }
}
