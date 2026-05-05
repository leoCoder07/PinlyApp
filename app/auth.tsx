import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
 Alert,
 KeyboardAvoidingView,
 Platform,
 ScrollView,
 StyleSheet,
 Text,
 TextInput,
 TouchableOpacity,
 View,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function AuthScreen() {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [username, setUsername] = useState("");
 const [isLogin, setIsLogin] = useState(false);
 const [showPassword, setShowPassword] = useState(false);
 const [loading, setLoading] = useState(false);

 async function signUpWithEmail() {
  if (!email || !password) {
   Alert.alert("Error", "Please fill in email and password");
   return;
  }

  setLoading(true);

  const {data: authData, error: authError} = await supabase.auth.signUp({
   email: email,
   password: password,
  });

  if (authError) {
   Alert.alert("Sign Up Failed", authError.message);
   setLoading(false);
   return;
  }

  if (authData.user) {
   const {error: profileError} = await supabase.from("profiles").insert([
    {
     id: authData.user.id,
     username: username || email.split("@")[0],
     email: email,
    },
   ]);

   if (profileError) {
    Alert.alert("Profile Error", profileError.message);
   } else {
    Alert.alert("Success!", "Account created! Check your email to confirm.", [
     {text: "OK", onPress: () => router.push("/home" as any)},
    ]);
   }
  }

  setLoading(false);
 }

 async function signInWithEmail() {
  if (!email || !password) {
   Alert.alert("Error", "Please fill in email and password");
   return;
  }

  setLoading(true);

  const {data, error} = await supabase.auth.signInWithPassword({
   email: email,
   password: password,
  });

  if (error) {
   Alert.alert("Login Failed", error.message);
  } else {
   router.push("/home" as any);
  }

  setLoading(false);
 }

 async function handleContinue() {
  if (isLogin) {
   await signInWithEmail();
  } else {
   await signUpWithEmail();
  }
 }

 return (
  <View style={styles.container}>
   <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.keyboardView}
   >
    <ScrollView
     contentContainerStyle={styles.scrollContent}
     showsVerticalScrollIndicator={false}
    >
     <View style={styles.insideContainer}>
      {}
      <Text style={styles.title}>{isLogin ? "Log In" : "Sign Up"}</Text>

      <View style={styles.inputContainer}>
       <Ionicons
        name="mail-outline"
        size={20}
        color="#888"
        style={styles.inputIcon}
       />
       <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
       />
      </View>

      {}
      <View style={styles.inputContainer}>
       <Ionicons
        name="lock-closed-outline"
        size={20}
        color="#888"
        style={styles.inputIcon}
       />
       <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
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

      {}
      {!isLogin && (
       <View style={styles.inputContainer}>
        <Ionicons
         name="person-outline"
         size={20}
         color="#888"
         style={styles.inputIcon}
        />
        <TextInput
         style={styles.input}
         placeholder="Username (optional)"
         placeholderTextColor="#999"
         value={username}
         onChangeText={setUsername}
         autoCapitalize="none"
        />
       </View>
      )}

      {}
      <TouchableOpacity
       style={styles.continueButton}
       onPress={handleContinue}
       activeOpacity={0.8}
      >
       <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>

      {}
      <View style={styles.orContainer}>
       <View style={styles.orLine} />
       <Text style={styles.orText}>OR</Text>
       <View style={styles.orLine} />
      </View>

      {}
      <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
       <Ionicons
        name="logo-google"
        size={20}
        color="#DB4437"
        style={styles.socialIcon}
       />
       <Text style={styles.socialButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      {}
      <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
       <Ionicons
        name="logo-facebook"
        size={20}
        color="#4267B2"
        style={styles.socialIcon}
       />
       <Text style={styles.socialButtonText}>Continue with Facebook</Text>
      </TouchableOpacity>

      {}
      <View style={styles.bottomLinks}>
       <TouchableOpacity onPress={() => router.push("/forgot-password")}>
        <Text style={styles.linkText}>Forgot password?</Text>
       </TouchableOpacity>

       <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.linkText}>
         {isLogin
          ? "Don't have an account? Sign up"
          : "Already have an account? Log in"}
        </Text>
       </TouchableOpacity>
      </View>
     </View>
    </ScrollView>
   </KeyboardAvoidingView>

   {}
   {/* <View style={styles.tabBar}>
    <TouchableOpacity style={styles.tabItem}>
     <Ionicons name="home-outline" size={24} color="#888" />
     <Text style={styles.tabLabel}>Home</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.tabItem}>
     <Ionicons name="grid-outline" size={24} color="#888" />
     <Text style={styles.tabLabel}>Boards</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.tabItem}>
     <Ionicons name="add-circle-outline" size={24} color="#888" />
     <Text style={styles.tabLabel}>Create</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.tabItem}>
     <Ionicons name="heart-outline" size={24} color="#888" />
     <Text style={styles.tabLabel}>Favorites</Text>
    </TouchableOpacity>
   </View> */}
  </View>
 );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: "#fefae0",
 },
 keyboardView: {
  flex: 1,
  paddingVertical: 30,
 },
 scrollContent: {
  flexGrow: 1,
  paddingHorizontal: 30,
  justifyContent: "center",
 },
 insideContainer: {},

 title: {
  fontSize: 28,
  fontWeight: "700",
  color: "#3a5a40",
  textAlign: "center",
  marginBottom: 40,
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

 continueButton: {
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
 continueButtonText: {
  fontSize: 18,
  fontWeight: "600",
  color: "#fefae0",
  letterSpacing: 0.5,
 },

 orContainer: {
  flexDirection: "row",
  alignItems: "center",
  marginVertical: 30,
 },
 orLine: {
  flex: 1,
  height: 1,
  backgroundColor: "#CCC",
 },
 orText: {
  marginHorizontal: 16,
  fontSize: 14,
  color: "#888",
  fontWeight: "500",
 },

 socialButton: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#FFFFFF",
  padding: 14,
  borderRadius: 12,
  marginBottom: 12,
  borderWidth: 1,
  borderColor: "#E0E0E0",
 },
 socialIcon: {
  marginRight: 10,
 },
 socialButtonText: {
  fontSize: 16,
  fontWeight: "500",
  color: "#333",
 },

 bottomLinks: {
  alignItems: "center",
  marginTop: 30,
  gap: 12,
 },
 linkText: {
  fontSize: 14,
  color: "#3a5a40",
  fontWeight: "500",
 },
});
