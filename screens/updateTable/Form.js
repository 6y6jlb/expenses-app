import React, { useState } from "react"

import { CheckBox, FlatList, Picker, Text, TextInput, TouchableOpacity, View } from "react-native"
import { CURRENCIES } from "../../config/consts"
import { styles } from "./styles"

export default function Form({ updateFormValues, data }) {
	const [showCat, setShowCat] = useState(false)

	const updateCategory = (categoryId) => {
		const selected = data.selectedCategories
		let result = []
		if (selected.includes(categoryId)) {
			result = selected.filter((el) => el !== categoryId)
		} else {
			result = selected
			result.push(categoryId)
		}
		updateFormValues("selectedCategories", result)
	}

	return (
		<View style={styles.form}>
			<TextInput
				style={[styles.input, styles.fullWindth]}
				placeholderTextColor="#afb4b7"
				value={data.title}
				placeholder="title"
				onChangeText={(value) => updateFormValues("title", value)}
			/>
			<View style={[styles.fullWindth]}>
				<Text>валюта</Text>
				<Picker
					selectedValue={data.currency}
					style={[styles.picker]}
					onValueChange={(value) => updateFormValues("currency", value)}
				>
					{Object.values(CURRENCIES).map((currency) => {
						return <Picker.Item key={currency.label} label={currency.label} value={currency.label} />
					})}
				</Picker>
			</View>
			<View style={[styles.categoryContainer, styles.fullWindth]}>
				<TouchableOpacity onPress={() => setShowCat(!showCat)}>
					<Text style={styles.dropDownTitle}>{showCat ? "˄" : "˅"} категории</Text>
				</TouchableOpacity>
				{showCat && (
					<FlatList
						data={data.categories}
						renderItem={({ item }) => (
							<View style={styles.checkboxContainer}>
								<CheckBox
									value={data.selectedCategories.includes(item.id)}
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
	)
}
