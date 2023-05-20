import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
	itemsContainer: {
		flexDirection: "row",
		margin: 6,
	},
	checked: {
		backgroundColor: "#68ad6e",
		color: "#fff",
	},
	label: {
		padding: 4,
	},
	fullWindth: {
		width: "100%",
	},
	listWrapper: {
		flexDirection: "row"
	},
	container: {
		overflow: "scroll",
		gap: 20,
	},
	form: {
		backgroundColor: "#fff",
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
	title: {
		fontSize: 20,
		fontFamily: "roboto-regular",
		backgroundColor: "#C0DBEA",
		borderRadius: 4,
		paddingHorizontal: 10,
		paddingVertical: 4,
	},
})
