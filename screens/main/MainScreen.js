import React, { memo, useCallback, useEffect, useState } from "react"
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Badge from "../../components/badge/Badge"
import ExpenseTable from "../../database/ExpenseTables"
import { useTableStore } from "../../state/tableStore"
import { global } from "../../styles/styles"
import UpdateTableModal from "../../components/modals/updateTableModal/UpdateTableModal"
import { useUpdateTableStore } from "../../state/updateTableStore"
import Categories from "../../database/Categories"

const Main = ({ navigation }) => {
	const tablesStore = useTableStore()
	const modalData = useUpdateTableStore()

	useEffect(() => {
		tablesStore.init()
	}, [])


	if (tablesStore.loading) {
		return (
			<View style={global.header}>
				<Text style={global.title}> ...Loading tables</Text>
			</View>
		)
	}

	return (
		<View style={global.header}>
			<Text style={global.title}>Main</Text>
			<FlatList
				data={tablesStore.tables}
				renderItem={({ item }) => (
					<View>
						<TouchableOpacity onPress={() => navigation.navigate("report", item)}>
							<Badge color="#C0DBEA" title={item.title} />
						</TouchableOpacity>
						<Button
								disabled={modalData.visible || tablesStore.loading}
								style={[styles.button]}
								title="изменить"
								onPress={() => modalData.show(item.id)}
							/>
					</View>
				)}
				keyExtractor={(item) => item.id}
			/>
			<Button
				disabled={modalData.visible || tablesStore.loading}
				title="drop"
				onPress={async () => {
					await ExpenseTable.drop()
					await Categories.drop()
				}}
			/>

			<UpdateTableModal />
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

export default memo(Main)
