import React, { useCallback, useEffect } from "react"
import { ActivityIndicator, Button, Text, View } from "react-native"
import { useUpdateTableStore } from "../../state/updateTableStore"
import { global } from "../../styles/styles"
import Form from "./Form"
import { styles } from "./styles"

export default function UpdateTableScreen({ route, navigation }) {
	const updateTable = useUpdateTableStore()

	const submit = useCallback(() => {
		updateTable.submit()
		navigation.goBack()
	}, [])

	useEffect(() => {
		updateTable.init(route.params.id)
	}, [])



	return (
		<View style={global.card}>
			<Text style={global.title}>
				Изменение таблицы: <Text style={styles.tableTitle}>{route.params.title}</Text>
			</Text>
			<View style={styles.centeredView}>
				{updateTable.loading ? (
					<ActivityIndicator size="large" />
				) : (
					<Form data={updateTable.data} updateFormValues={updateTable.updateFormValues} />
				)}
				<View style={styles.buttonsWrapper}>
					<Button disabled={updateTable.loading} title="сохранить" style={[styles.button]} onPress={submit} />
				</View>
			</View>
		</View>
	)
}
