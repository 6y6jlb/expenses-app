import React, { useEffect } from "react"
import { FlatList, View, TouchableOpacity } from "react-native"
import { useTagsStore } from "../../state/tagsStore"
import Badge from "../badge/Badge"
import { styles } from "./styles"
import { BADGE_TYPES } from "../badge/const"

const Tags = () => {
	const store = useTagsStore()

	useEffect(() => {
		store.init()
	}, [])

	return (
		<View>
			<FlatList
				contentContainerStyle={[styles.container]}
				data={store.tags}
				renderItem={({ item }) => (
					<TouchableOpacity onPress={() => store.togleTags(item)}>
						<Badge title={item.title} type={item.selected ? BADGE_TYPES.PRIMARY : BADGE_TYPES.SECONDARY} />
					</TouchableOpacity>
				)}
				keyExtractor={(item) => item.id}
			/>
		</View>
	)
}

export default Tags
