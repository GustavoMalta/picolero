import { Button, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../../services/database";

import * as SQLite from "expo-sqlite"


const products = [
    {
        id: 1,
        name: "Ben e Jerry",
        price: 2.75,
        sells: 0,
        updatedAt: null
    },
    {
        id: 2,
        name: "Calippo",
        price: 2.3,
        sells: 0,
        updatedAt: null
    },
    {
        id: 3,
        name: "Chocnball",
        price: 2.3,
        sells: 0,
        updatedAt: null
    },
    {
        id: 4,
        name: "Cola",
        price: 1.7,
        sells: 0,
        updatedAt: null
    },
    {
        id: 5,
        name: "Cola zero",
        price: 2.7,
        sells: 0,
        updatedAt: null
    },
    {
        id: 6,
        name: "Corneto chocolate",
        price: 1.8,
        sells: 0,
        updatedAt: null
    },
    {
        id: 7,
        name: "Corneto go",
        price: 1.6,
        sells: 0,
        updatedAt: null
    },
    {
        id: 8,
        name: "Corneto morango",
        price: 1.8,
        sells: 0,
        updatedAt: null
    },
    {
        id: 9,
        name: "Corneto soft",
        price: 1.9,
        sells: 0,
        updatedAt: null
    },
    {
        id: 10,
        name: "Cornetto filipinos",
        price: 1.8,
        sells: 0,
        updatedAt: null
    },
    {
        id: 11,
        name: "Epa",
        price: 1,
        sells: 0,
        updatedAt: null
    },
    {
        id: 12,
        name: "Fanta + nestea",
        price: 1.7,
        sells: 0,
        updatedAt: null
    },
    {
        id: 13,
        name: "Gominis",
        price: 1.8,
        sells: 0,
        updatedAt: null
    },
    {
        id: 14,
        name: "Magnum chocolate branco ",
        price: 2.1,
        sells: 0,
        updatedAt: null
    },
    {
        id: 15,
        name: "Magnum double caramelo",
        price: 2.3,
        sells: 0,
        updatedAt: null
    },
    {
        id: 16,
        name: "Magnum starchaser",
        price: 2.3,
        sells: 0,
        updatedAt: null
    },
    {
        id: 17,
        name: "Magnum sunlover",
        price: 2.3,
        sells: 0,
        updatedAt: null
    },
    {
        id: 18,
        name: "Magnun almond",
        price: 2.1,
        sells: 0,
        updatedAt: null
    },
    {
        id: 19,
        name: "Magnun caramel e nuts",
        price: 1.6,
        sells: 0,
        updatedAt: null
    },
    {
        id: 20,
        name: "Magnun sandwich",
        price: 1.9,
        sells: 0,
        updatedAt: null
    },
    {
        id: 21,
        name: "Perna de pau",
        price: 1.3,
        sells: 0,
        updatedAt: null
    },
    {
        id: 22,
        name: "Picolero morango chocolate",
        price: 1.6,
        sells: 0,
        updatedAt: null
    },
    {
        id: 23,
        name: "Red Bull",
        price: 2.5,
        sells: 0,
        updatedAt: null
    },
    {
        id: 24,
        name: "Rol",
        price: 1.3,
        sells: 0,
        updatedAt: null
    },
    {
        id: 25,
        name: "Solero barrinha manga",
        price: 1.6,
        sells: 0,
        updatedAt: null
    },
    {
        id: 26,
        name: "Solero exótico",
        price: 1.6,
        sells: 0,
        updatedAt: null
    },
    {
        id: 27,
        name: "Solero picolero abacaxi e hortelã",
        price: 1.6,
        sells: 0,
        updatedAt: null
    },
    {
        id: 28,
        name: "Sprite",
        price: 1.7,
        sells: 0,
        updatedAt: null
    },
    {
        id: 29,
        name: "Toy story",
        price: 1.5,
        sells: 0,
        updatedAt: null
    },
    {
        id: 30,
        name: "Feast",
        price: 1.3,
        sells: 0,
        updatedAt: null
    },
    {
        id: 31,
        name: "Agua",
        price: 1,
        sells: 0,
        updatedAt: null
    },

]



export default function Sells() {
    const [isLoading, setIsLoading] = useState(false)
    const [test, setTest] = useState(0)
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
                GROUP BY p.id
                ORDER BY name`,
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

        setTest(test + item.price)


        // if (item.sells >= 0) {
        //     item.updatedAt = new Date().getHours().toString().padStart(2, '0') + ":" + new Date().getMinutes().toString().padStart(2, '0')
        //     setList(() => [...list])
        // }
    }
    const clearTotal = () => {
        setTest(0)

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

        if (test - item.price >= 0)
            setTest(test - item.price)

        // if (item.sells >= 0) {
        //     item.updatedAt = new Date().getHours().toString().padStart(2, '0') + ":" + new Date().getMinutes().toString().padStart(2, '0')
        //     setList(() => [...list])
        // }
    }
    return (
        <View style={styles.scrollView}>
            <View style={{
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "#FFF",
                paddingVertical: 5
            }}>
                <TouchableOpacity title="ADD" onPress={() => clearTotal()}
                    style={{
                        justifyContent: "center",
                        width: 300,
                    }}>
                    <Text size={25} color="#333" style={{
                        height: 40,
                        borderRadius: 50,
                        padding: 4,
                        fontSize: 20,
                        fontWeight: 600,
                        textAlign: "center",
                        backgroundColor: "#0FF"
                    }} >Total Venda €{test.toFixed(2)}</Text>

                </TouchableOpacity>
            </View>
            <ScrollView style={{ width: "100%", backgroundColor: "#eee", marginTop: 5, marginBottom: 45 }}>
                {list.map((i, x) => {
                    if (i.updatedAt) i.updatedAt = new Date(i.updatedAt)
                    const lastUpdate = i.updatedAt ? i.updatedAt?.getHours().toString().padStart(2, '0') + ":" + i.updatedAt.getMinutes().toString().padStart(2, '0') : ""
                    // console.log(today)
                    // const sellsToday = i.sells

                    // console.log(lastUpdate)
                    return (
                        <View style={styles.view} key={x}>
                            <View style={{}}>
                                <Text style={{ fontSize: 20, fontWeight: 600, maxWidth: 250 }}>{i.name}</Text>
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
        </View >
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
