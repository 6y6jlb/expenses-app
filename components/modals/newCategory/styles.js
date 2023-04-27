import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		marginTop: 22,
		backgroundColor: "white",
		maxHeight: "70%",
		borderRadius: 20,
		padding: 35,
		shadowColor: "#000",
		flexDirection: "column",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	form: {
		flex: 1,
		alignItems: "center",
		flexDirection: "column",
		gap: 20,
	},
	buttonsWrapper: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
})
