import React, { memo } from "react"
import { Button, Modal, Text, TextInput, View } from "react-native"
import { useNewCategoryStore } from "../../../state/newCategoryStore"
import { global } from "../../../styles/styles"
import { styles } from "./styles"


const NewCategoryModal = (props) => {
	const newCategoryStore = useNewCategoryStore()

	return (
		<Modal animationType="slide" transparent={true} visible={newCategoryStore.visible}>
			<View style={styles.container}>
				<View style={styles.form}>
					<Text style={global.title}>Добавление новой категории</Text>
					<TextInput
						style={[global.input, global.fullWindth]}
						placeholderTextColor="#afb4b7"
						value={newCategoryStore.data.title}
						placeholder="тайтл"
						onChangeText={(value) => newCategoryStore.updateFormValues("title", value)}
					/>
					<TextInput
						style={[global.input, global.fullWindth]}
						placeholderTextColor="#afb4b7"
						value={newCategoryStore.data.description}
						placeholder="описание"
						onChangeText={(value) => newCategoryStore.updateFormValues("description", value)}
					/>
				</View>
				<View style={styles.buttonsWrapper}>
					<Button
						disabled={newCategoryStore.loading || !newCategoryStore.visible}
						title="добавить"
						style={[styles.button]}
						onPress={newCategoryStore.submit}
					/>
					<Button
						disabled={!newCategoryStore.visible}
						title="закрыть"
						color="#f03e6b"
						style={[styles.button]}
						onPress={newCategoryStore.hide}
					/>
				</View>
			</View>
		</Modal>
	)
}

export default memo(NewCategoryModal)
