import React, { memo } from "react"
import { ScrollView, View, TouchableOpacity, Text } from "react-native"
import { Cell, Col, Row, Table, TableWrapper } from "react-native-table-component"
import NoData from "../noData/NoData"
import { styles } from "./styles"

const Expenses = ({ data, onChange }) => {
	if (data.tableHead.length < 1) {
		return <NoData />
	}

	const arrWidth = data.tableHead.map((el, index) => {
		if (index === 0) return 100
		if(data.tableData[index].length <= el.length) return el.length * 12 + 5
		if(data.tableData[index].length >= el.length) return data.tableData[index].length * 10 + 5
		return 100
	})

	const element = (cellData, index) => (
		<TouchableOpacity onPress={() => onChange(cellData)}>
			<Text style={[styles.text]}>{cellData}</Text>
		</TouchableOpacity>
	)

	return (
		<ScrollView horizontal>
			<View style={styles.container}>
				<Table style={{ flexDirection: "row" }} borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
					<TableWrapper style={{ width: 90 }}>
						<Cell data={["id"]} style={[styles.singleHead]} textStyle={[styles.selfCenter, styles.text]} />
						{data.tableTitle.map((rowData, index) => (
							<Cell
								key={index}
								data={element(rowData, index)}
								style={styles.column}
								textStyle={styles.text}
							/>
						))}
					</TableWrapper>
					<TableWrapper style={{ flex: 1 }}>
						<Row
							data={data.tableHead}
							style={[styles.head]}
							widthArr={arrWidth}
							textStyle={[styles.text]}
						/>
						{data.tableData.map((rowData, index) => (
							<TableWrapper key={index} style={styles.row}>
								{rowData.map((cellData, cellIndex) => (
									<Cell
										key={cellIndex}
										width={arrWidth[cellIndex]}
										data={cellData}
										textStyle={[styles.text]}
									/>
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
