import { Button, View } from "react-native";
import * as Haptics from "expo-haptics";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import style from "../style";

export function TodoItem(props: { text: string; onDelete?: () => void }) {
  return (
    <View>
      <BouncyCheckbox
        size={50}
        fillColor="#6e22b0"
        onPress={(checked: boolean) => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          if (checked && props.onDelete) {
            setTimeout(() => {
              props.onDelete?.();
            }, 500);
          }
        }}
        style={style.checkbox}
        text={props.text}
      />
    </View>
  );
}
