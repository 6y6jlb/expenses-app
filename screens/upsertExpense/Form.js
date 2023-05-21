import React, { useState } from "react"
import { Platform, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Picker } from "@react-native-picker/picker"
import DateTimePicker from "@react-native-community/datetimepicker"
import { CURRENCIES } from "../../config/consts"
import { styles } from "./styles"
import moment from "moment"
import Tags from "../../components/tags/Tags"
import i18n from "../../i18n/configuration"

export default function Form({ updateFormValues, data }) {
	const [showDatePicker, setShowDatePicker] = useState(false)

	return (
		<View style={styles.form}>
			<View style={[styles.fullWindth]}>
				<Text>{i18n.t("form.date")}</Text>
				{Platform.OS === "web" ? (
					<TextInput
						style={[styles.input]}
						placeholderTextColor="#afb4b7"
						value={moment(data.date).format("Y-MM-D")}
						placeholder={i18n.t("form.date")}
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
				placeholder={i18n.t("form.amount")}
				onChangeText={(value) => updateFormValues("amount", value)}
			/>
			<View style={[styles.fullWindth]}>
				<Text>{i18n.t("form.currency")}</Text>
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
				<Text>{i18n.t("form.category")}</Text>
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
				<Text>{i18n.t("form.description")}</Text>
				<TextInput
					style={[styles.input]}
					placeholderTextColor="#afb4b7"
					value={data.description}
					placeholder={i18n.t("form.description")}
					onChangeText={(value) => updateFormValues("description", value)}
				/>
			</View>
			<Tags selected={data.tags} />
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
