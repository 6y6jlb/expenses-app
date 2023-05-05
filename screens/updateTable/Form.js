import React from "react"
import { Picker } from "@react-native-picker/picker"
import { Text, TextInput, View } from "react-native"
import { CURRENCIES } from "../../config/consts"
import { styles } from "./styles"
import { global } from "../../styles/styles"

export default function Form({ updateFormValues, data }) {


	return (
		<View style={styles.form}>
			<TextInput
				style={[global.input, global.fullWindth]}
				placeholderTextColor="#afb4b7"
				value={data.title}
				placeholder="title"
				onChangeText={(value) => updateFormValues("title", value)}
			/>
			<View style={[global.fullWindth]}>
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
		</View>
	)
}
