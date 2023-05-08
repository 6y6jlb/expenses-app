import React, { useState } from "react"
import { Platform, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Picker } from "@react-native-picker/picker"
import DateTimePicker from "@react-native-community/datetimepicker"
import { CURRENCIES } from "../../config/consts"
import { styles } from "./styles"
import moment from "moment"

export default function Form({ updateFormValues, data }) {
	const [showDatePicker, setShowDatePicker] = useState(false)

	return (
		<View style={styles.form}>
			<View style={[styles.fullWindth]}>
				<Text>Date</Text>
				{Platform.OS === "web" ? (
					<TextInput
						style={[styles.input]}
						placeholderTextColor="#afb4b7"
						value={moment(data.date).format("Y-MM-D")}
						placeholder="дата"
						onChangeText={(value) => updateFormValues("date", value)}
					/>
				) : (
					<TouchableOpacity onPress={() => setShowDatePicker(true)}>
						<Text style={styles.input}>selected: {data.date.toLocaleString()}</Text>
					</TouchableOpacity>
				)}
			</View>
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
					selectedValue={data.categoryId}
					style={[styles.picker]}
					onValueChange={(value) => updateFormValues("categoryId", value)}
				>
					{Object.values(data.categories).map((category) => {
						return <Picker.Item key={category.id} label={category.title} value={category.id} />
					})}
				</Picker>
			</View>
			<View style={[styles.fullWindth]}>
				<Text>Описание</Text>
				<TextInput
					style={[styles.input]}
					placeholderTextColor="#afb4b7"
					value={data.description}
					placeholder="description"
					onChangeText={(value) => updateFormValues("description", value)}
				/>
			</View>
			{showDatePicker && (
				<DateTimePicker
					value={data.date}
					mode="date"
					onChange={(event, value) => {
						setShowDatePicker(false)
						updateFormValues("date", value)
					}}
				/>
			)}
		</View>
	)
}
