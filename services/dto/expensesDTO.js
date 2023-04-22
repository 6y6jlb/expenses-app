export class ExpensesDTO {
    constructor(id, created_at, expenses_table_id, category_id, currency, description) {
        this.id = id ;
        this.created_at = created_at ;
        this.expenses_table_id = expenses_table_id ;
        this.category_id = category_id ;
        this.currency = currency ;
        this.description = description ;
    }
}