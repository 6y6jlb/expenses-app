import React, { memo } from "react"
import { ActivityIndicator, Button, Text, View } from "react-native"
import { PATH } from "../../components/navigation/service"
import i18n from "../../i18n/configuration"
import { useTableStore } from "../../store/tableStore"
import { global } from "../../styles/styles"
import { styles } from "./styles"

const SettingsScreen = ({ route, navigation }) => {
	const tablesStore = useTableStore()

	const table = React.useMemo(() => tablesStore.tables.find((table) => table.default), [tablesStore])

	return (
		<View style={global.card}>
			<Text style={global.title}>Main</Text>
			<View style={global.content}>
				{tablesStore.loading ? (
					<ActivityIndicator size="large" />
				) : (
					<View style={styles.itemWrapper}>
								<Text style={styles.itemTitle}>{table.title}</Text>

								<View style={styles.buttonsWrapper}>
									<Button
										disabled={tablesStore.loading}
										style={[styles.button]}
										title={i18n.t("buttons.change_table")}
										onPress={() => navigation.navigate(PATH.TABLE_UPDATE,  { table })}
									/>
								</View>
							</View>
				)}
			</View>
		</View>
	)
}

export default memo(SettingsScreen)
