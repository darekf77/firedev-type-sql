// import { Taon } from 'taon';
// import { _ } from 'tnp-core';
// import type { UserController } from './user.controller';
// import {
//   UserNonColumnsKeys, UserNonColumnsKeysArr,
//   defaultModelValuesUser as defaultModelValues
// } from './user.models';
// @Taon.Entity({
//   className: 'User',
//   defaultModelValues
// })
// export class User extends Taon.Base.Entity {

//   //#region static
//   static ctrl: UserController;
//   static from(obj: Omit<Partial<User>, UserNonColumnsKeys>) {
//     obj = _.omit(obj, UserNonColumnsKeysArr)
//     return _.merge(new User(), obj) as User;
//   }
//   static getAll() {
//     return this.ctrl.getAll();
//   }
//   static empty() {
//     return User.from(defaultModelValues);
//   }
//   //#endregion

//   //#region constructor
//   private constructor(...args) { // @ts-ignore
//     super(...args);
//   }
//   //#endregion

//   //#region fields & getters
//   ctrl: UserController;

//   //#region @websql
//   @Taon.Orm.Column.Generated()
//   //#endregion
//   id: string;

//   //#region @websql
//   @Taon.Orm.Column.Custom({
//     type: 'varchar',
//     length: 100,
//     default: defaultModelValues.name
//   })
//   //#endregion
//   name?: string;
//   //#endregion

//   //#region methods
//   clone(options?: { propsToOmit: (keyof User)[]; }): User {
//     const { propsToOmit } = options || { propsToOmit: ['id', 'ctrl'] };
//     return _.merge(new User(), _.omit(this, propsToOmit));
//   }
//   //#endregion

// }
