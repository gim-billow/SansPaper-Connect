import {forEach, values} from 'ramda';
import SQLite from 'react-native-sqlite-storage';

class DB {
  db;

  async openDBConnection() {
    try {
      SQLite.DEBUG(false);
      SQLite.enablePromise(true);

      this.db = await SQLite.openDatabase({
        name: 'sanspaper',
        location: 'default',
      });
    } catch (error) {
      console.log('DB openDBConnection error', error);
    }
  }

  getInstance() {
    return this.db;
  }

  async closeDBConnection() {
    try {
      this.db?.close();
    } catch (error) {
      console.log('DB closeDBConnection error', error);
    }
  }

  ExecuteQuery = (sql, params) =>
    new Promise((resolve, reject) => {
      if (this.db) {
        const payload = params ? values(params) : [];
        this.db.transaction((trans) => {
          trans.executeSql(
            sql,
            payload,
            (trans, results) => {
              resolve(results);
            },
            (error) => {
              reject(error);
            },
          );
        });
      } else {
        console.log('[ExecuteQuery] DB not connected, please try again');
        reject('db not connected');
      }
    });

  ExecuteBatchQuery = async (sql, params) => {
    if (this.db) {
      await this.db.transaction((trans) => {
        forEach((param) => {
          const payload = params ? values(param) : [];
          trans.executeSql(
            sql,
            payload,
            () => {},
            (error) => {
              console.error('[ExecuteBatchQuery Error]', error);
            },
          );
        }, params);
      });
    } else {
      console.log('[ExecuteBatchQuery] DB not connected, please try again');
    }
  };
}

const db = new DB();

export default db;
