import { SERVICE } from "../config/consts"

class Exchange {
	constructor() {}

	async get(params) {
		const url = new URL(`${SERVICE.MAIN.BASE}/${SERVICE.MAIN.PATH.EXHCANGE.RATE}`)

		for (const key in params) {
			url.searchParams.append(key, params[key])
		}
		try {
			const response = await fetch(url)
            const json = await response.json()
            return json
		} catch (error) {
			console.log(error)
		}
	}
}

export default new Exchange()
