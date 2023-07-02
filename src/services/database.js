import * as SQLite from "expo-sqlite"
import * as Sharing from "expo-sharing"
import * as FileSystem from "expo-file-system"

const products = [
    {
        id: 0,
        name: "Ben e Jerry 72 unidades",
        price: 10.50,
        sells: 0,
        updatedAt: null
    },
    {
        id: 1,
        name: "Calippo 3 caixas X 24",
        price: 12.34,
        sells: 0,
        updatedAt: null
    },
    {
        id: 2,
        name: "Chocnball 1 caixa X 20",
        price: 12.34,
        sells: 0,
        updatedAt: null
    },
    {
        id: 3,
        name: "Cola 72",
        price: 12.34,
        sells: 0,
        updatedAt: null
    },
    {
        id: 4,
        name: "Cola zero 27",
        price: 12.34,
        sells: 0,
        updatedAt: null
    },
    {
        id: 5,
        name: "Corneto chocolate 2 caixas X 24",
        price: 12.34,
        sells: 0,
        updatedAt: null
    },
    {
        id: 6,
        name: "Corneto go 2 caixas X 33",
        price: 12.34,
        sells: 0,
        updatedAt: null
    },
    {
        id: 7,
        name: "Corneto morango 3 caixas X 24",
        price: 12.34,
        sells: 0,
        updatedAt: null
    },
    {
        id: 8,
        name: "Corneto soft 10 caixas X 15",
        price: 12.34,
        sells: 0,
        updatedAt: null
    },
    {
        id: 9,
        name: "Cornetto filipinos 2 caixa X 3011",
        price: 12.34,
        sells: 0,
        updatedAt: null
    },
    {
        id: 10,
        name: "Epa 2 caixas X 30",
        price: 12.34,
        sells: 0,
        updatedAt: null
    },
    {
        id: 11,
        name: "Fanta + nestea 108",
        price: 12.34,
        sells: 0,
        updatedAt: null
    },
    {
        id: 12,
        name: "Gominis 2 caixa X 20",
        price: 12.34,
        sells: 0,
        updatedAt: null
    },
    {
        id: 13,
        name: "Magnum chocolate branco 2 caixas X 20",
        price: 12.34,
        sells: 0,
        updatedAt: null
    },
    {
        id: 14,
        name: "Magnum double 2 caixas X 20",
        price: 12.34,
        sells: 0,
        updatedAt: null
    },
    {
        id: 15,
        name: "Magnum starchaser 2 caixas X 20",
        price: 12.34,
        sells: 0,
        updatedAt: null
    },
    {
        id: 16,
        name: "Magnum sunlover 2 caixas X 20",
        price: 12.34,
        sells: 0,
        updatedAt: null
    },
    {
        id: 17,
        name: "Magnun almond 2 caixas X 20",
        price: 12.34,
        sells: 0,
        updatedAt: null
    },
    {
        id: 18,
        name: "Magnun caramel e nuts 1 caixa X 30",
        price: 12.34,
        sells: 0,
        updatedAt: null
    },
    {
        id: 19,
        name: "Magnun sandwich 2 caixas X 20",
        price: 12.34,
        sells: 0,
        updatedAt: null
    },
    {
        id: 20,
        name: "Perna de pau 2 caixas X 30",
        price: 12.34,
        sells: 0,
        updatedAt: null
    },
    {
        id: 21,
        name: "Picolero abacaxi 1 caixa X 30",
        price: 12.34,
        sells: 0,
        updatedAt: null
    },
    {
        id: 22,
        name: "Red Bull 24",
        price: 12.34,
        sells: 0,
        updatedAt: null
    },
    {
        id: 23,
        name: "Rol 2 caixas X 28",
        price: 12.34,
        sells: 0,
        updatedAt: null
    },
    {
        id: 24,
        name: "Solero barrinha 1 caixa X 30",
        price: 12.34,
        sells: 0,
        updatedAt: null
    },
    {
        id: 25,
        name: "Solero exótico 2 caixas X 251",
        price: 12.34,
        sells: 0,
        updatedAt: null
    },
    {
        id: 26,
        name:
            "Solero morango e chocolate 2 caixas X 30",
        price: 12.34,
        sells: 0,
        updatedAt: null
    },
    {
        id: 27,
        name: "Solero picolero abacate e hortelã 1 caixa X 30",
        price: 12.34,
        sells: 0,
        updatedAt: null
    },
    {
        id: 28,
        name: "Sprite 28",
        price: 12.34,
        sells: 0,
        updatedAt: null
    },
    {
        id: 292,
        name: "Toy store 2 caixa X 24",
        price: 12.34,
        sells: 0,
        updatedAt: null
    },
    {
        id: 303,
        name: "Feast",
        price: 12.34,
        sells: 0,
        updatedAt: null
    },
    {
        id: 313,
        name: "Agua",
        price: 12.34,
        sells: 0,
        updatedAt: null
    },

]

export function getProducts() {
    let products = []


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