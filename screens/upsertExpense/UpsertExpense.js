import React, { memo, useCallback, useEffect } from "react"
import { ActivityIndicator, Button, ScrollView, Text, View } from "react-native"
import i18n from "../../i18n/configuration"
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
			<Text style={global.title}>{i18n.t(route.params.table ? "expenses.new" : "expenses.change")}</Text>

			<ScrollView style={[global.content]}>
				{store.loading ? (
					<ActivityIndicator size="large" />
				) : (
					<Form data={store.data} updateFormValues={store.updateFormValues} />
				)}
			</ScrollView>

			<View style={styles.buttonsWrapper}>
				<Button
					disabled={store.loading}
					title={i18n.t("buttons.save")}
					style={[styles.button]}
					onPress={submit}
				/>
				<Button
					disabled={store.loading}
					title={i18n.t("buttons.back")}
					style={[styles.button]}
					color="#f03e6b"
					onPress={navigation.goBack}
				/>
			</View>
		</View>
	)
}

export default memo(UpsertExpenseScreen)
