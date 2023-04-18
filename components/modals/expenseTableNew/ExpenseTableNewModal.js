import React, { memo, useEffect, useState } from "react"
import { Button, Modal, Picker, Text, TextInput, View } from "react-native"
import { CURRENCIES } from "../../../config/consts"
import { styles } from "./styles"
import { selectFromCategories } from "../../../database/categories"

const ExpenseTableNewModal = (props) => {
	const { onClose, visible, formData, setFormData, submit } = props



	

console.log('here')

	return (
		<Modal animationType="slide" transparent={true} visible={visible}>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<View style={styles.form}>
						<Text style={styles.modalText}>Создание новой таблицы</Text>
						<TextInput
							style={styles.input}
							placeholderTextColor="#afb4b7"
							value={formData.title}
							placeholder="title"
							onChangeText={(itemValue, itemIndex) =>
								setFormData((prevState) => ({
									...prevState,
									title: itemValue,
								}))
							}
						/>
						<TextInput
							style={styles.input}
							placeholderTextColor="#afb4b7"
							value={formData.description}
							placeholder="description"
							onChangeText={(itemValue, itemIndex) =>
								setFormData((prevState) => ({
									...prevState,
									description: itemValue,
								}))
							}
						/>
						<View>
							<Text>валюта</Text>
							<Picker
								selectedValue={formData.currency}
								style={[styles.picker]}
								onValueChange={(itemValue, itemIndex) =>
									setFormData((prevState) => ({
										...prevState,
										currency: itemValue.label,
									}))
								}
							>
								{Object.values(CURRENCIES).map((currency) => {
									return <Picker.Item key={currency.label} label={currency.label} value={currency} />
								})}
							</Picker>
						</View>
					</View>
					<View style={styles.buttonsWrapper}>
						<Button title="save" style={[styles.button]} onPress={submit} />
						<Button title="close" color="#f03e6b" style={[styles.button]} onPress={onClose} />
					</View>
				</View>
			</View>
		</Modal>
	)
}

export default memo(ExpenseTableNewModal)
