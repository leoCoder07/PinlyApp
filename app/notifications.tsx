import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
 Image,
 SafeAreaView,
 ScrollView,
 StatusBar,
 StyleSheet,
 Text,
 TouchableOpacity,
 View,
} from "react-native";

interface Notification {
 id: string;
 type: "save" | "like" | "comment" | "follow" | "mention";
 username: string;
 userAvatar: string;
 message: string;
 commentPreview?: string;
 imagePreview?: string;
 time: string;
 dateGroup: "today" | "thisWeek" | "earlier";
 isRead: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
 {
  id: "n1",
  type: "save",
  username: "Sarah Johnson",
  userAvatar:
   "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
  message: "saved your pin",
  imagePreview:
   "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200",
  time: "2 hours ago",
  dateGroup: "today",
  isRead: false,
 },
 {
  id: "n2",
  type: "comment",
  username: "Michael Chen",
  userAvatar:
   "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
  message: "commented on your pin",
  commentPreview: "This looks amazing! Where did you get this?",
  imagePreview:
   "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=200",
  time: "3 hours ago",
  dateGroup: "today",
  isRead: false,
 },
 {
  id: "n3",
  type: "follow",
  username: "Emily Rodriguez",
  userAvatar:
   "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
  message: "started following you",
  time: "5 hours ago",
  dateGroup: "today",
  isRead: true,
 },
 {
  id: "n4",
  type: "like",
  username: "Alex Thompson",
  userAvatar:
   "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
  message: "liked your pin",
  imagePreview:
   "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=200",
  time: "8 hours ago",
  dateGroup: "today",
  isRead: true,
 },

 {
  id: "n5",
  type: "save",
  username: "Jessica Park",
  userAvatar:
   "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
  message: "saved your pin to Home Decor board",
  imagePreview:
   "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200",
  time: "1 day ago",
  dateGroup: "thisWeek",
  isRead: true,
 },
 {
  id: "n6",
  type: "mention",
  username: "David Kim",
  userAvatar:
   "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
  message: "mentioned you in a comment",
  commentPreview: "@johndoe check out this style!",
  imagePreview:
   "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=200",
  time: "2 days ago",
  dateGroup: "thisWeek",
  isRead: true,
 },
 {
  id: "n7",
  type: "follow",
  username: "Lisa Wang",
  userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
  message: "started following you",
  time: "3 days ago",
  dateGroup: "thisWeek",
  isRead: true,
 },

 {
  id: "n8",
  type: "like",
  username: "Chris Martin",
  userAvatar:
   "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
  message: "liked your pin",
  imagePreview:
   "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=200",
  time: "1 week ago",
  dateGroup: "earlier",
  isRead: true,
 },
 {
  id: "n9",
  type: "save",
  username: "Rachel Green",
  userAvatar:
   "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100",
  message: "saved 3 of your pins",
  time: "2 weeks ago",
  dateGroup: "earlier",
  isRead: true,
 },
];

