import moment from "moment"
import * as FileSystem from "expo-file-system"
import XLSX from "xlsx"
import { Buffer as NodeBuffer } from "buffer"

class ExportService {
	constructor() {}

	async generate(data) {
		const now = new Date()
		const fileName = `${now.toISOString}.xlsx`
		const fileUri = FileSystem.cacheDirectory + fileName
		let wb = XLSX.utils.book_new()
		let ws = JSON.stringify(data)
		console.log(XLSX.utils.book_append_sheet)
		XLSX.utils.book_append_sheet(wb, ws, "Users")
		const wbout = XLSX.write(wb, { type: "binary", bookType: "xlsx" })
		console.log(wbout)
	}

	async write(generatedFile) {
		try {
			RNFS.writeFile(
				RNFS.ExternalStorageDirectoryPath + `${moment().toISOString()}/.xlsx`,
				generatedFile,
				"ascii"
			)
		} catch (error) {
			console.log("Error writing file:", error)
		}
	}

	async share(xlsFile) {
		Sharing.shareAsync(xlsFile, {
			mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Android
			dialogTitle: "Your dialog title here", // Android and Web
			UTI: "com.microsoft.excel.xlsx", // iOS
		})
			.catch((error) => {
				console.error("Error", error)
			})
			.then(() => {
				console.log("Return from sharing dialog")
			})
	}

	async export(data) {
		try {
			const generatedFile = await this.generate(data)
			await this.share(generatedFile)
			console.log("Successfull export file")
		} catch (error) {
			console.log("Error export file:", error)
		}
	}
}

export default new ExportService()
