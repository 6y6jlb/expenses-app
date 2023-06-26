import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
	head: { height: 40, backgroundColor: "#f1f8ff" },
	singleHead: { height: 40, backgroundColor: "#c8e1ff" },
	text: { margin: 6, height: 40, alignSelf: "center", color: "#000" },
	row: { flexDirection: "row", backgroundColor: "#FFF1C1" },
	summaryKey: { color: "#000", fontFamily: "roboto-light" },
	summaryValue: { color: "#000", fontFamily: "roboto-bold" },
	summaryContainer: { paddingVertical: 10, paddingHorizontal: 20, backgroundColor: "#FFF1C1", gap: 10 },
	between: { justifyContent: "space-between" },
	column: { backgroundColor: "#f1f8ff" },
	cell: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#FFF1C1",
		height: 40,
	},
})