export default function NotificationsScreen() {
 const [notifications, setNotifications] =
  useState<Notification[]>(MOCK_NOTIFICATIONS);

 const markAsRead = (id: string) => {
  setNotifications((prev) =>
   prev.map((n) => (n.id === id ? {...n, isRead: true} : n)),
  );
 };

 const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
   case "save":
    return {icon: "bookmark", color: "#E74C3C", bg: "#FFF0F0"};
   case "like":
    return {icon: "heart", color: "#E74C3C", bg: "#FFF0F0"};
   case "comment":
    return {icon: "chatbubble", color: "#3498DB", bg: "#F0F7FF"};
   case "follow":
    return {icon: "person-add", color: "#2ECC71", bg: "#F0FFF5"};
   case "mention":
    return {icon: "at", color: "#9B59B6", bg: "#F8F0FF"};
   default:
    return {icon: "notifications", color: "#888", bg: "#F5F5F5"};
  }
 };

 const today = notifications.filter((n) => n.dateGroup === "today");
 const thisWeek = notifications.filter((n) => n.dateGroup === "thisWeek");
 const earlier = notifications.filter((n) => n.dateGroup === "earlier");

 const renderNotificationCard = (notification: Notification) => {
  const typeIcon = getNotificationIcon(notification.type);

  return (
   <TouchableOpacity
    key={notification.id}
    style={[
     styles.notificationCard,
     !notification.isRead && styles.notificationCardUnread,
    ]}
    onPress={() => markAsRead(notification.id)}
    activeOpacity={0.7}
   >
    {}
    <Image source={{uri: notification.userAvatar}} style={styles.avatar} />

    {}
    <View style={styles.notificationContent}>
     {}
     <View style={styles.notificationTop}>
      <View style={styles.notificationTextContainer}>
       <Text style={styles.notificationMessage}>
        <Text style={styles.username}>{notification.username}</Text>{" "}
        {notification.message}
       </Text>
       {notification.commentPreview && (
        <Text style={styles.commentPreview} numberOfLines={2}>
         "{notification.commentPreview}"
        </Text>
       )}
      </View>

      {}
      <View style={[styles.typeIconContainer, {backgroundColor: typeIcon.bg}]}>
       <Ionicons name={typeIcon.icon as any} size={16} color={typeIcon.color} />
      </View>
     </View>

     {}
     <View style={styles.notificationBottom}>
      <Text style={styles.timeText}>{notification.time}</Text>
      {!notification.isRead && <View style={styles.unreadDot} />}
     </View>
    </View>

    {}
    {notification.imagePreview && (
     <Image
      source={{uri: notification.imagePreview}}
      style={styles.previewImage}
     />
    )}
   </TouchableOpacity>
  );
 };

 return (
  <SafeAreaView style={styles.container}>
   <StatusBar barStyle="dark-content" backgroundColor="#fefae0" />

   {}
   <View style={styles.header}>
    <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
     <Ionicons name="arrow-back" size={24} color="#3a5a40" />
    </TouchableOpacity>

    <Text style={styles.headerTitle}>Notifications</Text>

    {}
    <TouchableOpacity
     style={styles.headerButton}
     onPress={() =>
      setNotifications((prev) => prev.map((n) => ({...n, isRead: true})))
     }
    >
     <Ionicons name="checkmark-done-outline" size={22} color="#3a5a40" />
    </TouchableOpacity>
   </View>

   {}
   <ScrollView
    style={styles.scrollView}
    contentContainerStyle={styles.scrollContent}
    showsVerticalScrollIndicator={false}
   >
    {}
    {today.length > 0 && (
     <>
      <Text style={styles.sectionHeader}>Today</Text>
      {today.map(renderNotificationCard)}
     </>
    )}

    {}
    {thisWeek.length > 0 && (
     <>
      <Text style={styles.sectionHeader}>This Week</Text>
      {thisWeek.map(renderNotificationCard)}
     </>
    )}

    {}
    {earlier.length > 0 && (
     <>
      <Text style={styles.sectionHeader}>Earlier</Text>
      {earlier.map(renderNotificationCard)}
     </>
    )}

    <View style={{height: 30}} />
   </ScrollView>
  </SafeAreaView>
 );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: "#fefae0",
 },

 header: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 16,
  paddingVertical: 12,
  backgroundColor: "#fefae0",
  borderBottomWidth: 1,
  borderBottomColor: "#E8E8E8",
 },
 headerButton: {
  width: 40,
  height: 40,
  borderRadius: 12,
  backgroundColor: "#FFFFFF",
  justifyContent: "center",
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {width: 0, height: 1},
  shadowOpacity: 0.08,
  shadowRadius: 4,
  elevation: 2,
 },
 headerTitle: {
  fontSize: 22,
  fontWeight: "700",
  color: "#3a5a40",
  letterSpacing: 0.5,
 },

 scrollView: {
  flex: 1,
 },
 scrollContent: {
  paddingHorizontal: 16,
  paddingTop: 16,
 },

 sectionHeader: {
  fontSize: 14,
  fontWeight: "600",
  color: "#888",
  marginBottom: 12,
  marginTop: 8,
  letterSpacing: 0.5,
 },

 notificationCard: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  borderRadius: 14,
  padding: 14,
  marginBottom: 8,
  shadowColor: "#000",
  shadowOffset: {width: 0, height: 1},
  shadowOpacity: 0.04,
  shadowRadius: 3,
  elevation: 1,
 },
 notificationCardUnread: {
  backgroundColor: "#F8FAF8",
  borderLeftWidth: 3,
  borderLeftColor: "#3a5a40",
 },
 avatar: {
  width: 46,
  height: 46,
  borderRadius: 23,
  backgroundColor: "#E0E0E0",
 },

 notificationContent: {
  flex: 1,
  marginLeft: 12,
  marginRight: 8,
 },
 notificationTop: {
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "space-between",
 },
 notificationTextContainer: {
  flex: 1,
  marginRight: 8,
 },
 notificationMessage: {
  fontSize: 14,
  color: "#333",
  lineHeight: 19,
 },
 username: {
  fontWeight: "700",
  color: "#1a1a1a",
 },
 commentPreview: {
  fontSize: 13,
  color: "#777",
  fontStyle: "italic",
  marginTop: 4,
  lineHeight: 18,
 },

 typeIconContainer: {
  width: 30,
  height: 30,
  borderRadius: 15,
  justifyContent: "center",
  alignItems: "center",
 },

 notificationBottom: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 8,
  gap: 8,
 },
 timeText: {
  fontSize: 12,
  color: "#AAA",
 },
 unreadDot: {
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: "#3a5a40",
 },

 previewImage: {
  width: 50,
  height: 50,
  borderRadius: 10,
  backgroundColor: "#E0E0E0",
 },
});
