import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, FlatList, } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from '../components/textInputs/textInput';
import CheckBox from '@react-native-community/checkbox'; // You may need to install this package
import { Button } from './buttons/button';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { COLORS } from '../constants';
import { Card } from 'react-native-paper';
import Datepicker from 'react-native-datepicker'



 




 export const JobTitle = ({ user, handleInputChange }) => {
    return (
        <View>
            <TextInput label="Job Title" value={user.job} onChangeText={text => handleInputChange('job', text)} />
        </View>
    );
};

 { JobTitle };


 export  const  Bio =({})=>{
  const [user, setUser] = useState({});
  const handleInputChange = (key, value) => {
    setUser(prevData => ({ ...prevData, [key]: value }));
};
  return(
    <View>
    
    {/* <TextInput
      // style={styles.bioInput}
      maxLength={50}
      multiline
      numberOfLines={2}
      placeholder="Enter your bio"
    /> */}
     <TextInput label="Bio" value={user.bio} onChangeText={text => handleInputChange('bio', text)} placeholder="enter yor bio" />
  </View>
  )}
  const stylebio = StyleSheet.create({
    bioContainer: {
      marginTop: 20,
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 5,
    },
    bioLabel: {
      fontSize: 18,
      marginBottom: 10,
    },
    bioInput: {
      borderColor: 'gray',
      borderWidth: 1,
      padding: 8,
      borderRadius: 5,
      textAlignVertical: 'top',
    },
  })
{Bio}


export const Skill = () => {
    const [user, setUser] = useState({});
    const handleInputChange = (key, value) => {
        setUser(prevData => ({ ...prevData, [key]: value }));
    };
    return (
        <View>
            <TextInput label="Skill" value={user.skill} onChangeText={text => handleInputChange('skill', text)} />
            <TextInput label="Skill 2" value={user.skill2} onChangeText={text => handleInputChange('skill2', text)} />
        </View>
    );
};

  {Skill};



export const Availability = () => {
    const [selectedDays, setSelectedDays] = useState({
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    });
  
    return (
      <View style={style.container}>
        <Text style={style.heading}>Availability</Text>
        <View style={style.divider} />
  
        {Object.entries(selectedDays).map(([day, isOpen]) => (
          <View key={day} style={style.row}>
            <Text style={style.day}>{day.charAt(0).toUpperCase() + day.slice(1)}</Text>
            <View style={style.checkboxContainer}>
              <CheckBox
                value={isOpen}
                onValueChange={(isChecked) => {
                  setSelectedDays((prevSelectedDays) => ({
                    ...prevSelectedDays,
                    [day]: isChecked,
                  }));
                }}
              />
              <Text style={style.checkboxLabel}>
                {isOpen ? "Available" : "Unavailable"}
              </Text>
            </View>
          </View>
        ))}
  
        {/* <View style={styless.bioContainer}>
          <Text style={styless.bioLabel}>Bio</Text>
          <TextInput
            style={styles.bioInput}
            maxLength={50}
            multiline
            numberOfLines={2}
            placeholder="Enter your bio"
          /> */}
        {/* </View> */}
      </View>
    );
  };
  
  const style = StyleSheet.create({
    container: {
      padding: 20,
    },
    heading: {
      fontSize: 15,
      fontWeight: 'bold',
      // backgroundColor:'white'
      color:'white',
    },
    divider: {
      width: '20%',
      height: 2,
      // backgroundColor: 'whites',
      marginVertical: 10,
      
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    day: {
      flex: 1,
      fontSize: 18,
      color:'white'
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
     
    },
    checkboxLabel: {
      marginLeft: 8,
       color:'#FFFFFF'
    },
   
  });
  
  export default Availability;
  
  
   {Availability}



   export const Language = () => {
    const [user, setUser] = useState({});
    const handleInputChange = (key, value) => {
        setUser(prevData => ({ ...prevData, [key]: value }));
    };
    return (
        <View>
            <Text style={style.heading}>Language</Text>
            <TextInput label="language" value={user.language} onChangeText={text => handleInputChange('language', text)} />
            <TextInput label="skill" value={user.language} onChangeText={text => handleInputChange('skill', text)} />
        </View>
    );
};

  {Language};


//   export const Education = () => {
//     const [user, setUser] = useState({});
//     const handleInputChange = (key, value) => {
//         setUser(prevData => ({ ...prevData, [key]: value }));
//     };
//     return (
//         <View>
//             <Text style={style.heading}>Education</Text>
//             <TextInput label="Degree" value={user.language} onChangeText={text => handleInputChange('language', text)} />
//             <TextInput label="University" value={user.language} onChangeText={text => handleInputChange('university', text)} />
//             <TextInput label="Field of study" value={user.language} onChangeText={text => handleInputChange('study', text)} />
//             <TextInput label="Passing of the year" value={user.language} onChangeText={text => handleInputChange('passing year', text)} />
//         </View>
//     );
// };

//   {Education};

  

export const Education = () => {
  const [educationFields, setEducationFields] = useState([{ degree: '', university: '', subjects: '', passing_year: '' }]);

  const addEducationField = () => {
    setEducationFields([...educationFields, { degree: '', university: '', subjects: '', passing_year: '' }]);
  };

  const removeEducationField = (index) => {
    const newEducationFields = [...educationFields];
    newEducationFields.splice(index, 1);
    setEducationFields(newEducationFields);
  };

  const updateEducationField = (index, key, value) => {
    const newEducationFields = [...educationFields];
    newEducationFields[index][key] = value;
    setEducationFields(newEducationFields);
  };

  return (
    <ScrollView>
    <Text style={styles.heading}>Education</Text>
    {/* <View style={styles.divider} /> */}
    {educationFields.map((field, index) => (
      <View key={index} style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Education {index + 1}</Text>
          {/* <FontAwesome name="close" size={24} color="black" onPress={() => removeEducationField(index)} /> */}
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Degree Name"
            // style={styles.input}
            value={field.degree}
            onChangeText={(text) => updateEducationField(index, 'degree', text)}
          />
          <TextInput
            placeholder="School/University"
            // style={styles.input}
            value={field.university}
            onChangeText={(text) => updateEducationField(index, 'university', text)}
          />
          <TextInput
            placeholder="Field of study/Subjects"
            // style={styles.input}
            value={field.subjects}
            onChangeText={(text) => updateEducationField(index, 'subjects', text)}
          />
          <TextInput
            placeholder="Passing Year"
            // style={styles.input}
            value={field.passing_year}
            onChangeText={(text) => updateEducationField(index, 'passing_year', text)}
          />
        </View>
      </View>
    ))}
     <TouchableOpacity style={styles.addButton} onPress={addEducationField}>
        <Text style={styles.addButtonText}>+ Add More Education</Text>
      </TouchableOpacity>
  </ScrollView>
);
};


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // padding: 16,
  },
  heading: {
    fontSize: 15,
    fontWeight: 'bold',
    color:'white',
  },
  divider: {
    width: '20%',
    height: 2,
    backgroundColor: 'gray',
    marginVertical: 8,
  },
  card: {
    borderRadius: 8,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    color:'white',
  },
  cardTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color:'white',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  addButton: {
    marginTop: 16,
    borderColor: 'rgba(227,236,255,0.5)',
    backgroundColor: 'rgba(227,236,255,0.5)',
  },
  addButtonText:{
textAlign:'center',
color:'#FFFFFF'
  }
});

