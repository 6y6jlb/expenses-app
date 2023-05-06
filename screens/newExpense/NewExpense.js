import React, { memo, useCallback, useEffect } from "react"
import { ActivityIndicator, StyleSheet, Text, View, Button, ScrollView } from "react-native"
import { useNewExpenseStore } from "../../state/newExpenseStore"
import { global } from "../../styles/styles"
import Form from "./Form"
import { styles } from "./styles"

const NewExpenseScreen = ({ route, navigation }) => {
	const newExpenses = useNewExpenseStore()

	useEffect(() => {
		newExpenses.init(route.params.id)
	}, [])

	const submit = useCallback(() => {
		newExpenses.submit()
		navigation.goBack()
	}, [])

	return (
		<View style={global.card}>
			<Text style={global.title}>Новая трата</Text>

			<ScrollView style={[global.content]}>
				{newExpenses.loading ? (
					<ActivityIndicator size="large" />
				) : (
					<Form data={newExpenses.data} updateFormValues={newExpenses.updateFormValues} />
				)}
			</ScrollView>

			<View style={styles.buttonsWrapper}>
				<Button disabled={newExpenses.loading} title="сохранить" style={[styles.button]} onPress={submit} />
				<Button
					disabled={newExpenses.loading}
					title="назад"
					style={[styles.button]}
					color="#f03e6b"
					onPress={navigation.goBack}
				/>
			</View>
		</View>
	)
}

export default memo(NewExpenseScreen)
