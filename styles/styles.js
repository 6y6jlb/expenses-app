import { StyleSheet, PlatformColor } from "react-native"

export const global = StyleSheet.create({
	container: {
		flex: 10,
	},
	card: { flex: 1, margin: 16, marginTop: 30, padding: 20, backgroundColor: "#fff" },
	header: {
		flex: 1,
	},
	title: {
		fontSize: 20,
		marginBottom: 10,
		fontFamily: "roboto-regular",
		paddingVertical: 10,
		textAlign: "center",
		textTransform: "uppercase",
	},
	input: {
		borderBottomWidth: 1,
	},
	fullWindth: {
		width: "100%",
	},
	content: {
		flex: 1,
	},
})
