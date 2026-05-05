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
const CARD_WIDTH = width - 32;
const PREVIEW_SIZE = (CARD_WIDTH - 48) / 4;

interface Board {
 id: string;
 title: string;
 icon: string;
 color: string;
 description: string;
 previewImages: string[];
 imageCount: number;
}

interface ImageItem {
 id: string;
 url: string;
 title: string;
 description: string;
 username: string;
 likes: number;
}

const BOARDS: Board[] = [
 {
  id: "home-decor",
  title: "Home Decor",
  icon: "home-outline",
  color: "#E8D5B7",
  description: "Interior design inspiration",
  previewImages: [
   "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200",
   "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=200",
   "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200",
   "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=200",
  ],
  imageCount: 124,
 },
 {
  id: "travel-inspo",
  title: "Travel Inspo",
  icon: "airplane-outline",
  color: "#B7D5E8",
  description: "Wanderlust destinations",
  previewImages: [
   "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=200",
   "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=200",
   "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=200",
   "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=200",
  ],
  imageCount: 256,
 },
 {
  id: "outfits",
  title: "Outfits",
  icon: "shirt-outline",
  color: "#D5B7E8",
  description: "Fashion & style ideas",
  previewImages: [
   "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200",
   "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200",
   "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200",
   "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=200",
  ],
  imageCount: 189,
 },
 {
  id: "dreamy-sunsets",
  title: "Dreamy Sunsets",
  icon: "sunny-outline",
  color: "#E8B7B7",
  description: "Golden hour magic",
  previewImages: [
   "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=200",
   "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=200",
   "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=200",
   "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200",
  ],
  imageCount: 312,
 },
 {
  id: "cozy-spaces",
  title: "Cozy Spaces",
  icon: "bed-outline",
  color: "#B7E8C8",
  description: "Comfort & warmth",
  previewImages: [
   "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=200",
   "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=200",
   "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200",
   "https://images.unsplash.com/photo-1545418314-7ce0b9b53901?w=200",
  ],
  imageCount: 98,
 },
 {
  id: "recipes",
  title: "Recipes",
  icon: "restaurant-outline",
  color: "#E8D5B7",
  description: "Delicious food ideas",
  previewImages: [
   "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200",
   "https://images.unsplash.com/photo-1484980972926-edee96e0960d?w=200",
   "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=200",
   "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200",
  ],
  imageCount: 203,
 },
 {
  id: "aesthetics",
  title: "Aesthetics",
  icon: "color-palette-outline",
  color: "#E8B7D5",
  description: "Visual inspiration",
  previewImages: [
   "https://images.unsplash.com/photo-1552083375-1447ce886485?w=200",
   "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200",
   "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=200",
   "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=200",
  ],
  imageCount: 167,
 },
 {
  id: "products",
  title: "Products",
  icon: "bag-handle-outline",
  color: "#B7E8E8",
  description: "Product photography",
  previewImages: [
   "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200",
   "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200",
   "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200",
   "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200",
  ],
  imageCount: 145,
 },
];

