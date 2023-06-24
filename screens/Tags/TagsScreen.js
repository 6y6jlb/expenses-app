import React, { memo, useCallback, useEffect } from "react"
import { Button, ScrollView, Text, TextInput, View } from "react-native"
import Tags from "../../components/tags/Tags"
import i18n from "../../i18n/configuration"
import { useTagsStore } from "../../state/tagsStore"
import { global } from "../../styles/styles"
import { styles } from "./styles"

const TagsScreen = ({ route, navigation }) => {
	const store = useTagsStore()

	useEffect(() => {
		store.init()
	}, [])

	const submit = useCallback(() => {
		store.submit()
	}, [])

	return (
		<ScrollView>
			<View style={global.card}>
				<Text style={global.title}>{i18n.t("tags.title")}</Text>
				<Tags />
				<View style={styles.form}>
					<View>
						<Text>{i18n.t("form.title")}</Text>
						<TextInput
							style={[global.input, global.fullWindth]}
							placeholderTextColor="#afb4b7"
							value={store.form.title}
							onChangeText={(value) => store.updateFormValues("title", value)}
						/>
					</View>
				</View>

				<View style={styles.buttonsWrapper}>
					<Button
						disabled={store.loading || store.form.title.length < 2}
						title={i18n.t("buttons.add")}
						style={[styles.button]}
						onPress={submit}
					/>
					<Button
						disabled={store.loading}
						title={i18n.t("buttons.back")}
						color="#f03e6b"
						style={[styles.button]}
						onPress={navigation.goBack}
					/>
				</View>
			</View>
		</ScrollView>
	)
}

export default memo(TagsScreen)
