import React, { memo, useCallback, useEffect } from "react"
import { ActivityIndicator, Button, ScrollView, Text, View } from "react-native"
import i18n from "../../i18n/configuration"
import { useUpdateTableStore } from "../../state/updateTableStore"
import { global } from "../../styles/styles"
import Form from "./Form"
import { styles } from "./styles"

const UpdateTableScreen = ({ route, navigation }) => {
	const updateTableStore = useUpdateTableStore()

	const submit = useCallback(() => {
		updateTableStore.submit()
		navigation.goBack()
	}, [])

	useEffect(() => {
		updateTableStore.init(route.params.id)
	}, [])

	return (
		<ScrollView>
			<View style={global.card}>
				<Text style={global.title}>
					{i18n.t("table.change")}: <Text style={styles.tableTitle}>{route.params.title}</Text>
				</Text>
				<View style={[global.content, styles.centered]}>
					{updateTableStore.loading ? (
						<ActivityIndicator size="large" />
					) : (
						<Form
							data={{
								...updateTableStore.form,
								currentCurrency: updateTableStore.data.table.currency ?? updateTableStore.form.currency,
							}}
							updateFormValues={updateTableStore.updateFormValues}
						/>
					)}
				</View>
				<View style={[styles.buttonsWrapper]}>
					<Button
						disabled={updateTableStore.loading}
						title={i18n.t("buttons.save")}
						style={[styles.button]}
						onPress={submit}
					/>
					<Button
						disabled={updateTableStore.loading}
						title={i18n.t("buttons.back")}
						color="#6c757d"
						style={[styles.button]}
						onPress={navigation.goBack}
					/>
				</View>
			</View>
		</ScrollView>
	)
}

export default memo(UpdateTableScreen)
