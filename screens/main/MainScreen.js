import React, { memo, useEffect } from "react"
import { Button, FlatList, Text, View } from "react-native"
import ExpenseCategories from "../../database/ExpenseCategories"
import ExpenseTable from "../../database/ExpenseTables"
import { useTableStore } from "../../state/tableStore"
import { global } from "../../styles/styles"
import { styles } from "./styles"

const Main = ({ navigation }) => {
	const tablesStore = useTableStore()

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
		<View style={global.card}>
			<Text style={global.title}>Main</Text>
			<FlatList
				data={tablesStore.tables}
				renderItem={({ item }) => (
					<View style={styles.tableWrapper}>
						<Text style={styles.tableTitle}>{item.title}</Text>

						<View style={styles.buttonsWrapper}>
							<Button
								disabled={tablesStore.loading}
								style={[styles.button]}
								title="изменить"
								onPress={() => navigation.navigate("update", item)}
							/>
							<Button
								disabled={tablesStore.loading}
								style={[styles.button]}
								title="к отчету"
								onPress={() => navigation.navigate("report", item)}
							/>
							<Button
								disabled={tablesStore.loading}
								style={[styles.button]}
								title="новая трата"
								onPress={() => navigation.navigate("report", item)}
							/>
						</View>
					</View>
				)}
				keyExtractor={(item) => item.id}
			/>
			<Button
				disabled={tablesStore.loading}
				title="drop all"
				onPress={async () => {
					await ExpenseTable.drop()
					await ExpenseCategories.drop()
				}}
			/>
		</View>
	)
}

export default memo(Main)
