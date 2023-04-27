import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
	tableTitle: {
		fontWeight: "bold",
	},
	centered: {
		marginTop: 22,
		gap: 20
	},
	form: {
		backgroundColor: "#C0DBEA",
		paddingHorizontal: 8,
		paddingVertical: 10,
		alignItems: "center",
		flexDirection: "column",
		gap: 20,
	},
	picker: { height: 30 },

	dropDownTitle: {
		fontSize: 20,
		fontFamily: "roboto-regular",
	},
	checkboxContainer: {
		flexDirection: "row",
		marginTop: 10,
	},
	checkbox: {
		alignSelf: "center",
	},
	checkboxLabel: {
		marginLeft: 8,
	},
	categoryContainer: {
		overflow: "scroll",
		maxHeight: "50%",
	},
	buttonsWrapper: {
		flexDirection: "column",
		justifyContent: "space-between",
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
})
