// import React, { useState } from 'react';
// import { ScrollView, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
// import { TextInput } from '../components';
// import { COLORS, FONTS } from '../constants';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Card } from 'react-native-paper';
// import { CustomText } from '../components/textInputs/text';
// import ProgressBar from 'react-native-progress/Bar';

// export const Experience = () => {
//     const [showDatePicker, setShowDatePicker] = useState(false);
//     const [startDate, setStartDate] = useState(null);
//     const [endDate, setEndDate] = useState(null);
//     const [dateType, setDateType] = useState(null);
//     const [experienceFields, setExperienceFields] = useState([
//         { job_title: '', company_name: '', location: '', date: [{ date: [new Date(), null] }], description: '' },
//     ]);
//     const [totalExperience, setTotalExperience] = useState({ years: 0, months: 0 });
      
    

//     const addExperienceField = () => {
//         setExperienceFields([...experienceFields, { job_title: '', company_name: '', location: '', date: ['', ''], description: '' }]);
//     };

//     const removeExperienceField = (index) => {
//         const newExperienceFields = [...experienceFields];
//         newExperienceFields.splice(index, 1);
//         setExperienceFields(newExperienceFields);
//     };

//     const updateExperienceField = (index, key, value) => {
//         const newExperienceFields = [...experienceFields];
//         newExperienceFields[index][key] = value;
//         setExperienceFields(newExperienceFields);
//     };

//     const handleDateChange = (index, startDate, endDate) => {
//         const newExperienceFields = [...experienceFields];
//         newExperienceFields[index].date = [startDate, endDate];
//         setExperienceFields(newExperienceFields);
//         calculateTotalExperience();
//     };

//     const calculateTotalExperience = () => {
//       let totalYears = 0;
//       let totalMonths = 0;

//       experienceFields.forEach((experience) => {
//           const startDate = new Date(experience.date[0]);
//           const endDate = experience.date[1] ? new Date(experience.date[1]) : new Date();

//           const diffTime = Math.abs(endDate - startDate);
//           const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30)); // Approximate months difference

//           totalYears += Math.floor(diffMonths / 12);
//           totalMonths += diffMonths % 12;
//       });

//       if (totalMonths >= 12) {
//           totalYears += Math.floor(totalMonths / 12);
//           totalMonths = totalMonths % 12;
//       }

//       setTotalExperience({ years: totalYears, months: totalMonths });
//   }

//     const handleInputChange = (dateType, selectedDate) => {
//         setShowDatePicker(false);
//         if (selectedDate) {
//             const formattedDate = UTCtoIST(selectedDate, 'MMMM D, YYYY');
//             if (dateType === 'start') {
//                 setStartDate(formattedDate);
//             } else if (dateType === 'end') {
//                 setEndDate(formattedDate);
//             }
//         }
//     };

//     const onChange = (event, selectedDate) => {
//         if (event.type === 'set') {
//             handleInputChange(dateType, selectedDate);
//         }
//     };

//     const showPicker = (type) => {
//         setDateType(type);
//         setShowDatePicker(true);
//     };

//     const UTCtoIST = (date, format) => {
//         // Replace with your custom date formatting logic
//         return date.toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata', ...format });
//     };

//     return (
//         <ScrollView contentContainerStyle={stylesex.container}>
//             <Text style={stylesex.heading}>Experience</Text>

//             {experienceFields.map((field, index) => (
//                 <Card key={index} style={stylesex.card} elevation={0}>
//                     <View style={stylesex.cardHeader}>
//                         <Text style={stylesex.cardTitle}>Experience {index + 1}</Text>
//                         <TouchableOpacity onPress={() => removeExperienceField(index)}>
//                             <Text style={stylesex.removeButtonText}>X</Text>
//                         </TouchableOpacity>
//                     </View>
//                     <CustomText>Job Title</CustomText>
//                     <TextInput
//                         label="Job Title"
//                         value={field.job_title}
//                         onChangeText={(text) => updateExperienceField(index, 'job_title', text)}
//                     />
//  <CustomText>Company Name</CustomText>
//                     <TextInput
//                         label="Company Name"
//                         value={field.company_name}
//                         onChangeText={(text) => updateExperienceField(index, 'company_name', text)}
//                     />
//                       <CustomText>Location</CustomText>
//                     <TextInput
//                         label="Location"
//                         value={field.location}
//                         onChangeText={(text) => updateExperienceField(index, 'location', text)}
//                     />

