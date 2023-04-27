import React, { useCallback, useEffect } from "react"
import { ActivityIndicator, Button, Text, View, CheckBox, FlatList, TouchableOpacity } from "react-native"
import { useUpdateTableStore } from "../../state/updateTableStore"
import { global } from "../../styles/styles"
import Form from "./Form"
import { styles } from "./styles"
import Categories from "../../components/categories/Categories"

export default function UpdateTableScreen({ route, navigation }) {
	const updateTableStore = useUpdateTableStore()

	const submit = useCallback(() => {
		updateTableStore.submit()
		navigation.goBack()
	}, [])

	useEffect(() => {
		updateTableStore.init(route.params.id)
	}, [])

	return (
		<View style={global.card}>
			<Text style={global.title}>
				Изменение таблицы: <Text style={styles.tableTitle}>{route.params.title}</Text>
			</Text>
			<View style={[global.content, styles.centered]}>
				{updateTableStore.loading ? (
					<ActivityIndicator size="large" />
				) : (
					<>
						<Form data={updateTableStore.data} updateFormValues={updateTableStore.updateFormValues} />
						<Categories />
					</>
				)}
			</View>
			<View style={[styles.buttonsWrapper]}>
					<Button
						disabled={updateTableStore.loading}
						title="сохранить"
						style={[styles.button]}
						onPress={submit}
					/>
					<Button
						disabled={updateTableStore.loading}
						title="назад"
						color="#f03e6b"
						style={[styles.button]}
						onPress={navigation.goBack}
					/>
				</View>
		</View>
	)
}
