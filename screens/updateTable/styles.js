import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
	tableTitle: {
		fontWeight: "bold",
	},
	centered: {
		marginTop: 22,
		gap: 20,
	},
	form: {
		backgroundColor: "#C0DBEA",
		paddingHorizontal: 8,
		paddingVertical: 10,
		alignItems: "center",
		flexDirection: "column",
		borderRadius: 4,
		gap: 20,
	},
	picker: { height: 30 },

	dropDownTitle: {
		fontSize: 20,
		fontFamily: "roboto-regular",
	},
	categoryContainer: {
		overflow: "scroll",
		maxHeight: "50%",
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
})
