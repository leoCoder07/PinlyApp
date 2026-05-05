import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
 Animated,
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
import ImageModal from "../../components/imageModal";
import Sidebar from "../../components/sidebar";

const {width} = Dimensions.get("window");
const CARD_GAP = 12;
const CARD_WIDTH = (width - 48 - CARD_GAP) / 2;

// 🎨 Board data
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

// 🖼️ Type for favorited image
interface FavoriteImage {
 id: string;
 url: string;
 title: string;
 description: string;
 username: string;
 likes: number;
 boardId: string;
}

// 📦 Mock favorites
const MOCK_FAVORITES: FavoriteImage[] = [
 {
  id: "fav1",
  url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
  title: "Modern Living Room",
  description:
   "Clean lines and natural light create a perfect modern living space.",
  username: "decorlover",
  likes: 234,
  boardId: "home-decor",
 },
 {
  id: "fav2",
  url: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400",
  title: "Cozy Bedroom Setup",
  description: "Minimalist bedroom with warm tones.",
  username: "roomdesign",
  likes: 189,
  boardId: "home-decor",
 },
 {
  id: "fav3",
  url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400",
  title: "Paris Sunset",
  description: "Eiffel Tower at golden hour.",
  username: "travelbug",
  likes: 456,
  boardId: "travel-inspo",
 },
 {
  id: "fav4",
  url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400",
  title: "Beach Sunset",
  description: "Golden hour at the beach.",
  username: "sunsetchaser",
  likes: 892,
  boardId: "dreamy-sunsets",
 },
 {
  id: "fav5",
  url: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400",
  title: "Street Style",
  description: "Urban fashion inspiration.",
  username: "styleguru",
  likes: 321,
  boardId: "outfits",
 },
 {
  id: "fav6",
  url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
  title: "Healthy Bowl",
  description: "Delicious and nutritious recipe.",
  username: "foodielove",
  likes: 543,
  boardId: "recipes",
 },
 {
  id: "fav7",
  url: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400",
  title: "Venice Canals",
  description: "Beautiful canals of Venice.",
  username: "wanderlust",
  likes: 678,
  boardId: "travel-inspo",
 },
];

