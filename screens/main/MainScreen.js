import React, { useCallback, useEffect, useState } from "react"
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Badge from "../../components/badge/Badge"
import ExpenseTableNewModal from "../../components/modals/expenseTableNew/ExpenseTableNewModal"
import { dropExpenseTable, selectFromExpenseTables, storeExpenseTable } from "../../database/db"
import { global } from "../../styles/styles"

export default function Main({ navigation }) {
	const [loading, setLoading] = useState(false)
	const [tables, setTables] = useState([])
	const [modalVisible, setModalVisible] = useState(false)
	const [form, setForm] = useState({
		name: "",
		description: "",
		currency: "",
	})

	useEffect(() => {
		setLoading(true)
		selectFromExpenseTables(setTables)
		setLoading(false)
	}, [])

	if (loading) {
		return (
			<View style={global.header}>
				<Text style={global.title}> ...Loading tables</Text>
			</View>
		)
	}
console.log(tables.length)
	const submit = useCallback(() => {
		storeExpenseTable(setTables, Object.values(form))
		setModalVisible(false)
	}, [form])

	return (
		<View style={global.header}>
			<Text style={global.title}>Main</Text>
			<FlatList
				data={tables}
				renderItem={({ item }) => (
					<TouchableOpacity onPress={() => navigation.navigate("report", item)}>
						<Badge color="#C0DBEA" title={item.name} />
					</TouchableOpacity>
				)}
				keyExtractor={(item) => item.id}
			/>
			<Button
				disabled={modalVisible || loading}
				title="drop"
				onPress={() => {
					dropExpenseTable()
				}}
			/>
			<Button
				disabled={modalVisible || loading}
				style={[styles.button]}
				title="add"
				onPress={() => setModalVisible(true)}
			/>
			<ExpenseTableNewModal
				onClose={() => setModalVisible(false)}
				visible={modalVisible}
				formData={form}
				setFormData={setForm}
				submit={submit}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
})
