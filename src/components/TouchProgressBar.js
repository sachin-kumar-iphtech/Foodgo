import React, { useRef, useState } from "react";
import { View, StyleSheet, Animated, PanResponder } from "react-native";

const TouchProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const BAR_WIDTH = 160; // same as style

  const handleTouch = (x) => {
    // clamp touch position
    let newProgress = x / BAR_WIDTH;
    if (newProgress > 1) newProgress = 1;
    if (newProgress < 0) newProgress = 0;

    setProgress(newProgress);

    Animated.timing(animatedValue, {
      toValue: newProgress,
      duration: 80,
      useNativeDriver: false,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) =>
        handleTouch(gestureState.x0 - gestureState.moveX + gestureState.dx),
      onPanResponderMove: (evt, gestureState) =>
        handleTouch(gestureState.moveX - gestureState.x0 + gestureState.dx),
    })
  ).current;

  const widthInterpolate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const thumbPosition = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, BAR_WIDTH - 30], // stays aligned with bar
  });

  return (
    <View style={styles.container}>
      <View style={styles.progressBar} {...panResponder.panHandlers}>
        {/* Filled Progress */}
        <Animated.View style={[styles.progress, { width: widthInterpolate }]} />

        {/* Rectangular Thumb */}
        <Animated.View
          style={[
            styles.thumb,
            { transform: [{ translateX: thumbPosition }] },
          ]}
        />
      </View>
    </View>
  );
};

const BAR_COLOR = "tomato";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressBar: {
    width: 140,
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    justifyContent: "center",
    elevation:3,
    shadowColor:"orange",
    shadowOpacity:0.3,
    
  },
  progress: {
    position: "absolute",
    left: 0,
    height: "100%",
    backgroundColor: BAR_COLOR,
    borderRadius: 10,
  },
  thumb: {
    position: "absolute",
    width: 12,
    height: 20,
    borderRadius: 8,
    backgroundColor: BAR_COLOR,
    borderWidth: 2,
    borderColor: "#fff",
    top: -7,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
});

export default TouchProgressBar;
