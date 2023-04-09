import React from "react"
import { Alert, Button, Modal, Picker, StyleSheet, Text, TextInput, View } from "react-native"

const ExpenseTableNewModal = (props) => {
	const { onClose, visible, formData, setFormData, submit } = props

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={() => {
				Alert.alert("Modal has been closed.")
				onClose()
			}}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<View style={styles.form}>
						<Text style={styles.modalText}>Создание новой таблицы</Text>
						<TextInput
							style={styles.input}
                            placeholderTextColor="#6096B4" 
							value={formData.name}
							placeholder="name"
							onChangeText={(itemValue, itemIndex) =>
								setFormData((prevState) => ({
									...prevState,
									name: itemValue,
								}))
							}
						/>
						<TextInput
							style={styles.input}
                            placeholderTextColor="#6096B4" 
							value={formData.description}
							placeholder="description"
							onChangeText={(itemValue, itemIndex) =>
								setFormData((prevState) => ({
									...prevState,
									description: itemValue,
								}))
							}
						/>
						<Picker
							selectedValue={formData.currency}
							style={{ height: 30, width: 150 }}
							onValueChange={(itemValue, itemIndex) =>
								setFormData((prevState) => ({
									...prevState,
									currency: itemValue,
								}))
							}
						>
							<Picker.Item label="usd" value="usd" />
							<Picker.Item label="gel" value="gel" />
							<Picker.Item label="rub" value="rub" />
						</Picker>
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

export default ExpenseTableNewModal

const styles = StyleSheet.create({
	centeredView: {
		flex: 10,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		flex: 1,
		backgroundColor: "white",
		maxHeight: "60%",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		flexDirection: "column",
		justifyContent: "space-between",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	form: {
		flex: 1,
		alignItems: "center",
		flexDirection: "column",
		gap: 20,
	},
	modalText: {
		marginBottom: 15,
        fontSize: 24,
		textAlign: "center",
		fontFamily: "roboto-regular",
	},
	buttonsWrapper: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	input: {
		borderBottomWidth: 1,
	},
})
