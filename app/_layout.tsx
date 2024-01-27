import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="(main)"
          options={{ title: "Home", headerShown: false }}
        />
        <Stack.Screen name="search" options={{ title: "" }} />
        <Stack.Screen name="cart" options={{ title: "Cart" }} />
        <Stack.Screen name="category/[categoryName]" options={{ title: "" }} />
        <Stack.Screen name="product/[productId]" options={{ title: "" }} />
        <Stack.Screen name="products/[query]" options={{ title: "" }} />
        <Stack.Screen name="edit-details" options={{ title: "Edit Details" }} />
        <Stack.Screen name="orders" options={{ title: "My Orders" }} />
        <Stack.Screen name="favourites" options={{ title: "My Favourites" }} />
        <Stack.Screen name="auth/login" options={{ title: "Login" }} />
        <Stack.Screen name="auth/register" options={{ title: "Register" }} />
        <Stack.Screen
          name="auth/[mobileNumber]"
          options={{ title: "Verify OTP" }}
        />
        <Stack.Screen name="checkout" options={{ title: "Checkout" }} />
      </Stack>
    </ThemeProvider>
  );
}
