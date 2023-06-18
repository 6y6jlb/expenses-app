import React from "react"
import { Picker } from "@react-native-picker/picker"
import { Text, TextInput, View } from "react-native"
import { CURRENCIES } from "../../config/consts"
import { styles } from "./styles"
import { global } from "../../styles/styles"
import i18n from "../../i18n/configuration"

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
			{data.currentCurrency !== data.currency && (
				<View style={[global.fullWindth]}>
					<Text>
						{i18n.t("table.exchange_rate_hint", {
							current: data.currentCurrency,
							target: data.currency,
						})}
					</Text>
					<TextInput
						style={[global.input, global.fullWindth]}
						placeholderTextColor="#afb4b7"
						value={data.exchangeRate}
						placeholder={i18n.t("form.exchange_rate")}
						onChangeText={(value) => updateFormValues("exchangeRate", value)}
					/>
				</View>
			)}
		</View>
	)
}
