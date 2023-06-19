import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
	form: {
		flex: 1,
		alignItems: "stretch",
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
})
