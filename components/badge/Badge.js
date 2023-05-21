import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { BADGE_TYPES } from "./const"

export default function Badge({ title, type = BADGE_TYPES.PRIMARY }) {
	return (
		<View style={[styles.item, styles[type]]}>
			<Text style={[styles.title, styles[type]]}>{title}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	[BADGE_TYPES.PRIMARY]: {
		backgroundColor: "#007bff",
    color: '#fff'
	},
	[BADGE_TYPES.SECONDARY]: {
		backgroundColor: "#6c757d",
    color: '#fff'
	},
	[BADGE_TYPES.SUCCESS]: {
		backgroundColor: "#28a745",
    color: '#fff'
	},
	[BADGE_TYPES.DANGER]: {
		backgroundColor: "#dc3545",
    color: '#fff'
	},
	[BADGE_TYPES.WARNING]: {
		backgroundColor: "#ffc107",
    color: '#343a40'
	},
	[BADGE_TYPES.INFO]: {
		backgroundColor: "#17a2b8",
    color: '#fff'
	},
	[BADGE_TYPES.LIGHT]: {
		backgroundColor: "#f8f9fa",
    color: '#343a40'
	},
  [BADGE_TYPES.DARK]: {
		backgroundColor: "#343a40",
    color: '#fff'
	},
  [BADGE_TYPES.WHITE]: {
		backgroundColor: "#fff",
    color: '#343a40'
	},
	item: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		alignItems: "center",
		borderRadius: 10,
		width: "fit-content",
	},
	title: {
		fontSize: 14,
	},
})
