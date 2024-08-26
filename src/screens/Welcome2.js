import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View, Text, FlatList} from 'react-native';
import {
  TextInput,
  SelectList,
  Button,
  errorToast,
  ScreenLoading,
  screenLoading,
  showLoader,
  hideLoader,
} from '../components';
import {storeLocalData, getLocalData, UTCtoIST, isEmailValid} from '../utils';
import {API, COLORS, FONTS, LOCAL_DB} from '../constants';
import {httpRequest} from '../api/http';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {CustomText} from '../components/textInputs/text';
import Skill from '../professinol/Skill';
import Availability from '../professinol/Availability';
import { Language } from '../professinol/Language';
import { Education } from '../professinol/Education';
import { Portfolio } from '../professinol/Portfolio';
import Experience from '../professinol/Expercience';

export const Welcome2 = ({route, navigation}) => {
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);

  const {isUpdate} = route.params ? route.params : false;
  const [user, setUser] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const gender = [
    {id: '1', value: 'Male'},
    {id: '2', value: 'Female'},
  ];

  useEffect(() => {
    screenLoading(true);
    const timeout = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  const fetchData = async () => {
    try {
      const user = await getLocalData(LOCAL_DB.USER);
      setUser(user);
      console.log('user', user);
      if (user.dob) {
        const formattedDateOfBirth = UTCtoIST(user.dob, 'MMMM D, YYYY');
        formattedDateOfBirth && setDateOfBirth(formattedDateOfBirth);
        console.log(formattedDateOfBirth);
      }
      screenLoading(false);
    } catch (error) {
      screenLoading(false);
    }
  };

  const onChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (event.type === 'set') {
      handleInputChange('dob', selectedDate);
      const formattedDateOfBirth = UTCtoIST(selectedDate, 'MMMM D, YYYY');
      setDateOfBirth(formattedDateOfBirth);
    }
  };

  const handleInputChange = (key, value) => {
    setUser(prevData => ({...prevData, [key]: value}));
  };

  // const handleSubmit = async (values) => {
  //   //(values, "---------values in handlkesubmit---"02);
  //   try {
  //     const response = await httpRequest({
  //       method: "PUT",
  //       url: API.PROFILE_PROFESSIONAL,
  //       params: values,
  //     });

  //     //check for response
  //     // if (
  //     //   response.data.job_title &&
  //     //   response.data.job_title !== "" &&
  //     //   response.data.website &&
  //     //   response.data.website !== "" &&
  //     //   response.data.bio &&
  //     //   response.data.bio !== "" &&
  //     //   response.data.experience.length > 0 &&
  //     //   response.data.experience[0].location != ""
  //     // ) {
  //     //   setProgress((prev: any) => ({
  //     //     ...prev,
  //     //     Professional: 25,
  //     //   }));
  //     // }

  //     setPutValueData((prev) => ({
  //       ...prev,
  //       job_title: response.data.job_title,
  //       availability: response.data.availability,
  //       total_experience: response.data.total_experience,
  //       education: response.data.education,
  //       portfolio: response.data.portfolio,
  //       experience: response.data.experience,
  //       skill: response.data.skill,
  //       language: response.data.language,
  //       website: response.data.website,
  //     }));
  //     fetchuserData();
  //   } catch (error) {
  //     console.error("Form submission failed:", error);
  //   }

  //   // form.resetFields();
  // };

  const callAPI = async () => {
    // if (!user.name) return errorToast('Name is required!');
    // if (!isEmailValid(user.email)) return errorToast('Please enter valid email');
    // if (!user.gender) return errorToast('Please Select Gender');
    //  if (!user.dob) return errorToast('Please enter Date of Birth');
    // if (!user.locality) return errorToast('Address is required!');
    // if (!user.address) return errorToast('Area/Sector is required!');
    // if (!user.city) return errorToast('City name is required!');
    // if (!user.state) return errorToast('State name is required!');
    // if (!user.pincode) return errorToast('Pincode is required!');
    // if (!user.country) return errorToast('Country name is required!');
    //  if (!user.skill) return errorToast('skill  is required!');
    // if (!user.jobtitle) return errorToast('jobtitle name is required!');
    // if (!user.website) return errorToast('website name is required!');
    // if (!user.availability) return errorToast('Availabilty name is required!');
    // if (!user.bio) return errorToast('Bio name is required!');
    // if (!user.occupation) return errorToast('Occuption name is required!');
    // if (!user.portfolio) return errorToast('Portfolio name is required!');

    showLoader();

    const params = {
      // name: user.name,
      // email: user.email,
      // gender: user.gender,
      // dob: user.dob,
      // locality: user.locality,
      // address: user.address,
      // city: user.city,
      // state: user.state,
      // pincode: user.pincode,
      // country: user.country,
      skill: user.skill,
      job_title: user.jobtitle,
      website: user.website,
      availability: user.availability,
      bio: user.bio,
      //occupation: user.occupation,
      language: user.language,
      education: user.education,
      portfolio: user.portfolio,
    };
    // const [skill,setskill] = usestate(user.skill.)
    console.log("params", params)
    try {
      const response = await httpRequest({
        method: 'PUT',
        url: API.PROFILE_PROFESSIONAL,
        params,
        alert: true,
      });
      await storeLocalData(LOCAL_DB.USER, response.data);
      hideLoader();
      //navigation.replace('DashboardNavigator');
    } catch (error) {
      hideLoader();
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.PRIMARY}}>
  <ScreenLoading />
 
  {/* Replace ScrollView with a FlatList */}
  <FlatList
    data={[{key: 'form'}]}  // Placeholder data for rendering the form
    renderItem={() => (
      <View style={{paddingHorizontal: responsiveWidth(1.3)}}>
        {!isUpdate && (
          <View style={{marginHorizontal: 5, marginBottom: 10}}>
            <Text style={styles.subTitle}></Text>
          </View>
        )}

        <CustomText>Job Title</CustomText>
        <TextInput
          label="Job title"
          value={user.jobtitle}
          onChangeText={text => handleInputChange('jobtitle', text)}
        />
        <CustomText>web site</CustomText>
        <TextInput
          label="web site"
          value={user.website}
          onChangeText={text => handleInputChange('website', text)}
        />
        <TextInput
          label="Web site"
          value={user.website}
          onChangeText={text => handleInputChange('website', text)}
        />
        {/* <TextInput
          label="Availability"
          value={user.availability}
          onChangeText={text => handleInputChange('availability', text)}
        /> */}
        <CustomText>Bio</CustomText>
        <TextInput
          label="Bio"
          value={user.bio}
          onChangeText={text => handleInputChange('bio', text)}
        />
        <CustomText>Occupation</CustomText>
        {/* <TextInput
          label="Occupation"
          value={user.occupation}
          onChangeText={text => handleInputChange('occupation', text)}
        /> */}

        <Skill />
        <Availability />
        <Language />
        <Education />
        <Portfolio />
        <Experience />
        {/* <Experience /> */}
      </View>
    )}
    keyExtractor={(_, index) => index.toString()}
    ListFooterComponent={
      <Button
        display="bottom"
        style={{borderRadius: 0}}
        name="Update"
        onPress={callAPI}
      />
    }
    keyboardShouldPersistTaps="handled"
  />
</View>

  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    marginTop: responsiveHeight(1),
    fontFamily: FONTS.BOLD,
    fontSize: responsiveFontSize(3),
    color: COLORS.SECONDARY,
  },
  subTitle: {
    marginTop: responsiveHeight(2),
    fontFamily: FONTS.REGULAR,
    fontSize: responsiveFontSize(2),
    color: COLORS.DESCRIPTION,
  },
});





