import * as SQLite from "expo-sqlite"
import * as Sharing from "expo-sharing"
import * as FileSystem from "expo-file-system"
import * as DocumentPicker from "expo-document-picker";

export function getProducts() {


    // db.transaction(tx => {
    //     tx.executeSql(`DROP TABLE products`,
    //         (txObj, resultSet) => console.log(resultSet.insertId),
    //         (txObj, error) => console.log(error)
    //     );
    // });
    // db.transaction(tx => {
    //     // tx.executeSql(`CREATE TABLE IF NOT EXISTS products (
    //     tx.executeSql(`CREATE TABLE IF NOT EXISTS products (
    //         id INTEGER PRIMARY KEY,
    //         name TEXT,
    //         price REAL,
    //         sells INTEGER,
    //         updatedAt DATE 
    //         )`,
    //         (txObj, resultSet) => console.log(resultSet.insertId),
    //         (txObj, error) => console.log(error)
    //     );
    // });

    // db.transaction(tx => {
    //     tx.executeSql("INSERT INTO products (id, name) VALUES(?,?)", [10, "23"],
    //         (txObj, resultSet) => console.log(resultSet),
    //         (txObj, error) => console.log(error)
    //     )
    // })

    // db.transaction(tx => {
    //     tx.executeSql(`SELECT * FROM products`, null,
    //         (txObj, resultSet) => console.log("asd: ", resultSet.rows._array),
    //         (txObj, error) => console.log(error)
    //     )
    // })

    return db;
}

export async function exportDbFile() {
    await Sharing.shareAsync(FileSystem.documentDirectory + "SQLite/Picolero.db")
}

export async function importDbFile() {
    let result = {}
    try {
        result = await DocumentPicker.getDocumentAsync({
            type: "*/*",
            copyToCacheDirectory: false,
        });
        if (result?.type === 'success') {
            if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
                await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
            }

            const base64 = await FileSystem.readAsStringAsync(
                result.uri,
                {
                    encoding: FileSystem.EncodingType.Base64
                }
            );
            await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'SQLite/Picolero.db', base64, { encoding: FileSystem.EncodingType.Base64 });
        }
    } catch (error) {
        console.log(error)
        return error
    }
    return result
};