import React, { useEffect, useState } from "react"
import { FlatList, Text, TouchableOpacity, View } from "react-native"
import i18n from "../../i18n/configuration"
import { useCategoryStore } from "../../store/categoryStore"
import { styles } from "./styles"

const Categories = () => {
	const [showCat, setShowCat] = useState(false)

	const categoryStore = useCategoryStore()

	useEffect(() => {
		categoryStore.fetch()
	}, [])

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
					<Text style={styles.title}>
						{showCat ? "˄" : "˅"} {i18n.t("category.title")}
					</Text>
				</TouchableOpacity>
				{showCat &&
					categoryStore.categories.map((item) => {
						return (
							<TouchableOpacity
								key={item.id}
								onPress={() => updateCategory(item.id)}
								style={[styles.itemsContainer]}
							>
								<Text
									style={[
										styles.label,
										categoryStore.selectedCategories.includes(item.id) && styles.checked,
									]}
								>
									{item.title}
								</Text>
							</TouchableOpacity>
						)
					})}
			</View>
		</View>
	)
}

export default Categories
