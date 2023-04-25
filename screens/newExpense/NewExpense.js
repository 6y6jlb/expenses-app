import React, { useCallback, useEffect } from "react"
import { ActivityIndicator, StyleSheet, Text, View, Button } from "react-native"
import { useNewExpenseStore } from "../../state/newExpenseStore"
import { global } from "../../styles/styles"
import Form from "./Form"
import {styles} from "./styles"

export default function NewExpenseScreen({ route, navigation }) {
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
			{newExpenses.loading ? (
				<ActivityIndicator size="large" />
			) : (
				<Form data={newExpenses.data} updateFormValues={newExpenses.updateFormValues} />
			)}
			<View style={styles.buttonsWrapper}>
				<Button disabled={newExpenses.loading} title="сохранить" style={[styles.button]} onPress={submit} />
			</View>
		</View>
	)
}

