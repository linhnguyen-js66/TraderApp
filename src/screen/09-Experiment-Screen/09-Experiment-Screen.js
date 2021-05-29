import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, Dimensions } from "react-native"
import styles from './style'
import { HeaderCustom } from '../../components/HeaderCustom'
import Score from '../../components/Score'
import ButtonForm from '../../components/ButtonForm'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../navigation/screen'
import auth from '@react-native-firebase/auth'
import InputForm from '../../components/InputForm'
import { Alert } from 'react-native'
import { spacing } from '../../theme'
import {
    LineChart
} from 'react-native-chart-kit'


const ExperimentScreen = () => {
    const navigation = useNavigation()
    let uid = auth().currentUser.uid
    const [open, setOpen] = useState(false)
    const [first, setFirst] = useState('')
    const [second, setSecond] = useState('')
    const [third, setThird] = useState('')
    const [time, setTime] = useState([1, 2, 3])
    
    const [four, setFour] = useState(null)
    const [five, setFive] = useState(null)
    const [six, setSix] = useState(null)
    const [seven, setSeven] = useState(null)
    const [eight, setEight] = useState(null)
    const [nine, setNine] = useState(null)
    const [ten, setTen] = useState(null)
    const [eleven, setEleven] = useState(null)
    const [twelve, setTwelve] = useState(null)
    const [revenue,setRevenue] = useState([])
    const [openViewRevenue, setOpenViewRevenue] = useState(false)
    const PushArray = () => {
        let resultData = []
        if (first !== '' || second !== '' || third == '') {
            {
                resultData.push(Number(first), Number(second), Number(third))
                setRevenue(resultData)

            }
            console.log("dfgsdf", resultData)
            

            setFour(forecast(4, resultData, time))
            setFive(forecast(5, resultData, time))
            setSix(forecast(6, resultData, time))
            setSeven(forecast(7, resultData, time))
            setEight(forecast(8, resultData, time))
            setNine(forecast(9, resultData, time))
            setTen(forecast(10, resultData, time))
            setEleven(forecast(11, resultData, time))
            setTwelve(forecast(12, resultData, time))
            setFirst('')
            setSecond('')
            setThird('')
            resultData = []
        }
        else {
            Alert.alert('Lỗi', 'Số liệu chưa được nhập đầy đủ')
        }
    }
    
    const forecast = (x, ky, kx) => {
        var i = 0, nr = 0, dr = 0, ax = 0, ay = 0, a = 0, b = 0;
        
        function average(ar) {
            var r = 0;
            for (i = 0; i < ar.length; i++) {
                r = r + ar[i];
            }
            return r / ar.length;
        }
        ax = average(kx);
        ay = average(ky);
        for (i = 0; i < kx.length; i++) {
            nr = nr + ((kx[i] - ax) * (ky[i] - ay));
            dr = dr + ((kx[i] - ax) * (kx[i] - ax))
        }
        b = nr / dr;
        a = ay - b * ax;
        return (a + b * x);
    }

    return (
        <ScrollView style={{
            backgroundColor: 'white',

        }}>
            <View style={styles.header}>
                <HeaderCustom uid={uid} />
                <Score />
            </View>
            <Text style={styles.title}>Dự đoán doanh thu</Text>
            {
                open == false ?

                    <View>
                        <View style={{ marginTop: 64 }}>
                            <Image source={require('../../image/leodoc.png')} style={styles.imageLeoDoc} />
                        </View>
                        <View style={styles.descript}>
                            <Text style={{ flex: 1, textAlign: 'center', fontSize: 17, color: '#868686' }}>
                                Mỗi nhà đầu tư đều dự trù cho mình một nguồn vốn riêng, hãy tính toán cẩn thận
                    </Text>
                        </View>
                        <View style={styles.ButtonForm}>
                            <ButtonForm title="Bắt đầu" onPress={() => setOpen(true)} />
                        </View>
                    </View>
                    :
                    <View style={styles.contain}>
                        <Text style={styles.titleInput}>Nhập doanh thu 3 tháng gần nhất của bạn</Text>

                        <View style={styles.containInput}>
                            <InputForm title="Đợt 1" onChangeText={(text) => setFirst(text)} value={first} />
                        </View>

                        <View style={styles.containInput}

                        >
                            <InputForm title="Đợt 2" onChangeText={(text) => setSecond(text)}
                                value={second} />
                        </View>
                        <View style={styles.containInput}

                        >
                            <InputForm title="Đợt 3" onChangeText={(text) => setThird(text)}
                                value={third} />
                        </View>
                        <View style={styles.ButtonForm}>
                            <ButtonForm title="Dự đoán"
                                onPress={() => {
                                    setOpenViewRevenue(true)
                                    PushArray()

                                }}
                            />
                        </View>
                        {
                            openViewRevenue == true &&
                            <View style={{ marginTop: spacing[5] }}>
                                <View style={styles.row}>
                                    <Text style={styles.titleWeight}>Doanh số đợt 4:</Text>
                                    <Text style={styles.revenue}>{Math.round(four).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+" đ"}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.titleWeight}>Doanh số đợt 5:</Text>
                                    <Text style={styles.revenue}>{Math.round(five).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+" đ" }</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.titleWeight}>Doanh số đợt 6:</Text>
                                    <Text style={styles.revenue}>{Math.round(six).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+" đ" }</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.titleWeight}>Doanh số đợt 7:</Text>
                                    <Text style={styles.revenue}>{Math.round(seven).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+" đ" }</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.titleWeight}>Doanh số đợt 8:</Text>
                                    <Text style={styles.revenue}>{Math.round(eight).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+" đ"}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.titleWeight}>Doanh số đợt 9:</Text>
                                    <Text style={styles.revenue}>{Math.round(nine).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+" đ"}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.titleWeight}>Doanh số đợt 10:</Text>
                                    <Text style={styles.revenue}>{Math.round(ten).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+" đ"}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.titleWeight}>Doanh số đợt 11:</Text>
                                    <Text style={styles.revenue}>{Math.round(eleven).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+" đ"}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.titleWeight}>Doanh số đợt 12:</Text>
                                    <Text style={styles.revenue}>{Math.round(twelve).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+" đ"}</Text>
                                </View>
                                <LineChart
                                    data={{
                                        labels: ['1','2','3','4', '5', '6', '7', '8', '9', '10', '11', '12'],
                                        datasets: [{
                                            data: [
                                               revenue[0],
                                               revenue[1],
                                               revenue[2],
                                               Math.round(four) ,
                                               Math.round(five) ,
                                               Math.round(six) ,
                                               Math.round(seven) ,
                                               Math.round(eight) ,
                                               Math.round(nine) ,
                                               Math.round(ten) ,
                                               Math.round(eleven) ,
                                               Math.round(twelve) ,
                                            ]
                                        }]
                                    }}
                                    width={Dimensions.get('window').width} // from react-native
                                    height={300}
                                    yAxisSuffix='k'
                                    yAxisInterval={1}
                                    chartConfig={{
                                        backgroundColor: '#FFF',
                                        backgroundGradientFrom: '#FFF',
                                        backgroundGradientTo: '#FFF',
                                        decimalPlaces: 2,
                                        color: (opacity = 0) => `rgba( 255,0,0, ${opacity})`,
                                        labelColor: (opacity = 0) => `rgba( 0,0,0, ${opacity})`,
                                        // style={
                                        //     borderRadius:16
                                        // },
                                        propsForDots: {
                                            r: '2',
                                            strokeWidth: "2",
                                            stroke: 'red'
                                        }
                                    }}
                                    
                                    style={{
                                        marginVertical: 8,
                                        borderRadius: 16
                                    }}
                                />
                            </View>
                        }

                    </View>
            }

        </ScrollView>
    )
}
export default ExperimentScreen