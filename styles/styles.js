import { StyleSheet, PlatformColor } from "react-native"

export const global = StyleSheet.create({
	container: {
		flex: 10,
	},
	header: {
		flex: 1,
	},
	title: {
		fontSize: 30,
        fontFamily: "roboto-regular",
        paddingVertical: 10,
        textAlign:'center',
        textTransform: 'uppercase'
	},
})
