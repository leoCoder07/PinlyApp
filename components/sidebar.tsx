import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
 Alert,
 Image,
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
   {}
   <View style={styles.profileSection}>
    <TouchableOpacity
     style={styles.profileRow}
     onPress={() => {
      onClose();
      router.push("/profile");
     }}
     activeOpacity={0.7}
    >
     <View style={styles.profilePictureContainer}>
      <Image
       source={{
        uri: "https://i.pinimg.com/736x/20/d6/8c/20d68c7eecc4dd007a7741cdc4eee97d.jpg",
       }}
       style={styles.profilePicture}
      />
     </View>

     {}
     <View style={styles.profileInfo}>
      <Text style={styles.username}>April Anne</Text>
      <Text style={styles.viewProfile}>View Profile</Text>
     </View>
    </TouchableOpacity>
   </View>

   {}
   <View style={styles.divider} />

   {}
   <View style={styles.insideContainer}>
    <View style={styles.menuSection}>
     <TouchableOpacity
      style={styles.menuItem}
      onPress={() => router.push("/faqs")}
     >
      <Ionicons name="help-circle-outline" size={22} color="#3a5a40" />
      <Text style={styles.menuText}>FAQ's</Text>
     </TouchableOpacity>

     <TouchableOpacity
      style={styles.menuItem}
      onPress={() => router.push("/about")}
     >
      <Ionicons name="information-circle-outline" size={22} color="#3a5a40" />
      <Text style={styles.menuText}>About</Text>
     </TouchableOpacity>
    </View>

    {}

    {}
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

 profileSection: {
  paddingHorizontal: 20,
  paddingTop: 10,
  paddingBottom: 16,
 },
 profileRow: {
  flexDirection: "row",
  alignItems: "center",
 },
 profilePictureContainer: {},
 profilePicture: {
  width: 50,
  height: 50,
  borderRadius: 25,
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

 divider: {
  height: 1,
  backgroundColor: "#E8E8E8",
  marginHorizontal: 20,
 },

 insideContainer: {
  minHeight: "87%",
  justifyContent: "space-between",
 },

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
