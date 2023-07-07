import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import { useCallback } from "react"
import { SafeAreaView, StyleSheet } from "react-native"
import Navigator from "./components/navigation/Navigator"
import { global } from "./styles/styles"
import 'react-native-gesture-handler';
import i18n from "./i18n/configuration"
import * as Localization from "expo-localization"
import ScreenLayout from "./layouts/ScreenLayout"

SplashScreen.preventAutoHideAsync()

export default function App() {
	i18n.locale = Localization.locale

	const [fontsLoaded] = useFonts({
		"roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
		"roboto-light": require("./assets/fonts/Roboto-Light.ttf"),
		"roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
	})

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync()
		}
	}, [fontsLoaded])

	if (!fontsLoaded) {
		return null
	}
	return (
		<SafeAreaView onLayout={onLayoutRootView} style={global.container}>
			<ScreenLayout>
				<Navigator />
			</ScreenLayout>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({})