// import React, { useState, useEffect } from "react";
// import { ScrollView, StyleSheet, View, Text } from "react-native";
// import { TextInput, SelectList, Button, errorToast, ScreenLoading, screenLoading, showLoader, hideLoader } from "../components";
// import { storeLocalData, getLocalData, UTCtoIST, isEmailValid } from "../utils";
// import { API, COLORS, FONTS, LOCAL_DB } from "../constants";
// import { httpRequest } from '../api/http';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
// import Availability from "../skill/Availability";
// import { Skill } from "../skill/Skill";
// import { Language } from "../skill/Language";
// import { Education } from "../skill/Education";
// import { Portfolio } from "../skill/Portfolio";
// import { Experience } from "../skill/Expercience";
// import { CustomText } from "../components/textInputs/text";



// export const Welcome2 = ({ route, navigation }) => {

//   const maxDate = new Date();
//   maxDate.setFullYear(maxDate.getFullYear() - 18);

//   const { isUpdate } = route.params ? route.params : false;
//   const [user, setUser] = useState({});
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [dateOfBirth, setDateOfBirth] = useState(null);
//   const gender = [
//     { id: '1', value: 'Male' },
//     { id: '2', value: 'Female' },
//   ];

//   useEffect(() => {
//      screenLoading(true)
//      const timeout = setTimeout(() => {
//         fetchData();
//     }, 500);
//     return () => clearTimeout(timeout);
//   }, []);

