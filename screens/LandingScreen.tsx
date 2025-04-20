import {
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Text } from "../components/GlobalText";
import { MaterialIcons } from "@expo/vector-icons";

import * as Haptics from "expo-haptics";
import React from "react";

import style from "../style";
import { useNavigation } from "@react-navigation/native";

const LandingScreen = () => {
  const navigation = useNavigation();

  const landingStyle = StyleSheet.create({
    container: {
      display: "flex",
      flex: 1,
      height: "100%",
      paddingTop: "70%",
      alignContent: "center",
    },
  });

  return (
    <SafeAreaView style={landingStyle.container}>
      <Text style={style.logo}>Yap-2-Do</Text>
      <MaterialIcons
        style={{ alignSelf: "center" }}
        name="mic"
        size={128}
        color="#6e22b0"
      />
      <Text style={style.subText}>Where yap-a-trons get things done</Text>
      <TouchableOpacity
        style={style.landingButton}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          navigation.navigate("DashboardScreen" as never);
        }}
      >
        <Text style={style.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LandingScreen;
