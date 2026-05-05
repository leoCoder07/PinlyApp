import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useRef, useState } from "react";
import {
 Alert,
 Animated,
 FlatList,
 Image,
 KeyboardAvoidingView,
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
import Sidebar from "../../components/sidebar";

// 🎨 Board options (same as boards tab)
const BOARD_OPTIONS = [
 {
  id: "home-decor",
  label: "Home Decor",
  icon: "home-outline",
  color: "#E8D5B7",
 },
 {
  id: "travel-inspo",
  label: "Travel Inspo",
  icon: "airplane-outline",
  color: "#B7D5E8",
 },
 {id: "outfits", label: "Outfits", icon: "shirt-outline", color: "#D5B7E8"},
 {
  id: "dreamy-sunsets",
  label: "Dreamy Sunsets",
  icon: "sunny-outline",
  color: "#E8B7B7",
 },
 {
  id: "cozy-spaces",
  label: "Cozy Spaces",
  icon: "bed-outline",
  color: "#B7E8C8",
 },
 {
  id: "recipes",
  label: "Recipes",
  icon: "restaurant-outline",
  color: "#E8D5B7",
 },
 {
  id: "aesthetics",
  label: "Aesthetics",
  icon: "color-palette-outline",
  color: "#E8B7D5",
 },
 {id: "products", label: "Products", icon: "bag-outline", color: "#B7E8E8"},
];

export default function CreateScreen() {
 // ===== STATE =====
 const [sidebarVisible, setSidebarVisible] = useState(false);
 const [selectedImage, setSelectedImage] =
  useState<ImagePicker.ImagePickerAsset | null>(null);
 const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
 const [title, setTitle] = useState("");
 const [description, setDescription] = useState("");
 const [showBoardPicker, setShowBoardPicker] = useState(false);
 const sidebarAnimation = useRef(new Animated.Value(-300)).current;

 // ===== SIDEBAR =====
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

 // ===== IMAGE PICKER =====
 const pickImage = async () => {
  // Ask for permission
  const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== "granted") {
   Alert.alert(
    "Permission Required",
    "We need access to your photos to upload images.",
    [{text: "OK"}],
   );
   return;
  }

  // Open image picker
  const result = await ImagePicker.launchImageLibraryAsync({
   mediaTypes: ImagePicker.MediaTypeOptions.Images,
   allowsEditing: true,
   aspect: [4, 3],
   quality: 0.8,
  });

  if (!result.canceled) {
   setSelectedImage(result.assets[0]);
  }
 };

 // ===== REMOVE SELECTED IMAGE =====
 const removeImage = () => {
  Alert.alert("Remove Image", "Are you sure you want to remove this image?", [
   {text: "Cancel", style: "cancel"},
   {
    text: "Remove",
    style: "destructive",
    onPress: () => setSelectedImage(null),
   },
  ]);
 };

 // ===== UPLOAD HANDLER (Placeholder) =====
 const handleUpload = () => {
  // Validation
  if (!selectedImage) {
   Alert.alert("Missing Image", "Please select an image to upload.");
   return;
  }
  if (!selectedBoard) {
   Alert.alert("Missing Board", "Please select a board for your image.");
   return;
  }
  if (!title.trim()) {
   Alert.alert("Missing Title", "Please enter a title for your post.");
   return;
  }

  const boardData = getSelectedBoardData();

  // For now, just show success (backend later)
  Alert.alert(
   "Ready to Upload! 🎉",
   `Title: ${title}\nBoard: ${boardData?.label}\nDescription: ${description || "None"}`,
   [
    {
     text: "Upload",
     onPress: () => {
      // TODO: Backend upload logic here
      Alert.alert("Success!", "Your image has been uploaded.");
      // Reset form
      setSelectedImage(null);
      setSelectedBoard(null);
      setTitle("");
      setDescription("");
     },
    },
    {text: "Cancel", style: "cancel"},
   ],
  );
 };

 // ===== GET SELECTED BOARD INFO =====
 const getSelectedBoardData = () => {
  if (!selectedBoard) return null;
  return BOARD_OPTIONS.find((b) => b.id === selectedBoard);
 };

 return (
  <SafeAreaView style={styles.container}>
   <StatusBar barStyle="dark-content" backgroundColor="#fefae0" />

   {/* ============ HEADER ============ */}
   <View style={styles.header}>
    <TouchableOpacity onPress={toggleSidebar} style={styles.burgerButton}>
     <Ionicons name="menu-outline" size={28} color="#3a5a40" />
    </TouchableOpacity>

    <Text style={styles.headerTitle}>Create</Text>

    <TouchableOpacity style={styles.notificationButton}>
     <Ionicons name="notifications-outline" size={24} color="#3a5a40" />
    </TouchableOpacity>
   </View>

   {/* ============ FORM ============ */}
   <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.keyboardView}
   >
    <ScrollView
     style={styles.scrollView}
     contentContainerStyle={styles.scrollContent}
     showsVerticalScrollIndicator={false}
     keyboardShouldPersistTaps="handled"
    >
     {/* ===== IMAGE PICKER BOX ===== */}
     <Text style={styles.sectionLabel}>Image</Text>
     {!selectedImage ? (
      <TouchableOpacity
       style={styles.imagePickerBox}
       onPress={pickImage}
       activeOpacity={0.8}
      >
       <View style={styles.imagePickerIcon}>
        <Ionicons name="image-outline" size={40} color="#3a5a40" />
       </View>
       <Text style={styles.imagePickerText}>Tap to upload image</Text>
       <Text style={styles.imagePickerSubtext}>JPG, PNG or GIF • Max 10MB</Text>
      </TouchableOpacity>
     ) : (
      <View style={styles.imagePreviewContainer}>
       <Image
        source={{uri: selectedImage.uri}}
        style={styles.imagePreview}
        resizeMode="cover"
       />
       <TouchableOpacity style={styles.removeImageButton} onPress={removeImage}>
        <Ionicons name="close-circle" size={28} color="#E74C3C" />
       </TouchableOpacity>
       <View style={styles.imageSelectedBadge}>
        <Ionicons name="checkmark-circle" size={18} color="#3a5a40" />
        <Text style={styles.imageSelectedText}>Image selected</Text>
       </View>
      </View>
     )}

     {/* ===== BOARD SELECTOR ===== */}
     <Text style={styles.sectionLabel}>
      Select Board <Text style={styles.required}>*</Text>
     </Text>
     <TouchableOpacity
      style={styles.boardSelector}
      onPress={() => setShowBoardPicker(true)}
      activeOpacity={0.8}
     >
      {selectedBoard ? (
       <View style={styles.selectedBoardRow}>
        <View
         style={[
          styles.boardIconSmall,
          {backgroundColor: getSelectedBoardData()?.color},
         ]}
        >
         <Ionicons
          name={getSelectedBoardData()?.icon as any}
          size={18}
          color="#3a5a40"
         />
        </View>
        <Text style={styles.selectedBoardText}>
         {getSelectedBoardData()?.label}
        </Text>
       </View>
      ) : (
       <View style={styles.selectedBoardRow}>
        <Ionicons
         name="grid-outline"
         size={20}
         color="#999"
         style={{marginRight: 10}}
        />
        <Text style={styles.placeholderText}>Choose a board...</Text>
       </View>
      )}
      <Ionicons name="chevron-down" size={20} color="#999" />
     </TouchableOpacity>

     {/* ===== TITLE INPUT ===== */}
     <Text style={styles.sectionLabel}>
      Title <Text style={styles.required}>*</Text>
     </Text>
     <View style={styles.inputContainer}>
      <Ionicons
       name="text-outline"
       size={20}
       color="#999"
       style={styles.inputIcon}
      />
      <TextInput
       style={styles.input}
       placeholder="Enter a title for your post"
       placeholderTextColor="#999"
       value={title}
       onChangeText={setTitle}
       maxLength={100}
      />
     </View>
     <Text style={styles.charCount}>{title.length}/100</Text>

     {/* ===== DESCRIPTION INPUT ===== */}
     <Text style={styles.sectionLabel}>
      Description <Text style={styles.optionalTag}>(optional)</Text>
     </Text>
     <View style={styles.textAreaContainer}>
      <Ionicons
       name="document-text-outline"
       size={20}
       color="#999"
       style={styles.inputIcon}
      />
      <TextInput
       style={styles.textArea}
       placeholder="Describe your image..."
       placeholderTextColor="#999"
       value={description}
       onChangeText={setDescription}
       multiline
       numberOfLines={4}
       textAlignVertical="top"
       maxLength={500}
      />
     </View>
     <Text style={styles.charCount}>{description.length}/500</Text>

     {/* ===== UPLOAD BUTTON ===== */}
     <TouchableOpacity
      style={[
       styles.uploadButton,
       (!selectedImage || !selectedBoard || !title.trim()) &&
        styles.uploadButtonDisabled,
      ]}
      onPress={handleUpload}
      activeOpacity={0.8}
      disabled={!selectedImage || !selectedBoard || !title.trim()}
     >
      <Ionicons name="cloud-upload-outline" size={22} color="#FFF" />
      <Text style={styles.uploadButtonText}>Upload Image</Text>
     </TouchableOpacity>

     <View style={{height: 40}} />
    </ScrollView>
   </KeyboardAvoidingView>

   {/* ============ BOARD PICKER MODAL ============ */}
   <Modal
    visible={showBoardPicker}
    animationType="slide"
    transparent={true}
    onRequestClose={() => setShowBoardPicker(false)}
   >
    <View style={styles.modalOverlay}>
     <View style={styles.modalContent}>
      {/* Modal Header */}
      <View style={styles.modalHeader}>
       <Text style={styles.modalTitle}>Select a Board</Text>
       <TouchableOpacity
        onPress={() => setShowBoardPicker(false)}
        style={styles.modalCloseButton}
       >
        <Ionicons name="close" size={24} color="#333" />
       </TouchableOpacity>
      </View>

      {/* Board Options List */}
      <FlatList
       data={BOARD_OPTIONS}
       keyExtractor={(item) => item.id}
       renderItem={({item}) => (
        <TouchableOpacity
         style={[
          styles.boardOption,
          selectedBoard === item.id && styles.boardOptionSelected,
         ]}
         onPress={() => {
          setSelectedBoard(item.id as any);
          setShowBoardPicker(false);
         }}
        >
         <View style={[styles.boardOptionIcon, {backgroundColor: item.color}]}>
          <Ionicons name={item.icon as any} size={22} color="#3a5a40" />
         </View>
         <Text style={styles.boardOptionText}>{item.label}</Text>
         {selectedBoard === item.id && (
          <Ionicons name="checkmark-circle" size={22} color="#3a5a40" />
         )}
        </TouchableOpacity>
       )}
       showsVerticalScrollIndicator={false}
      />
     </View>
    </View>
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
 keyboardView: {
  flex: 1,
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
  paddingHorizontal: 20,
  paddingTop: 20,
 },

 // ============ SECTION LABELS ============
 sectionLabel: {
  fontSize: 15,
  fontWeight: "600",
  color: "#333",
  marginBottom: 10,
  marginTop: 6,
 },
 required: {
  color: "#E74C3C",
  fontWeight: "700",
 },
 optionalTag: {
  color: "#999",
  fontWeight: "400",
  fontSize: 13,
 },

 // ============ IMAGE PICKER ============
 imagePickerBox: {
  backgroundColor: "#FFFFFF",
  borderRadius: 16,
  borderWidth: 2,
  borderColor: "#E0E0E0",
  borderStyle: "dashed",
  paddingVertical: 40,
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 24,
 },
 imagePickerIcon: {
  width: 72,
  height: 72,
  borderRadius: 36,
  backgroundColor: "rgba(58, 90, 64, 0.1)",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 14,
 },
 imagePickerText: {
  fontSize: 16,
  fontWeight: "600",
  color: "#3a5a40",
  marginBottom: 6,
 },
 imagePickerSubtext: {
  fontSize: 13,
  color: "#999",
 },

 // ============ IMAGE PREVIEW ============
 imagePreviewContainer: {
  borderRadius: 16,
  overflow: "hidden",
  marginBottom: 24,
  position: "relative",
 },
 imagePreview: {
  width: "100%",
  height: 240,
  borderRadius: 16,
  backgroundColor: "#E0E0E0",
 },
 removeImageButton: {
  position: "absolute",
  top: 10,
  right: 10,
  backgroundColor: "#FFF",
  borderRadius: 14,
 },
 imageSelectedBadge: {
  position: "absolute",
  bottom: 12,
  left: 12,
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 20,
  gap: 6,
 },
 imageSelectedText: {
  fontSize: 13,
  fontWeight: "600",
  color: "#3a5a40",
 },

 // ============ BOARD SELECTOR ============
 boardSelector: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#FFFFFF",
  borderRadius: 14,
  paddingHorizontal: 16,
  height: 52,
  marginBottom: 20,
  borderWidth: 1,
  borderColor: "#E0E0E0",
 },
 selectedBoardRow: {
  flexDirection: "row",
  alignItems: "center",
  flex: 1,
 },
 boardIconSmall: {
  width: 32,
  height: 32,
  borderRadius: 16,
  justifyContent: "center",
  alignItems: "center",
  marginRight: 10,
 },
 selectedBoardText: {
  fontSize: 16,
  color: "#333",
  fontWeight: "500",
 },
 placeholderText: {
  fontSize: 16,
  color: "#999",
 },

 // ============ INPUT FIELDS ============
 inputContainer: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  borderRadius: 14,
  paddingHorizontal: 16,
  height: 52,
  marginBottom: 4,
  borderWidth: 1,
  borderColor: "#E0E0E0",
 },
 inputIcon: {
  marginRight: 12,
 },
 input: {
  flex: 1,
  fontSize: 16,
  color: "#333",
 },

 // ============ TEXT AREA ============
 textAreaContainer: {
  flexDirection: "row",
  alignItems: "flex-start",
  backgroundColor: "#FFFFFF",
  borderRadius: 14,
  paddingHorizontal: 16,
  paddingTop: 14,
  marginBottom: 4,
  borderWidth: 1,
  borderColor: "#E0E0E0",
  minHeight: 120,
 },
 textArea: {
  flex: 1,
  fontSize: 16,
  color: "#333",
  minHeight: 100,
  paddingTop: 0,
 },

 // ============ CHAR COUNT ============
 charCount: {
  fontSize: 12,
  color: "#BBB",
  textAlign: "right",
  marginBottom: 20,
  marginRight: 4,
 },

 // ============ UPLOAD BUTTON ============
 uploadButton: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#3a5a40",
  paddingVertical: 16,
  borderRadius: 14,
  gap: 10,
  shadowColor: "#3a5a40",
  shadowOffset: {width: 0, height: 4},
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 5,
  marginTop: 10,
 },
 uploadButtonDisabled: {
  backgroundColor: "#A0A0A0",
  shadowOpacity: 0,
  elevation: 0,
 },
 uploadButtonText: {
  fontSize: 18,
  fontWeight: "600",
  color: "#FFF",
  letterSpacing: 0.5,
 },

 // ============ BOARD PICKER MODAL ============
 modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  justifyContent: "flex-end",
 },
 modalContent: {
  backgroundColor: "#FFF",
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  maxHeight: "70%",
  paddingBottom: 30,
 },
 modalHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: 20,
  paddingVertical: 18,
  borderBottomWidth: 1,
  borderBottomColor: "#E8E8E8",
 },
 modalTitle: {
  fontSize: 18,
  fontWeight: "700",
  color: "#333",
 },
 modalCloseButton: {
  width: 36,
  height: 36,
  borderRadius: 18,
  backgroundColor: "#F5F5F5",
  justifyContent: "center",
  alignItems: "center",
 },
 boardOption: {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 16,
  paddingHorizontal: 20,
  borderBottomWidth: 1,
  borderBottomColor: "#F0F0F0",
 },
 boardOptionSelected: {
  backgroundColor: "rgba(58, 90, 64, 0.06)",
 },
 boardOptionIcon: {
  width: 44,
  height: 44,
  borderRadius: 22,
  justifyContent: "center",
  alignItems: "center",
  marginRight: 14,
 },
 boardOptionText: {
  flex: 1,
  fontSize: 16,
  fontWeight: "500",
  color: "#333",
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
