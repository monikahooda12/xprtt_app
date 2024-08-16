import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Linking, Platform, Alert, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Dialog, Menu, hideLoader, showLoader } from '../components';
import { API, COLORS, FONTS, ICONS, LOCAL_DB } from '../constants'
import {ProfessinolInfoSvg, AboutSvg, ArrowSvg, BankSvg, CloseSvg, CurrencySvg, EditCameraSvg, FeedbackSvg, HelpSvg, InviteSvg, LogoSvg, LogoutSvg, NotificationSvg, PersonalInfoSvg, ReferralSvg, SecuritySvg, SettingSvg, VerificationSvg, ServicedetailSvg, coverimageSvg } from '../assets/icons/svg';
import { CommonStyles } from '../styles/styles';
import { androidCameraPermission, deleteAllLocalData, getLocalData, storeLocalData } from '../utils';
import { Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { httpRequest } from '../api/http';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export const Account = ({ navigation }) => {

    const [user, setUser] = useState({});
    const [support, setSupport] = useState([])
    const [currencyLabel, setCurrencyLabel] = useState('$ (USD)');
    const [modalVisible, setModalVisible] = useState(false);
    const [imageUpdated, setImageUpdated] = useState();
    const [dialogVisible, setDialogVisible] = useState(false);

    const currencyList = [
        { id: '1', value: 'INR', label: '₹ (INR)' },
        { id: '2', value: 'USD', label: '$ (USD)' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            const user = await getLocalData(LOCAL_DB.USER);
            setUser(user);

            const result = await getLocalData(LOCAL_DB.CONFIG)
            setSupport(result.CUSTOMER_SUPPORT)

            const currency = await getLocalData(LOCAL_DB.CURRENCY)
            currency && setCurrencyLabel(currency.label)
        };
        fetchData();
        setImageUpdated(false)
    }, [imageUpdated]);

    const sendEmail = () => {
        const subject = 'Feedback';
        const emailUrl = `mailto:${support.EMAIL}?subject=${encodeURIComponent(
            subject
        )}&body=${encodeURIComponent('')}`;

        Linking.openURL(emailUrl);
    };

    const selectImage = async () => {
        const permissionStatus = Platform.OS == 'android' && await androidCameraPermission();
        if (permissionStatus || Platform.OS == 'ios') {
            Alert.alert(
                'Profile Picture',
                'Choose an Option',
                [
                    { text: 'Camera', onPress: openCamera },
                    { text: 'Gallery', onPress: openGallery },
                    { text: 'Cancel', onPress: () => { } }
                ]
            )
        }
    };
    const openCamera = () => {
        ImagePicker.openCamera({
            width: 500,
            height: 500,
            cropping: true,
        }).then(image => {
            uploadImage(image.path)
        }).catch(error => {
            console.log(error)
        });
    }
    const openGallery = () => {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: true
        }).then(image => {
            uploadImage(image.path)
        }).catch(error => {
            console.log(error)
        });
    }

    const getBase64StringFromBlob = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    const uploadImage = async (imagePath) => {
        showLoader();
        const imageData = new FormData()
        const imageBlob = await fetch(imagePath).then((response) => response.blob());
        imageData.append("profile_image", imageBlob, 'image.png');
        const base64String = await getBase64StringFromBlob(imageBlob);
        const params = {
            profile_image: base64String,
            file_name: 'user.png'
        }
        try {
            const response = await httpRequest({ method: "PUT", url: API.PROFILE_IMAGE_UPLOAD, params, alert: true });
            await storeLocalData(LOCAL_DB.USER, response.data)
            setImageUpdated(true);
            hideLoader();
        } catch (error) {
        }
    }

    const openCurrencyModal = () => {
        setModalVisible(true)
    }
    const saveCurrency = async (item) => {
        await storeLocalData(LOCAL_DB.CURRENCY, item)
        setCurrencyLabel(item.label)
    }

    const openDialog = () => {
        setDialogVisible(true);
    }

    const logout = async () => {
        showLoader()
        try {
            await httpRequest({ method: "PUT", url: API.LOGOUT, alert: true });
            await deleteAllLocalData()
            hideLoader()
            navigation.reset({
                index: 0,
                routes: [{ name: 'Splash' }]
            })
        } catch (error) {
            hideLoader()
        }
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: COLORS.PRIMARY }}>
            <View style={{ paddingHorizontal: responsiveWidth(3.8) }}>

                <View style={{ marginTop: 20, marginBottom: 20, flexDirection: 'row' }}>

                    <View>
                        <TouchableOpacity activeOpacity={0.7} onPress={selectImage}>
                            <View style={{ ...styles.imageContainer, overflow: 'hidden' }}>
                                <Image
                                    source={user.profile_image ? { uri: user.profile_image } : ICONS.AVATAR}
                                    style={{ height: 60, width: 60, resizeMode: 'contain' }}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={styles.editIcon} onPress={selectImage}>
                            <EditCameraSvg size={10} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginStart: 10, justifyContent: 'center' }}>
                        <Text style={{ fontFamily: FONTS.BOLD, fontSize: responsiveFontSize(2.5), color: COLORS.WHITE }}>
                            {user.name}
                        </Text>
                        <Text style={{ marginTop: responsiveHeight(0.8), fontFamily: FONTS.SEMI_BOLD, fontSize: responsiveFontSize(2), color: COLORS.DESCRIPTION }}>
                            Referral Code: {user.referral_code}
                        </Text>
                    </View>
                </View>

                <View style={{ ...CommonStyles.horizontalLine }} />

                <Menu
                    onPress={() => navigation.navigate('Welcome', { isUpdate: true })}
                    title="Personal Info"
                    subTitle='Manage your profile'
                    icon={PersonalInfoSvg}
                />

                {/* ===========professional */}
                <Menu
                    onPress={() => navigation.navigate('Welcome2', { isUpdate: true })}
                    title="Professional Info"
                    subTitle='Professional'
                    icon={ProfessinolInfoSvg}
                />
                
