import React, { memo, useCallback } from "react"
import { Button, Text, TextInput, View } from "react-native"
import { styles } from "./styles"
import Categories from "../../components/categories/Categories"
import { useNewCategoryStore } from "../../state/newCategoryStore"
import { global } from "../../styles/styles"
import i18n from "../../i18n/configuration"
import { ScrollView } from "react-native-gesture-handler"
import ScreenLayout from "../../layouts/ScreenLayout"

const NewCategoryScreen = ({ route, navigation }) => {
	const newCategoryStore = useNewCategoryStore()

	const submit = useCallback(() => {
		newCategoryStore.submit()
		navigation.goBack()
	}, [])

	return (
		<ScreenLayout>
			<ScrollView>
				<View style={global.card}>
					<Text style={global.title}>{i18n.t("category.new_category")}</Text>
					<View style={styles.form}>
						<TextInput
							style={[global.input, global.fullWindth]}
							placeholderTextColor="#afb4b7"
							value={newCategoryStore.data.title}
							placeholder={i18n.t("form.title")}
							onChangeText={(value) => newCategoryStore.updateFormValues("title", value)}
						/>
						<TextInput
							style={[global.input, global.fullWindth]}
							placeholderTextColor="#afb4b7"
							value={newCategoryStore.data.description}
							placeholder={i18n.t("form.description")}
							onChangeText={(value) => newCategoryStore.updateFormValues("description", value)}
						/>
						<Categories />
					</View>

					<View style={styles.buttonsWrapper}>
						<Button
							disabled={newCategoryStore.loading}
							title={i18n.t("buttons.add")}
							style={[styles.button]}
							onPress={submit}
						/>
						<Button
							disabled={newCategoryStore.loading}
							title={i18n.t("buttons.back")}
							color="#6c757d"
							style={[styles.button]}
							onPress={navigation.goBack}
						/>
					</View>
				</View>
			</ScrollView>
		</ScreenLayout>
	)
}

export default memo(NewCategoryScreen)
