import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useMemo, useState } from "react";
import { exportDbFile, importDbFile } from "../../services/database";

import { useIsFocused } from "@react-navigation/native";
// import {} from "@expo/vector-icons"

import * as SQLite from "expo-sqlite"


export default function Home({ navigation }) {
    const isFocused = useIsFocused();
    const [sells, setSells] = useState([])

    const [db, setDb] = useState(SQLite.openDatabase("Picolero.db"))
    const [total, setTotal] = useState({
        qnt: 0,
        value: 0.0
    })

    const getTotalToday = () => {

        const today = new Date()
        today.setHours(0)
        today.setMinutes(0)

        db.transaction(tx => {
            tx.executeSql(`SELECT count(idSell) as count, SUM(price) as max FROM sells WHERE deletedAt ISNULL AND updatedAt > '${today.toISOString()}'`,
                null,
                (txObj, resultSet) => {
                    setSells(resultSet.rows._array)
                    // if (resultSet.rows._array[0])
                    //     setTotal({ qnt: resultSet.rows._array[0].count, value: resultSet.rows._array[0].max })(resultSet.rows._array)
                },
                (txObj, error) => console.log(error)
            );
        });


    }

    useEffect(() => {
        db.transaction(tx => {

            // tx.executeSql('DROP TABLE products')
            tx.executeSql('CREATE TABLE IF NOT EXISTS  products (id INTEGER PRIMARY KEY, name TEXT, price REAL)')
        });

        db.transaction(tx => {
            // tx.executeSql('DROP TABLE sells')
            tx.executeSql(`CREATE TABLE IF NOT EXISTS sells (
                idSell INTEGER PRIMARY KEY AUTOINCREMENT,
                idProduct INTEGER,
                price REAL,
                updatedAt DATE,
                deletedAt DATE,
                FOREIGN KEY(idProduct) REFERENCES products(id)
                )`)
        });

        getTotalToday()
    }, [isFocused]
    );

    useMemo(() => {
        let qnt = 0
        let value = 0
        sells.map(i => {
            qnt += i.count
            value += i.max
        })
        setTotal({ qnt, value })
        // const today = new Date()
        // today.setHours(0)
        // today.setMinutes(0)
        // let qnt = 0
        // let value = 0
        // sells.forEach(i => {
        //     if (new Date(i.updatedAt) > today) {
        //         qnt++
        //         value += i.price
        //     }
        // })

    }, [sells]
    );
    const handleImportDBFile = async () => {
        Alert.alert(
            //title
            '* Atenção *',
            //body
            'Por segurança, faça o "Export" antes de Importar um novo banco da dados.\n\n' +
            'Os dadas atuais seram substituídos',
            [
                {
                    text: 'PROSEGUIR', onPress: async () => {
                        const result = await importDbFile()
                        if (result.type === 'success') {
                            db.closeAsync();
                            setDb(SQLite.openDatabase('Picolero.db'));
                            Alert.alert(
                                'Sucesso',
                                `Banco de dados importado com sucesso`,
                            );
                        } else if (result.type === 'cancel') {
                            Alert.alert(
                                'Cancelado',
                                `Importação cancelada`,
                                null,
                                { cancelable: true }
                            )
                        } else {
                            Alert.alert(
                                'Cancelado',
                                `Falha ao importar o arquivo`,
                            );
                        }
                    }
                },
                {
                    text: 'CANCELAR',
                    onPress: () =>
                        Alert.alert(
                            'Cancelado',
                            `Importação cancelada`,
                            null,
                            { cancelable: true }
                        ),
                    style: 'cancel',
                },
            ],
            { cancelable: false }
            //clicking out side of alert will not cancel
        );


    }

    return (
        <View style={styles.container}>
            <View style={styles.containerButton}>
                <Text style={{ fontWeight: 800, fontSize: 20, color: "#333", display: "flex", justifyContent: "center" }} >
                    {total.qnt} vendidos hoje €{total.value?.toFixed(2)}
                </Text>
            </View>
            <View style={styles.containerButton}>
                <TouchableOpacity title="GO TO Sells" onPress={() => {
                    navigation.navigate('SellsPage', { name: 'Jane' })
                }}
                    style={{ ...styles.button, backgroundColor: "#0FF" }}>
                    <MaterialIcons name="attach-money" size={30} style={styles.icon} />
                    <Text style={{ fontWeight: 800, fontSize: 20, color: "#333", display: "flex", alignContent: "center" }} >
                        Vendas
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.containerButton}>
                <TouchableOpacity title="GO TO Dash" onPress={() => { getTotalToday() }}
                    style={{ ...styles.button, backgroundColor: "#f99" }}>
                    <MaterialIcons name="error" size={30} style={styles.icon} />
                    <Text style={{ fontWeight: 800, fontSize: 20, color: "#333", display: "flex", alignContent: "center" }} >
                        Dasboard
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ ...styles.containerButton, justifyContent: "space-between", top: 150 }}>
                <TouchableOpacity title="ExportDB" onPress={handleImportDBFile}
                    style={{ ...styles.button, backgroundColor: "#AFF", maxWidth: "40%" }}>
                    <MaterialIcons name="file-upload" size={30} style={{ ...styles.icon, marginLeft: -15 }} />
                    <Text style={{ fontWeight: 800, fontSize: 20, color: "#333", display: "flex", alignContent: "center" }} >
                        IMPORT DB
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity title="ExportDB" onPress={exportDbFile}
                    style={{ ...styles.button, backgroundColor: "#AFF", maxWidth: "40%" }}>
                    <MaterialIcons name="file-download" size={30} style={{ ...styles.icon, marginLeft: -15 }} />
                    <Text style={{ fontWeight: 800, fontSize: 20, color: "#333", display: "flex", alignContent: "center" }} >
                        EXPORT DB
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.containerButton}>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingVertical: 20,
        flex: 1,
        flexDirection: 'column',
    },
    containerButton: {
        backgroundColor: '#fff',
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'center',

    },
    button: {
        width: 200,
        height: 50,
        padding: 10,
        paddingHorizontal: 30,
        borderRadius: 50,
        textAlign: "center",
        flexDirection: 'row',
        alignContent: 'center',
    },
    icon: {
        alignContent: 'center',
        justifyContent: 'center',
        marginRight: 10,
        color: "#333"
    }
});
