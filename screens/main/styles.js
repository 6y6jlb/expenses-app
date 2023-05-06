import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
	itemWrapper: {
		backgroundColor: "#C0DBEA",
		flex: 1,
		alignItems: "center",
		margin: 6,
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 6,
		shadowColor: "#000",
		flexDirection: "column",
		justifyContent: "space-between",
	},
	itemTitle: {
		fontSize: 22,
	},
	buttonsWrapper: {
		flexDirection: "column",
		margin: 20,
		gap: 6,
	},
	button: {
		borderRadius: 20,
		padding: 10,
	},
})
