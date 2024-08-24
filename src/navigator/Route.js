import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    TestScreen, Splash, Login, Otp, Welcome, Maintenance, Indices,
    Onboarding, Settings, About, InvestmentPlan, PaymentDetails,
    PaymentMethod, Security, Verification, Webview, ThankYou, NoNetwork,
    Withdraw, Referral, Invite, News, Notifications, ActivateSecurity, Transactions, MyReferral, ReferralDetails, BankDetails, KycStatus,
    Blog
} from '../screens';
import { DashboardNavigator, HelpNavigator, ReferralNavigator } from '../navigator';
import { COLORS } from '../constants';
import Chatbot from '../screens/Chatbot';
import NavigationService from '../navigator/NavigationService';
import { Header } from '../components';

import { Welcome2 } from '../screens/Welcome2';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Service from '../skill/service';
import Coverimage from '../skill/Coverimage';

import Home from '../skill/Home';
import Subchild from '../skill/Subchild';
import Supersubchild from '../skill/Supersubchild';
import SearchResults from '../skill/Searchresult';
import { SearchBar } from 'react-native-screens';
import Searchbar from '../skill/Searchbar';
import Detailsuser from '../skill/Detailsuser';
import Xprrt from '../skill/Xprrt';
import Review from '../skill/Review';
import Homechild from '../skill/homechild';
import Homesubchild from '../skill/homesubchild';
import Superchildcategories from '../Categories/Subchildcategories';
import { Account2 } from '../screens/Account2';
import Subcategories from '../Categories/Subcategories';
import BlogsScreen from '../screens/Blogdata';
import Subhome from '../skill/Subhome';


// import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';


const Stack = createStackNavigator();

