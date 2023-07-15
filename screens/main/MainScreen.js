import React, { memo, useEffect } from "react"
import { ActivityIndicator, Button, FlatList, Text, View } from "react-native"
import { PATH } from "../../components/navigation/service"
import i18n from "../../i18n/configuration"
import { useNewCategoryStore } from "../../store/newCategoryStore"
import { useTableStore } from "../../store/tableStore"
import { global } from "../../styles/styles"
import { styles } from "./styles"

const Main = ({ route, navigation }) => {
	const tablesStore = useTableStore()
	const newCategoryStore = useNewCategoryStore()

	useEffect(() => {
		const init = async () => {
			await tablesStore.init()
		}
		init()
	}, [])

	return (
		<View style={global.card}>
			<Text style={global.title}>Main</Text>
			<View style={global.content}>
				{tablesStore.loading ? (
					<ActivityIndicator size="large" />
				) : (
					<FlatList
						data={tablesStore.tables}
						renderItem={({ item }) => (
							<View style={styles.itemWrapper}>
								<Text style={styles.itemTitle}>{item.title}</Text>

								<View style={styles.buttonsWrapper}>
									<Button
										disabled={tablesStore.loading}
										style={[styles.button]}
										title={i18n.t("buttons.report")}
										onPress={() => navigation.navigate(PATH.TABLE_REPORT, { table: item })}
									/>
									<Button
										disabled={tablesStore.loading}
										style={[styles.button]}
										title={i18n.t("buttons.expense_add")}
										onPress={() => navigation.navigate(PATH.EXPENSE_UPSERT, { table: item })}
									/>
								</View>
							</View>
						)}
						keyExtractor={(item) => item.id}
					/>
				)}
			</View>
			<View style={styles.buttonsWrapper}>
				<Button
					disabled={newCategoryStore.loading}
					title={i18n.t("buttons.settings")}
					color="#68ad6e"
					style={[styles.button]}
					onPress={() => navigation.navigate(PATH.SETTINGS)}
				/>
				<Button
					disabled={newCategoryStore.loading}
					title={i18n.t("buttons.category_add")}
					color="#68ad6e"
					style={[styles.button]}
					onPress={() => navigation.navigate(PATH.NEW_CATEGORY)}
				/>
				<Button
					disabled={newCategoryStore.loading}
					title={i18n.t("buttons.tags")}
					color="#68ad6e"
					style={[styles.button]}
					onPress={() => navigation.navigate(PATH.TAGS)}
				/>
			</View>
		</View>
	)
}

export default memo(Main)
