import React, { memo } from "react"
import { ActivityIndicator, Button, Text, View } from "react-native"
import { PATH } from "../../components/navigation/service"
import i18n from "../../i18n/configuration"
import { useTableStore } from "../../store/tableStore"
import { global } from "../../styles/styles"
import { styles } from "./styles"
import { useSettingsStore } from "../../store/settingsStore"
import { SETTINGS } from "../../config/consts"

const SettingsScreen = ({ route, navigation }) => {
	const settingsStore = useSettingsStore()
	const tablesStore = useTableStore()

	const settings = settingsStore.settings
	const table = React.useMemo(
		() => tablesStore.tables.find((table) => table.id === Number(settings[SETTINGS.DEFAULT_TABLE_ID].value)),
		[settingsStore, tablesStore]
	)

	return (
		<View style={global.card}>
			<View style={global.content}>
				{settingsStore.loading || tablesStore.loading ? (
					<ActivityIndicator size="large" />
				) : (
					<>
						<View style={styles.form}>
							{table && (
								<>
									<View>
										<Text>{i18n.t("settings.default_table_name")}</Text>
										<Text style={global.title}>{table.title}</Text>
									</View>
									<View>
										<Text>{i18n.t("settings.default_table_currency")}</Text>
										<Text style={global.title}>{table.currency}</Text>
									</View>
								</>
							)}
							<View>
								<Text>{i18n.t("settings.default_date_format")}</Text>
								<Text style={global.title}>{settings[SETTINGS.DEFAULT_DATE_FORMAT].value}</Text>
							</View>
							<View>
								<Text>{i18n.t("settings.default_date_interval")}</Text>
								<Text style={global.title}>{settings[SETTINGS.DEFAULT_DATE_INTERVAL].value}</Text>
							</View>
							<View>
								<Text>{i18n.t("settings.tables_count")}</Text>
								<Text style={global.title}>{tablesStore.tables.length}</Text>
							</View>
						</View>

						<View style={styles.buttonsWrapper}>
							<Button
								disabled={settingsStore.loading}
								style={[styles.button]}
								title={i18n.t("buttons.change_table")}
								onPress={() => navigation.navigate(PATH.TABLE_UPDATE, { table })}
							/>
						</View>
					</>
				)}
			</View>
		</View>
	)
}

export default memo(SettingsScreen)
