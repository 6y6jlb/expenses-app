import React, { memo } from "react"
import { ScrollView, View, TouchableOpacity, Text } from "react-native"
import { Cell, Col, Row, Table, TableWrapper } from "react-native-table-component"
import NoData from "../noData/NoData"
import { styles } from "./styles"

const Expenses = ({ data }) => {
	if (data.tableHead.length < 1) {
		return <NoData />
	}

	const getTitle = (data, index) => (
		<TouchableOpacity onPress={() => console.log(index)}>
			<Text style={[styles.text, styles.selfCenter]}>{data}</Text>
		</TouchableOpacity>
	)

	return (
		<ScrollView horizontal>
			<View style={styles.container}>
				<Table style={{ flexDirection: "row" }} borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
					<TableWrapper style={{ width: 90 }}>
						<Cell data={["id"]} style={[styles.singleHead]} textStyle={styles.selfCenter} />
						<TableWrapper style={styles.column}>
							{data.tableTitle.map((cellData, cellIndex) => (
								<Cell key={cellIndex} data={cellData} />
							))}
						</TableWrapper>
					</TableWrapper>
					<TableWrapper style={{ flex: 1 }}>
						<Row data={data.tableHead} style={[styles.head,]} textStyle={[styles.text, styles.cell]} />
						{data.tableData.map((rowData, index) => (
							<TableWrapper key={index} style={styles.row}>
								{rowData.map((cellData, cellIndex) => (
									<Cell key={cellIndex} data={cellData}  textStyle={[styles.text, styles.cell]} />
								))}
							</TableWrapper>
						))}
					</TableWrapper>
				</Table>
			</View>
		</ScrollView>
	)
}

export default memo(Expenses)
