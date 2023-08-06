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
	form: {
		flex: 1,
		alignItems: "center",
		flexDirection: "column",
		gap: 20,
	},
	buttonsWrapper: {
		marginTop: 12,
		gap: 6,
		flexDirection: "column",
		justifyContent: "space-between",
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	picker: { height: 30 },
})
