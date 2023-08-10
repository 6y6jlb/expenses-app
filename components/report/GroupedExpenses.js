import React, { memo } from "react"
import { ScrollView, View } from "react-native"
import { Cell, Col, Row, Table, TableWrapper } from "react-native-table-component"
import NoData from "../noData/NoData"
import { styles } from "./styles"
import { getArrWidth } from "../../helpers/report"
import { global } from "../../styles/styles"
import { REPORT_GROUPS } from "../../config/consts"

const GroupedExpenses = ({ data, group }) => {
	if (data.tableHead.length < 1) {
		return <NoData />
	}

	const arrWidth = getArrWidth(data.tableHead, data.tableData)
	const shouldBeMuted = (value) => value == 0

	return (
		<ScrollView horizontal>
			<ScrollView>
				<View style={styles.container}>
					<Table style={{ flexDirection: "row" }} borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
						<TableWrapper style={{ width: group === REPORT_GROUPS.DAY ? 'max-content' : 'min-content' }}>
							<Cell data={[""]} style={[styles.singleHead]} />
							<Col data={data.tableTitle} style={[styles.column]} textStyle={[styles.text]} />
						</TableWrapper>

						<TableWrapper style={{ flex: 1 }}>
							<Row
								data={data.tableHead}
								style={[styles.head]}
								widthArr={arrWidth}
								textStyle={styles.text}
							/>
							{data.tableData.map((rowData, index) => (
								<TableWrapper key={index} style={styles.row}>
									{rowData.map((cellData, cellIndex) => (
										<Cell
											key={cellIndex}
											width={arrWidth[cellIndex]}
											data={cellData}
											textStyle={[styles.text, shouldBeMuted(cellData) && global.textMuted, styles.center]}
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

export default memo(GroupedExpenses)