export const Route = () => {

    return (
           <BottomSheetModalProvider>
            <NavigationContainer ref={(ref) => NavigationService.setTopLevelNavigator(ref)}>
                <Stack.Navigator screenOptions={{ animation: 'fade_from_bottom' }} initialRouteName="Splash" >
                    <Stack.Screen name='DashboardNavigator' component={DashboardNavigator} />
                    <Stack.Screen name='TestScreen' component={TestScreen} options={{ headerShown: false }} />
                    <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} />
                    <Stack.Screen name='Onboarding' component={Onboarding} options={{ headerShown: false }} />
                    <Stack.Screen name='Chatbot' component={Chatbot} />
                    <Stack.Screen name='NoNetwork' component={NoNetwork} />
                    <Stack.Screen name='Webview' component={Webview} options={{ headerShown: false }} />
                    <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
                    <Stack.Screen name = 'Subchild' component={Subchild} options={{headerShown:false}}/>
                     <Stack.Screen name='SuperSubchild' component={Supersubchild} options={{headerShown:false}}/>
                     <Stack.Screen name='SearchBar' component={Searchbar} options={{headerShown:false}}/>
                     <Stack.Screen name='SearchResults' component={SearchResults} options={{headerShown:true}}/>
                     <Stack.Screen name='Detailsuser' component={Detailsuser} options={{headerShown:true}}/>
                     <Stack.Screen name='Xprrt' component={Xprrt} options={{headerShown:true}}/>
                     <Stack.Screen name='Review' component={Review} options={{headerShown:true}}/>
                     <Stack.Screen name='Homechild' component={Homechild} options={{headerShown:true}}/>
                     <Stack.Screen name='Superchildcategories' component={Superchildcategories} options={{headerShown:true}}/>
                     <Stack.Screen name='Homesubchild' component={Homesubchild} options={{headerShown:true}}/>
                     <Stack.Screen name='Account2' component={Account2} options={{headerShown:true}}/>
                     <Stack.Screen name='Subcategories' component={Subcategories} options={{headerShown:true}}/>
                     <Stack.Screen name='Blogscreen' component={BlogsScreen} options={{headerShown:true}}/>
                     <Stack.Screen name='Blog' component={Blog} options={{headerShown:true}}/>
                     <Stack.Screen name='Subhome' component={Subhome} options={{headerShown:true}}/>
                    <Stack.Screen name='Maintenance' component={Maintenance}
                        options={{
                            header: () => <Header title='Maintenance' showBackButton={false} />,
                        }} />
                    <Stack.Screen name='Login' component={Login}
                        options={{
                            header: () => <Header showBackButton={false} />,
                        }} />
                    <Stack.Screen name='Otp' component={Otp}
                        options={{
                            header: () => <Header showBackButton={false} />,
                        }} />
                    <Stack.Screen name='Referral' component={Referral}
                        options={{
                            header: () => <Header showBackButton={false} />,
                        }} />
                    <Stack.Screen name='Welcome' component={Welcome}
                        options={{
                            header: () => <Header title='Profile' showBackButton={false} />,
                        }} />
  {/* ////////////////////////////////////professional */}
                         <Stack.Screen name='Welcome2' component={Welcome2}
                        options={{
                            header: () => <Header title='Professional' showBackButton={false} />,
                        }} />
{/* ///////////////////////service */}

                    <Stack.Screen name='service' component={Service}
                        options={{
                            header: () => <Header title='service' />,
                        }} />

{/*///////////////////////////////////////cover-image  */}
                     <Stack.Screen name='coverimage' component={Coverimage}
                        options={{
                            header: () => <Header title='coverimage' />,
                        }} />





                    <Stack.Screen name='Verification' component={Verification}
                        options={{
                            header: () => <Header title='KYC Details' />,
                        }} />
                    <Stack.Screen name='Security' component={Security}
                        options={{
                            header: () => <Header title='Account Security' />,
                        }} />
                    <Stack.Screen name='About' component={About}
                        options={{ header: () => <Header title='About' />, }} />
                    <Stack.Screen name='Settings' component={Settings}
                        options={{
                            header: () => <Header title='Setting' />,
                        }} />
                    <Stack.Screen name='HelpNavigator' component={HelpNavigator}
                        options={{
                            header: () => <Header title='Help Center' />,
                        }} />
                    <Stack.Screen name='MyReferral' component={MyReferral}
                        options={{
                            header: () => <Header title='My Referrals' />,
                        }} />
                    <Stack.Screen name='ReferralDetails' component={ReferralDetails}
                        options={{
                            header: () => <Header title='Referral Details' />,
                        }} />
                    <Stack.Screen name='Transactions' component={Transactions}
                        options={{
                            header: () => <Header title='Transactions' />,
                        }} />
                    <Stack.Screen name='News' component={News}
                        options={{
                            header: () => <Header title='News Feeds' />,
                        }} />
                    <Stack.Screen name='Withdraw' component={Withdraw}
                        options={{
                            header: () => <Header title='Withdraw Request' />,
                        }} />
                    <Stack.Screen name='Invite' component={Invite}
                        options={{ header: () => <Header />, }} />
                    <Stack.Screen name='PaymentMethod' component={PaymentMethod}
                        options={{
                            header: () => <Header />,
                        }} />
                    <Stack.Screen name='PaymentDetails' component={PaymentDetails}
                        options={{
                            header: () => <Header />,
                        }} />

                    <Stack.Screen name='ThankYou' component={ThankYou}
                        options={{
                            header: () => <Header title='Thank You' />,
                        }} />
                    <Stack.Screen name='InvestmentPlan' component={InvestmentPlan}
                        options={{
                            header: () => <Header />,
                        }} />
                    <Stack.Screen name='Notifications' component={Notifications}
                        options={{
                            header: () => <Header title='Notifications' />,
                        }} />
                    <Stack.Screen name='ActivateSecurity' component={ActivateSecurity}
                        options={{
                            header: () => <Header />,
                        }} />
                    <Stack.Screen name='Indices' component={Indices}
                        options={{
                            header: () => <Header title='Indices' />,
                        }} />
                    <Stack.Screen name='BankDetails' component={BankDetails}
                        options={{
                            header: () => <Header title='Bank Details' />,
                        }} />
                    <Stack.Screen name='KycStatus' component={KycStatus}
                        options={{
                            header: () => <Header />,
                        }} />
                </Stack.Navigator>

            </NavigationContainer>
        </BottomSheetModalProvider>

    );
}