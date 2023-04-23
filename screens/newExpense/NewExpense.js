import React, { useState } from "react"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import DatePicker from 'react-native-date-picker'
import { global } from "../../styles/styles"

export default function NewExpenseScreen({ route }) {
	const [date, setDate] = useState(new Date(1598051730000))

	return (
		<View style={global.card}>
			<Text style={global.title}>Новая трата</Text>
			{false ? (
				<ActivityIndicator size="large" />
			) : (
				<View style={styles.form}>
					<DatePicker date={date}  onChange={setDate} />
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	form: {
		flex: 1,
		backgroundColor: "#C0DBEA",
		paddingHorizontal: 8,
		paddingVertical: 10,
		flex: 1,
		alignItems: "center",
	},
	calendar: {
		width: '90%'
	}
})