const BOARD_IMAGES_MOCK: Record<string, ImageItem[]> = {
 "home-decor": [
  {
   id: "hd1",
   url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
   title: "Modern Living Room",
   description: "Clean lines and natural light",
   username: "decorlover",
   likes: 234,
  },
  {
   id: "hd2",
   url: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400",
   title: "Cozy Bedroom",
   description: "Minimalist bedroom setup",
   username: "roomdesign",
   likes: 189,
  },
  {
   id: "hd3",
   url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
   title: "Velvet Sofa",
   description: "Luxury furniture piece",
   username: "furniturehub",
   likes: 312,
  },
  {
   id: "hd4",
   url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400",
   title: "Study Corner",
   description: "Productive workspace",
   username: "workspacepro",
   likes: 145,
  },
  {
   id: "hd5",
   url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400",
   title: "Kitchen Design",
   description: "Modern kitchen inspiration",
   username: "kitchengoals",
   likes: 278,
  },
  {
   id: "hd6",
   url: "https://images.unsplash.com/photo-1564078516393-cf04bd980b55?w=400",
   title: "Spa Bathroom",
   description: "Relaxing bathroom design",
   username: "bathroombliss",
   likes: 198,
  },
 ],
 "travel-inspo": [
  {
   id: "tr1",
   url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400",
   title: "Eiffel Tower",
   description: "Paris at sunset",
   username: "traveler_jane",
   likes: 567,
  },
  {
   id: "tr2",
   url: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400",
   title: "Venice Canals",
   description: "Romantic gondola ride",
   username: "wanderlust",
   likes: 432,
  },
 ],
 outfits: [
  {
   id: "of1",
   url: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400",
   title: "Street Style",
   description: "Urban fashion look",
   username: "styleguru",
   likes: 321,
  },
  {
   id: "of2",
   url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400",
   title: "Casual Chic",
   description: "Everyday elegance",
   username: "fashionista",
   likes: 245,
  },
 ],
 "dreamy-sunsets": [
  {
   id: "ds1",
   url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400",
   title: "Ocean Sunset",
   description: "Golden reflection on water",
   username: "sunsetlover",
   likes: 890,
  },
  {
   id: "ds2",
   url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400",
   title: "Mountain Dusk",
   description: "Purple mountain majesty",
   username: "naturefan",
   likes: 654,
  },
 ],
 "cozy-spaces": [
  {
   id: "cs1",
   url: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400",
   title: "Reading Nook",
   description: "Perfect book corner",
   username: "bookworm",
   likes: 432,
  },
  {
   id: "cs2",
   url: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400",
   title: "Fireplace Room",
   description: "Warm winter evening",
   username: "cozyhome",
   likes: 567,
  },
 ],
 recipes: [
  {
   id: "rc1",
   url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
   title: "Fresh Salad",
   description: "Healthy summer recipe",
   username: "chefmaster",
   likes: 345,
  },
  {
   id: "rc2",
   url: "https://images.unsplash.com/photo-1484980972926-edee96e0960d?w=400",
   title: "Pasta Dish",
   description: "Italian classic",
   username: "foodlover",
   likes: 678,
  },
 ],
 aesthetics: [
  {
   id: "ae1",
   url: "https://images.unsplash.com/photo-1552083375-1447ce886485?w=400",
   title: "Minimal Art",
   description: "Clean aesthetic vibes",
   username: "artlover",
   likes: 234,
  },
  {
   id: "ae2",
   url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
   title: "Pastel Dreams",
   description: "Soft color palette",
   username: "aestheticqueen",
   likes: 456,
  },
 ],
 products: [
  {
   id: "pr1",
   url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
   title: "Watch Closeup",
   description: "Luxury timepiece",
   username: "productpro",
   likes: 189,
  },
  {
   id: "pr2",
   url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
   title: "Headphones",
   description: "Premium audio gear",
   username: "techreview",
   likes: 312,
  },
 ],
};

