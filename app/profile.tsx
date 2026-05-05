import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
 Dimensions,
 Image,
 Modal,
 SafeAreaView,
 ScrollView,
 StatusBar,
 StyleSheet,
 Text,
 TouchableOpacity,
 View,
} from "react-native";
import ImageModal from "../components/imageModal";

const {width} = Dimensions.get("window");
const CARD_GAP = 12;

const BOARD_INFO: Record<string, {label: string; icon: string; color: string}> =
 {
  "home-decor": {label: "Home Decor", icon: "home-outline", color: "#E8D5B7"},
  "travel-inspo": {
   label: "Travel Inspo",
   icon: "airplane-outline",
   color: "#B7D5E8",
  },
  outfits: {label: "Outfits", icon: "shirt-outline", color: "#D5B7E8"},
  "dreamy-sunsets": {
   label: "Dreamy Sunsets",
   icon: "sunny-outline",
   color: "#E8B7B7",
  },
  "cozy-spaces": {label: "Cozy Spaces", icon: "bed-outline", color: "#B7E8C8"},
  recipes: {label: "Recipes", icon: "restaurant-outline", color: "#E8D5B7"},
  aesthetics: {
   label: "Aesthetics",
   icon: "color-palette-outline",
   color: "#E8B7D5",
  },
  products: {label: "Products", icon: "bag-outline", color: "#B7E8E8"},
 };

interface FavoriteImage {
 id: string;
 url: string;
 title: string;
 description: string;
 username: string;
 likes: number;
 boardId: string;
}

const MOCK_USER = {
 id: "user123",
 username: "April Anne",
 handle: "@april-Anne",
 profilePicture:
  "https://i.pinimg.com/736x/20/d6/8c/20d68c7eecc4dd007a7741cdc4eee97d.jpg",
 bio: `A girl who loves to watch kdrama movies or series ${"\n"} I also like to scroll and watch random videos`,
 pinsCount: 128,
 boardsCount: 8,
 followersCount: 1200,
};

const MOCK_FAVORITES: FavoriteImage[] = [
 {
  id: "fav1",
  url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
  title: "Modern Living Room",
  description: "Clean lines and natural light.",
  username: "johndoe",
  likes: 234,
  boardId: "home-decor",
 },
 {
  id: "fav2",
  url: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400",
  title: "Cozy Bedroom",
  description: "Minimalist bedroom with warm tones.",
  username: "johndoe",
  likes: 189,
  boardId: "home-decor",
 },
 {
  id: "fav3",
  url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400",
  title: "Paris Sunset",
  description: "Eiffel Tower at golden hour.",
  username: "johndoe",
  likes: 456,
  boardId: "travel-inspo",
 },
 {
  id: "fav4",
  url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400",
  title: "Beach Vibes",
  description: "Golden hour at the beach.",
  username: "johndoe",
  likes: 312,
  boardId: "dreamy-sunsets",
 },
 {
  id: "fav5",
  url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
  title: "Healthy Bowl",
  description: "Delicious recipe idea.",
  username: "johndoe",
  likes: 543,
  boardId: "recipes",
 },
 {
  id: "fav6",
  url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
  title: "Minimal Watch",
  description: "Product photography.",
  username: "johndoe",
  likes: 167,
  boardId: "products",
 },
];

