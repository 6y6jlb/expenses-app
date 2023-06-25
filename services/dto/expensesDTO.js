export class ExpensesDTO {
	constructor(id, amount, created_at, expenses_table_id, category_id, currency, description, tags) {
		this.id = id
		this.amount = String(amount).replace(',','.')
		this.created_at = created_at
		this.expenses_table_id = expenses_table_id
		this.category_id = category_id
		this.currency = currency
		this.description = description
		this.tags = tags
	}

	toArray() {
		return {
			amount: this.amount,
			created_at: this.created_at,
			expenses_table_id: this.expenses_table_id,
			category_id: this.category_id,
			currency: this.currency,
			description: this.description,
		}
	}
}
