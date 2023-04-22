import React, { memo, useCallback, useEffect, useState } from "react"
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Badge from "../../components/badge/Badge"
import ExpenseTable from "../../database/ExpenseTables"
import { useTableStore } from "../../state/tableStore"
import { global } from "../../styles/styles"
import UpdateTableModal from "../../components/modals/updateTableModal/UpdateTableModal"
import { useUpdateTableStore } from "../../state/updateTableStore"
import ExpenseCategories from "../../database/ExpenseCategories"

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
					<View style={styles.tableWrapper}>
						<Text style={styles.tableTitle}>{item.title}</Text>

						<View style={styles.buttonsWrapper}>
							<Button
								disabled={modalData.visible || tablesStore.loading}
								style={[styles.button]}
								title="изменить"
								onPress={() => modalData.show(item.id)}
							/>
							<Button
								disabled={modalData.visible || tablesStore.loading}
								style={[styles.button]}
								title="к отчету"
								onPress={() => navigation.navigate("report", item)}
							/>
						</View>
					</View>
				)}
				keyExtractor={(item) => item.id}
			/>
			<Button
				disabled={modalData.visible || tablesStore.loading}
				title="drop"
				onPress={async () => {
					await ExpenseTable.drop()
					await ExpenseCategories.drop()
				}}
			/>

			<UpdateTableModal />
		</View>
	)
}

const styles = StyleSheet.create({
	tableWrapper: {
		backgroundColor: "#C0DBEA",
		flex: 1,
		alignItems: "center",
		margin: 6,
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 5,
		shadowColor: "#000",
		flexDirection: "column",
		justifyContent: "space-between",
	},
	tableTitle: {
		fontSize: 22,
	},
	buttonsWrapper: {
		marginTop: 20,
		width: "80%",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		width: "fit-content",
	},
})

export default memo(Main)
