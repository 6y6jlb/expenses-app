import React, { memo, useState } from "react"
import { Button, CheckBox, FlatList, Modal, Picker, Text, TextInput, TouchableOpacity, View } from "react-native"
import { CURRENCIES } from "../../../config/consts"
import { useUpdateTableStore } from "../../../state/updateTableStore"
import { styles } from "./styles"

const UpdateTableModal = (props) => {
	const [showCat, setShowCat] = useState(false)
	const updateTableStore = useUpdateTableStore()

	const updateCategory = (categoryId) => {
		const selected = updateTableStore.data.selectedCategories
		let result = [];
		if (selected.includes(categoryId)) {
			result = selected.filter((el) => el !== categoryId)
		} else {
			result = selected;
			result.push(categoryId)
		}
		updateTableStore.updateFormValues("selectedCategories", result)
	}

	return (
		<Modal animationType="slide" transparent={true} visible={updateTableStore.visible}>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<View style={styles.form}>
						<Text style={styles.modalText}>изменение</Text>
						<TextInput
							style={[styles.input, styles.fullWindth]}
							placeholderTextColor="#afb4b7"
							value={updateTableStore.data.title}
							placeholder="title"
							onChangeText={(value) => updateTableStore.updateFormValues("title", value)}
						/>
						<View style={[styles.fullWindth]}>
							<Text>валюта</Text>
							<Picker
								selectedValue={updateTableStore.data.currency}
								style={[styles.picker]}
								onValueChange={(value) => updateTableStore.updateFormValues("currency", value)}
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
						</View>
						<View style={[styles.categoryContainer, styles.fullWindth]}>
							<TouchableOpacity onPress={() => setShowCat(!showCat)}>
								<Text style={styles.dropDownTitle}>{showCat ? "˄" : "˅"} категории</Text>
							</TouchableOpacity>
							{showCat && (
								<FlatList
									data={updateTableStore.data.categories}
									renderItem={({ item }) => (
										<View style={styles.checkboxContainer}>
											<CheckBox
												value={updateTableStore.data.selectedCategories.includes(item.id)}
												onValueChange={(value) => updateCategory(item.id)}
												style={styles.checkbox}
											/>
											<Text style={styles.checkboxLabel}>{item.title}</Text>
										</View>
									)}
									keyExtractor={(item) => item.id}
								/>
							)}
						</View>
					</View>
					<View style={styles.buttonsWrapper}>
						<Button title="сохранить" style={[styles.button]} onPress={updateTableStore.submit} />
						<Button
							title="закрыть"
							color="#f03e6b"
							style={[styles.button]}
							onPress={updateTableStore.hide}
						/>
					</View>
				</View>
			</View>
		</Modal>
	)
}

export default memo(UpdateTableModal)
