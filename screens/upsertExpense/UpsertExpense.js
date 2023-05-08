import React, { memo, useCallback, useEffect } from "react"
import { ActivityIndicator, StyleSheet, Text, View, Button, ScrollView } from "react-native"
import { useExpenseStore } from "../../state/expenseStore"
import { global } from "../../styles/styles"
import Form from "./Form"
import { styles } from "./styles"

const UpsertExpenseScreen = ({ route, navigation }) => {
	const store = useExpenseStore()

	useEffect(() => {
		store.init(route.params)
	}, [])

	const submit = useCallback(() => {
		store.submit()
		navigation.goBack()
	}, [])

	return (
		<View style={global.card}>
			<Text style={global.title}>{route.params.table ? "Новая трата" : "Изменение траты"}</Text>

			<ScrollView style={[global.content]}>
				{store.loading ? (
					<ActivityIndicator size="large" />
				) : (
					<Form data={store.data} updateFormValues={store.updateFormValues} />
				)}
			</ScrollView>

			<View style={styles.buttonsWrapper}>
				<Button disabled={store.loading} title="Сохранить" style={[styles.button]} onPress={submit} />
				<Button
					disabled={store.loading}
					title="назад"
					style={[styles.button]}
					color="#f03e6b"
					onPress={navigation.goBack}
				/>
			</View>
		</View>
	)
}

export default memo(UpsertExpenseScreen)
