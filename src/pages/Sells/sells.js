import { Button, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../../services/database";

import * as SQLite from "expo-sqlite"


const products = [
    {
        id: 0,
        name: "Ben e Jerry 72 unidades",
        price: 2.75,
        sells: 0,
        updatedAt: null
    },
    {
        id: 1,
        name: "Calippo 3 caixas X 24",
        price: 2.3,
        sells: 0,
        updatedAt: null
    },
    {
        id: 2,
        name: "Chocnball 1 caixa X 20",
        price: 2.3,
        sells: 0,
        updatedAt: null
    },
    {
        id: 3,
        name: "Cola 72",
        price: 1.7,
        sells: 0,
        updatedAt: null
    },
    {
        id: 4,
        name: "Cola zero 27",
        price: 2.7,
        sells: 0,
        updatedAt: null
    },
    {
        id: 5,
        name: "Corneto chocolate 2 caixas X 24",
        price: 1.8,
        sells: 0,
        updatedAt: null
    },
    {
        id: 6,
        name: "Corneto go 2 caixas X 33",
        price: 1.6,
        sells: 0,
        updatedAt: null
    },
    {
        id: 7,
        name: "Corneto morango 3 caixas X 24",
        price: 1.8,
        sells: 0,
        updatedAt: null
    },
    {
        id: 8,
        name: "Corneto soft 10 caixas X 15",
        price: 1.9,
        sells: 0,
        updatedAt: null
    },
    {
        id: 9,
        name: "Cornetto filipinos 2 caixa X 3011",
        price: 1.8,
        sells: 0,
        updatedAt: null
    },
    {
        id: 10,
        name: "Epa 2 caixas X 30",
        price: 1,
        sells: 0,
        updatedAt: null
    },
    {
        id: 11,
        name: "Fanta + nestea 108",
        price: 1.7,
        sells: 0,
        updatedAt: null
    },
    {
        id: 12,
        name: "Gominis 2 caixa X 20",
        price: 1.8,
        sells: 0,
        updatedAt: null
    },
    {
        id: 13,
        name: "Magnum chocolate branco 2 caixas X 20",
        price: 2.1,
        sells: 0,
        updatedAt: null
    },
    {
        id: 14,
        name: "Magnum double 2 caixas X 20",
        price: 2.3,
        sells: 0,
        updatedAt: null
    },
    {
        id: 15,
        name: "Magnum starchaser 2 caixas X 20",
        price: 2.3,
        sells: 0,
        updatedAt: null
    },
    {
        id: 16,
        name: "Magnum sunlover 2 caixas X 20",
        price: 2.3,
        sells: 0,
        updatedAt: null
    },
    {
        id: 17,
        name: "Magnun almond 2 caixas X 20",
        price: 2.1,
        sells: 0,
        updatedAt: null
    },
    {
        id: 18,
        name: "Magnun caramel e nuts 1 caixa X 30",
        price: 1.6,
        sells: 0,
        updatedAt: null
    },
    {
        id: 19,
        name: "Magnun sandwich 2 caixas X 20",
        price: 1.9,
        sells: 0,
        updatedAt: null
    },
    {
        id: 20,
        name: "Perna de pau 2 caixas X 30",
        price: 1.3,
        sells: 0,
        updatedAt: null
    },
    {
        id: 21,
        name: "Picolero abacaxi 1 caixa X 30",
        price: 1.6,
        sells: 0,
        updatedAt: null
    },
    {
        id: 22,
        name: "Red Bull 24",
        price: 2.5,
        sells: 0,
        updatedAt: null
    },
    {
        id: 23,
        name: "Rol 2 caixas X 28",
        price: 1.3,
        sells: 0,
        updatedAt: null
    },
    {
        id: 24,
        name: "Solero barrinha 1 caixa X 30",
        price: 1.6,
        sells: 0,
        updatedAt: null
    },
    {
        id: 25,
        name: "Solero exótico 2 caixas X 251",
        price: 1.6,
        sells: 0,
        updatedAt: null
    },
    {
        id: 26,
        name:
            "Solero morango e chocolate 2 caixas X 30",
        price: 1.6,
        sells: 0,
        updatedAt: null
    },
    {
        id: 27,
        name: "Solero picolero abacate e hortelã 1 caixa X 30",
        price: 1.6,
        sells: 0,
        updatedAt: null
    },
    {
        id: 28,
        name: "Sprite 28",
        price: 1.7,
        sells: 0,
        updatedAt: null
    },
    {
        id: 292,
        name: "Toy store 2 caixa X 24",
        price: 1.5,
        sells: 0,
        updatedAt: null
    },
    {
        id: 303,
        name: "Feast",
        price: 1.3,
        sells: 0,
        updatedAt: null
    },
    {
        id: 313,
        name: "Agua",
        price: 1,
        sells: 0,
        updatedAt: null
    },

]



export default function Home() {
    const [isLoading, setIsLoading] = useState(false)
    const [test, setTest] = useState([])
    const [db, setDb] = useState(SQLite.openDatabase("Picolero.db"))

    const [list, setList] = useState([])

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(`SELECT * FROM products p`,
                null,
                (txObj, resultSet) => {
                    if (resultSet.rows.length == 0) {

                        products.forEach(prod => {

                            db.transaction(tx => {
                                tx.executeSql("INSERT INTO products (id, name, price ) VALUES(?,?,?)", [prod.id, prod.name, prod.price],
                                    // (txObj, resultSet) => console.log(resultSet),
                                    // (txObj, error) => console.log(error)
                                )
                            })
                        });
                        getProducts()
                    }
                },
                (txObj, error) => console.log(error)
            );
        });

        // products.forEach(prod => {

        //     db.transaction(tx => {
        //         tx.executeSql("INSERT INTO products (id, name, price ) VALUES(?,?,?)", [prod.id, prod.name, prod.price],
        //             (txObj, resultSet) => console.log(resultSet),
        //             (txObj, error) => console.log(error)
        //         )
        //     })
        // });

        getProducts()

    }, [db])

    const getProducts = () => {

        const today = new Date()
        today.setHours(0)
        today.setMinutes(0)

        db.transaction(tx => {
            tx.executeSql(`SELECT p.*, 
                COUNT(s.idProduct) as sells, 
                MAX(s.updatedAt) as updatedAt,
                MAX(s.idSell) as lastSellId
                FROM products p 
                    LEFT JOIN sells s ON s.idProduct = p.id
                    AND s.deletedAt ISNULL
                    AND updatedAt > '${today.toString()}'
                GROUP BY p.id`,
                null,
                (txObj, resultSet) => { setList(resultSet.rows._array) },
                (txObj, error) => console.log(error)
            );
        });

    }

    // useMemo(() => {
    //     // const db = getProducts()
    //     getProducts()

    //     // const db = SQLite.openDatabase("Picolero.db")
    // }, []
    // );

    const handleAdd = (item) => {

        db.transaction(tx => {
            // "INSERT INTO products (id, name, price ) VALUES(?,?,?)", [prod.id, prod.name, prod.price],
            tx.executeSql('INSERT INTO sells (idProduct, price, updatedAt ) VALUES(?,?,?)', [item.id, item.price, new Date().toString()],
                (txObj, resultSet) => {
                    if (resultSet.rowsAffected > 0) {
                        getProducts()
                    }
                },
                (txObj, error) => console.log(error)
            );
        });


        // if (item.sells >= 0) {
        //     item.updatedAt = new Date().getHours().toString().padStart(2, '0') + ":" + new Date().getMinutes().toString().padStart(2, '0')
        //     setList(() => [...list])
        // }
    }
    const handleRemove = (item) => {
        db.transaction(tx => {
            // UPDATE names SET name = ? WHERE id = ?
            tx.executeSql('UPDATE sells SET deletedAt = ?, updatedAt = ? WHERE idSell = ?',
                [new Date().toISOString(), new Date().toISOString(), item.lastSellId],
                (txObj, resultSet) => {
                    if (resultSet.rowsAffected > 0) {
                        getProducts()
                    }
                },
                (txObj, error) => console.log(error)
            );
        });


        // if (item.sells >= 0) {
        //     item.updatedAt = new Date().getHours().toString().padStart(2, '0') + ":" + new Date().getMinutes().toString().padStart(2, '0')
        //     setList(() => [...list])
        // }
    }
    return (
        <View style={styles.scrollView}>
            <ScrollView style={{ width: "100%", backgroundColor: "#eee" }}>
                {list.map((i, x) => {
                    if (i.updatedAt) i.updatedAt = new Date(i.updatedAt)
                    const lastUpdate = i.updatedAt ? i.updatedAt?.getHours().toString().padStart(2, '0') + ":" + i.updatedAt.getMinutes().toString().padStart(2, '0') : ""
                    // console.log(today)
                    // const sellsToday = i.sells

                    // console.log(lastUpdate)
                    return (
                        <View style={styles.view} key={x}>
                            <View style={{}}>
                                <Text style={{ fontSize: 20, fontWeight: 600, maxWidth: "80%", }}>{i.name}</Text>
                                <Text>€ {i.price.toFixed(2)}</Text>
                                <Text>{i.sells} vendas  {lastUpdate != "" && " (" + lastUpdate + " ultima venda)"} </Text>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", gap: 15 }}>
                                <TouchableOpacity title="ADD" onPress={() => { handleAdd(i) }}
                                    style={{
                                        justifyContent: "center",
                                        alignContent: "center",
                                        display: "flex",
                                    }}>
                                    <MaterialIcons name="plus-one" size={20} color="#333" style={styles.button} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    title="ADD"
                                    disabled={i.sells <= 0}
                                    onPress={() => { handleRemove(i) }}
                                    style={{
                                        justifyContent: "center",
                                        alignContent: "center",
                                        display: "flex",
                                    }}>
                                    <MaterialIcons name="exposure-minus-1" size={20} color="#333" style={{ ...styles.button, backgroundColor: i.sells <= 0 ? "#f99" : "#F05" }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )

                })}

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    scrollView: {
        backgroundColor: "#ccc",
        display: "flex",
        // paddingTop: 50,
        marginHorizontal: 2,
    },
    view: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#777",
        borderStyle: "solid"
    }
    ,
    button: {
        width: 30,
        height: 30,
        borderRadius: 50,
        padding: 4,
        textAlign: "center",
        backgroundColor: "#0FF"
    },
});
