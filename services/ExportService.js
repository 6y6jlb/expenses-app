import moment from "moment"
import XLSX from "xlsx"
import * as FileSystem from "expo-file-system"
import * as Sharing from "expo-sharing"
import * as MediaLibrary from "expo-media-library"

class ExportService {
	constructor() {}

	async generate(data) {
		let wb = XLSX.utils.book_new()

		let ws = XLSX.utils.json_to_sheet([...data.headers])

		XLSX.utils.book_append_sheet(wb, ws, "Users")
		const wbout = XLSX.write(wb, { type: "binary", bookType: "xlsx" })
	}

	async write(generatedFile) {
		// const now = new Date()
		// const fileName = now.toISOString
		// const fileUri = FileSystem.cacheDirectory + fileName + '.xlsx'
		try {
			// await FileSystem.writeAsStringAsync(fileUri, fileName, { encoding: FileSystem.EncodingType.UTF8 })
			let fileUri = FileSystem.documentDirectory + "text.txt"
			await FileSystem.writeAsStringAsync(fileUri, "Hello World", { encoding: FileSystem.EncodingType.UTF8 })
			const asset = await MediaLibrary.createAssetAsync(fileUri)
			await MediaLibrary.createAlbumAsync("Download", asset, false)
			console.log("here")
			await FileSystem.writeAsStringAsync(fileUri, "Hello World", { encoding: FileSystem.EncodingType.UTF8 })
		} catch (error) {
			console.log("Error writing file:", error)
		}
	}

	async share(xlsFile) {
		if (Sharing.isAvailableAsync()) {
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
	}

	async export(data) {
		try {
			// const generatedFile = await this.generate(data)
			await this.write()
			console.log("writed")
			// await this.share(generatedFile)
			console.log("Successfull export file")
		} catch (error) {
			console.log("Error export file:", error)
		}
	}
}

export default new ExportService()
