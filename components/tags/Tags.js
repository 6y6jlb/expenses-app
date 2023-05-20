import React from "react"
import { FlatList, Text, View } from "react-native"
import i18n from "../../i18n/configuration"
import Badge from "../badge/Badge"
import { styles } from "./styles"
import { useTagsStore } from "../../state/tagsStore"

const Tags = () => {
	const store = useTagsStore()

	return (
		<View style={[styles.container, styles.fullWindth]}>
			<View style={[styles.form]}>
				<FlatList
				horizontal
					data={store.tags}
					renderItem={({ item }) => (
						<Badge title={item.title} color="#C0DBEA"/>
					)}
					keyExtractor={(item) => item.id}
				/>
			</View>
		</View>
	)
}

export default Tags
