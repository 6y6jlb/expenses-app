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

	const submitAndStay = useCallback(() => {
		store.submit()
	}, [])

	const submitAndQuit = useCallback(() => {
		store.submit()
		navigation.goBack()
	}, [])

	return (
		<ScrollView>
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
					{!route.params.expense.id && (
						<Button
							disabled={store.loading}
							title={i18n.t("buttons.save_and_stay")}
							style={[styles.button]}
							onPress={submitAndStay}
						/>
					)}
					<Button
						disabled={store.loading}
						title={i18n.t("buttons.save_and_quit")}
						style={[styles.button]}
						onPress={submitAndQuit}
					/>
					<Button
						disabled={store.loading}
						title={i18n.t("buttons.back")}
						style={[styles.button]}
						color="#6c757d"
						onPress={navigation.goBack}
					/>
				</View>
			</View>
		</ScrollView>
	)
}

export default memo(UpsertExpenseScreen)
