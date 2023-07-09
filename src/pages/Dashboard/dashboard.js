import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from "react";

import * as SQLite from "expo-sqlite"


export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(false)
    const [total, setTotal] = useState({})
    const [thisMonth, setThisMonth] = useState(null)

    const [db, setDb] = useState(SQLite.openDatabase("Picolero.db"))

    const [list, setList] = useState([])

    useEffect(() => {

        getListPerDay()

    }, [db])

    const getListPerDay = () => {

        db.transaction(tx => {
            tx.executeSql(`SELECT  COUNT(s.idSell) as totalCount, SUM(s.price) as totalValue, s.updatedAt 
                FROM sells s
                    LEFT JOIN products p ON s.idProduct = p.id
                WHERE s.deletedAt ISNULL
                GROUP BY date(s.updatedAt)
                ORDER BY s.updatedAt DESC`,
                null,
                (txObj, resultSet) => { setList(resultSet.rows._array) },
                (txObj, error) => console.log(error)
            );
        });

    }
    useEffect(() => {
        const auxTotal = {}
        list.map((i => {
            const name = String(i.updatedAt.getMonth() + 1).padStart(2, '0')
            if (!auxTotal[name]) auxTotal[name] = { value: 0, days: 0, count: 0 }
            auxTotal[name] = {
                value: auxTotal[name].value + i.totalValue,
                days: auxTotal[name].days + 1,
                count: auxTotal[name].count + i.totalCount
            }
        }))
        setTotal(auxTotal)
    }, [list])

    let lastMonth = null
    return (
        <View style={styles.scrollView}>
            <ScrollView style={{ width: "100%", backgroundColor: "#eee" }}>
                {list.map((i, x) => {
                    i.updatedAt = new Date(i.updatedAt)
                    const day = String(i.updatedAt.getDate()).padStart(2, '0');
                    const month = String(i.updatedAt.getMonth() + 1).padStart(2, '0');
                    const year = String(i.updatedAt.getFullYear());
                    const date = `${day}/${month}/${year}`

                    lastMonth = list[x - 1] ? String(list[x - 1].updatedAt.getMonth() + 1).padStart(2, '0') : null;

                    return (<>
                        {lastMonth != month && <>
                            <View style={styles.containerButton}>
                                <Text style={{ fontWeight: 800, fontSize: 20, color: "#333", display: "flex", justifyContent: "center" }} >
                                    Mês {month} ({total[month]?.days} dia{total[month]?.days > 1 && "s"}) € {total[month]?.value?.toFixed(2)} ({total[month]?.count} vendas)
                                </Text>
                            </View>
                        </>
                        }
                        <View style={styles.view} key={x}>
                            <View style={{ width: "100%" }}>
                                <View style={{ ...styles.viewItem, paddingBottom: 5 }}>
                                    <Text style={styles.viewItemBold}>{date}</Text>
                                </View>
                                <View style={styles.viewItem}>
                                    <Text style={styles.textItem}>TOTAL: </Text>
                                    <Text style={styles.viewItemBold}>€ {i.totalValue.toFixed(2)}</Text>
                                </View>
                                <View style={styles.viewItem}>
                                    <Text style={styles.textItem}>VENDAS: </Text>
                                    <Text style={styles.viewItemBold}>{i.totalCount}</Text>
                                </View>
                            </View>
                        </View>
                    </>
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
    containerButton: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
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
    },
    viewItem: {
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 5
    },
    viewItemBold: {
        flexDirection: "row",
        fontSize: 20,
        fontWeight: 600
    },
    textItem: {
        fontSize: 18,
        fontWeight: 400,
        textAlign: "center",
    },
    button: {
        width: 30,
        height: 30,
        borderRadius: 50,
        padding: 4,
        textAlign: "center",
        backgroundColor: "#0FF"
    },
});