//                     <View style={stylesex.datePickerContainer}>
//                         <TouchableOpacity onPress={() => showPicker('start')} style={stylesex.dateButton}>
//                             <Text style={stylesex.dateButtonText}>{startDate ? startDate : 'Select Start Date'}</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={() => showPicker('end')} style={stylesex.dateButton}>
//                             <Text style={stylesex.dateButtonText}>{endDate ? endDate : 'Select End Date'}</Text>
//                         </TouchableOpacity>
//                     </View>
//                     {showDatePicker && (
//                         <DateTimePicker
//                             value={new Date()}
//                             mode="date"
//                             is24Hour={true}
//                             display="default"
//                             onChange={onChange}
//                         />
//                     )}
//  <CustomText>Description</CustomText>
//                     <TextInput
//                         label="Description"
//                         value={field.description}
//                         onChangeText={(text) => updateExperienceField(index, 'description', text)}
//                     />
//                 </Card>
//             ))}

//             <TouchableOpacity style={stylesex.addButton} onPress={addExperienceField}>
//                 <Text style={stylesex.addButtonText}>+ Add Experience</Text>
//             </TouchableOpacity>

//             <Text style={stylesex.totalExperience}>
//                 Total Experience: {totalExperience.years} years {totalExperience.months} months
//             </Text>
//             {/* Progress Bar Visualization */}  
//             <View style={stylesex.progressBarContainer}>  
//                 <ProgressBar   
//                     progress={Math.min(totalExperience.years + totalExperience.months / 12, 20) / 20} // Capping to max 20 years for the progress bar  
//                     width={null} // Full width of the container  
//                     height={10}  
//                     color='#000000' // Adjust color as needed  
//                 />  
//             </View> 
//         </ScrollView>
//     );
// };

// const stylesex = StyleSheet.create({
//     progressBarContainer: {  
//         marginTop: 20,  
//     },
//     container: {
//         // padding: 16,
//     },
//     heading: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 16,
//         color: COLORS.BLACK,
//     },
//     card: {
//         backgroundColor: COLORS.WHITE,
//         marginBottom: 16,
//         // padding: 16,
//         // borderRadius: 8,
//         // borderWidth: 1,
//         // borderColor: COLORS.BORDER_COLOR,
//     },
//     cardHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 12,
//     },
//     cardTitle: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         // color: COLORS.BLACK,
//     },
//     removeButtonText: {
//         color:'#000',
//         fontWeight: 'bold',
//     },
//     datePickerContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: 12,
//     },
//     dateButton: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 12,
//         borderRadius: 8,
//         borderWidth: 1,
//         borderColor: COLORS.BORDER_COLOR,
//     },
//     dateButtonText: {
//         color: COLORS.BLACK,
//         fontSize: 14,
//     },
//     addButton: {
//         backgroundColor: COLORS.PRIMARY,
//         padding: 16,
//         borderRadius: 8,
//         alignItems: 'center',
//         marginTop: 16,
//     },
//     addButtonText: {
//         color:'#000',
//         fontWeight: 'bold',
//         marginLeft:'auto',
//     },
//     totalExperience: {
//         marginTop: 16,
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: COLORS.BLACK,
//     },
// });

// export default Experience;



