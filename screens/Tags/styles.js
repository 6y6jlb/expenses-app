import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
	form: {
		flex: 1,
		alignItems: "center",
		flexDirection: "column",
		gap: 20,
		marginTop: 20
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