//   const fetchData = async () => {
//     try {
//       const user = await getLocalData(LOCAL_DB.USER);
//        setUser(user);
//        console.log("user",user)
//        if (user.dob) {
//          const formattedDateOfBirth = UTCtoIST(user.dob, "MMMM D, YYYY");
//          formattedDateOfBirth && setDateOfBirth(formattedDateOfBirth);
//          console.log(formattedDateOfBirth)
//        }
//       screenLoading(false)
//     } catch (error) {
//       screenLoading(false)
//     }
//   };

//   const onChange = (event, selectedDate) => {
//     setShowDatePicker(false);
//     if (event.type === 'set') {
//       handleInputChange('dob', selectedDate)
//       const formattedDateOfBirth = UTCtoIST(selectedDate, 'MMMM D, YYYY')
//       setDateOfBirth(formattedDateOfBirth);
//     }
//   };

//   const handleInputChange = (key, value) => {
//     setUser(prevData => ({ ...prevData, [key]: value }));
//   };

// ////71 se116 line deko ise krna h ye ///////ok

//   // const handleSubmit = async (values) => {
//   //   //(values, "---------values in handlkesubmit---"02);
//   //   try {
//   //     const response = await httpRequest({
//   //       method: "PUT",
//   //       url: API.PROFILE_PROFESSIONAL,
//   //       params: values,
//   //     });

//   //     //check for response
//   //     // if (
//   //     //   response.data.job_title &&
//   //     //   response.data.job_title !== "" &&
//   //     //   response.data.website &&
//   //     //   response.data.website !== "" &&
//   //     //   response.data.bio &&
//   //     //   response.data.bio !== "" &&
//   //     //   response.data.experience.length > 0 &&
//   //     //   response.data.experience[0].location != ""
//   //     // ) {
//   //     //   setProgress((prev: any) => ({
//   //     //     ...prev,
//   //     //     Professional: 25,
//   //     //   }));
//   //     // }

//   //     setPutValueData((prev) => ({
//   //       ...prev,
//   //       job_title: response.data.job_title,
//   //       availability: response.data.availability,
//   //       total_experience: response.data.total_experience,
//   //       education: response.data.education,
//   //       portfolio: response.data.portfolio,
//   //       experience: response.data.experience,
//   //       skill: response.data.skill,
//   //       language: response.data.language,
//   //       website: response.data.website,
//   //     }));
//   //     fetchuserData();
//   //   } catch (error) {
//   //     console.error("Form submission failed:", error);
//   //   }

//   //   // form.resetFields();
//   // };

//   const callAPI = async () => {

