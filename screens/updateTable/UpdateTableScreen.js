import React, { memo, useCallback, useEffect } from "react"
import { ActivityIndicator, Button, ScrollView, Text, View } from "react-native"
import i18n from "../../i18n/configuration"
import { useUpdateTableStore } from "../../store/updateTableStore"
import { global } from "../../styles/styles"
import Form from "./Form"
import { styles } from "./styles"

const UpdateTableScreen = ({ route, navigation }) => {
	const store = useUpdateTableStore()

	const submit = useCallback(() => {
		store.submit()
		navigation.goBack()
	}, [])

	useEffect(() => {
		store.init(route.params?.table)
	}, [])

	return (
		<ScrollView>
			<View style={global.card}>
				<Text style={global.title}>
					{i18n.t("table.change")}: <Text style={styles.tableTitle}>{route.params?.table?.title}</Text>
				</Text>
				<View style={[global.content, styles.centered]}>
					{store.loading ? (
						<ActivityIndicator size="large" />
					) : (
						<Form
							data={{
								...store.form,
								currentCurrency: store.data.table.currency ?? store.form.currency,
							}}
							updateFormValues={store.updateFormValues}
						/>
					)}
				</View>
				<View style={[styles.buttonsWrapper]}>
					<Button
						disabled={store.loading}
						title={i18n.t("buttons.save")}
						style={[styles.button]}
						onPress={submit}
					/>
					<Button
						disabled={store.loading}
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