{ Education}


// //////////////////////////////////////////////////////////////////////////(portfolio)

 

  export const Portfolio = () => {
  const [portfolioFields, setPortfolioFields] = useState([
    { id: Date.now(), link: '', portfolio_title: '', details: '', description: '', image: null }
  ]);

  const addPortfolioField = () => {
    setPortfolioFields([...portfolioFields, { id: Date.now(), link: '', portfolio_title: '', details: '', description: '', image: null }]);
  };

  const removePortfolioField = (id) => {
    setPortfolioFields(portfolioFields.filter(field => field.id !== id));
  };

  const updatePortfolioField = (id, key, value) => {
    setPortfolioFields(portfolioFields.map(field => 
      field.id === id ? { ...field, [key]: value } : field
    ));
  };

  const pickImage = async (id) => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
      },
      (response) => {
        if (response.assets && response.assets.length > 0) {
          const imageUri = response.assets[0].uri;
          updatePortfolioField(id, 'image', imageUri);
        }
      }
    );
  };

  const renderPortfolioItem = ({ item, index }) => (
    <View key={item.id} style={stylepro.card}>
      <View style={stylepro.cardHeader}>
        <Text style={stylepro.cardTitle}>Portfolio {index + 1}</Text>
        <TouchableOpacity onPress={() => removePortfolioField(item.id)}>
          <Text style={styles.removeButton}>X</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          // style={styles.input}
          placeholder="Online link of portfolio"
          value={item.link}
          onChangeText={(text) => updatePortfolioField(item.id, 'link', text)}
        />
        <TextInput
          // style={styles.input}
          placeholder="Title"
          value={item.portfolio_title}
          onChangeText={(text) => updatePortfolioField(item.id, 'portfolio_title', text)}
        />
        <TextInput
          // style={styles.input}
          placeholder="Project Details"
          value={item.details}
          onChangeText={(text) => updatePortfolioField(item.id, 'details', text)}
        />
        <TextInput
          // style={styles.input}
          placeholder="Description"
          value={item.description}
          onChangeText={(text) => updatePortfolioField(item.id, 'description', text)}
        />
        <TouchableOpacity style={styles.uploadButton} onPress={() => pickImage(item.id)}>
          <Text style={stylepro.uploadButtonText}>Click to upload image</Text>
        </TouchableOpacity>
        {item.image && (
          <Image source={{ uri: item.image }} style={styles.image} />
        )}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={stylepro.container}
    >
      <Text style={stylepro.heading}>Portfolio</Text>
      {/* <View style={stylepro.divider} /> */}
      <FlatList
        data={portfolioFields}
        renderItem={renderPortfolioItem}
        keyExtractor={item => item.id.toString()}
      />
      <TouchableOpacity >
        {/* <Text>+ Add More Portfolio</Text> */}
        <Button display="bottom" style={{ borderRadius: 0 }} name="+more Portfolio" onPress={addPortfolioField} />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

 { Portfolio}

const stylepro = StyleSheet.create({
  container: {
    flex:1,
    // paddingHorizontal: responsiveWidth(4),
    // backgroundColor: COLORS.PRIMARY,
    
    

  },
  heading: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 16,
    color:'white',
  },
 
  card: {
    //  backgroundColor: '#FFFFFF',
    // borderRadius: 8,
     padding: 16,
    // marginBottom: 16,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'#FFFFFF'
  },
  removeButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  inputContainer: {
    flexDirection: 'column',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  uploadButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 16,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

{Portfolio}



/////////////////////////////////////////////////{expercience}






export const Experience = () => {
  const [experienceFields, setExperienceFields] = useState([
    { job_title: '', company_name: '', location: '', date: ['', ''], description: '' }
  ]);
  const [totalExperience, setTotalExperience] = useState({ years: 0, months: 0 });

  const addExperienceField = () => {
    setExperienceFields([...experienceFields, { job_title: '', company_name: '', location: '', date: ['', ''], description: '' }]);
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

  const handleDateChange = (index, startDate, endDate) => {
    const newExperienceFields = [...experienceFields];
    newExperienceFields[index].date = [startDate, endDate];
    setExperienceFields(newExperienceFields);
    calculateTotalExperience();
  };

  const calculateTotalExperience = () => {
    // Add your logic to calculate total experience here
    // Set the calculated values to setTotalExperience
  };

  return (
    <ScrollView contentContainerStyle={stylesex.container}>
      <Text style={stylesex.heading}>Experience</Text>
      <View style={stylesex.line} />

      {experienceFields.map((field, index) => (
        <Card key={index} style={stylesex.card}>
          <View style={stylesex.cardHeader}>
            <Text style={stylesex.cardTitle}>Experience {index + 1}</Text>
            <TouchableOpacity onPress={() => removeExperienceField(index)}>
              {/* <FontAwesome name="close" size={24} color="black" /> */}
            </TouchableOpacity>
          </View>

          <TextInput
            placeholder="Job Title"
            value={field.job_title}
            onChangeText={(text) => updateExperienceField(index, 'job_title', text)}
             style={styles.input}
          />
          <TextInput
            placeholder="Company Name"
            value={field.company_name}
            onChangeText={(text) => updateExperienceField(index, 'company_name', text)}
             style={styles.input}
          />
          <TextInput
            placeholder="Location"
            value={field.location}
            onChangeText={(text) => updateExperienceField(index, 'location', text)}
             style={styles.input}
          />

          <View style={stylesex.datePickerContainer}>
            <Datepicker
              style={stylesex.datePicker}
              date={field.date[0]}
              mode="date"
              placeholder="Start Date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={(date) => handleDateChange(index, date, field.date[1])}
            />
            <Date
            Picker
              style={stylesex.datePicker}
              date={field.date[1]}
              mode="date"
              placeholder="End Date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={(date) => handleDateChange(index, field.date[0], date)}
            />
          </View>

          <TextInput
            placeholder="Description"
            value={field.description}
            onChangeText={(text) => updateExperienceField(index, 'description', text)}
            // style={stylesex.input}
          />
        </Card>
      ))}

      <Button type="dashed" style={stylesex.addButton} onPress={addExperienceField}>
        + Add More Experience
      </Button>

      <Text>Total Experience: {totalExperience.years} years {totalExperience.months} months</Text>
    </ScrollView>
  );
};

const stylesex = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  line: {
    width: 56,
    height: 2,
    backgroundColor: '#000',
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 16,
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  datePicker: {
    width: '48%',
  },
  addButton: {
    backgroundColor: 'rgba(227,236,255,0.5)',
    borderColor: 'transparent',
  },
});

 Experience;







   
 