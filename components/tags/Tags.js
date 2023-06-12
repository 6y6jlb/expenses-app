import React, { useEffect } from "react"
import { FlatList, View, TouchableOpacity } from "react-native"
import { useTagsStore } from "../../state/tagsStore"
import Badge from "../badge/Badge"
import { styles } from "./styles"
import { BADGE_TYPES } from "../badge/const"

const Tags = ({ toggle = () => {}, selectedIds = [] }) => {
	const store = useTagsStore()

	useEffect(() => {
		store.init()
	}, [])

	return (
		<View style={styles.container}>
			{store.tags.map((tag, index) => {
				return (
					<TouchableOpacity onPress={() => toggle(tag)} key={index}>
						<Badge
							title={tag.title}
							type={selectedIds.includes(tag.id) ? BADGE_TYPES.PRIMARY : BADGE_TYPES.SECONDARY}
						/>
					</TouchableOpacity>
				)
			})}
		</View>
	)
}

export default Tags
