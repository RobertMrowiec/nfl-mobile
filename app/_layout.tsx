import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
			router.replace("/players");
		}
	}, [loaded, router]);

	if (!loaded) {
		return null;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<GluestackUIProvider config={config}>
				<Stack>
					<Stack.Screen name="players/index" options={{ headerShown: false }} />
					<Stack.Screen name="players/[id]" options={{ headerShown: false }} />
					<Stack.Screen name="+not-found" />
				</Stack>
			</GluestackUIProvider>
		</QueryClientProvider>
	);
}
