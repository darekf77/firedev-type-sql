import NumberColumn from "../../src/builder/column/number-column";
import StringColumn from "../../src/builder/column/string-column";
import QueryTable from '../../src/builder/query-table';
import BooleanColumn from "../../src/builder/column/boolean-column";
import DateColumn from "../../src/builder/column/date-column";
import BasicQueryColumn from "../../src/builder/column/basic-column";

export interface Book {
    id: number,
    title: string,
    author: string,
    authorId: number,
    price: number,
    available: boolean,
    date: Date,
    data: any
}

export type BookId = number;

export class BookTable extends QueryTable<Book, BookId> {
    $name = 'Book';

    id = new NumberColumn(this, 'id');
    title = new StringColumn(this, 'title');
    author = new StringColumn(this,'author');
    authorId = new NumberColumn(this, 'author_id');
    price = new NumberColumn(this, 'price');
    date = new DateColumn(this, 'date');
    available = new BooleanColumn(this, 'available');
    data = new BasicQueryColumn<this, any>(this, 'data');

    $id = this.id
}

export const BOOK = new BookTable();

export default BOOK;