export default function FavoritesScreen() {
 const [sidebarVisible, setSidebarVisible] = useState(false);
 const [favorites, setFavorites] = useState<FavoriteImage[]>(MOCK_FAVORITES);

 // 👈 New: Track which board is being viewed in detail
 const [selectedBoard, setSelectedBoard] = useState<string | null>(null);

 // Image modal state
 const [selectedImage, setSelectedImage] = useState<FavoriteImage | null>(null);
 const [modalVisible, setModalVisible] = useState(false);

 const sidebarAnimation = useRef(new Animated.Value(-300)).current;

 // 🎯 Toggle sidebar
 const toggleSidebar = () => {
  if (sidebarVisible) {
   Animated.timing(sidebarAnimation, {
    toValue: -300,
    duration: 300,
    useNativeDriver: true,
   }).start(() => setSidebarVisible(false));
  } else {
   setSidebarVisible(true);
   Animated.timing(sidebarAnimation, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
   }).start();
  }
 };

 // 🖼️ Open image detail modal
 const openImageDetail = (image: FavoriteImage) => {
  setSelectedImage(image);
  setModalVisible(true);
 };

 // ❤️ Remove from favorites
 const removeFromFavorites = (imageId: string) => {
  setFavorites((prev) => prev.filter((item) => item.id !== imageId));
 };

 // 👉 Navigate to home
 const goToHome = () => {
  router.push("/(tabs)/home");
 };

 // 📊 Group favorites by board
 const groupedFavorites = favorites.reduce<Record<string, FavoriteImage[]>>(
  (acc, item) => {
   if (!acc[item.boardId]) {
    acc[item.boardId] = [];
   }
   acc[item.boardId].push(item);
   return acc;
  },
  {},
 );

 // 🔙 Go back to boards list view
 const goBackToBoards = () => {
  setSelectedBoard(null);
 };

 // Get images for the selected board detail view
 const getBoardFavorites = (boardId: string) => {
  return groupedFavorites[boardId] || [];
 };

 const hasFavorites = favorites.length > 0;

 return (
  <SafeAreaView style={styles.container}>
   <StatusBar barStyle="dark-content" backgroundColor="#fefae0" />

   {/* ============ HEADER ============ */}
   <View style={styles.header}>
    {selectedBoard ? (
     // Back button when viewing board detail
     <TouchableOpacity onPress={goBackToBoards} style={styles.burgerButton}>
      <Ionicons name="arrow-back" size={24} color="#3a5a40" />
     </TouchableOpacity>
    ) : (
     // Burger button when on main favorites view
     <TouchableOpacity onPress={toggleSidebar} style={styles.burgerButton}>
      <Ionicons name="menu-outline" size={28} color="#3a5a40" />
     </TouchableOpacity>
    )}

    <Text style={styles.headerTitle}>
     {selectedBoard ? BOARD_INFO[selectedBoard]?.label || "Board" : "Favorites"}
    </Text>

    <TouchableOpacity style={styles.notificationButton}>
     <Ionicons name="notifications-outline" size={24} color="#3a5a40" />
    </TouchableOpacity>
   </View>

   {/* ============ CONTENT ============ */}
   {!hasFavorites ? (
    // ===== EMPTY STATE =====
    <View style={styles.emptyContainer}>
     <View style={styles.emptyIconContainer}>
      <Ionicons name="heart-outline" size={64} color="#CCC" />
     </View>
     <Text style={styles.emptyTitle}>Your favorites list is empty</Text>
     <Text style={styles.emptySubtitle}>
      Start browsing and tap the heart icon{"\n"}to save images you love
     </Text>
     <TouchableOpacity
      style={styles.browseButton}
      onPress={goToHome}
      activeOpacity={0.8}
     >
      <Ionicons name="images-outline" size={20} color="#FFF" />
      <Text style={styles.browseButtonText}>Browse Pictures</Text>
     </TouchableOpacity>
    </View>
   ) : selectedBoard ? (
    // ===== BOARD DETAIL VIEW (All favorites in one board) =====
    <ScrollView
     style={styles.scrollView}
     contentContainerStyle={styles.detailScrollContent}
     showsVerticalScrollIndicator={false}
    >
     {/* Board header info */}
     <View style={styles.boardDetailHeader}>
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
       {getBoardFavorites(selectedBoard).length === 1 ? "item" : "items"}
      </Text>
     </View>

     {/* Image Grid - 2 columns */}
     <View style={styles.imageGrid}>
      {/* Left Column */}
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
          {/* Heart icon */}
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

      {/* Right Column */}
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
    </ScrollView>
   ) : (
    // ===== MAIN FAVORITES VIEW (Board boxes with one preview image) =====
    <ScrollView
     style={styles.scrollView}
     contentContainerStyle={styles.scrollContent}
     showsVerticalScrollIndicator={false}
    >
     {Object.entries(groupedFavorites).map(([boardId, images]) => {
      const board = BOARD_INFO[boardId];
      if (!board || images.length === 0) return null;

      // Get the first image as preview
      const previewImage = images[0];

      return (
       <TouchableOpacity
        key={boardId}
        style={styles.boardBox}
        onPress={() => setSelectedBoard(boardId)}
        activeOpacity={0.9}
       >
        {/* Board Header */}
        <View style={styles.boardBoxHeader}>
         <View style={[styles.boardIcon, {backgroundColor: board.color}]}>
          <Ionicons name={board.icon as any} size={18} color="#3a5a40" />
         </View>
         <View style={styles.boardBoxTitleContainer}>
          <Text style={styles.boardBoxTitle}>{board.label}</Text>
          <Text style={styles.boardBoxCount}>
           {images.length} {images.length === 1 ? "item" : "items"}
          </Text>
         </View>
         <Ionicons name="chevron-forward" size={20} color="#CCC" />
        </View>

        {/* Preview Image (single image) */}
        <View style={styles.previewImageContainer}>
         <Image
          source={{uri: previewImage.url}}
          style={styles.previewImage}
          resizeMode="cover"
         />
         {/* Heart badge */}
         <View style={styles.previewHeartBadge}>
          <Ionicons name="heart" size={16} color="#E74C3C" />
         </View>
         {/* Image title overlay */}
         <View style={styles.previewOverlay}>
          <Text style={styles.previewTitle} numberOfLines={1}>
           {previewImage.title}
          </Text>
          <Text style={styles.previewMore}>+{images.length - 1} more</Text>
         </View>
        </View>
       </TouchableOpacity>
      );
     })}

     <View style={{height: 30}} />
    </ScrollView>
   )}

   {/* ============ IMAGE DETAIL MODAL ============ */}
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
      onToggleFavorite={() => removeFromFavorites(selectedImage.id)}
     />
    )}
   </Modal>

   {/* ============ SIDEBAR OVERLAY ============ */}
   {sidebarVisible && (
    <TouchableOpacity
     style={styles.overlay}
     activeOpacity={1}
     onPress={toggleSidebar}
    >
     <Animated.View
      style={[
       styles.sidebarContainer,
       {transform: [{translateX: sidebarAnimation}]},
      ]}
     >
      <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
       <Sidebar onClose={toggleSidebar} />
      </TouchableOpacity>
     </Animated.View>
    </TouchableOpacity>
   )}
  </SafeAreaView>
 );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: "#fefae0",
 },

 // ============ HEADER ============
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
 burgerButton: {
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
 notificationButton: {
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

 // ============ SCROLL ============
 scrollView: {
  flex: 1,
 },
 scrollContent: {
  paddingHorizontal: 16,
  paddingTop: 16,
 },
 detailScrollContent: {
  paddingHorizontal: 12,
  paddingTop: 16,
  paddingBottom: 30,
 },

 // ============ EMPTY STATE ============
 emptyContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 40,
  paddingBottom: 80,
 },
 emptyIconContainer: {
  width: 120,
  height: 120,
  borderRadius: 60,
  backgroundColor: "#F5F5F5",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 24,
 },
 emptyTitle: {
  fontSize: 20,
  fontWeight: "700",
  color: "#333",
  marginBottom: 10,
  textAlign: "center",
 },
 emptySubtitle: {
  fontSize: 14,
  color: "#888",
  textAlign: "center",
  lineHeight: 20,
  marginBottom: 30,
 },
 browseButton: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#3a5a40",
  paddingVertical: 14,
  paddingHorizontal: 28,
  borderRadius: 14,
  gap: 8,
  shadowColor: "#3a5a40",
  shadowOffset: {width: 0, height: 4},
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 5,
 },
 browseButtonText: {
  fontSize: 16,
  fontWeight: "600",
  color: "#FFF",
  letterSpacing: 0.5,
 },

 // ============ BOARD BOX (Main View) ============
 boardBox: {
  backgroundColor: "#FFFFFF",
  borderRadius: 16,
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
  color: "#999",
  marginTop: 1,
 },

 // ============ PREVIEW IMAGE (Main View) ============
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
  width: 30,
  height: 30,
  borderRadius: 15,
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

 // ============ BOARD DETAIL VIEW ============
 boardDetailHeader: {
  alignItems: "center",
  paddingVertical: 20,
  paddingHorizontal: 30,
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

 // ============ IMAGE GRID (Detail View) ============
 imageGrid: {
  flexDirection: "row",
  gap: CARD_GAP,
  paddingHorizontal: 4,
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

 // ============ SIDEBAR ============
 overlay: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 100,
 },
 sidebarContainer: {
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  width: 280,
  backgroundColor: "#FFFFFF",
  shadowColor: "#000",
  shadowOffset: {width: 5, height: 0},
  shadowOpacity: 0.15,
  shadowRadius: 10,
  elevation: 20,
 },
});
