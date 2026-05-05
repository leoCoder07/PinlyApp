import Sidebar from "@/components/sidebar";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
 Animated,
 Dimensions,
 Image,
 Modal,
 Platform,
 SafeAreaView,
 ScrollView,
 StatusBar,
 StyleSheet,
 Text,
 TextInput,
 TouchableOpacity,
 View,
} from "react-native";
import ImageModal from "../../components/imageModal";

const STATUSBAR_HEIGHT =
 Platform.OS === "android" ? StatusBar.currentHeight || 24 : 0;

const {width} = Dimensions.get("window");

// 👇 Type definition
interface ImageItem {
 id: string;
 url: string;
 title: string;
 description: string;
 username: string;
 likes: number;
}

const MOCK_IMAGES: ImageItem[] = [
 {
  id: "1",
  url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
  title: "Stylish Beard Trim",
  description: "Classic beard style with modern touch",
  username: "beardmaster",
  likes: 234,
 },
 {
  id: "2",
  url: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=400",
  title: "Mustache Magic",
  description: "Handlebar mustache perfection",
  username: "stacheking",
  likes: 189,
 },
 {
  id: "3",
  url: "https://images.unsplash.com/photo-1508341591423-4347099e1f19?w=400",
  title: "Full Beard Glory",
  description: "Long beard maintenance tips",
  username: "beardedone",
  likes: 456,
 },
 {
  id: "4",
  url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
  title: "Snowy",
  description: "Sharp goatee for the modern man",
  username: "goateeguy",
  likes: 167,
 },
 {
  id: "5",
  url: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400",
  title: "Viking Beard",
  description: "Epic viking beard inspiration",
  username: "nordicbeard",
  likes: 892,
 },
 {
  id: "6",
  url: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400",
  title: "Stubble Look",
  description: "Perfect stubble maintenance",
  username: "stubblemaster",
  likes: 321,
 },
];

export default function HomeScreen() {
 const [sidebarVisible, setSidebarVisible] = useState(false);
 const [searchQuery, setSearchQuery] = useState("");
 const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null); // 👈 ONLY ONCE here
 const [modalVisible, setModalVisible] = useState(false);
 const sidebarAnimation = useRef(new Animated.Value(-300)).current;

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

 const openImageDetail = (image: ImageItem) => {
  setSelectedImage(image);
  setModalVisible(true);
 };

 return (
  <SafeAreaView style={styles.container}>
   <StatusBar
    barStyle="dark-content"
    backgroundColor="#fefae0"
    translucent={false}
   />

   {/* ============ HEADER ============ */}
   <View style={styles.header}>
    <TouchableOpacity onPress={toggleSidebar} style={styles.burgerButton}>
     <Ionicons name="menu-outline" size={28} color="#3a5a40" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>Discover</Text>
    <TouchableOpacity style={styles.notificationButton}>
     <Ionicons name="notifications-outline" size={24} color="#3a5a40" />
    </TouchableOpacity>
   </View>

   {/* ============ SEARCH BAR ============ */}
   <View style={styles.searchContainer}>
    <View style={styles.searchBar}>
     <Ionicons
      name="search-outline"
      size={20}
      color="#999"
      style={styles.searchIcon}
     />
     <TextInput
      style={styles.searchInput}
      placeholder="Search styles, beards, users..."
      placeholderTextColor="#999"
      value={searchQuery}
      onChangeText={setSearchQuery}
      autoCapitalize="none"
      autoCorrect={false}
     />
     {searchQuery.length > 0 && (
      <TouchableOpacity onPress={() => setSearchQuery("")}>
       <Ionicons name="close-circle" size={18} color="#999" />
      </TouchableOpacity>
     )}
    </View>
   </View>

   {/* ============ IMAGE GRID ============ */}
   <ScrollView
    style={styles.scrollView}
    contentContainerStyle={styles.gridContainer}
    showsVerticalScrollIndicator={false}
   >
    <View style={styles.row}>
     {/* Left Column */}
     <View style={styles.column}>
      {MOCK_IMAGES.filter((_, i) => i % 2 === 0).map((image) => (
       <TouchableOpacity
        key={image.id}
        style={styles.imageCard}
        onPress={() => openImageDetail(image)}
        activeOpacity={0.9}
       >
        <Image
         source={{uri: image.url}}
         style={styles.image}
         resizeMode="cover"
        />
        <View style={styles.imageOverlay}>
         <Text style={styles.imageTitle} numberOfLines={1}>
          {image.title}
         </Text>
         <View style={styles.imageMeta}>
          <Ionicons name="heart-outline" size={14} color="#FFF" />
          <Text style={styles.imageLikes}>{image.likes}</Text>
         </View>
        </View>
       </TouchableOpacity>
      ))}
     </View>

     {/* Right Column */}
     <View style={styles.column}>
      {MOCK_IMAGES.filter((_, i) => i % 2 !== 0).map((image) => (
       <TouchableOpacity
        key={image.id}
        style={styles.imageCard}
        onPress={() => openImageDetail(image)}
        activeOpacity={0.9}
       >
        <Image
         source={{uri: image.url}}
         style={styles.image}
         resizeMode="cover"
        />
        <View style={styles.imageOverlay}>
         <Text style={styles.imageTitle} numberOfLines={1}>
          {image.title}
         </Text>
         <View style={styles.imageMeta}>
          <Ionicons name="heart-outline" size={14} color="#FFF" />
          <Text style={styles.imageLikes}>{image.likes}</Text>
         </View>
        </View>
       </TouchableOpacity>
      ))}
     </View>
    </View>
   </ScrollView>

   {/* ============ IMAGE DETAIL MODAL ============ */}
   <Modal
    visible={modalVisible}
    animationType="slide"
    transparent={false}
    onRequestClose={() => setModalVisible(false)}
   >
    {selectedImage && (
     <ImageModal image={selectedImage} onClose={() => setModalVisible(false)} />
    )}
   </Modal>

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
  height: 90,
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

 // ============ SEARCH BAR ============
 searchContainer: {
  paddingHorizontal: 16,
  paddingVertical: 10,
  backgroundColor: "#fefae0",
 },
 searchBar: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  borderRadius: 14,
  paddingHorizontal: 14,
  height: 46,
  borderWidth: 1,
  borderColor: "#E8E8E8",
  shadowColor: "#000",
  shadowOffset: {width: 0, height: 1},
  shadowOpacity: 0.05,
  shadowRadius: 3,
  elevation: 1,
 },
 searchIcon: {
  marginRight: 10,
 },
 searchInput: {
  flex: 1,
  fontSize: 15,
  color: "#333",
  paddingVertical: 0,
 },

 // ============ IMAGE GRID ============
 scrollView: {
  flex: 1,
 },
 gridContainer: {
  paddingHorizontal: 12,
  paddingBottom: 20,
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
  backgroundColor: "#FFFFFF",
  shadowColor: "#000",
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.1,
  shadowRadius: 6,
  elevation: 3,
 },
 image: {
  width: "100%",
  aspectRatio: 1, // 👈 Square images (width = height)
  backgroundColor: "#E0E0E0",
 },
 imageOverlay: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  paddingHorizontal: 10,
  paddingVertical: 8,
 },
 imageTitle: {
  fontSize: 13,
  fontWeight: "600",
  color: "#FFFFFF",
  marginBottom: 4,
 },
 imageMeta: {
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
 },
 imageLikes: {
  fontSize: 12,
  color: "#FFFFFF",
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
  paddingTop: STATUSBAR_HEIGHT,
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
  marginTop: STATUSBAR_HEIGHT,
 },
});
