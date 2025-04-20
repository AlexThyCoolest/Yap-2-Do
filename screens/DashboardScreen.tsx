import { useState, useEffect } from "react";
import {
  StyleSheet,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  View,
} from "react-native";
import { Text } from "../components/GlobalText";
import { Audio } from "expo-av";
import { speechToText } from "../services/speechToText";
import { VoiceButton } from "../components/VoiceButton";
import { parseTranscript } from "../services/parseTranscript";
import TodoScreen from "../components/TodoScreen";

export default function DashboardScreen() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [parsedText, setParsedText] = useState("");
  const [recordingTime, setRecordingTime] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Start timer when recording begins
    if (isRecording) {
      const interval = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
      setTimer(interval);
    } else {
      // Clear timer when recording stops
      if (timer) {
        clearInterval(timer);
        setTimer(null);
      }
      // Reset timer to 0 when not recording
      if (!isLoading) {
        setRecordingTime(0);
      }
    }

    // Cleanup function
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isRecording, isLoading]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access microphone was denied");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );
      await newRecording.startAsync();
      setRecording(newRecording);
      setIsRecording(true);
    } catch (err) {
      console.error("Failed to start recording", err);
      Alert.alert("Failed to start recording");
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) return;
      setRecording(null);
      setIsLoading(true);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      if (uri) {
        const transcript = await speechToText(uri);

        const parsed = await parseTranscript({ transcript });
        setParsedText(parsed);
        console.log("Recording stopped, URI:", uri);
      } else {
        console.error("Recording URI is null");
      }
      setIsRecording(false);
      setRecordingTime(0);
      setIsLoading(false);
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>
          {isRecording ? formatTime(recordingTime) : "00:00"}
        </Text>
      </View>
      <VoiceButton
        var1={isRecording}
        var2={stopRecording}
        var3={startRecording}
        var4={isLoading}
      />
      <TodoScreen parsedText={parsedText} />
      {isLoading && <ActivityIndicator color="#6e22b0" size={"large"} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#ecf0f1",
    gap: 30,
    padding: 10,
  },
  timerContainer: {
    alignItems: "center",
    paddingVertical: 10,
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
  },
  timerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
