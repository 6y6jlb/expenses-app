import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import { useCallback, useEffect } from "react"
import { SafeAreaView, StyleSheet } from "react-native"
import Navigator from "./components/navigation/Navigator"
import { global } from "./styles/styles"
import i18n from "./i18n/configuration"
import * as Localization from "expo-localization"
import ScreenLayout from "./layouts/ScreenLayout"
import AppService from "./services/AppService"

SplashScreen.preventAutoHideAsync()

export default function App() {
	i18n.locale = Localization.locale

	const [fontsLoaded] = useFonts({
		"roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
		"roboto-light": require("./assets/fonts/Roboto-Light.ttf"),
		"roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
	})

	useEffect(() => {
		const init = async () => {
			await AppService.init()
		}
		init()
	}, [])


	const onLayoutRootView = useCallback(async () => {
		if (AppService.loaded && fontsLoaded) {
			await SplashScreen.hideAsync()
		}
	}, [fontsLoaded])

	if (!AppService.loaded || !fontsLoaded) {
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
