import { useFonts } from "expo-font"
import * as Localization from "expo-localization"
import * as SplashScreen from "expo-splash-screen"
import { useCallback, useEffect } from "react"
import { SafeAreaView } from "react-native"
import Navigator from "./components/navigation/Navigator"
import i18n from "./i18n/configuration"
import ScreenLayout from "./layouts/ScreenLayout"
import { useAppStore } from "./store/appStore"
import { global } from "./styles/styles"

SplashScreen.preventAutoHideAsync()

export default function App() {
	i18n.locale = Localization.locale

	const app = useAppStore()

	const [fontsLoaded] = useFonts({
		"roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
		"roboto-light": require("./assets/fonts/Roboto-Light.ttf"),
		"roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
	})

	useEffect(() => {
		app.init()
	}, [])

	const onLayoutRootView = useCallback(async () => {
		if (app.ready() && fontsLoaded) {
			await SplashScreen.hideAsync()
		}
	}, [fontsLoaded])

	if (!app.ready() || !fontsLoaded) {
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
