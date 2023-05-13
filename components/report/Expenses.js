import React, { memo } from "react"
import { ScrollView, View, TouchableOpacity, Text } from "react-native"
import { Cell, Col, Row, Table, TableWrapper } from "react-native-table-component"
import NoData from "../noData/NoData"
import { styles } from "./styles"
import { getArrWidth } from "../../helpers/report"

const Expenses = ({ data, onChange }) => {
	if (data.tableHead.length < 1) {
		return <NoData />
	}

	const arrWidth = getArrWidth(data.tableHead, data.tableData)

	const element = (cellData, index) => (
		<TouchableOpacity onPress={() => onChange(cellData)}>
			<Text style={[styles.text]}>{cellData}</Text>
		</TouchableOpacity>
	)

	return (
		<ScrollView>
			<ScrollView horizontal>
				<View style={styles.container}>
					<Table style={{ flexDirection: "row" }} borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
						<TableWrapper style={{ width: 90 }}>
							<Cell
								data={["id"]}
								style={[styles.singleHead]}
								textStyle={[styles.selfCenter, styles.text]}
							/>
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
		</ScrollView>
	)
}

export default memo(Expenses)
