import React, { useCallback, useEffect, useState } from "react"
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Badge from "../../components/badge/Badge"
import ExpenseTableNewModal from "../../components/modals/expenseTableNew/ExpenseTableNewModal"
import { dropExpenseTable, selectFromExpenseTables, storeExpenseTable } from "../../database/expenses_tables"
import { global } from "../../styles/styles"
import { geDateRange } from "../../helpers/dateRange"
import moment from "moment"
import { dropCategories, selectFromCategories } from "../../database/categories"
import { createExpenseTableCategories } from "../../database/expenses_table_categories"

export default function Main({ navigation }) {
	const [loading, setLoading] = useState(false)
	const [tables, setTables] = useState([])
	const [modalVisible, setModalVisible] = useState(false)
	const [categories, setCategories] = useState([])
	const [form, setForm] = useState({
		title: "",
		description: "",
		currency: "",
	})

	console.log(categories)

	console.log(geDateRange(moment('2023-04-18'),moment('2023-03-18')))

	useEffect(() => {
		setLoading(true)
		selectFromExpenseTables(setTables)
		selectFromCategories(setCategories)
		createExpenseTableCategories()
		setLoading(false)
	}, [])



	if (loading) {
		return (
			<View style={global.header}>
				<Text style={global.title}> ...Loading tables</Text>
			</View>
		)
	}

	const createNewTable = useCallback(() => {
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
					dropCategories()
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
				submit={createNewTable}
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
