import React, { memo, useEffect } from "react"
import { ActivityIndicator, Button, FlatList, Text, View } from "react-native"
import AppService from "../../services/AppService"
import { useNewCategoryStore } from "../../state/newCategoryStore"
import { useTableStore } from "../../state/tableStore"
import { global } from "../../styles/styles"
import { styles } from "./styles"
import i18n from '../../i18n/configuration'


const Main = ({ route, navigation }) => {
	const tablesStore = useTableStore()
	const newCategoryStore = useNewCategoryStore()

	console.log(i18n.t('buttons.change'))

	useEffect(() => {
		AppService.init()
		tablesStore.init()
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
										title={i18n.t('buttons.change')}
										onPress={() => navigation.navigate("update", item)}
									/>
									<Button
										disabled={tablesStore.loading}
										style={[styles.button]}
										title="к отчету"
										onPress={() => navigation.navigate("report", item)}
									/>
									<Button
										disabled={tablesStore.loading}
										style={[styles.button]}
										title="новая трата"
										onPress={() => navigation.navigate("upsert-expense", { table: item })}
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
					disabled={tablesStore.loading}
					style={[styles.button]}
					title="drop all"
					onPress={async () => {
						await AppService.drop()
					}}
				/>
				<Button
					disabled={newCategoryStore.loading}
					title="добавить категорию"
					color="#68ad6e"
					style={[styles.button]}
					onPress={() => navigation.navigate("new-category")}
				/>
			</View>
		</View>
	)
}

export default memo(Main)
