import { Log, Level } from 'ng2-logger/src';
import { convertQueryToParameterizedSQL } from '../converter/parameterized-converter';
import { convertQueryToSQL } from '../converter/sql-converter';
import { convertResult } from "../converter/result-converter";
import { QueryEngine, ConverterOptions } from '../converter/types';
import { QueryProcessor } from '../builder/helpers/internal-types';
import { Helpers } from 'tnp-core/src';

const log = Log.create('query processor',
  // Level.__NOTHING
)

export interface QueryProcessorOptions {
  lineBreaks?: boolean,
  parameterized?: boolean,
  logging?: boolean,
  logger?: (sql: string, params?: any[]) => void,
  identifierQuote?: string
}

const DEFAULT_OPTIONS: QueryProcessorOptions = {
  lineBreaks: false,
  parameterized: true,
  logging: true,
  identifierQuote: '"'
};

function mySqlTypeCast(field: any, next: any) {
  if (field.type == 'TINY' && field.length == 1) { // Boolean
    let value = field.string();
    if (value == '1') return true;
    if (value == '0') return false;
    return null;
  } else if (field.type == 'JSON') {
    let value = field.string();
    return value == null ? null : JSON.parse(value);
  }
  return next();
}

export function createQueryProcessor(client: any, _options: QueryProcessorOptions = {}, engine: QueryEngine = 'pg'): QueryProcessor {

  let options: QueryProcessorOptions = Object.assign({}, DEFAULT_OPTIONS, _options);

  let queryOptions: ConverterOptions = {
    lineBreak: options.lineBreaks ? '\n' : ' ',
    nameEscape: _options.identifierQuote || (engine === 'mysql' ? '`' : '"')
  };

  // function processSql(query: any, sql: string, params: any[] | undefined, callback: any): Promise<any> {
  //   if (options.logging) log.i(sql);
  //   if (options.logger) options.logger(sql, params);

  //   return new Promise((resolve, reject) => {
  //     callback(sql, params, (err: any, result: any) => {
  //       if (err) reject(err);
  //       else resolve(convertResult(query, result, engine));
  //     });
  //   });
  // }

  // function executeSql(sql: string, params: any[] | undefined, cb: any) {
  //   if (engine === 'pg') {
  //     client.query(sql, params || cb, params ? cb : undefined);
  //   } else if (engine === 'mysql') {
  //     client.query({
  //       sql,
  //       values: params,
  //       typeCast: mySqlTypeCast
  //     }, cb);
  //   } else throw new Error('Unknown DB engine: ' + engine);
  // }

  return (query: any) => {
    if (options.parameterized) {
      let { sql, params } = convertQueryToParameterizedSQL(query, queryOptions, engine);
      // if (Helpers.isWebSQL || Helpers.isNode) {
      return client.query(sql, params);
      // }
      // return processSql(query, sql, params, (sql: string, params: any[], cb: any) => executeSql(sql, params, cb));
    } else {
      let sql = convertQueryToSQL(query, queryOptions, engine);
      // if (Helpers.isWebSQL || Helpers.isNode) {
      return client.query(sql, undefined);
      // }
      // return processSql(query, sql, undefined, (sql: string, params: undefined, cb: any) => executeSql(sql, undefined, cb));
    }
  };
}

