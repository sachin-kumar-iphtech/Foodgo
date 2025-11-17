import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

const CurvedBottomBar = () => {
  return (
    <View style={styles.container}>
      <Svg width="100%" height="80" viewBox="0 0 375 80">
        <Path
          d="M0,0 H150
             C165,0 185,40 205,40
             C225,40 245,0 260,0
             H375 V80 H0 Z"
          fill="#EF2A39"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

export default CurvedBottomBar;
