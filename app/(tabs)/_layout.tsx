import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
 return (
  <Tabs
   screenOptions={{
    headerShown: false,
    tabBarActiveTintColor: "#3a5a40",
    tabBarInactiveTintColor: "#888",
    tabBarStyle: {
     backgroundColor: "#FFFFFF",
     borderTopWidth: 1,
     borderTopColor: "#E8E8E8",
     paddingBottom: 8,
     paddingTop: 8,
     height: 90,
     zIndex: -1,
    },
    tabBarLabelStyle: {
     fontSize: 11,
     fontWeight: "600",
    },
   }}
  >
   <Tabs.Screen
    name="home"
    options={{
     tabBarLabel: "Home",
     tabBarIcon: ({color, size}) => (
      <Ionicons name="home-outline" size={size} color={color} />
     ),
    }}
   />
   <Tabs.Screen
    name="boards"
    options={{
     tabBarLabel: "Boards",
     tabBarIcon: ({color, size}) => (
      <Ionicons name="grid-outline" size={size} color={color} />
     ),
    }}
   />
   <Tabs.Screen
    name="create"
    options={{
     tabBarLabel: "Create",
     tabBarIcon: ({color, size}) => (
      <Ionicons name="add-circle-outline" size={size} color={color} />
     ),
    }}
   />
   <Tabs.Screen
    name="favourites"
    options={{
     tabBarLabel: "Favorites",
     tabBarIcon: ({color, size}) => (
      <Ionicons name="heart-outline" size={size} color={color} />
     ),
    }}
   />
  </Tabs>
 );
}
