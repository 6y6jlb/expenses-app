import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
	itemContainer: {
		flexDirection: "row",
		padding: 10,
	},
	checkbox: {
		alignSelf: "center",
	},
	checkboxLabel: {
		marginLeft: 8,
	},
	container: {
		overflow: "scroll",
		gap: 20,
	},
	form: {
		backgroundColor: "#f0f5f7",
		gap: 20,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	fullWindth: {
		width: "100%",
	},
	dropDownTitle: {
		fontSize: 20,
		fontFamily: "roboto-regular",
		backgroundColor: "#C0DBEA",
		borderRadius: 4,
		paddingHorizontal: 10,
		paddingVertical: 4,
	},
})
