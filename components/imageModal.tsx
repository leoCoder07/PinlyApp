import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
 Dimensions,
 Image,
 SafeAreaView,
 ScrollView,
 StyleSheet,
 Text,
 TouchableOpacity,
 View,
} from "react-native";

const {width} = Dimensions.get("window");

interface ImageModalProps {
 image: {
  id: string;
  url: string;
  title: string;
  description: string;
  username: string;
  likes: number;
 };
 onClose: () => void;
 isFavorited?: boolean;
 onToggleFavorite?: () => void;
}

export default function ImageModal({
 image,
 onClose,
 isFavorited = false,
 onToggleFavorite,
}: ImageModalProps) {
 const [saved, setSaved] = useState(false);
 const [liked, setLiked] = useState(isFavorited);

 const handleHeartPress = () => {
  if (onToggleFavorite) {
   onToggleFavorite();
  }
  setLiked(!liked);
 };

 return (
  <SafeAreaView style={styles.container}>
   {}

   <ScrollView
    contentContainerStyle={styles.scrollContent}
    showsVerticalScrollIndicator={false}
   >
    {}
    <Image
     source={{uri: image.url}}
     style={styles.mainImage}
     resizeMode="cover"
    />

    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
     <Ionicons name="close" size={28} color="#FFF" />
    </TouchableOpacity>
    {}
    <View style={styles.actionsContainer}>
     <View style={styles.leftActions}>
      <TouchableOpacity style={styles.actionButton} onPress={handleHeartPress}>
       <Ionicons
        name={liked ? "heart" : "heart-outline"}
        size={26}
        color={liked ? "#E74C3C" : "#3a5a40"}
       />
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton}>
       <Ionicons name="chatbubble-outline" size={24} color="#3a5a40" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton}>
       <Ionicons name="share-outline" size={24} color="#3a5a40" />
      </TouchableOpacity>
     </View>

     <TouchableOpacity
      style={styles.actionButton}
      onPress={() => setSaved(!saved)}
     >
      <Ionicons
       name={saved ? "bookmark" : "bookmark-outline"}
       size={26}
       color={saved ? "#3a5a40" : "#3a5a40"}
      />
     </TouchableOpacity>
    </View>

    {}
    <Text style={styles.likesCount}>{image.likes.toLocaleString()} likes</Text>

    {}
    <View style={styles.infoContainer}>
     <Text style={styles.imageTitle}>{image.title}</Text>
     <Text style={styles.imageDescription}>{image.description}</Text>
     <Text style={styles.uploadedBy}>
      Uploaded by <Text style={styles.username}>@{image.username}</Text>
     </Text>
    </View>

    {}
    <TouchableOpacity style={styles.downloadButton} activeOpacity={0.8}>
     <Ionicons name="download-outline" size={20} color="#FFF" />
     <Text style={styles.downloadText}>Download</Text>
    </TouchableOpacity>
   </ScrollView>
  </SafeAreaView>
 );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: "#1a1a1a",
 },
 scrollContent: {
  paddingBottom: 40,
 },

 closeButton: {
  position: "absolute",
  top: 16,
  left: 16,
  zIndex: 10,
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  justifyContent: "center",
  alignItems: "center",
 },

 mainImage: {
  width: width,
  height: width,
 },

 actionsContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: 16,
  paddingVertical: 12,
 },
 leftActions: {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
 },
 actionButton: {
  width: 40,
  height: 40,
  borderRadius: 20,
  justifyContent: "center",
  alignItems: "center",
 },

 likesCount: {
  fontSize: 15,
  fontWeight: "600",
  color: "#FFF",
  paddingHorizontal: 16,
  marginBottom: 12,
 },

 infoContainer: {
  paddingHorizontal: 16,
  marginBottom: 24,
 },
 imageTitle: {
  fontSize: 20,
  fontWeight: "700",
  color: "#FFF",
  marginBottom: 8,
 },
 imageDescription: {
  fontSize: 15,
  color: "#CCC",
  lineHeight: 22,
  marginBottom: 8,
 },
 uploadedBy: {
  fontSize: 13,
  color: "#999",
 },
 username: {
  color: "#3a5a40",
  fontWeight: "600",
 },

 downloadButton: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#3a5a40",
  marginHorizontal: 16,
  paddingVertical: 14,
  borderRadius: 14,
  gap: 8,
 },
 downloadText: {
  fontSize: 16,
  fontWeight: "600",
  color: "#FFF",
 },
});
