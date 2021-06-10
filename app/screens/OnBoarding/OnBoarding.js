import React, { useState, useEffect } from "react";
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

// constants
import { images, theme } from "../../constants";
const { onboarding1, onboarding2, onboarding3 } = images;
// theme
const { COLORS, FONTS, SIZES } = theme;

const onBoardings = [
  {
    title: "Let's Travelling",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
    img: onboarding1,
  },
  {
    title: "Navigation",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
    img: onboarding2,
  },
  {
    title: "Destination",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
    img: onboarding3,
  },
];

const OnBoarding = () => {

  const [completed, setCompleted] = useState(false)
  const scrollX = new Animated.Value(0)

  useEffect(() => {
    // To check if user has finished scrolling the onboarding page
    scrollX.addListener(({ value }) => {
      if (Math.floor(value / SIZES.width) === onBoardings.length - 1) {
        setCompleted(true)
      }
    })
    return () => scrollX.removeListener
  }, [])

  function renderContent() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        decelerationRate={0}
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { x: scrollX } } }
        ], { useNativeDriver: false })}
      >
        {onBoardings.map((item, index) => (
          <View key={index}
            style={{
              width: SIZES.width,
              height: SIZES.height
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <Image
                source={item.img}
                resizeMode="cover"
                style={{
                  width: SIZES.width,
                  height: SIZES.height
                }}
              />

            </View>
            <View
              style={{
                position: 'absolute',
                bottom: '10%',
                left: 40,
                right: 40
              }}
            >
              <Text
                style={{
                  ...FONTS.h1, color: COLORS.gray, textAlign: 'center'
                }}
              >{item.title}</Text>
              <Text
                style={{
                  ...FONTS.body3,
                  textAlign: 'center',
                  marginTop: SIZES.base,
                  colors: COLORS.gray
                }}
              >{item.description}</Text>
            </View>
            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: 30,
                right: 10,
                height: 35,
                paddingLeft: 20,
                paddingRight: 20,
                justifyContent: 'center',
                backgroundColor: COLORS.blue,
                borderRadius: 20
              }}
            >
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.white,

                }}
              >{completed ? "Let's go" : "Skip"}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </Animated.ScrollView>
    );
  };

  function renderDots() {

    const dotPosition = Animated.divide(scrollX, SIZES.width)

    return (
      <View style={styles.dotsContainer}>
        {onBoardings.map((item, index) => {

          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp"
          })

          const dotSize = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [SIZES.base, 12, SIZES.base],
            extrapolate: "clamp"
          })

          return (
            <Animated.View key={index} style={[styles.dot, {
              width: dotSize, height: dotSize
            }]}
              opacity={opacity}
            >
            </Animated.View>
          )
        })}
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {renderContent()}
      </View>
      <View style={styles.dotsRootContainer}>
        {renderDots()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  imageAndTextContainer: {
    width: SIZES.width,
  },
  dotsRootContainer: {
    position: "absolute",
    bottom: SIZES.height > 700 ? "18%" : "14%",
  },
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: SIZES.padding / 2,
    marginBottom: SIZES.padding * 3,
    height: SIZES.padding,
  },
  dot: {
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.blue,
    marginHorizontal: SIZES.radius / 2,
  },
});
export default OnBoarding;
