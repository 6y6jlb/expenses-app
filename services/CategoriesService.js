import { removeFalsyValuesFromObject } from "../helpers/common"
import Database from "./Database"

class CategoriesService {
	constructor() {
		this.db = Database
	}

	async get(where = null) {
		let sql = "SELECT * FROM expense_categories"
        let params = null
		if (where?.expenses_table_id) {
            const clearedWhere = removeFalsyValuesFromObject(where)
			sql +=
				" JOIN expense_table_categories ON expense_categories.id = expense_table_categories.category_id"
			
			let conditions = Object.keys(clearedWhere).map((key) => `${key} = ?`)
			sql += ` WHERE ${conditions.join(" AND ")}`;
            params = Object.values(clearedWhere)
		}

		return this.db.execute(sql, params)
	}
}

export default new CategoriesService()
