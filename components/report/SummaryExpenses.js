import React, { memo } from "react"
import { View, Text } from "react-native"
import NoData from "../noData/NoData"
import { styles } from "./styles"

const SummaryExpenses = ({ data }) => {
	if (Object.values(data).length < 1) {
		return <NoData />
	}

	return (
		<View style={styles.summaryContainer}>
			{Object.entries(data).map((el, i) => {
				return (
					<View style={[styles.row, styles.between]} key={i}>
						<Text style={styles.summaryKey}>{el[0]}:</Text>
						<Text style={styles.summaryValue}>{el[1]}</Text>
					</View>
				)
			})}
		</View>
	)
}

export default memo(SummaryExpenses)
