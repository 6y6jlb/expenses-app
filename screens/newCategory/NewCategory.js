import React, { memo, useCallback } from "react"
import { Button, Text, TextInput, View } from "react-native"
import { styles } from "./styles"
import Categories from "../../components/categories/Categories"
import { useNewCategoryStore } from "../../store/newCategoryStore"
import { global } from "../../styles/styles"
import i18n from "../../i18n/configuration"
import { ScrollView } from "react-native-gesture-handler"

const NewCategoryScreen = ({ route, navigation }) => {
	const store = useNewCategoryStore()

	const submit = useCallback(() => {
		store.submit()
		navigation.goBack()
	}, [])

	return (
		<ScrollView>
			<View style={global.card}>
				<Text style={global.title}>{i18n.t("category.new_category")}</Text>
				<View style={styles.form}>
					<TextInput
						style={[global.input, global.fullWindth]}
						placeholderTextColor="#afb4b7"
						value={store.data.title}
						placeholder={i18n.t("form.title")}
						onChangeText={(value) => store.updateFormValues("title", value)}
					/>
					<TextInput
						style={[global.input, global.fullWindth]}
						placeholderTextColor="#afb4b7"
						value={store.data.description}
						placeholder={i18n.t("form.description")}
						onChangeText={(value) => store.updateFormValues("description", value)}
					/>
					<Categories />
				</View>

				<View style={styles.buttonsWrapper}>
					<Button
						disabled={store.loading}
						title={i18n.t("buttons.add")}
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

export default memo(NewCategoryScreen)
