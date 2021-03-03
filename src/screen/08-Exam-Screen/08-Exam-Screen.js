import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, Dimensions } from "react-native"
import styles from './style'
import { Score } from '../../components/HeaderCustom'
import HeaderView from '../../components/Header'
import { Icon } from 'react-native-elements'
import ButtonForm from '../../components/ButtonForm'
const Data = [
    {
        theme: "1. Hình thức không thuộc lĩnh vực đầu tư là ?",
        score: 10,
        answers: [
            {
                ans: "Chứng khoán",
                id: 1,
                exactly: false
            },
            {
                ans: "Forex",
                id: 2,
                exactly: false
            },
            {
                ans: "Bất động sản",
                id: 3,
                exactly: false
            },
            {
                ans: "Từ thiện",
                id: 4,
                exactly: true
            }
        ]
    }
]
const ListExam = ({ data }) => {
    const { theme, score, answers } = data
    return (
        <View>
            <View style={styles.contain}>
                <View style={styles.containAllTitle}>
                    <View>
                        <Text style={styles.title}>{theme}</Text>
                        <View style={styles.containScore}>
                            <View style={{ width: 25 }}>
                                <Image source={require('../../image/diamond.png')} style={styles.imageIcon} />
                            </View>
                            <Text style={styles.score}>{score}</Text>
                        </View>
                    </View>
                </View>
            </View>
            {/**Line*/}

            {answers.map((item) => {
                const { ans, id } = item
                return <View>
                    <View style={styles.line}></View>
                    <TouchableOpacity style={{ flex: 1, flexDirection: 'row', marginHorizontal: 8 }}>
                        <View>
                            <Icon name="check" type="entypo" color="#868686" size={30} />
                        </View>
                        <Text style={styles.answerQuestion} key={id} >{ans}</Text>
                    </TouchableOpacity>
                </View>
            })}

        </View>
    )
}
const ExamScreen = () => {
    return (
        <ScrollView>
            {/* Header */}
            <View style={{ flexDirection: 'row', flex: 1, marginHorizontal: 16, marginTop: 8 }}>
                <View style={{ marginTop: 4 }}>
                    <HeaderView name="chevron-left" type="entypo" />
                </View>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <Score />
                </View>
            </View>
            {/*Body*/}
            <View style={styles.containTheme}>
                <Text style={styles.theme}>Làm quen</Text>
                <Text style={styles.questionPermanent}>Câu hỏi</Text>
            </View>
            <View style={styles.questionContain}>
                {Data.map((item) => <ListExam data={item} />)}
            </View>
            <View style={styles.ButtonForm}>
                <ButtonForm title="Tiếp theo"/>
            </View>
        </ScrollView>
    )
}
export default ExamScreen