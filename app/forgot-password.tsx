import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
 ActivityIndicator,
 Alert,
 KeyboardAvoidingView,
 Platform,
 Pressable,
 StyleSheet,
 Text,
 TextInput,
 TouchableOpacity,
 View,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function ForgotPasswordScreen() {
 const [email, setEmail] = useState("");
 const [loading, setLoading] = useState(false);
 const [emailSent, setEmailSent] = useState(false);

 const [showTokenInput, setShowTokenInput] = useState(false);
 const [resetScreen, setResetScreen] = useState(false);

 async function handleResetPassword() {
  if (!email) {
   Alert.alert("Error", "Please enter your email address");
   return;
  }

  setLoading(true);

  const {error} = await supabase.auth.resetPasswordForEmail(email);

  setLoading(false);

  if (error) {
   Alert.alert("Error", error.message);
  } else {
   setEmailSent(true);
   Alert.alert(
    "Check Your Email",
    "We've sent a password reset link to " + email,
    [{text: "OK"}],
   );
   setShowTokenInput(true);
  }
 }

 function navigateToManualReset() {
  router.push({
   pathname: "/reset-password",
   params: {email: email},
  });
 }

 return (
  <Pressable style={styles.container}>
   <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.keyboardView}
   >
    <View style={styles.content}>
     {/* Icon */}
     <View style={styles.iconContainer}>
      <Ionicons name="lock-closed-outline" size={60} color="#3a5a40" />
     </View>

     {/* Title */}
     <Text style={styles.title}>Forgot Password?</Text>

     {/* Subtitle */}
     <Text style={styles.subtitle}>
      Enter your email address and we'll send you a link to reset your password.
     </Text>

     {/* Success Message */}
     {emailSent && (
      <View style={styles.successContainer}>
       <Ionicons name="checkmark-circle" size={20} color="#3a5a40" />
       <Text style={styles.successText}>
        Reset link sent! Check your inbox.
       </Text>
      </View>
     )}

     {/* Email Input */}
     <View style={styles.inputContainer}>
      <Ionicons
       name="mail-outline"
       size={20}
       color="#888"
       style={styles.inputIcon}
      />
      <TextInput
       style={styles.input}
       placeholder="Email address"
       placeholderTextColor="#999"
       value={email}
       onChangeText={setEmail}
       keyboardType="email-address"
       autoCapitalize="none"
       autoCorrect={false}
      />
     </View>

     {/* Send Reset Link Button */}
     <TouchableOpacity
      style={[styles.resetButton, loading && styles.buttonDisabled]}
      onPress={handleResetPassword}
      activeOpacity={0.8}
      disabled={loading}
     >
      {loading ? (
       <ActivityIndicator color="#fefae0" />
      ) : (
       <Text style={styles.resetButtonText}>Send Reset Link</Text>
      )}
     </TouchableOpacity>

     {/* Resend option */}
     {emailSent && (
      <TouchableOpacity
       style={styles.resendButton}
       onPress={handleResetPassword}
       disabled={loading}
      >
       <Text style={styles.resendText}>
        Didn't receive the email? <Text style={styles.resendLink}>Resend</Text>
       </Text>
      </TouchableOpacity>
     )}

     {/* Manual Reset Option (for Expo Go testing) */}
     {/* {showTokenInput && (
      <TouchableOpacity
       style={styles.manualResetButton}
       onPress={navigateToManualReset}
      >
       <Text style={styles.manualResetText}>
        🔧 Testing in Expo Go? Tap here to reset manually
       </Text>
      </TouchableOpacity>
     )} */}

     {/* Back to Login */}
     <TouchableOpacity
      style={styles.backToLoginButton}
      onPress={() => router.back()}
     >
      <Ionicons name="arrow-back" size={16} color="#3a5a40" />
      <Text style={styles.backToLoginText}>Back to Log In</Text>
     </TouchableOpacity>
    </View>
   </KeyboardAvoidingView>
  </Pressable>
 );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: "#fefae0",
 },
 keyboardView: {
  flex: 1,
  justifyContent: "center",
 },
 content: {
  paddingHorizontal: 30,
  paddingTop: 20,
 },

 // Back Button
 backButton: {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: "#FFFFFF",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 30,
  shadowColor: "#000",
  shadowOffset: {width: 0, height: 1},
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 2,
 },

 // Icon
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

 // Text
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
  paddingHorizontal: 10,
 },

 // Success Message
 successContainer: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(58, 90, 64, 0.1)",
  borderRadius: 12,
  padding: 14,
  marginBottom: 24,
  gap: 8,
 },
 successText: {
  fontSize: 14,
  color: "#3a5a40",
  fontWeight: "500",
 },

 // Input
 inputContainer: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  paddingHorizontal: 16,
  marginBottom: 24,
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

 // Reset Button
 resetButton: {
  backgroundColor: "#3a5a40",
  padding: 16,
  borderRadius: 12,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.15,
  shadowRadius: 4,
  elevation: 3,
 },
 resetButtonText: {
  fontSize: 18,
  fontWeight: "600",
  color: "#fefae0",
  letterSpacing: 0.5,
 },
 buttonDisabled: {
  opacity: 0.7,
 },

 // Resend
 resendButton: {
  alignItems: "center",
  marginTop: 20,
 },
 resendText: {
  fontSize: 14,
  color: "#666",
 },
 resendLink: {
  color: "#3a5a40",
  fontWeight: "600",
 },

 manualResetButton: {
  backgroundColor: "rgba(58, 90, 64, 0.1)",
  padding: 16,
  borderRadius: 12,
  alignItems: "center",
  marginTop: 16,
  borderWidth: 1,
  borderColor: "rgba(58, 90, 64, 0.3)",
  borderStyle: "dashed",
 },
 manualResetText: {
  fontSize: 14,
  color: "#3a5a40",
  fontWeight: "500",
 },

 // Back to Login
 backToLoginButton: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 40,
  gap: 6,
 },
 backToLoginText: {
  fontSize: 15,
  color: "#3a5a40",
  fontWeight: "500",
 },
});