export default function ProfileScreen() {
 const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
 const [selectedImage, setSelectedImage] = useState<FavoriteImage | null>(null);
 const [modalVisible, setModalVisible] = useState(false);
 const [isFollowing, setIsFollowing] = useState(false);

 const groupedFavorites = MOCK_FAVORITES.reduce<
  Record<string, FavoriteImage[]>
 >((acc, item) => {
  if (!acc[item.boardId]) {
   acc[item.boardId] = [];
  }
  acc[item.boardId].push(item);
  return acc;
 }, {});

 const openImageDetail = (image: FavoriteImage) => {
  setSelectedImage(image);
  setModalVisible(true);
 };

 const getBoardFavorites = (boardId: string) => {
  return groupedFavorites[boardId] || [];
 };

 return (
  <SafeAreaView style={styles.container}>
   <StatusBar barStyle="dark-content" backgroundColor="#fefae0" />

   {}
   <View style={styles.header}>
    {}
    <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
     <Ionicons name="arrow-back" size={24} color="#3a5a40" />
    </TouchableOpacity>

    <Text style={styles.headerTitle}>Profile</Text>

    <View style={styles.spacerHeader}></View>
   </View>

   <ScrollView
    style={styles.scrollView}
    contentContainerStyle={styles.scrollContent}
    showsVerticalScrollIndicator={false}
   >
    {}
    <View style={styles.profileSection}>
     {}
     <View style={styles.profilePictureContainer}>
      <Image
       source={{uri: MOCK_USER.profilePicture}}
       style={styles.profilePicture}
      />
      {}
      <View style={styles.cameraBadge}>
       <Ionicons name="camera" size={14} color="#FFF" />
      </View>
     </View>

     {}
     <Text style={styles.username}>{MOCK_USER.username}</Text>
     <Text style={styles.handle}>{MOCK_USER.handle}</Text>

     {}
     <Text style={styles.bio}>{MOCK_USER.bio}</Text>

     {}
     <TouchableOpacity
      style={[styles.followButton, isFollowing && styles.followingButton]}
      onPress={() => setIsFollowing(!isFollowing)}
      activeOpacity={0.8}
     >
      <Ionicons
       name={isFollowing ? "checkmark" : "person-add-outline"}
       size={18}
       color={isFollowing ? "#3a5a40" : "#FFF"}
      />
      <Text
       style={[
        styles.followButtonText,
        isFollowing && styles.followingButtonText,
       ]}
      >
       {isFollowing ? "Following" : "Follow"}
      </Text>
     </TouchableOpacity>
    </View>

    {}
    <View style={styles.statsBar}>
     <View style={styles.statItem}>
      <Text style={styles.statNumber}>{MOCK_USER.pinsCount}</Text>
      <Text style={styles.statLabel}>Pins</Text>
     </View>
     <View style={styles.statDivider} />
     <View style={styles.statItem}>
      <Text style={styles.statNumber}>{MOCK_USER.boardsCount}</Text>
      <Text style={styles.statLabel}>Boards</Text>
     </View>
     <View style={styles.statDivider} />
     <View style={styles.statItem}>
      <Text style={styles.statNumber}>
       {MOCK_USER.followersCount >= 1000
        ? `${(MOCK_USER.followersCount / 1000).toFixed(1)}K`
        : MOCK_USER.followersCount}
      </Text>
      <Text style={styles.statLabel}>Followers</Text>
     </View>
    </View>

    {}
    <TouchableOpacity style={styles.editProfileButton} activeOpacity={0.8}>
     <Ionicons name="create-outline" size={18} color="#3a5a40" />
     <Text style={styles.editProfileText}>Edit Profile</Text>
    </TouchableOpacity>

    {}
    {!selectedBoard ? (
     <>
      {}
      <View style={styles.sectionHeader}>
       <Text style={styles.sectionTitle}>My Boards</Text>
       <Text style={styles.sectionCount}>
        {Object.keys(groupedFavorites).length} boards
       </Text>
      </View>

      {}
      {Object.entries(groupedFavorites).map(([boardId, images]) => {
       const board = BOARD_INFO[boardId];
       if (!board || images.length === 0) return null;

       const previewImage = images[0];

       return (
        <TouchableOpacity
         key={boardId}
         style={styles.boardBox}
         onPress={() => setSelectedBoard(boardId)}
         activeOpacity={0.9}
        >
         {}
         <View style={styles.boardBoxHeader}>
          <View style={[styles.boardIcon, {backgroundColor: board.color}]}>
           <Ionicons name={board.icon as any} size={18} color="#3a5a40" />
          </View>
          <View style={styles.boardBoxTitleContainer}>
           <Text style={styles.boardBoxTitle}>{board.label}</Text>
           <Text style={styles.boardBoxCount}>
            {images.length} {images.length === 1 ? "pin" : "pins"}
           </Text>
          </View>
          <Ionicons
           name="chevron-forward"
           size={20}
           color="#CCC"
           style={styles.chevronForward}
          />
         </View>

         {}
         <View style={styles.previewImageContainer}>
          <Image
           source={{uri: previewImage.url}}
           style={styles.previewImage}
           resizeMode="cover"
          />
          <View style={styles.previewHeartBadge}>
           <Ionicons name="heart" size={14} color="#E74C3C" />
          </View>
          <View style={styles.previewOverlay}>
           <Text style={styles.previewTitle} numberOfLines={1}>
            {previewImage.title}
           </Text>
           {images.length > 1 && (
            <Text style={styles.previewMore}>+{images.length - 1} more</Text>
           )}
          </View>
         </View>
        </TouchableOpacity>
       );
      })}
     </>
    ) : (
     <>
      {}
      <View style={styles.boardDetailHeader}>
       <TouchableOpacity
        style={styles.backToBoardsButton}
        onPress={() => setSelectedBoard(null)}
       >
        <Ionicons name="arrow-back" size={20} color="#3a5a40" />
        <Text style={styles.backToBoardsText}>All Boards</Text>
       </TouchableOpacity>

       <View
        style={[
         styles.boardDetailIconLarge,
         {backgroundColor: BOARD_INFO[selectedBoard]?.color || "#E8D5B7"},
        ]}
       >
        <Ionicons
         name={(BOARD_INFO[selectedBoard]?.icon || "grid-outline") as any}
         size={28}
         color="#3a5a40"
        />
       </View>
       <Text style={styles.boardDetailTitle}>
        {BOARD_INFO[selectedBoard]?.label}
       </Text>
       <Text style={styles.boardDetailCount}>
        {getBoardFavorites(selectedBoard).length}{" "}
        {getBoardFavorites(selectedBoard).length === 1 ? "pin" : "pins"}
       </Text>
      </View>

      {}
      <View style={styles.imageGrid}>
       <View style={styles.column}>
        {getBoardFavorites(selectedBoard)
         .filter((_, i) => i % 2 === 0)
         .map((image) => (
          <TouchableOpacity
           key={image.id}
           style={styles.imageCard}
           onPress={() => openImageDetail(image)}
           activeOpacity={0.9}
          >
           <Image
            source={{uri: image.url}}
            style={styles.cardImage}
            resizeMode="cover"
           />
           <View style={styles.heartBadge}>
            <Ionicons name="heart" size={14} color="#E74C3C" />
           </View>
           <View style={styles.cardOverlay}>
            <Text style={styles.cardTitle} numberOfLines={1}>
             {image.title}
            </Text>
           </View>
          </TouchableOpacity>
         ))}
       </View>
       <View style={styles.column}>
        {getBoardFavorites(selectedBoard)
         .filter((_, i) => i % 2 !== 0)
         .map((image) => (
          <TouchableOpacity
           key={image.id}
           style={styles.imageCard}
           onPress={() => openImageDetail(image)}
           activeOpacity={0.9}
          >
           <Image
            source={{uri: image.url}}
            style={styles.cardImage}
            resizeMode="cover"
           />
           <View style={styles.heartBadge}>
            <Ionicons name="heart" size={14} color="#E74C3C" />
           </View>
           <View style={styles.cardOverlay}>
            <Text style={styles.cardTitle} numberOfLines={1}>
             {image.title}
            </Text>
           </View>
          </TouchableOpacity>
         ))}
       </View>
      </View>
     </>
    )}

    <View style={{height: 40}} />
   </ScrollView>

   {}
   <Modal
    visible={modalVisible}
    animationType="slide"
    transparent={false}
    onRequestClose={() => setModalVisible(false)}
   >
    {selectedImage && (
     <ImageModal
      image={selectedImage}
      onClose={() => setModalVisible(false)}
      isFavorited={true}
     />
    )}
   </Modal>
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
 spacerHeader: {
  width: 40,
  height: 40,
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
  paddingHorizontal: 20,
  paddingTop: 20,
 },

 profileSection: {
  alignItems: "center",
  marginBottom: 20,
 },
 profilePictureContainer: {
  position: "relative",
  marginBottom: 16,
 },
 profilePicture: {
  width: 100,
  height: 100,
  borderRadius: 50,
  borderWidth: 3,
  borderColor: "#3a5a40",
 },
 cameraBadge: {
  position: "absolute",
  bottom: 0,
  right: 0,
  width: 30,
  height: 30,
  borderRadius: 15,
  backgroundColor: "#3a5a40",
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 2,
  borderColor: "#FFF",
 },
 username: {
  fontSize: 22,
  fontWeight: "700",
  color: "#1a1a1a",
  marginBottom: 4,
 },
 handle: {
  fontSize: 14,
  color: "#888",
  marginBottom: 12,
 },
 bio: {
  fontSize: 14,
  color: "#555",
  textAlign: "center",
  lineHeight: 20,
  paddingHorizontal: 20,
  marginBottom: 18,
 },

 followButton: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#3a5a40",
  paddingVertical: 10,
  paddingHorizontal: 28,
  borderRadius: 20,
  gap: 6,
  shadowColor: "#3a5a40",
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 3,
 },
 followingButton: {
  backgroundColor: "#FFFFFF",
  borderWidth: 1.5,
  borderColor: "#3a5a40",
 },
 followButtonText: {
  fontSize: 14,
  fontWeight: "600",
  color: "#FFF",
 },
 followingButtonText: {
  color: "#3a5a40",
 },

 statsBar: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  borderRadius: 16,
  paddingVertical: 16,
  marginBottom: 20,
  shadowColor: "#000",
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.06,
  shadowRadius: 6,
  elevation: 2,
 },
 statItem: {
  flex: 1,
  alignItems: "center",
 },
 statNumber: {
  fontSize: 20,
  fontWeight: "700",
  color: "#1a1a1a",
  marginBottom: 2,
 },
 statLabel: {
  fontSize: 12,
  color: "#888",
  fontWeight: "500",
 },
 statDivider: {
  width: 1,
  height: 30,
  backgroundColor: "#E8E8E8",
 },

 editProfileButton: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#FFFFFF",
  paddingVertical: 12,
  borderRadius: 12,
  marginBottom: 28,
  borderWidth: 1,
  borderColor: "#E0E0E0",
  gap: 8,
 },
 editProfileText: {
  fontSize: 15,
  fontWeight: "600",
  color: "#3a5a40",
 },

 sectionHeader: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 16,
 },
 sectionTitle: {
  fontSize: 18,
  fontWeight: "700",
  color: "#1a1a1a",
 },
 sectionCount: {
  fontSize: 13,
  color: "#999",
 },

 boardBox: {
  backgroundColor: "#fae0e4",
  borderRadius: 16,
  borderWidth: 1,
  borderColor: "#ff99ac",
  padding: 5,
  marginBottom: 16,
  shadowColor: "#000",
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 3,
  overflow: "hidden",
 },
 boardBoxHeader: {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 14,
  paddingVertical: 12,
 },
 boardIcon: {
  width: 36,
  height: 36,
  borderRadius: 18,
  justifyContent: "center",
  alignItems: "center",
  marginRight: 10,
 },
 boardBoxTitleContainer: {
  flex: 1,
 },
 boardBoxTitle: {
  fontSize: 16,
  fontWeight: "700",
  color: "#1a1a1a",
 },
 boardBoxCount: {
  fontSize: 12,
  color: "#800f2f",
  marginTop: 1,
 },
 chevronForward: {
  color: "#800f2f",
 },
 previewImageContainer: {
  position: "relative",
  marginHorizontal: 4,
  marginBottom: 4,
  borderRadius: 12,
  overflow: "hidden",
 },
 previewImage: {
  width: "100%",
  height: 180,
  backgroundColor: "#E0E0E0",
 },
 previewHeartBadge: {
  position: "absolute",
  top: 10,
  right: 10,
  width: 28,
  height: 28,
  borderRadius: 14,
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  justifyContent: "center",
  alignItems: "center",
 },
 previewOverlay: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  paddingHorizontal: 12,
  paddingVertical: 10,
 },
 previewTitle: {
  fontSize: 14,
  fontWeight: "600",
  color: "#FFF",
  marginBottom: 2,
 },
 previewMore: {
  fontSize: 12,
  color: "#CCC",
 },

 boardDetailHeader: {
  alignItems: "center",
  paddingVertical: 10,
  marginBottom: 16,
 },
 backToBoardsButton: {
  flexDirection: "row",
  alignItems: "center",
  alignSelf: "flex-start",
  marginBottom: 16,
  gap: 4,
 },
 backToBoardsText: {
  fontSize: 14,
  color: "#3a5a40",
  fontWeight: "500",
 },
 boardDetailIconLarge: {
  width: 64,
  height: 64,
  borderRadius: 32,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 14,
 },
 boardDetailTitle: {
  fontSize: 24,
  fontWeight: "700",
  color: "#1a1a1a",
  marginBottom: 6,
 },
 boardDetailCount: {
  fontSize: 14,
  color: "#888",
 },

 imageGrid: {
  flexDirection: "row",
  gap: CARD_GAP,
 },
 column: {
  flex: 1,
  gap: CARD_GAP,
 },
 imageCard: {
  borderRadius: 12,
  overflow: "hidden",
  backgroundColor: "#FFFFFF",
  shadowColor: "#000",
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.1,
  shadowRadius: 6,
  elevation: 3,
 },
 cardImage: {
  width: "100%",
  aspectRatio: 1,
  backgroundColor: "#E0E0E0",
 },
 heartBadge: {
  position: "absolute",
  top: 8,
  right: 8,
  width: 26,
  height: 26,
  borderRadius: 13,
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  justifyContent: "center",
  alignItems: "center",
 },
 cardOverlay: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "rgba(0, 0, 0, 0.55)",
  paddingHorizontal: 10,
  paddingVertical: 8,
 },
 cardTitle: {
  fontSize: 12,
  fontWeight: "600",
  color: "#FFF",
 },
});
