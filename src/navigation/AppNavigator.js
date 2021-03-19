import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { Icon } from "react-native-elements"

//Các màn hình
import LoginScreenandSignUp from '../screen/01-Login&SignUpScreen'
import AddInforScreen from '../screen/20-AddInformation'
import ForgotPassword from '../screen/02-forgotPassword-Screen'
import NewsScreen from '../screen/03-News-Screen'
import DetailNewScreen from '../screen/04-DetailNews-Screen'
import StudyScreen from '../screen/05-Study-Screen'
import LessonScreen from '../screen/06-Lesson-Screen'
import DetailLesson from '../screen/07-DetailLesson-Screen'
import ExamScreen from '../screen/08-Exam-Screen'
import ExperimentScreen from '../screen/09-Experiment-Screen'
import AddressAndMarket from '../screen/10-Add&MarketDetail-Screen'
import QuestionScreen from '../screen/11-QuestionScreen'
import ThemeScreen from '../screen/12-ThemeScreen'
import SearchScreen from '../screen/13-SearchScreen'
import StatusScreen from '../screen/14-StatusScreen'
import MarketScreen from '../screen/15-MarketScreen'
import CouponScreen from '../screen/16-CouponScreen'
import DetailCoupon from '../screen/17-DetailCoupon'
import AccountSetting from '../screen/18-AccountSetting'
import DetailComment from '../screen/19-DetailComment'
import UploadCart21 from '../screen/21-UploadCart-Screen'
import HistoryUpload25 from '../screen/22-HistoryUpload-Screen'
import SavePostScreen23 from '../screen/23-SavePost-Screen'
import DetailSavePost24 from '../screen/24-DetailSavePostScreen'
import DetailStatus25 from '../screen/25-DetailStatus-Screen'
import YourCouponScreen26 from '../screen/26-YourCoupon-Screen'
import { screen } from './screen'
import { palette, spacing } from '../theme';

const Stack = createStackNavigator()
const Tab = createMaterialBottomTabNavigator()

const MainAppStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Auth"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Auth" component={AuthStack} />
            <Stack.Screen name="Home" component={HomeTab} />
        </Stack.Navigator>
    )
}

const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="LoginAndSignup"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="LoginAndSignup"
                component={LoginScreenandSignUp}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="AddInformation"
                component={AddInforScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

const BottomTab = () => {
    return (
        <Tab.Navigator
            initialRouteName="Tin tức"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconName
                    if (route.name === screen.StudyScreen) {
                        iconName = focused ? "notebook" : "notebook-outline"
                    }
                    else if (route.name === screen.ExperimentScreen) {
                        iconName = focused ? "test-tube" : "test-tube-empty"
                    }
                    else if (route.name === screen.NewsScreen) {
                        iconName = focused ? "newspaper-variant" : "newspaper-variant-outline"
                    }
                    else if (route.name === screen.QuestionScreen) {
                        iconName = focused ? "comment-processing" : "comment-processing-outline"
                    }
                    else if (route.name === screen.MarketScreen) {
                        iconName = focused ? "shopping" : "shopping-outline"
                    }
                    return (
                        <Icon
                            name={iconName}
                            size={25}
                            type="material-community"
                            color={focused ? palette.buttonColor : palette.grey}
                            style={{ marginBottom: spacing[4] }}
                        />
                    )
                }
            })}
            barStyle={{ backgroundColor: palette.white }}
            activeColor={palette.buttonColor}
        >
            <Tab.Screen name="Học" component={StudyScreen} />
            <Tab.Screen name="Thử nghiệm" component={ExperimentScreen} />
            <Tab.Screen name="Tin tức" component={NewsScreen} />
            <Tab.Screen name="Tò mò" component={QuestionScreen} />
            <Tab.Screen name="Thị trường" component={MarketScreen} />
        </Tab.Navigator>
    )
}

const HomeTab = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: true
            }}
        >
            <Stack.Screen name="BottomTab" component={BottomTab} />
            <Stack.Screen name="AccountSetting" component={AccountSetting} />
            <Stack.Screen name="AddressAndMarketScreen" component={AddressAndMarket} />
            <Stack.Screen name="DetailNewScreen" component={DetailNewScreen} />
            <Stack.Screen name="DetailComment" component={DetailComment} />
            <Stack.Screen name="DetailCoupon" component={DetailCoupon} />
            <Stack.Screen name="CouponScreen" component={CouponScreen} />
            <Stack.Screen name="LessonScreen" component={LessonScreen} />
            <Stack.Screen name="DetailLesson" component={DetailLesson} />
            <Stack.Screen name="ExamScreen" component={ExamScreen} />
            <Stack.Screen name="ThemeScreen" component={ThemeScreen} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="StatusScreen" component={StatusScreen} />
            <Stack.Screen name="UploadCart" component={UploadCart21} />
            <Stack.Screen name="HistoryUpload25" component={HistoryUpload25} />
            <Stack.Screen name="SavePost23" component={SavePostScreen23} />
            <Stack.Screen name="DetailSavePost24" component={DetailSavePost24} />
            <Stack.Screen name="DetailStatus25" component={DetailStatus25}/>
            <Stack.Screen name="YourCoupon" component={YourCouponScreen26}/>
        </Stack.Navigator>
    )
}

export const AppNavigator = () => <NavigationContainer>{MainAppStack()}</NavigationContainer>