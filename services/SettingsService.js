import { SETTINGS } from "../config/consts"
import { Settings } from "../database/Settings"

class SettingsService {
	constructor() {
		this.settings = new Settings()
	}

	async update(data) {
		const promises = []
		try {
			const allowedKeys = Object.values(SETTINGS)

			Object.keys(data)
				.filter((key) => allowedKeys.includes(key))
				.forEach((slug) => {
					promises.push(this.settings.update({ value: data[slug].value }, { slug }))
				})
			await Promise.all(promises)
		} catch (error) {
			throw Error(`${this.constructor.name}: ${error.message}`)
		}
	}
}

export default new SettingsService()
