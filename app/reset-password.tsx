import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
 ActivityIndicator,
 Alert,
 KeyboardAvoidingView,
 Platform,
 SafeAreaView,
 StyleSheet,
 Text,
 TextInput,
 TouchableOpacity,
 View,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function ResetPasswordScreen() {
 const [newPassword, setNewPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");
 const [showPassword, setShowPassword] = useState(false);
 const [loading, setLoading] = useState(false);
 const [hasSession, setHasSession] = useState(false);

 // Check if user has an active session (from email link or dashboard reset)
 useEffect(() => {
  checkSession();
 }, []);

 async function checkSession() {
  const {
   data: {session},
  } = await supabase.auth.getSession();
  if (session) {
   setHasSession(true);
  } else {
   Alert.alert(
    "No Active Session",
    "To reset your password:\n\n" +
     "1. The app admin must trigger a password reset from the Supabase dashboard\n" +
     "2. Or click the reset link in your email\n\n" +
     "Once that's done, come back to this screen.",
    [{text: "Go to Login", onPress: () => router.push("/auth")}],
   );
  }
 }

 async function handleUpdatePassword() {
  if (!newPassword || !confirmPassword) {
   Alert.alert("Error", "Please fill in both fields");
   return;
  }

  if (newPassword !== confirmPassword) {
   Alert.alert("Error", "Passwords don't match");
   return;
  }

  if (newPassword.length < 6) {
   Alert.alert("Error", "Password must be at least 6 characters");
   return;
  }

  setLoading(true);

  const {error} = await supabase.auth.updateUser({
   password: newPassword,
  });

  setLoading(false);

  if (error) {
   Alert.alert("Error", error.message);
  } else {
   Alert.alert(
    "Password Updated! 🎉",
    "Your password has been successfully reset. Please log in with your new password.",
    [{text: "Go to Login", onPress: () => router.push("/auth")}],
   );
  }
 }

 // If no session, show helpful message
 if (!hasSession) {
  return (
   <SafeAreaView style={styles.container}>
    <View style={styles.content}>
     <View style={styles.iconContainer}>
      <Ionicons name="information-circle-outline" size={60} color="#3a5a40" />
     </View>
     <Text style={styles.title}>Reset Password</Text>
     <Text style={styles.subtitle}>
      To reset your password, the app administrator needs to trigger a reset
      from the dashboard.
     </Text>
     <TouchableOpacity
      style={styles.button}
      onPress={() => router.push("/auth")}
     >
      <Text style={styles.buttonText}>Back to Login</Text>
     </TouchableOpacity>
    </View>
   </SafeAreaView>
  );
 }

 return (
  <SafeAreaView style={styles.container}>
   <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.keyboardView}
   >
    <View style={styles.content}>
     {/* Lock Icon */}
     <View style={styles.iconContainer}>
      <Ionicons name="shield-checkmark-outline" size={60} color="#3a5a40" />
     </View>

     {/* Title */}
     <Text style={styles.title}>Reset Password</Text>
     <Text style={styles.subtitle}>Enter your new password below.</Text>

     {/* New Password */}
     <View style={styles.inputContainer}>
      <Ionicons
       name="lock-closed-outline"
       size={20}
       color="#888"
       style={styles.inputIcon}
      />
      <TextInput
       style={styles.input}
       placeholder="New password (min. 6 characters)"
       placeholderTextColor="#999"
       value={newPassword}
       onChangeText={setNewPassword}
       secureTextEntry={!showPassword}
      />
     </View>

     {/* Confirm Password */}
     <View style={styles.inputContainer}>
      <Ionicons
       name="lock-closed-outline"
       size={20}
       color="#888"
       style={styles.inputIcon}
      />
      <TextInput
       style={styles.input}
       placeholder="Confirm new password"
       placeholderTextColor="#999"
       value={confirmPassword}
       onChangeText={setConfirmPassword}
       secureTextEntry={!showPassword}
      />
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
       <Ionicons
        name={showPassword ? "eye-off-outline" : "eye-outline"}
        size={20}
        color="#888"
       />
      </TouchableOpacity>
     </View>

     {/* Update Button */}
     <TouchableOpacity
      style={[styles.button, loading && styles.buttonDisabled]}
      onPress={handleUpdatePassword}
      activeOpacity={0.8}
      disabled={loading}
     >
      {loading ? (
       <ActivityIndicator color="#fefae0" />
      ) : (
       <Text style={styles.buttonText}>Update Password</Text>
      )}
     </TouchableOpacity>
    </View>
   </KeyboardAvoidingView>
  </SafeAreaView>
 );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: "#fefae0",
 },
 keyboardView: {
  flex: 1,
 },
 content: {
  flex: 1,
  paddingHorizontal: 30,
  paddingTop: 60,
 },

 iconContainer: {
  width: 100,
  height: 100,
  borderRadius: 50,
  backgroundColor: "rgba(58, 90, 64, 0.1)",
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
  marginBottom: 30,
 },

 title: {
  fontSize: 28,
  fontWeight: "700",
  color: "#3a5a40",
  textAlign: "center",
  marginBottom: 12,
 },
 subtitle: {
  fontSize: 15,
  color: "#666",
  textAlign: "center",
  lineHeight: 22,
  marginBottom: 30,
 },

 inputContainer: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  paddingHorizontal: 16,
  marginBottom: 16,
  borderWidth: 1,
  borderColor: "#E0E0E0",
  height: 52,
 },
 inputIcon: {
  marginRight: 12,
 },
 input: {
  flex: 1,
  fontSize: 16,
  color: "#333",
 },

 button: {
  backgroundColor: "#3a5a40",
  padding: 16,
  borderRadius: 12,
  alignItems: "center",
  marginTop: 10,
  shadowColor: "#000",
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.15,
  shadowRadius: 4,
  elevation: 3,
 },
 buttonText: {
  fontSize: 18,
  fontWeight: "600",
  color: "#fefae0",
  letterSpacing: 0.5,
 },
 buttonDisabled: {
  opacity: 0.7,
 },
});
