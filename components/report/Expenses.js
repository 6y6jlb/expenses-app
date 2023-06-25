import React, { memo } from "react"
import { ScrollView, View, TouchableOpacity, Text, Pressable, Button } from "react-native"
import { Cell, Col, Row, Table, TableWrapper } from "react-native-table-component"
import NoData from "../noData/NoData"
import { styles } from "./styles"
import { getArrWidth } from "../../helpers/report"
import i18n from "../../i18n/configuration"

const Expenses = ({ data, onChange, onRemove }) => {
	if (data.tableHead.length < 1) {
		return <NoData />
	}

	const arrWidth = getArrWidth(data.tableHead, data.tableData, [100])

	const firstRowElement = (cellData, index) => (
		<View style={styles.cell}>
			<Button
				style={styles.button}
				onPress={() => onChange(cellData)}
				title={cellData + "." + i18n.t("buttons.change")}
			/>
		</View>
	)

	const lastRowElement = (cellData, showLastItemView) => {
		if (showLastItemView) {
			return (
				<View style={styles.cell}>
					<Button style={styles.button} color="#FFF1C1" onPress={() => onRemove(cellData)} title={"❌"} />
				</View>
			)
		} else {
			return (
				<View style={styles.cell}>
					<Text style={styles.text}>{cellData}</Text>
				</View>
			)
		}
	}

	return (
		<ScrollView>
			<ScrollView horizontal>
				<View style={styles.container}>
					<Table style={{ flexDirection: "row" }} borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
						<TableWrapper style={{ width: 100 }}>
							<Cell
								data={["id"]}
								style={[styles.singleHead]}
								textStyle={[styles.selfCenter, styles.text]}
							/>
							{data.tableTitle.map((cellData, index) => (
								<Cell
									key={index}
									data={firstRowElement(cellData, index, cellData.length)}
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
							{data.tableData.map((rowData, rowIndex) => (
								<TableWrapper key={rowIndex} style={styles.row}>
									{rowData.map((cellData, cellIndex) => (
										<Cell
											key={cellIndex}
											width={arrWidth[cellIndex]}
											data={lastRowElement(cellData, rowData.length - 1 === cellIndex)}
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
