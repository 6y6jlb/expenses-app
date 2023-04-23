import React, { useCallback, useEffect } from "react"
import { useUpdateTableStore } from "../../state/updateTableStore"

import { Button, Text, View } from "react-native"
import { global } from "../../styles/styles"
import Form from "./Form"
import { styles } from "./styles"

export default function UpdateTableScreen({ route, navigation }) {
	const updateTable = useUpdateTableStore()


    const submit = useCallback(()=>{
        updateTable.submit();
        navigation.back()
    },[])

	useEffect(() => {
		updateTable.init(route.params.id)
	}, [])

	if (updateTable.loading) {
		return (
			<View>
				<Text>Loading</Text>
			</View>
		)
	}

	return (
		<View style={global.card}>
			<Text style={global.title}>Изменение таблицы: {route.params.title}</Text>
			<View style={styles.centeredView}>
				<Form data={updateTable.data} updateFormValues={updateTable.updateFormValues}/>
				<View style={styles.buttonsWrapper}>
					<Button title="сохранить" style={[styles.button]} onPress={submit} />
				</View>
			</View>
		</View>
	)
}
