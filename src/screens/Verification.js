import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import { Button, Loader, ScreenLoading, errorToast, hideLoader, screenLoading, showLoader } from '../components';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { API, COLORS, FONTS, LOCAL_DB } from '../constants';
import { ProgressBar } from 'react-native-paper';
import { CameraSvg, CloseSvg, GallerySvg, IdentitySvg, PhotoSvg } from '../assets/icons/svg';
import ImagePicker from 'react-native-image-crop-picker';
import { androidCameraPermission, blobToBase64, getLocalData, storeLocalData } from '../utils';
import { httpRequest } from '../api/http';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';

export const Verification = ({ navigation }) => {

    const [type, setType] = useState('');
    const [authUser, setAuthUser] = useState({});
    const [imagePath, setImagePath] = useState({ kyc_self_image: '', kyc_doc_front: '', kyc_doc_back: '' });
    const [step, setStep] = useState(1);
    const [buttonName, setButtonName] = useState('Next');
    const [progress, setProgress] = useState(0.5);
    const { width } = useWindowDimensions();
    const scrollViewRef = useRef(null);

    const bottomSheetRef = useRef(null);

    useEffect(() => {
        screenLoading(true)
        const fetchData = async () => {
            const authUser = await getLocalData(LOCAL_DB.USER);
            setAuthUser(authUser)

            setImagePath({
                kyc_self_image: authUser.kyc_self_image,
                kyc_doc_front: authUser.kyc_doc_front,
                kyc_doc_back: authUser.kyc_doc_back
            })
            screenLoading(false)
        };
        fetchData()
    }, []);

    const handleClick = (type) => {
        setType(type)
        checkPermission()
    }

    const handleButtonClick = () => {
        if (buttonName === 'Next' && imagePath.kyc_self_image) {
            setProgress(1)
            setStep(2)
            setButtonName('Finish')
            if (scrollViewRef.current) {
                scrollViewRef.current.scrollTo({ x: width, animated: true });
            }
        } else if (buttonName === 'Finish' && imagePath.kyc_doc_front && imagePath.kyc_doc_back) {
            callAPI()
        } else {
            errorToast('Photo not uploaded.')
        }
    }

    const callAPI = async () => {

        showLoader();

        const params = {
            kyc_status: 'SUBMITTED',
            name: authUser.name,
            email: authUser.email,
            gender: authUser.gender,
            dob: authUser.dob,
            locality: authUser.locality,
            address: authUser.address,
            city: authUser.city,
            state: authUser.state,
            pincode: authUser.pincode,
            country: authUser.country,
        };
        try {
            const response = await httpRequest({ method: "PUT", url: API.UPDATE_PERSONAL_PROFILE, params });
            await storeLocalData(LOCAL_DB.USER, response.data)
            navigation.navigate('KycStatus')
            hideLoader();
        } catch (error) {
            hideLoader();
        }
    };

    const checkPermission = async () => {
        const permissionStatus = Platform.OS == 'android' && await androidCameraPermission();
        if (permissionStatus || Platform.OS == 'ios') {
            bottomSheetRef.current?.present()
        }
    };

    const selectImage = async (option) => {
        bottomSheetRef.current?.close()
        try {
            let width = 600, height = type === 'kyc_self_image' ? 600 : 400;
            const image = await (option == 'camera'
                ? ImagePicker.openCamera({ cropping: false })
                : ImagePicker.openPicker({ cropping: false }));

            const compressedImage = await ImagePicker.openCropper({
                width,
                height,
                path: image.path,
            });

            uploadImage(compressedImage.path)
        } catch (error) {
            console.error(error);
        }
    };

    const uploadImage = async (path) => {
        try {
            showLoader();

            const imageBlob = await (await fetch(path)).blob();
            const finalImage = await blobToBase64(imageBlob);
            const params = { [type]: finalImage, file_name: 'image.png' };

            await httpRequest({ method: 'PUT', url: API.PROFILE_IMAGE_UPLOAD, params });

            setImagePath((prevImagePaths) => ({
                ...prevImagePaths,
                [type]: path,
            }));

        } catch (error) {
            console.log('error:', error)
        } finally {
            hideLoader();
        }
    };


    const PhotoItem = () => {
        return (
            <View style={{ width: width - responsiveWidth(7.6) }}>
                <Text style={{ marginTop: 20, color: COLORS.SECONDARY, fontSize: 20, fontFamily: FONTS.REGULAR }}>
                    Self Photo
                </Text>
                <Text style={{ color: COLORS.WHITE, marginTop: 20 }}>
                    Upload your clear front facing photo.
                </Text>
                <View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center', height: 250, width: 250 }}>
                    {imagePath?.kyc_self_image
                        ? <Image resizeMode='contain' source={{ uri: imagePath?.kyc_self_image }} style={{ borderRadius: 20, width: 200, height: 200 }} />
                        : <PhotoSvg opacity={0.4} size={250} color={COLORS.DESCRIPTION} />
                    }
                </View>

                <Button onPress={() => handleClick('kyc_self_image')} name='Upload Photo' containerStyle={{ alignItems: 'center' }} />
            </View>
        )
    }

    const IdentityItem = () => {
        return (
            <View style={{ width: width - responsiveWidth(7.6) }}>
                <Text style={{ marginTop: 20, color: COLORS.SECONDARY, fontSize: 20, fontFamily: FONTS.REGULAR }}>
                    Identity Proof
                </Text>
                <Text style={{ color: COLORS.WHITE, marginTop: 20 }}>
                    Upload one of the National Identity Proof - Aadhar Card/ Pan Card/ Passport/ Driving Licence etc.
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 150, marginTop: 10 }}>
                    {imagePath['kyc_doc_front']
                        ? <Image resizeMode='stretch' source={{ uri: imagePath['kyc_doc_front'] }} style={{ borderRadius: 10, width: 200, height: 120 }} />
                        : <IdentitySvg opacity={0.4} size={200} color={COLORS.DESCRIPTION} />
                    }
                    <Button onPress={() => handleClick('kyc_doc_front')} name='Upload Front' containerStyle={{ alignItems: 'center' }} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 150 }}>
                    {imagePath['kyc_doc_back']
                        ? <Image resizeMode='stretch' source={{ uri: imagePath['kyc_doc_back'] }} style={{ borderRadius: 10, width: 200, height: 120 }} />
                        : <IdentitySvg opacity={0.4} size={200} color={COLORS.DESCRIPTION} />
                    }

                    <Button onPress={() => handleClick('kyc_doc_back')} name='Upload Back' containerStyle={{ alignItems: 'center' }} />
                </View>


            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.PRIMARY, paddingHorizontal: responsiveWidth(3.8) }}>
            <ScreenLoading />
            {/* <Loader /> */}
            <Text style={{ color: COLORS.WHITE, textAlign: 'center' }}>{step} of 2 Steps</Text>
            <ProgressBar style={{ marginTop: 10 }} progress={progress} color={COLORS.SECONDARY} />
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false} // Disable manual scrolling
            >
                <PhotoItem />
                <IdentityItem />
            </ScrollView>

            <Button 
                display='bottom'
                onPress={handleButtonClick}
                name={buttonName} />

            <BottomSheetModal
                enableOverDrag={false}
                index={0}
                animateOnMount={true}
                handleIndicatorStyle={{ backgroundColor: COLORS.DESCRIPTION }}
                backgroundStyle={{ backgroundColor: COLORS.PRIMARY_LIGHT }}
                backdropComponent={(props) => (<BottomSheetBackdrop
                    {...props}
                    disappearsOnIndex={-1}
                    appearsOnIndex={0} />
                )}
                ref={bottomSheetRef}
                snapPoints={['25%']}
                enablePanDownToClose>
                <View style={{ paddingVertical: 20, flexDirection: 'row', alignItems: 'center', paddingHorizontal: responsiveWidth(3.8) }}>
                    <Text style={{ color: COLORS.WHITE, fontFamily: FONTS.BOLD, fontSize: responsiveFontSize(2.5), alignSelf: 'center' }}>
                        Select Image
                    </Text>

                    <TouchableOpacity activeOpacity={0.8} style={{ marginStart: 'auto' }} onPress={() => bottomSheetRef.current?.close()} >
                        <CloseSvg size={24} color={COLORS.WHITE} />
                    </TouchableOpacity>

                </View>

                <TouchableOpacity activeOpacity={0.8} onPress={() => selectImage('gallery')} style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center', paddingHorizontal: responsiveWidth(3.8) }}>
                    <GallerySvg color={COLORS.WHITE} />
                    <Text style={{ marginStart: 15, color: COLORS.WHITE, fontFamily: FONTS.MEDIUM, fontSize: responsiveFontSize(2) }}>
                        Upload From Gallery
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.8} onPress={() => selectImage('camera')} style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', paddingHorizontal: responsiveWidth(3.8) }}>
                    <CameraSvg color={COLORS.WHITE} />
                    <Text style={{ marginStart: 15, color: COLORS.WHITE, fontFamily: FONTS.MEDIUM, fontSize: responsiveFontSize(2) }}>
                        Click Camera Picture
                    </Text>
                </TouchableOpacity>
            </BottomSheetModal>
        </View>
    );
};