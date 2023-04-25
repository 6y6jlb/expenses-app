import React from "react"
import { Picker, Platform, Text, TextInput, View } from "react-native"
import DatePicker from 'react-native-date-picker'
import { CURRENCIES } from "../../config/consts"
import { styles } from "./styles"
import moment from "moment"

export default function Form({ updateFormValues, data }) {

	return (
		<View style={styles.form}>
			{Platform.OS === 'web' 
			? (
				<TextInput
				style={[styles.input, styles.fullWindth]}
				placeholderTextColor="#afb4b7"
				value={moment(data.date).format('Y-MM-D')}
				placeholder="дата"
				onChangeText={(value) => updateFormValues("date", value)}
			/>
			)
		: (
			<DatePicker date={date}  onChange={(value) => updateFormValues("date", value)} />
		)
		}
			<TextInput
				style={[styles.input, styles.fullWindth]}
				placeholderTextColor="#afb4b7"
				value={data.amount}
				placeholder="amount"
				onChangeText={(value) => updateFormValues("amount", value)}
			/>
			<View style={[styles.fullWindth]}>
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
			<View style={[styles.fullWindth]}>
				<Text>Категория</Text>
				<Picker
					selectedValue={data.category}
					style={[styles.picker]}
					onValueChange={(value) => updateFormValues("category", value)}
				>
					{Object.values(data.categories).map((category) => {
						return <Picker.Item key={category.id} label={category.title} value={category.id} />
					})}
				</Picker>
			</View>
			<TextInput
				style={[styles.input, styles.fullWindth]}
				placeholderTextColor="#afb4b7"
				value={data.description}
				placeholder="description"
				onChangeText={(value) => updateFormValues("description", value)}
			/>
		</View>
	)
}