{/*==========================service detail */}
<Menu
                    onPress={() => navigation.navigate('service', { isUpdate: true })}
                    title="service Info"
                    subTitle='service detail'
                    icon={ServicedetailSvg}
                />


                {/* ==================================Cover_image */}

                <Menu
                    onPress={() => navigation.navigate('coverimage', { isUpdate: true })}
                    title="cover_image"
                    subTitle='upload'
                    icon={coverimageSvg}
                />




                <Menu
                    onPress={() => navigation.navigate('KycStatus')}
                    title="KYC Verification"
                    subTitle='Verify your identity'
                    icon={VerificationSvg}
                />

                <Menu
                    onPress={() => navigation.navigate('BankDetails')}
                    title="Bank Details"
                    subTitle='Update your bank details for payout'
                    icon={BankSvg}
                />
                {/* <Menu
                    onPress={() => navigation.navigate("Invite")}
                    title="Invite & Earn"
                    subTitle='Share app with your friends'
                    icon={InviteSvg}
                /> */}
                {/* <Menu
                    onPress={() => navigation.navigate("MyReferral")}
                    title="My Referral"
                    subTitle='Checkout your referrals'
                    icon={ReferralSvg}
                /> */}

                <View style={{ ...CommonStyles.horizontalLine }} />

                <View style={{ marginVertical: 15 }}>
                    <TouchableOpacity
                        onPress={openCurrencyModal}
                        activeOpacity={0.7}
                        style={{ flexDirection: 'row', alignItems: 'center' }}>

                        {/* <CurrencySvg color={COLORS.SECONDARY} style={{ marginEnd: responsiveWidth(3) }} />

                        <View style={{ width: '80%' }}>
                            <Text style={{ includeFontPadding: false, fontFamily: FONTS.SEMI_BOLD, fontSize: responsiveFontSize(2), color: COLORS.WHITE }}>
                                Default Currency
                            </Text>

                            <View style={{ width: '80%' }}>
                                <Text style={{ includeFontPadding: false, fontFamily: FONTS.SEMI_BOLD, fontSize: 12, color: COLORS.DESCRIPTION }}>
                                    Set Your Default Currency
                                </Text>
                            </View> 

                        </View> */}
                        <View style={{ marginStart: 'auto', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ marginEnd: 10, includeFontPadding: false, fontFamily: FONTS.SEMI_BOLD, fontSize: 14, color: COLORS.SECONDARY }}>
                                {currencyLabel}
                            </Text>
                            <ArrowSvg color={COLORS.SECONDARY} style={{ transform: [{ rotate: `${-90}deg` }] }} />
                        </View>

                    </TouchableOpacity>
                </View>

                <Menu
                    onPress={() => navigation.navigate("Security")}
                    title="Account Security"
                    subTitle='Manage your app Security'
                    icon={SettingSvg}
                />

                <Menu
                    onPress={() => navigation.navigate('About')}
                    title="About Us"
                    subTitle='Privacy Policy, Terms of use and more'
                    icon={AboutSvg}
                /> 
                <Menu
                    onPress={sendEmail}
                    title="Feedback"
                    subTitle='Your feedback matters'
                    icon={FeedbackSvg}
                />
                <Menu
                    onPress={() => navigation.navigate('HelpNavigator')}
                    title="Help Center"
                    subTitle='Connect with us for help'
                    icon={HelpSvg}
                />
                <Menu
                    onPress={() => setDialogVisible(true)}
                    title="Logout"
                    icon={LogoutSvg}
                    iconColor={COLORS.RED}
                    textColor={COLORS.RED}
                />

                <Dialog
                    visible={dialogVisible}
                    onYes={logout}
                    onClose={() => setDialogVisible(false)}
                    message={'Do you really want to Logout?'}
                    positiveButton={'Logout'}
                />
            </View>
            <Modal visible={modalVisible} animationType='fade' transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={{ flexDirection: 'row', paddingBottom: responsiveHeight(1) }}>
                            <Text style={{ color: COLORS.SECONDARY, fontFamily: FONTS.SEMI_BOLD, fontSize: responsiveFontSize(2) }}>Set Currency</Text>
                            <CloseSvg color={COLORS.SECONDARY} onPress={() => setModalVisible(false)} size={26} style={{ marginStart: 'auto' }} />
                        </View>
                        <FlatList
                            data={currencyList}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        style={{
                                            width: '20%',
                                            alignSelf: 'center',
                                            height: 50,
                                            justifyContent: 'center',
                                            borderBottomWidth: 0.5,
                                            borderColor: COLORS.DESCRIPTION,
                                        }}
                                        onPress={() => {
                                            setModalVisible(false)
                                            saveCurrency(item)
                                        }}>
                                        <Text style={{ color: COLORS.DESCRIPTION, textAlign: 'center' }}>{item.label}</Text>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    modalContent: {
        maxHeight: 300,
        backgroundColor: COLORS.PRIMARY_LIGHT,
        padding: 20,
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    imageContainer: {
        borderRadius: 100,
        backgroundColor: COLORS.WHITE,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    editIcon: {
        padding: 3,
        borderRadius: 100,
        backgroundColor: COLORS.WHITE,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        position: 'absolute',
        bottom: 0, right: 0
    }
});