//     // if (!user.name) return errorToast('Name is required!');
//     // if (!isEmailValid(user.email)) return errorToast('Please enter valid email');
//     // if (!user.gender) return errorToast('Please Select Gender');
//     //  if (!user.dob) return errorToast('Please enter Date of Birth');
//     // if (!user.locality) return errorToast('Address is required!');
//     // if (!user.address) return errorToast('Area/Sector is required!');
//     // if (!user.city) return errorToast('City name is required!');
//     // if (!user.state) return errorToast('State name is required!');
//     // if (!user.pincode) return errorToast('Pincode is required!');
//     // if (!user.country) return errorToast('Country name is required!');
//     //  if (!user.skill) return errorToast('skill  is required!');
//     // if (!user.jobtitle) return errorToast('jobtitle name is required!');
//     // if (!user.website) return errorToast('website name is required!');
//     // if (!user.availability) return errorToast('Availabilty name is required!');
//     // if (!user.bio) return errorToast('Bio name is required!');
//     // if (!user.occupation) return errorToast('Occuption name is required!');
//     // if (!user.portfolio) return errorToast('Portfolio name is required!');
    

//     showLoader()

//     const params = {
//       // name: user.name,
//       // email: user.email,
//       // gender: user.gender,
//       // dob: user.dob,
//       // locality: user.locality,
//       // address: user.address,
//       // city: user.city,
//       // state: user.state,
//       // pincode: user.pincode,
//       // country: user.country,
//        skill:user.skill,
//       jobtitle:user.jobtitle,
//       website:user.website,
//       availability :user.availability,
//       bio:user.bio, 
//       occupation:user.occupation,
//       language:user.language,
//       education:user.education,
//        portfolio:user.portfolio,
      
//     }
//     // const [skill,setskill] = usestate(user.skill.)ek baar insta pe aao
  
//     try {
//       const response = await httpRequest({ method: "PUT", url: API.PROFILE_PROFESSIONAL, params, alert: true });
//       await storeLocalData(LOCAL_DB.USER, response.data)
//       hideLoader()
//       navigation.replace('DashboardNavigator')
//     } catch (error) {
//       hideLoader()
//     }
//   };
 
//   return (

//     <View style={{ flex: 1, backgroundColor: COLORS.PRIMARY }}>
//       <ScreenLoading />

//       <ScrollView keyboardShouldPersistTaps='handled' style={{ paddingHorizontal: responsiveWidth(1.3) }}>

//         {!isUpdate &&
//           <View style={{ marginHorizontal: 5, marginBottom: 10 }}>
//             {/* <Text style={styles.title}></Text> */}
//             <Text style={styles.subTitle}></Text>
//           </View>
//         }

       
        

// <CustomText>Job Title</CustomText>
// <TextInput label="Job title" value={user.jobtitle} onChangeText={text => handleInputChange('jobtitle', text)} />
// <CustomText>web site</CustomText>
// <TextInput label="web site" value={user.website} onChangeText={text => handleInputChange('website', text)} />
// <TextInput label="Web site" value={user.website} onChangeText={text => handleInputChange('website', text)} />   
//  <TextInput label="Availability" value={user.availability} onChangeText={text => handleInputChange('availability', text)} /> 
//  <CustomText>Bio</CustomText> 
//  <TextInput label="Bio" value={user.bio} onChangeText={text => handleInputChange('bio', text)} /> 
//  <CustomText>Occupation</CustomText> 
//  <TextInput label="Occupation" value={user.occupation} onChangeText={text => handleInputChange('occupation', text)} />   

// <View>

//  <Skill/> 
// <Availability/>

// <Language/> 
//  <Education/> 
// <Portfolio/> 
// <Experience/>
// <Experience/>
// </View>


  


//       </ScrollView>

//       <Button display="bottom" style={{ borderRadius: 0 }} name="Update" onPress={callAPI} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-between'
//   },
//   title: {
//     marginTop: responsiveHeight(1),
//     fontFamily: FONTS.BOLD,
//     fontSize: responsiveFontSize(3),
//     color: COLORS.SECONDARY,
//   },
//   subTitle: {
//     marginTop: responsiveHeight(2),
//     fontFamily: FONTS.REGULAR,
//     fontSize: responsiveFontSize(2),
//     color: COLORS.DESCRIPTION,
//   },
// });


