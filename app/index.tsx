import { useFonts } from "expo-font";
import { router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback } from "react";
import {
 ActivityIndicator,
 ImageBackground,
 SafeAreaView,
 StatusBar,
 StyleSheet,
 Text,
 TouchableOpacity,
 View,
} from "react-native";

SplashScreen.preventAutoHideAsync();

export default function WelcomeScreen() {
 const [fontsLoaded] = useFonts({
  GochiHand: require("../assets/fonts/GochiHand-Regular.ttf"),
 });

 const onLayoutRootView = useCallback(async () => {
  if (fontsLoaded) {
   await SplashScreen.hideAsync();
  }
 }, [fontsLoaded]);

 if (!fontsLoaded) {
  return (
   <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
    <ActivityIndicator size="large" color="#FFFFFF" />
   </View>
  );
 }

 return (
  <View style={styles.container} onLayout={onLayoutRootView}>
   <StatusBar
    barStyle="light-content"
    translucent
    backgroundColor="transparent"
   />

   <ImageBackground
    source={require("../assets/images/bg-main.jpg")}
    style={styles.backgroundImage}
    resizeMode="cover"
   >
    <View style={styles.overlay} />

    <SafeAreaView style={styles.contentContainer}>
     <View style={styles.textContainer}>
      <Text style={styles.headline}>Discover What Inspires You</Text>
      <View style={styles.divider} />
      <Text style={styles.subtitle}>Find ideas you'll love</Text>
     </View>

     <TouchableOpacity
      style={styles.button}
      onPress={() => router.push("/auth" as any)}
      activeOpacity={0.8}
     >
      <Text style={styles.buttonText}>Get Started</Text>
     </TouchableOpacity>
    </SafeAreaView>
   </ImageBackground>
  </View>
 );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
 },
 backgroundImage: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
 },
 overlay: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: "rgba(0, 0, 0, 0.35)",
 },
 contentContainer: {
  flex: 0,
  justifyContent: "space-between",
  // alignItems: "center",
  minHeight: 600,
  paddingBottom: 50,
  paddingHorizontal: 30,
 },
 divider: {
  height: 1,
  width: 200,
  backgroundColor: "#FFFFFF",
  opacity: 0.8,
 },
 textContainer: {
  alignItems: "center",
  gap: 15,
  marginBottom: 40,
 },
 headline: {
  fontFamily: "GochiHand",
  fontSize: 42,
  fontWeight: "700",
  color: "#FFFFFF",
  textAlign: "center",
  letterSpacing: 0.5,
  maxWidth: 300,
 },
 subtitle: {
  fontSize: 18,
  color: "#E0E0E0",
  textAlign: "center",
  letterSpacing: 0.3,
 },
 button: {
  backgroundColor: "#3a5a40",
  // paddingVertical: 16,
  padding: 16,
  borderRadius: 10,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {width: 0, height: 4},
  shadowOpacity: 0.2,
  shadowRadius: 8,
  elevation: 5,
 },
 buttonText: {
  fontSize: 18,
  fontWeight: "600",
  color: "#fefae0",
  letterSpacing: 0.5,
 },
});
