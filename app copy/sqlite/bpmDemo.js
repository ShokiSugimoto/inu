import React from "react";
import * as SQLite from 'expo-sqlite';

const bpmDemo = () => {

  const db = SQLite.openDatabase('inu.db');
  setInterval(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE bpm SET bpm = 65;',
        [],
        (_, updateResult) => {
          console.log('Update success!');
        },
        (_, updateError) => {
          console.log('Error...');
        }
      );
    })
  }, 5000);
};

export default bpmDemo;
