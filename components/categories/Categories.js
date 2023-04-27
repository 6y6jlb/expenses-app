import { StyleSheet, Text, View, TouchableOpacity, FlatList, CheckBox, Button } from "react-native"
import React, { useState } from "react"
import { useCategoryStore } from "../../state/categoryStore"
import { useNewCategoryStore } from "../../state/newCategoryStore"

const Categories = () => {
	const [showCat, setShowCat] = useState(false)

	const categoryStore = useCategoryStore()
	const newCategoryStore = useNewCategoryStore()

	const updateCategory = (categoryId) => {
		const selected = categoryStore.selectedCategories
		let result = []
		if (selected.includes(categoryId)) {
			result = selected.filter((el) => el !== categoryId)
		} else {
			result = selected
			result.push(categoryId)
		}
		categoryStore.updateSelectedCategories(result)
	}

	return (
		<View style={[styles.container, styles.fullWindth]}>
			<View style={[styles.form]}>
				<TouchableOpacity onPress={() => setShowCat(!showCat)}>
					<Text style={styles.dropDownTitle}>{showCat ? "˄" : "˅"} категории</Text>
				</TouchableOpacity>
				{showCat && (
					<>
						<FlatList
							data={categoryStore.categories}
							renderItem={({ item }) => (
								<View style={styles.checkboxContainer}>
									<CheckBox
										value={categoryStore.selectedCategories.includes(item.id)}
										onValueChange={(value) => updateCategory(item.id)}
										style={styles.checkbox}
									/>
									<Text style={styles.checkboxLabel}>{item.title}</Text>
								</View>
							)}
							keyExtractor={(item) => item.id}
						/>
						<Button
							disabled={
								!categoryStore.selectedCategories.length ||
								categoryStore.loading ||
								newCategoryStore.loading ||
								newCategoryStore.visible
							}
							title="удалить выбранные"
							color="#f03e6b"
							style={[styles.button]}
							onPress={newCategoryStore.show}
						/>
						<Button
							disabled={categoryStore.loading || newCategoryStore.loading || newCategoryStore.visible}
							title="добавить категорию"
							color="#68ad6e"
							style={[styles.button]}
							onPress={categoryStore.remove}
						/>
					</>
				)}
			</View>
		</View>
	)
}

export default Categories

const styles = StyleSheet.create({
	checkboxContainer: {
		flexDirection: "row",
		padding: 10,
	},
	checkbox: {
		alignSelf: "center",
	},
	checkboxLabel: {
		marginLeft: 8,
	},
	container: {
		overflow: "scroll",
		gap: 20,
	},
	form: {
		border: "1px solid #C0DBEA",
        gap: 20
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	fullWindth: {
		width: "100%",
	},
	dropDownTitle: {
		fontSize: 20,
		fontFamily: "roboto-regular",
		backgroundColor: "#C0DBEA",
	},
})