import React, { useState, useEffect } from 'react';
import { ScrollView, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { TextInput } from '../components';
import { COLORS, FONTS } from '../constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Card } from 'react-native-paper';
import { CustomText } from '../components/textInputs/text';
import ProgressBar from 'react-native-progress/Bar';

export const Experience = () => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [dateType, setDateType] = useState(null);
    const [experienceFields, setExperienceFields] = useState([
        { job_title: '', company_name: '', location: '', start_date: null, end_date: null, description: '' },
    ]);
    const [totalExperience, setTotalExperience] = useState({ years: 0, months: 0 });

    useEffect(() => {
        calculateTotalExperience();
    }, [experienceFields]);

    const addExperienceField = () => {
        setExperienceFields([...experienceFields, { job_title: '', company_name: '', location: '', start_date: null, end_date: null, description: '' }]);
    };

    const removeExperienceField = (index) => {
        const newExperienceFields = [...experienceFields];
        newExperienceFields.splice(index, 1);
        setExperienceFields(newExperienceFields);
    };

    const updateExperienceField = (index, key, value) => {
        const newExperienceFields = [...experienceFields];
        newExperienceFields[index][key] = value;
        setExperienceFields(newExperienceFields);
    };

    const calculateTotalExperience = () => {
        let totalMonths = 0;

        experienceFields.forEach((experience) => {
            if (experience.start_date && experience.end_date) {
                const start = new Date(experience.start_date);
                const end = new Date(experience.end_date);
                const diffTime = Math.abs(end - start);
                const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44)); // More accurate average month length
                totalMonths += diffMonths;
            }
        });

        const years = Math.floor(totalMonths / 12);
        const months = totalMonths % 12;

        setTotalExperience({ years, months });
    };

    const handleDateChange = (index, date, type) => {
        const newExperienceFields = [...experienceFields];
        newExperienceFields[index][type] = date.toISOString().split('T')[0]; // Store date as 'YYYY-MM-DD'
        setExperienceFields(newExperienceFields);
    };

    const showPicker = (index, type) => {
        setDateType({ index, type });
        setShowDatePicker(true);
    };

    const onChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate && dateType) {
            handleDateChange(dateType.index, selectedDate, dateType.type);
        }
    };

    return (
        <ScrollView contentContainerStyle={stylesex.container}>
            <Text style={stylesex.heading}>Experience</Text>

            {experienceFields.map((field, index) => (
                <Card key={index} style={stylesex.card} elevation={0}>
                    <View style={stylesex.cardHeader}>
                        <Text style={stylesex.cardTitle}>Experience {index + 1}</Text>
                        <TouchableOpacity onPress={() => removeExperienceField(index)}>
                            <Text style={stylesex.removeButtonText}>X</Text>
                        </TouchableOpacity>
                    </View>
                    <CustomText>Job Title</CustomText>
                    <TextInput
                        label="Job Title"
                        value={field.job_title}
                        onChangeText={(text) => updateExperienceField(index, 'job_title', text)}
                    />
                    <CustomText>Company Name</CustomText>
                    <TextInput
                        label="Company Name"
                        value={field.company_name}
                        onChangeText={(text) => updateExperienceField(index, 'company_name', text)}
                    />
                    <CustomText>Location</CustomText>
                    <TextInput
                        label="Location"
                        value={field.location}
                        onChangeText={(text) => updateExperienceField(index, 'location', text)}
                    />

                    <View style={stylesex.datePickerContainer}>
                        <TouchableOpacity onPress={() => showPicker(index, 'start_date')} style={stylesex.dateButton}>
                            <Text style={stylesex.dateButtonText}>{field.start_date ? field.start_date : 'Select Start Date'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => showPicker(index, 'end_date')} style={stylesex.dateButton}>
                            <Text style={stylesex.dateButtonText}>{field.end_date ? field.end_date : 'Select End Date'}</Text>
                        </TouchableOpacity>
                    </View>
                    {showDatePicker && (
                        <DateTimePicker
                            value={new Date()}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )}
                    <CustomText>Description</CustomText>
                    <TextInput
                        label="Description"
                        value={field.description}
                        onChangeText={(text) => updateExperienceField(index, 'description', text)}
                    />
                </Card>
            ))}

            <TouchableOpacity style={stylesex.addButton} onPress={addExperienceField}>
                <Text style={stylesex.addButtonText}>+ Add Experience</Text>
            </TouchableOpacity>

            <Text style={stylesex.totalExperience}>
                Total Experience: {totalExperience.years} years {totalExperience.months} months
            </Text>
            <View style={stylesex.progressBarContainer}>  
                <ProgressBar   
                    progress={Math.min(totalExperience.years + totalExperience.months / 12, 20) / 20}
                    width={null}
                    height={10}  
                    color='#000000'
                />  
            </View> 
        </ScrollView>
    );
};

 const stylesex = StyleSheet.create({
    progressBarContainer: {  
        marginTop: 20,  
    },
    container: {
        // padding: 16,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: COLORS.BLACK,
    },
    card: {
        backgroundColor: COLORS.WHITE,
        marginBottom: 16,
        // padding: 16,
        // borderRadius: 8,
        // borderWidth: 1,
        // borderColor: COLORS.BORDER_COLOR,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        // color: COLORS.BLACK,
    },
    removeButtonText: {
        color:'#000',
        fontWeight: 'bold',
    },
    datePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    dateButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.BORDER_COLOR,
    },
    dateButtonText: {
        color: COLORS.BLACK,
        fontSize: 14,
    },
    addButton: {
        backgroundColor: COLORS.PRIMARY,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    addButtonText: {
        color:'#000',
        fontWeight: 'bold',
        marginLeft:'auto',
    },
    totalExperience: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.BLACK,
    },
});


export default Experience;

