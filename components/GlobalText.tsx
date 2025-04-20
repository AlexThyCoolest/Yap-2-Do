import React from "react";
import { Text as RNText, StyleSheet, TextProps } from "react-native";

export const Text: React.FC<TextProps> = ({ style, children, ...props }) => {
  return (
    <RNText {...props} style={[styles.text, style]}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Manrope_400Regular",
    fontSize: 16,
  },
});
