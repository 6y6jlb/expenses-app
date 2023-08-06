import { Picker } from "@react-native-picker/picker"
import React, { memo } from "react"
import { ActivityIndicator, Button, Text, TextInput, View, ScrollView } from "react-native"
import { CURRENCIES, DATE_FORMATS, REPORT_PERIODS, SETTINGS, COMMON_SCREEN_STATE as STATE } from "../../config/consts"
import i18n from "../../i18n/configuration"
import { useSettingsStore } from "../../store/settingsStore"
import { global } from "../../styles/styles"
import { styles } from "./styles"

const SettingsScreen = ({ route, navigation }) => {
	const store = useSettingsStore()

	const settings = store.data

	return (
		<View style={global.card}>
			<View style={global.content}>
				{store.loading ? (
					<ActivityIndicator size="large" />
				) : (
					<>
						<ScrollView>
							<View style={styles.form}>
								<View>
									<Text>{i18n.t("settings.default_table_name")}</Text>
									{store.state === STATE.SHOW ? (
										<Text style={global.title}>{settings.default_table_title.value}</Text>
									) : (
										<TextInput
											style={[global.input, global.fullWindth]}
											placeholderTextColor="#afb4b7"
											value={settings.default_table_title.value}
											placeholder="default_table_title"
											onChangeText={(value) => store.updateValue("default_table_title", value)}
										/>
									)}
								</View>
								<View>
									<Text>{i18n.t("settings.default_table_currency")}</Text>
									{store.state === STATE.SHOW ? (
										<Text style={global.title}>{settings.default_table_currency.value}</Text>
									) : (
										<Picker
											selectedValue={settings.default_table_currency.value}
											style={[styles.picker]}
											onValueChange={(value) =>
												store.updateValue("default_table_currency", value)
											}
										>
											{Object.values(CURRENCIES).map((currency) => {
												return (
													<Picker.Item
														key={currency.label}
														label={currency.label}
														value={currency.label}
													/>
												)
											})}
										</Picker>
									)}
								</View>
								<View>
									<Text>{i18n.t("settings.default_date_format")}</Text>
									{store.state === STATE.SHOW ? (
										<Text style={global.title}>
											{settings[SETTINGS.DEFAULT_DATE_FORMAT]?.value}
										</Text>
									) : (
										<Picker
											selectedValue={settings.default_date_format.value}
											style={[styles.picker]}
											onValueChange={(value) => store.updateValue("default_date_format", value)}
										>
											{DATE_FORMATS.map((format, index) => {
												return <Picker.Item key={format} label={format} value={format} />
											})}
										</Picker>
									)}
								</View>
								<View>
									<Text>{i18n.t("settings.default_date_interval")}</Text>
									{store.state === STATE.SHOW ? (
										<Text style={global.title}>
											{settings[SETTINGS.DEFAULT_DATE_INTERVAL]?.value}
										</Text>
									) : (
										<Picker
											selectedValue={settings.default_date_interval.value}
											style={[styles.picker]}
											onValueChange={(value) => store.updateValue("default_date_interval", value)}
										>
											{Object.values(REPORT_PERIODS).map((period, index) => {
												return <Picker.Item key={period} label={period} value={period} />
											})}
										</Picker>
									)}
								</View>
								<View>
									<Text>{i18n.t("settings.tables_count")}</Text>
									<Text style={global.title}>{settings.tables_count.value}</Text>
								</View>
							</View>
						</ScrollView>

						<View style={styles.buttonsWrapper}>
							{store.state === STATE.SHOW ? (
								<Button
									disabled={store.loading || store.state === STATE.UPDATE}
									style={[styles.button]}
									title={i18n.t("buttons.update_settings")}
									onPress={store.update}
								/>
							) : (
								<>
									<Button
										disabled={store.loading || store.state === STATE.SHOW}
										style={[styles.button]}
										title={i18n.t("buttons.cancel_update_settings")}
										color="#6c757d"
										onPress={store.cancel}
									/>
									<Button
										disabled={store.loading || store.state === STATE.SHOW}
										style={[styles.button]}
										title={i18n.t("buttons.save_settings")}
										onPress={store.submit}
									/>
								</>
							)}
						</View>
					</>
				)}
			</View>
		</View>
	)
}

export default memo(SettingsScreen)
