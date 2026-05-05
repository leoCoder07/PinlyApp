import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
 LayoutAnimation,
 Platform,
 SafeAreaView,
 ScrollView,
 StatusBar,
 StyleSheet,
 Text,
 TouchableOpacity,
 UIManager,
 View,
} from "react-native";

if (
 Platform.OS === "android" &&
 UIManager.setLayoutAnimationEnabledExperimental
) {
 UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface FAQItem {
 id: string;
 question: string;
 answer: string;
 category: string;
}

const FAQ_DATA: FAQItem[] = [
 {
  id: "faq1",
  category: "General",
  question: "What is Pinly?",
  answer:
   "Pinly is a visual discovery platform where you can find, save, and share images that inspire you. Browse through curated boards, create your own collections, and connect with a community of creative individuals.",
 },
 {
  id: "faq2",
  category: "Uploading",
  question: "How do I upload images?",
  answer:
   "To upload images, navigate to the Create tab, tap the image upload box to select a photo from your gallery, choose which board it belongs to, add a title, and optionally a description. Then tap 'Upload Image' to share it with the community.",
 },
 {
  id: "faq3",
  category: "Boards",
  question: "How do I create a board?",
  answer:
   "Boards are automatically created when you upload or favorite an image with a board category selected. Currently, we have 8 board categories: Home Decor, Travel Inspo, Outfits, Dreamy Sunsets, Cozy Spaces, Recipes, Aesthetics, and Products. Choose the one that best fits your image!",
 },
 {
  id: "faq4",
  category: "Favorites",
  question: "How do favorites work?",
  answer:
   "When you find an image you love, tap the heart icon to save it to your favorites. Your favorited images are organized by board in the Favorites tab. You can also unheart an image to remove it from your collection. Tap the heart again in the image detail view to remove it.",
 },
 {
  id: "faq5",
  category: "General",
  question: "Can I download images?",
  answer:
   "Yes! When viewing an image in full detail mode, you'll see a Download button at the bottom. Tap it to save the image to your device. Please respect the original uploader's rights and use downloads responsibly.",
 },
 {
  id: "faq6",
  category: "Account",
  question: "How do I reset my password?",
  answer:
   "If you've forgotten your password, go to the Log In screen and tap 'Forgot password?'. Enter your email address and we'll send you a password reset link. Follow the link to create a new password and regain access to your account.",
 },
 {
  id: "faq7",
  category: "Account",
  question: "How do I edit my profile?",
  answer:
   "Go to your Profile by tapping 'View Profile' in the sidebar menu. On your profile page, tap the 'Edit Profile' button to update your profile picture, username, bio, and other details.",
 },
 {
  id: "faq8",
  category: "General",
  question: "Is Pinly free to use?",
  answer:
   "Yes! Pinly is completely free to use. You can browse, upload, save, and share images without any cost. We may introduce premium features in the future, but the core experience will always remain free.",
 },
 {
  id: "faq9",
  category: "Privacy",
  question: "Who can see my uploaded images?",
  answer:
   "All uploaded images are public and can be seen by anyone using Pinly. When you upload an image, it appears in the Home feed and the board category you selected. Other users can like, save, and comment on your uploads.",
 },
 {
  id: "faq10",
  category: "Support",
  question: "How do I report inappropriate content?",
  answer:
   "If you encounter inappropriate content, please use the report button available in the image detail view (three dots menu). You can also contact our support team at support@pinlyapp.com. We take community guidelines seriously and will review all reports promptly.",
 },
];

export default function FAQsScreen() {
 const [expandedId, setExpandedId] = useState<string | null>(null);
 const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

 const categories = [...new Set(FAQ_DATA.map((faq) => faq.category))];

 const filteredFAQs = selectedCategory
  ? FAQ_DATA.filter((faq) => faq.category === selectedCategory)
  : FAQ_DATA;

 const toggleExpand = (id: string) => {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  setExpandedId(expandedId === id ? null : id);
 };

 return (
  <SafeAreaView style={styles.container}>
   <StatusBar barStyle="dark-content" backgroundColor="#fefae0" />

   {}
   <View style={styles.header}>
    <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
     <Ionicons name="arrow-back" size={24} color="#3a5a40" />
    </TouchableOpacity>

    <Text style={styles.headerTitle}>FAQs</Text>

    <View style={{width: 40}} />
   </View>

   {}
   <View style={styles.categoryContainer}>
    <ScrollView
     horizontal
     showsHorizontalScrollIndicator={false}
     contentContainerStyle={styles.categoryScroll}
    >
     {}
     <TouchableOpacity
      style={[
       styles.categoryChip,
       selectedCategory === null && styles.categoryChipActive,
      ]}
      onPress={() => setSelectedCategory(null)}
     >
      <Text
       style={[
        styles.categoryChipText,
        selectedCategory === null && styles.categoryChipTextActive,
       ]}
      >
       All
      </Text>
     </TouchableOpacity>

     {}
     {categories.map((category) => (
      <TouchableOpacity
       key={category}
       style={[
        styles.categoryChip,
        selectedCategory === category && styles.categoryChipActive,
       ]}
       onPress={() =>
        setSelectedCategory(selectedCategory === category ? null : category)
       }
      >
       <Text
        style={[
         styles.categoryChipText,
         selectedCategory === category && styles.categoryChipTextActive,
        ]}
       >
        {category}
       </Text>
      </TouchableOpacity>
     ))}
    </ScrollView>
   </View>

   {}
   <ScrollView
    style={styles.scrollView}
    contentContainerStyle={styles.scrollContent}
    showsVerticalScrollIndicator={false}
   >
    {filteredFAQs.length === 0 ? (
     <View style={styles.emptyState}>
      <Ionicons name="search-outline" size={48} color="#CCC" />
      <Text style={styles.emptyText}>No FAQs found for this category</Text>
     </View>
    ) : (
     filteredFAQs.map((faq) => {
      const isExpanded = expandedId === faq.id;

      return (
       <TouchableOpacity
        key={faq.id}
        style={[styles.faqCard, isExpanded && styles.faqCardExpanded]}
        onPress={() => toggleExpand(faq.id)}
        activeOpacity={0.8}
       >
        {}
        <View style={styles.questionRow}>
         {}
         <View style={styles.categoryBadge}>
          <Text style={styles.categoryBadgeText}>{faq.category}</Text>
         </View>

         {}
         <Text
          style={styles.questionText}
          numberOfLines={isExpanded ? undefined : 2}
         >
          {faq.question}
         </Text>

         {}
         <Ionicons
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={20}
          color="#3a5a40"
          style={styles.chevron}
         />
        </View>

        {}
        {isExpanded && (
         <View style={styles.answerContainer}>
          <View style={styles.answerDivider} />
          <Text style={styles.answerText}>{faq.answer}</Text>

          {}
          <View style={styles.feedbackRow}>
           <Text style={styles.feedbackText}>Was this helpful?</Text>
           <TouchableOpacity style={styles.feedbackButton}>
            <Ionicons name="thumbs-up-outline" size={18} color="#3a5a40" />
           </TouchableOpacity>
           <TouchableOpacity style={styles.feedbackButton}>
            <Ionicons name="thumbs-down-outline" size={18} color="#3a5a40" />
           </TouchableOpacity>
          </View>
         </View>
        )}
       </TouchableOpacity>
      );
     })
    )}

    {}
    <View style={styles.contactSection}>
     <Text style={styles.contactTitle}>Still have questions?</Text>
     <Text style={styles.contactSubtitle}>
      Can't find what you're looking for? Reach out to our support team.
     </Text>
     <TouchableOpacity style={styles.contactButton} activeOpacity={0.8}>
      <Ionicons name="mail-outline" size={18} color="#FFF" />
      <Text style={styles.contactButtonText}>Contact Support</Text>
     </TouchableOpacity>
    </View>

    <View style={{height: 40}} />
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

 categoryContainer: {
  paddingVertical: 12,
  borderBottomWidth: 1,
  borderBottomColor: "#F0F0F0",
 },
 categoryScroll: {
  paddingHorizontal: 16,
  gap: 8,
 },
 categoryChip: {
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 20,
  backgroundColor: "#FFFFFF",
  borderWidth: 1,
  borderColor: "#E0E0E0",
  marginRight: 8,
 },
 categoryChipActive: {
  backgroundColor: "#3a5a40",
  borderColor: "#3a5a40",
 },
 categoryChipText: {
  fontSize: 13,
  fontWeight: "500",
  color: "#666",
 },
 categoryChipTextActive: {
  color: "#FFF",
 },

 scrollView: {
  flex: 1,
 },
 scrollContent: {
  paddingHorizontal: 16,
  paddingTop: 16,
 },

 faqCard: {
  backgroundColor: "#FFFFFF",
  borderRadius: 14,
  padding: 16,
  marginBottom: 10,
  shadowColor: "#000",
  shadowOffset: {width: 0, height: 1},
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 2,
 },
 faqCardExpanded: {
  borderLeftWidth: 3,
  borderLeftColor: "#3a5a40",
 },

 questionRow: {
  flexDirection: "row",
  alignItems: "flex-start",
 },

 categoryBadge: {
  backgroundColor: "rgba(58, 90, 64, 0.1)",
  paddingHorizontal: 8,
  paddingVertical: 3,
  borderRadius: 6,
  marginRight: 10,
  marginTop: 2,
 },
 categoryBadgeText: {
  fontSize: 10,
  fontWeight: "600",
  color: "#3a5a40",
  letterSpacing: 0.3,
 },

 questionText: {
  flex: 1,
  fontSize: 15,
  fontWeight: "600",
  color: "#1a1a1a",
  lineHeight: 21,
  marginRight: 36,
 },
 chevron: {
  position: "absolute",
  right: 0,
  top: 2,
 },

 answerContainer: {
  marginTop: 12,
 },
 answerDivider: {
  height: 1,
  backgroundColor: "#E8E8E8",
  marginBottom: 12,
 },
 answerText: {
  fontSize: 14,
  color: "#555",
  lineHeight: 22,
  letterSpacing: 0.2,
 },

 feedbackRow: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 16,
  paddingTop: 12,
  borderTopWidth: 1,
  borderTopColor: "#F0F0F0",
  gap: 8,
 },
 feedbackText: {
  fontSize: 13,
  color: "#999",
  marginRight: 4,
 },
 feedbackButton: {
  width: 34,
  height: 34,
  borderRadius: 17,
  backgroundColor: "#F5F5F5",
  justifyContent: "center",
  alignItems: "center",
 },

 emptyState: {
  alignItems: "center",
  paddingTop: 60,
  gap: 12,
 },
 emptyText: {
  fontSize: 15,
  color: "#999",
 },

 contactSection: {
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  borderRadius: 16,
  padding: 24,
  marginTop: 20,
  shadowColor: "#000",
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.06,
  shadowRadius: 6,
  elevation: 2,
 },
 contactTitle: {
  fontSize: 18,
  fontWeight: "700",
  color: "#1a1a1a",
  marginBottom: 6,
 },
 contactSubtitle: {
  fontSize: 13,
  color: "#888",
  textAlign: "center",
  lineHeight: 18,
  marginBottom: 18,
 },
 contactButton: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#3a5a40",
  paddingVertical: 12,
  paddingHorizontal: 24,
  borderRadius: 12,
  gap: 8,
  shadowColor: "#3a5a40",
  shadowOffset: {width: 0, height: 3},
  shadowOpacity: 0.2,
  shadowRadius: 5,
  elevation: 4,
 },
 contactButtonText: {
  fontSize: 15,
  fontWeight: "600",
  color: "#FFF",
  letterSpacing: 0.3,
 },
});
