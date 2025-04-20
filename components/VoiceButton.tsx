import { TouchableOpacity } from "react-native";
import { Text } from "../components/GlobalText";
import { MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import style from "../style";

export function VoiceButton(props: {
  var1: boolean;
  var2: () => void;
  var3: () => void;
  var4: boolean;
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        props.var1 ? props.var2() : props.var3();
      }}
      disabled={props.var4}
      style={[
        style.voiceButton,
        props.var1
          ? { backgroundColor: "red", borderColor: "red", boxShadow: "none" }
          : null,
        props.var4
          ? { backgroundColor: "gray", borderColor: "gray", opacity: 0.5 }
          : null,
      ]}
      accessibilityLabel={
        props.var1 ? "Stop voice recording" : "Start voice recording"
      }
    >
      <Text>
        {/* {props.var1 ? "Stop Recording" : "Start Recording"} */}
        <MaterialIcons
          name={props.var1 ? "stop" : "mic"}
          size={96}
          style={{
            shadowColor: "#6e22b0",
            shadowOffset: { width: 4, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 10,
            elevation: 5, // for Android
            backgroundColor: "transparent",
            overflow: "hidden",
          }}
          color="white"
        />
      </Text>
    </TouchableOpacity>
  );
}
