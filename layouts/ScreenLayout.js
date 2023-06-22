import React from "react"
import { View } from "react-native"
import FlashMessage from "react-native-flash-message"

const ScreenLayout = ({ children }) => {
	return (
		<View style={{ flex: 1 }}>
			{children}
			<FlashMessage position="top" />
		</View>
	)
}

export default ScreenLayout
