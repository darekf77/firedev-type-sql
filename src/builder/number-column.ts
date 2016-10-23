import QueryTable from "./query-table";
import ComparableColumn from "./comparable-column";


export default class NumberColumn<Table extends QueryTable<any>> extends ComparableColumn<Table, number> {

    constructor(table: Table, params, modifiers?) {
        super(table, params, modifiers);
    }

    count(): NumberColumn<Table> {
        return new NumberColumn(this._table, this._params, this._modifiers.concat({ name: 'count' }));
    }

    sum(): NumberColumn<Table> {
        return new NumberColumn<Table>(this._table, this._params, this._modifiers.concat({ name: 'sum' }));
    }

    avg(): NumberColumn<Table> {
        return new NumberColumn<Table>(this._table, this._params, this._modifiers.concat({ name: 'avg' }));
    }
}
