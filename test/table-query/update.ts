import { BOOK, Book } from '../tables/book';
import { db } from '../utils';

describe('UPDATE', () => {

    it('conditions', () => {
        let e = { title: 'qwe' };

        db.table(BOOK).where(BOOK.title.eq('asd')).update(e);
        expect(db.sql).toEqual(`UPDATE "Book" SET "Book"."title" = 'qwe' WHERE "Book"."title" = 'asd'`);

        db.table(BOOK).where(BOOK.title.eq('asd'), BOOK.price.lt(100)).update(e);
        expect(db.sql).toEqual(`UPDATE "Book" SET "Book"."title" = 'qwe' WHERE "Book"."title" = 'asd' AND "Book"."price" < 100`);

        db.table(BOOK).where(BOOK.title.eq('asd').and(BOOK.price.lt(100))).update(e);
        expect(db.sql).toEqual(`UPDATE "Book" SET "Book"."title" = 'qwe' WHERE "Book"."title" = 'asd' AND "Book"."price" < 100`);
    });

    it('all', () => {
        let e = { title: 'qwe' };
        db.table(BOOK).updateAll(e);
        expect(db.sql).toEqual(`UPDATE "Book" SET "Book"."title" = 'qwe'`);
    });

    it('multiple field types', () => {
        let e = {
            title: 'asd',
            price: 10,
            available: true,
            date: new Date('2016-10-23T19:11:25.342Z'),
        };
        db.table(BOOK).updateAll(e);
        expect(db.sql).toEqual(`UPDATE "Book" SET "Book"."available" = TRUE, "Book"."date" = '2016-10-23T19:11:25.342Z', "Book"."price" = 10, "Book"."title" = 'asd'`);
    });

    it('set to null', () => {
        let e = { title: null } as any as Book;
        db.table(BOOK).updateAll(e);
        expect(db.sql).toEqual(`UPDATE "Book" SET "Book"."title" = NULL`);

        let e2 = { author: undefined } as any as Book;
        db.table(BOOK).updateAll(e2);
        expect(db.sql).toEqual(`UPDATE "Book" SET "Book"."author" = NULL`);
    });

    it('json fields', () => {
        let e = {
            data: { x: 2, y: 10 }
        };
        db.table(BOOK).updateAll(e);
        expect(db.sql).toEqual(`UPDATE "Book" SET "Book"."data" = '{"x":2,"y":10}'`);
    });
});
