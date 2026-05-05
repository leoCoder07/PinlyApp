import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
 Alert,
 SafeAreaView,
 StyleSheet,
 Text,
 TouchableOpacity,
 View,
} from "react-native";

interface SidebarProps {
 onClose: () => void;
}

export default function Sidebar({onClose}: SidebarProps) {
 const handleLogout = () => {
  Alert.alert("Log Out", "Are you sure you want to log out?", [
   {text: "Cancel", style: "cancel"},
   {
    text: "Log Out",
    style: "destructive",
    onPress: () => {
     onClose();
     router.replace("/auth");
    },
   },
  ]);
 };

 return (
  <SafeAreaView style={styles.container}>
   {/* ===== PROFILE SECTION ===== */}
   <View style={styles.profileSection}>
    <View style={styles.profileRow}>
     {/* Profile Picture Placeholder */}
     <View style={styles.profilePicture}>
      <Ionicons name="person" size={30} color="#999" />
     </View>

     {/* Username */}
     <View style={styles.profileInfo}>
      <Text style={styles.username}>Username</Text>
      <Text style={styles.viewProfile}>View Profile</Text>
     </View>

     {/* Settings Button */}
     <TouchableOpacity style={styles.settingsButton}>
      <Ionicons name="settings-outline" size={22} color="#3a5a40" />
     </TouchableOpacity>
    </View>
   </View>

   {/* ===== DIVIDER ===== */}
   <View style={styles.divider} />

   {/* ===== MENU ITEMS ===== */}
   <View style={styles.insideContainer}>
    <View style={styles.menuSection}>
     <TouchableOpacity style={styles.menuItem} onPress={onClose}>
      <Ionicons name="help-circle-outline" size={22} color="#3a5a40" />
      <Text style={styles.menuText}>FAQ's</Text>
     </TouchableOpacity>

     <TouchableOpacity style={styles.menuItem} onPress={onClose}>
      <Ionicons name="information-circle-outline" size={22} color="#3a5a40" />
      <Text style={styles.menuText}>About</Text>
     </TouchableOpacity>
    </View>

    {/* ===== SPACER ===== */}

    {/* ===== LOGOUT BUTTON ===== */}
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
     <Ionicons name="log-out-outline" size={22} color="#E74C3C" />
     <Text style={styles.logoutText}>Log Out</Text>
    </TouchableOpacity>
   </View>
  </SafeAreaView>
 );
}

const styles = StyleSheet.create({
 container: {
  backgroundColor: "#FFFFFF",
 },

 // Profile Section
 profileSection: {
  paddingHorizontal: 20,
  paddingTop: 10,
  paddingBottom: 16,
 },
 profileRow: {
  flexDirection: "row",
  alignItems: "center",
 },
 profilePicture: {
  width: 50,
  height: 50,
  borderRadius: 25,
  backgroundColor: "#F0F0F0",
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 2,
  borderColor: "#3a5a40",
 },
 profileInfo: {
  flex: 1,
  marginLeft: 12,
 },
 username: {
  fontSize: 16,
  fontWeight: "600",
  color: "#333",
 },
 viewProfile: {
  fontSize: 12,
  color: "#3a5a40",
  marginTop: 2,
 },
 settingsButton: {
  width: 36,
  height: 36,
  borderRadius: 18,
  backgroundColor: "#F5F5F5",
  justifyContent: "center",
  alignItems: "center",
 },

 // Divider
 divider: {
  height: 1,
  backgroundColor: "#E8E8E8",
  marginHorizontal: 20,
 },

 insideContainer: {
  minHeight: "87%",
  justifyContent: "space-between",
 },

 // Menu Items
 menuSection: {
  paddingHorizontal: 12,
  paddingTop: 16,
 },
 menuItem: {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 14,
  paddingHorizontal: 12,
  borderRadius: 12,
  marginBottom: 2,
 },
 menuText: {
  fontSize: 16,
  color: "#333",
  marginLeft: 14,
  fontWeight: "500",
 },

 // Logout
 logoutButton: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 16,
  paddingHorizontal: 24,
  marginHorizontal: 16,
  marginBottom: 20,
  borderRadius: 12,
  backgroundColor: "#FFF5F5",
 },
 logoutText: {
  fontSize: 16,
  color: "#E74C3C",
  marginLeft: 14,
  fontWeight: "600",
 },
});
