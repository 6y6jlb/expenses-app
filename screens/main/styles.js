import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
	tableWrapper: {
		backgroundColor: "#C0DBEA",
		flex: 1,
		alignItems: "center",
		margin: 6,
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 5,
		shadowColor: "#000",
		flexDirection: "column",
		justifyContent: "space-between",
	},
	tableTitle: {
		fontSize: 22,
	},
	buttonsWrapper: {
		marginTop: 20,
		width: "80%",
		flexDirection: "column",
		flex:3,
		gap:6
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		width: "fit-content",
	},
})
