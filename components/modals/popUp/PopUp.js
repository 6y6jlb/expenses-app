import React from "react"
import { Modal, Pressable, Text, View } from "react-native"
import { styles } from "./styles"

const PopUp = (type, children) => {
	return (
		<Modal animationType="slide" transparent={true} visible={show}>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>{children}</View>
			</View>
		</Modal>
	)
}

export default PopUp
