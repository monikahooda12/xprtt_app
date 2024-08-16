import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { TextInput, SelectList, Button, errorToast, ScreenLoading, screenLoading, showLoader, hideLoader } from "../components";
import { storeLocalData, getLocalData, UTCtoIST, isEmailValid } from "../utils";
import { API, COLORS, FONTS, LOCAL_DB } from "../constants";
import { httpRequest } from '../api/http';
import DateTimePicker from '@react-native-community/datetimepicker';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { CustomText } from "../components/textInputs/text";

export const Welcome = ({ route, navigation }) => {

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);

  const { isUpdate } = route.params ? route.params : false;
  const [user, setUser] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const gender = [
    { id: '1', value: 'Male' },
    { id: '2', value: 'Female' },
  ];

  useEffect(() => {
    screenLoading(true)
    const timeout = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  const fetchData = async () => {
    try {
      const user = await getLocalData(LOCAL_DB.USER);
      setUser(user);
      if (user.dob) {
        const formattedDateOfBirth = UTCtoIST(user.dob, "MMMM D, YYYY");
        formattedDateOfBirth && setDateOfBirth(formattedDateOfBirth);
        console.log(formattedDateOfBirth)
      }
      screenLoading(false)
    } catch (error) {
      screenLoading(false)
    }
  };

  const onChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (event.type === 'set') {
      handleInputChange('dob', selectedDate)
      const formattedDateOfBirth = UTCtoIST(selectedDate, 'MMMM D, YYYY')
      setDateOfBirth(formattedDateOfBirth);
    }
  };

  const handleInputChange = (key, value) => {
    setUser(prevData => ({ ...prevData, [key]: value }));
  };

  const callAPI = async () => {

    // if (!user.name) return errorToast('Name is required!');
    if (!isEmailValid(user.email)) return errorToast('Please enter valid email');
    if (!user.gender) return errorToast('Please Select Gender');
    // if (!user.dob) return errorToast('Please enter Date of Birth');
    if (!user.locality) return errorToast('Address is required!');
    if (!user.address) return errorToast('Area/Sector is required!');
    if (!user.city) return errorToast('City name is required!');
    if (!user.state) return errorToast('State name is required!');
    if (!user.pincode) return errorToast('Pincode is required!');
    if (!user.country) return errorToast('Country name is required!');


    showLoader()

    const params = {
      name: user.name,
      email: user.email,
      gender: user.gender,
      // dob: user.dob,
      locality: user.locality,
      address: user.address,
      city: user.city,
      state: user.state,
      pincode: user.pincode,
      country: user.country,
    }

    try {
      const response = await httpRequest({ method: "PUT", url: API.UPDATE_PERSONAL_PROFILE, params, alert: true });
      await storeLocalData(LOCAL_DB.USER, response.data)
      hideLoader()
      navigation.replace('DashboardNavigator')
    } catch (error) {
      hideLoader()
    }
  };

  return (

    <View style={{ flex: 1, backgroundColor: COLORS.PRIMARY }}>
      <ScreenLoading />

      <ScrollView keyboardShouldPersistTaps='handled' style={{ paddingHorizontal: responsiveWidth(1.3) }}>

        {!isUpdate &&
          <View style={{ marginHorizontal: 5, marginBottom: 10 }}>
            <Text style={styles.title}>Profile</Text>
            <Text style={styles.subTitle}>let's setup your account</Text>
          </View>
        }
           <CustomText>Full Name</CustomText>
        <TextInput  value={user.name} onChangeText={text => handleInputChange('name', text)} />
        <CustomText>Mobile</CustomText>
        <TextInput label="Mobile" disabled={true} value={user.mobile} />
        <CustomText>Email</CustomText>
        <TextInput label="Email" value={user.email} onChangeText={text => handleInputChange('email', text)} />

        {/* <View style={styles.container}> */}
        <CustomText>Gender</CustomText>
        <SelectList 
  label='Gender' 
  value={user.gender && user.gender} 
  list={gender} 
  searchEnabled={false} 
  getValue={text => handleInputChange('gender', text)}
  boxStyles={{
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderRadius:8,
    borderBottomColor: COLORS.PRIMARY_LIGHTER,
  }}

/>
{/* <CustomText>DOB</CustomText>
          <TextInput style={{ flex: 1 }} label='DOB' value={dateOfBirth ? dateOfBirth : null} onPress={() => setShowDatePicker(true)} />
          {showDatePicker && (
            <DateTimePicker
              themeVariant="dark"
              value={maxDate}
              mode='date'
              onChange={onChange}
              maximumDate={maxDate}
            />
          )} */}
        {/* </View> */}
        <CustomText>Flate/house.no</CustomText>
        <TextInput label="Flat/House No./Building/Apartment" value={user.locality} onChangeText={text => handleInputChange('locality', text)} />
        <CustomText>Area/Sector</CustomText>
        <TextInput label="Area/Sector" value={user.address} onChangeText={text => handleInputChange('address', text)} />

        {/* <View style={styles.container}> */}
        <CustomText>City</CustomText>
          <TextInput style={{ flex: 1 }} label="City" value={user.city} onChangeText={text => handleInputChange('city', text)} />
          <CustomText>State</CustomText>
          <TextInput style={{ flex: 1 }} label="State" value={user.state} onChangeText={text => handleInputChange('state', text)} />
        {/* </View> */}

        {/* <View style={styles.container}> */}
        <CustomText>Pincode</CustomText>
          <TextInput keyboardType='numeric' style={{ flex: 1 }} label="Pincode" value={user.pincode && user.pincode.toString()} onChangeText={text => handleInputChange('pincode', text)} />
          <CustomText>Country</CustomText>
          <TextInput style={{ flex: 1 }} label="Country" value={user.country} onChangeText={text => handleInputChange('country', text)} />
        {/* </View> */}
      </ScrollView>

      <Button display="bottom" style={{ borderRadius: 8 }} name="Update" onPress={callAPI} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    marginTop: responsiveHeight(1),
    fontFamily: FONTS.BOLD,
    fontSize: responsiveFontSize(3),
   color:'#000000'
    // color: COLORS.SECONDARY,
  },
  subTitle: {
    marginTop: responsiveHeight(2),
    fontFamily: FONTS.REGULAR,
    fontSize: responsiveFontSize(2),
     color: COLORS.DESCRIPTION,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft:6,
  },
});