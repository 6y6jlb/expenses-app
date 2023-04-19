import React, { memo, useEffect, useState } from "react"
import { Button, Modal, Picker, Text, TextInput, View } from "react-native"
import { CURRENCIES } from "../../../config/consts"
import { styles } from "./styles"
import { useUpdateTableStore } from "../../../state/updateTableStore"

const UpdateTableModal = (props) => {
	const updateTableStore = useUpdateTableStore()

	return (
		<Modal animationType="slide" transparent={true} visible={updateTableStore.visible}>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<View style={styles.form}>
						<Text style={styles.modalText}>изменение</Text>
						<TextInput
							style={styles.input}
							placeholderTextColor="#afb4b7"
							value={updateTableStore.data.title}
							placeholder="title"
							onChangeText={(value) => updateTableStore.updateFormValues("title", value)}
						/>
						<View>
							<Text>валюта</Text>
							<Picker
								selectedValue={updateTableStore.data.currency}
								style={[styles.picker]}
								onValueChange={(value) => updateTableStore.updateFormValues("currency", value)}
							>
								{Object.values(CURRENCIES).map((currency) => {
									return <Picker.Item key={currency.label} label={currency.label} value={currency.label} />
								})}
							</Picker>
						</View>
					</View>
					<View style={styles.buttonsWrapper}>
						<Button title="сохранить" style={[styles.button]} onPress={updateTableStore.submit} />
						<Button title="закрыть" color="#f03e6b" style={[styles.button]} onPress={updateTableStore.hide} />
					</View>
				</View>
			</View>
		</Modal>
	)
}

export default memo(UpdateTableModal)
