import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
	tableTitle: {
		fontWeight: "bold",
	},
	form: {
		backgroundColor: "#C0DBEA",
		paddingHorizontal: 8,
		paddingVertical: 10,
		flex: 1,
		alignItems: "center",
		flexDirection: "column",
		gap: 20,
		borderRadius: 6
	},
	picker: { height: 30 },

	input: {
		borderBottomWidth: 1,
	},
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
	fullWindth: {
		width: "100%",
	},
	buttonsWrapper: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 6
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
})
