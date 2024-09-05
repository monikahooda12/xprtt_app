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

export const Account2 = ({ navigation }) => {

    const [user, setUser] = useState({});
    const [support, setSupport] = useState([])
    const [currencyLabel, setCurrencyLabel] = useState('$ (USD)');
    const [modalVisible, setModalVisible] = useState(false);
    const [imageUpdated, setImageUpdated] = useState();
    const [dialogVisible, setDialogVisible] = useState(false);

  
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
            cover_image: base64String,
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

   

   

   
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: COLORS.PRIMARY }}>
            <View style={{ paddingHorizontal: responsiveWidth(3.8) }}>

                <View style={{ marginTop: 20, marginBottom: 20, flexDirection: 'row' }}>

                    <View>
                        <TouchableOpacity activeOpacity={0.7} onPress={selectImage}>
                            <View style={{ ...styles.imageContainer, overflow: 'hidden' }}>
                                <Image
                                    source={user.profile_image ? { uri: user.profile_image } : ICONS.AVATAR}
                                    style={{ height: 160, width: 160, resizeMode: 'contain' }}
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
                        
                        </Text>
                    </View>
                </View>

                <View style={{ ...CommonStyles.horizontalLine }} />

               

            

             

            </View>
           
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