export default function BoardsScreen() {
 const [sidebarVisible, setSidebarVisible] = useState(false);
 const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
 const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
 const [modalVisible, setModalVisible] = useState(false);
 const sidebarAnimation = useRef(new Animated.Value(-300)).current;

 const toggleSidebar = (): void => {
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

 const openBoard = (board: Board): void => {
  setSelectedBoard(board);
 };

 const goBackToBoards = (): void => {
  setSelectedBoard(null);
 };

 const openImageDetail = (image: ImageItem): void => {
  setSelectedImage(image);
  setModalVisible(true);
 };

 const getBoardImages = (boardId: string): ImageItem[] => {
  return BOARD_IMAGES_MOCK[boardId] || [];
 };

 return (
  <SafeAreaView style={styles.container}>
   <StatusBar barStyle="dark-content" backgroundColor="#fefae0" />

   {}
   <View style={styles.header}>
    {selectedBoard ? (
     <TouchableOpacity onPress={goBackToBoards} style={styles.burgerButton}>
      <Ionicons name="arrow-back" size={24} color="#3a5a40" />
     </TouchableOpacity>
    ) : (
     <TouchableOpacity onPress={toggleSidebar} style={styles.burgerButton}>
      <Ionicons name="menu-outline" size={28} color="#3a5a40" />
     </TouchableOpacity>
    )}

    <Text style={styles.headerTitle}>
     {selectedBoard ? selectedBoard.title : "Boards"}
    </Text>

    <TouchableOpacity
     style={styles.notificationButton}
     onPress={() => router.push("/notifications")}
    >
     <Ionicons name="notifications-outline" size={24} color="#3a5a40" />
    </TouchableOpacity>
   </View>

   {}
   {!selectedBoard ? (
    <ScrollView
     style={styles.scrollView}
     contentContainerStyle={styles.scrollContent}
     showsVerticalScrollIndicator={false}
    >
     <View style={styles.subtitleContainer}>
      <Text style={styles.subtitle}>Browse collections curated for you</Text>
     </View>

     {BOARDS.map((board: Board) => (
      <TouchableOpacity
       key={board.id}
       style={styles.boardCard}
       onPress={(): void => openBoard(board)}
       activeOpacity={0.9}
      >
       <View style={styles.previewRow}>
        {board.previewImages.map((img: string, index: number) => (
         <View key={index} style={styles.previewImageWrapper}>
          <Image
           source={{uri: img}}
           style={styles.previewImage}
           resizeMode="cover"
          />
          {index === 3 && (
           <View style={styles.moreOverlay}>
            <Text style={styles.moreText}>+{board.imageCount - 4}</Text>
           </View>
          )}
         </View>
        ))}
       </View>

       <View style={styles.boardInfo}>
        <View style={styles.boardTitleRow}>
         <View style={[styles.iconCircle, {backgroundColor: board.color}]}>
          <Ionicons name={board.icon as any} size={18} color="#3a5a40" />
         </View>
         <View style={styles.boardTextContainer}>
          <Text style={styles.boardTitle}>{board.title}</Text>
          <Text style={styles.boardDescription}>{board.description}</Text>
         </View>
         <Ionicons name="chevron-forward" size={20} color="#CCC" />
        </View>
        <Text style={styles.imageCount}>{board.imageCount} images</Text>
       </View>
      </TouchableOpacity>
     ))}

     <View style={{height: 20}} />
    </ScrollView>
   ) : (
    <ScrollView
     style={styles.scrollView}
     contentContainerStyle={styles.gridContainer}
     showsVerticalScrollIndicator={false}
    >
     <View style={styles.boardDetailHeader}>
      <View
       style={[styles.iconCircleLarge, {backgroundColor: selectedBoard.color}]}
      >
       <Ionicons name={selectedBoard.icon as any} size={28} color="#3a5a40" />
      </View>
      <Text style={styles.boardDetailTitle}>{selectedBoard.title}</Text>
      <Text style={styles.boardDetailDescription}>
       {selectedBoard.description}
      </Text>
     </View>

     <View style={styles.row}>
      {}
      <View style={styles.column}>
       {getBoardImages(selectedBoard.id)
        .filter((_: ImageItem, i: number) => i % 2 === 0)
        .map((image: ImageItem) => (
         <TouchableOpacity
          key={image.id}
          style={styles.imageCard}
          onPress={(): void => openImageDetail(image)}
          activeOpacity={0.9}
         >
          <Image
           source={{uri: image.url}}
           style={styles.cardImage}
           resizeMode="cover"
          />
          <View style={styles.cardOverlay}>
           <Text style={styles.cardTitle} numberOfLines={1}>
            {image.title}
           </Text>
           <View style={styles.cardMeta}>
            <Ionicons name="heart-outline" size={14} color="#FFF" />
            <Text style={styles.cardLikes}>{image.likes}</Text>
           </View>
          </View>
         </TouchableOpacity>
        ))}
      </View>

      {}
      <View style={styles.column}>
       {getBoardImages(selectedBoard.id)
        .filter((_: ImageItem, i: number) => i % 2 !== 0)
        .map((image: ImageItem) => (
         <TouchableOpacity
          key={image.id}
          style={styles.imageCard}
          onPress={(): void => openImageDetail(image)}
          activeOpacity={0.9}
         >
          <Image
           source={{uri: image.url}}
           style={styles.cardImage}
           resizeMode="cover"
          />
          <View style={styles.cardOverlay}>
           <Text style={styles.cardTitle} numberOfLines={1}>
            {image.title}
           </Text>
           <View style={styles.cardMeta}>
            <Ionicons name="heart-outline" size={14} color="#FFF" />
            <Text style={styles.cardLikes}>{image.likes}</Text>
           </View>
          </View>
         </TouchableOpacity>
        ))}
      </View>
     </View>
    </ScrollView>
   )}

   {}
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

   {}
   <Modal
    visible={modalVisible}
    animationType="slide"
    transparent={false}
    onRequestClose={(): void => setModalVisible(false)}
   >
    {selectedImage && (
     <ImageModal
      image={selectedImage}
      onClose={(): void => setModalVisible(false)}
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
 subtitleContainer: {
  paddingHorizontal: 16,
  paddingTop: 12,
  paddingBottom: 8,
 },
 subtitle: {
  fontSize: 14,
  color: "#888",
  letterSpacing: 0.3,
 },
 scrollView: {
  flex: 1,
 },
 scrollContent: {
  paddingHorizontal: 16,
  paddingTop: 8,
 },
 boardCard: {
  backgroundColor: "#d8f3dc",
  borderRadius: 16,
  marginBottom: 16,
  shadowColor: "#000",
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 3,
  overflow: "hidden",
  padding: 5,
  borderWidth: 1,
  borderColor: "#40916c",
 },
 previewRow: {
  flexDirection: "row",
  gap: 3,
  padding: 4,
 },
 previewImageWrapper: {
  flex: 1,
  aspectRatio: 1,
  borderRadius: 8,
  overflow: "hidden",
  position: "relative",
 },
 previewImage: {
  width: "100%",
  height: "100%",
  backgroundColor: "#E0E0E0",
 },
 moreOverlay: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  justifyContent: "center",
  alignItems: "center",
 },
 moreText: {
  color: "#FFF",
  fontSize: 16,
  fontWeight: "700",
 },
 boardInfo: {
  paddingHorizontal: 16,
  paddingVertical: 14,
 },
 boardTitleRow: {
  flexDirection: "row",
  alignItems: "center",
 },
 iconCircle: {
  width: 36,
  height: 36,
  borderRadius: 18,
  justifyContent: "center",
  alignItems: "center",
  marginRight: 12,
 },
 boardTextContainer: {
  flex: 1,
 },
 boardTitle: {
  fontSize: 17,
  fontWeight: "700",
  color: "#1a1a1a",
  marginBottom: 2,
 },
 boardDescription: {
  fontSize: 13,
  color: "#888",
 },
 imageCount: {
  fontSize: 12,
  color: "#AAA",
  marginTop: 8,
  marginLeft: 48,
 },
 boardDetailHeader: {
  alignItems: "center",
  paddingVertical: 20,
  paddingHorizontal: 30,
 },
 iconCircleLarge: {
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
 boardDetailDescription: {
  fontSize: 14,
  color: "#888",
  textAlign: "center",
 },
 gridContainer: {
  paddingHorizontal: 12,
  paddingBottom: 30,
 },
 row: {
  flexDirection: "row",
  gap: 12,
 },
 column: {
  flex: 1,
  gap: 12,
 },
 imageCard: {
  borderRadius: 16,
  overflow: "hidden",
  backgroundColor: "#81b29a",
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
 cardOverlay: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  paddingHorizontal: 10,
  paddingVertical: 8,
 },
 cardTitle: {
  fontSize: 13,
  fontWeight: "600",
  color: "#FFFFFF",
  marginBottom: 4,
 },
 cardMeta: {
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
 },
 cardLikes: {
  fontSize: 12,
  color: "#FFFFFF",
 },
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
