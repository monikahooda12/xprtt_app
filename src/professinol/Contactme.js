import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "../components";
import { useState } from "react";
import { API } from "../constants";
import { httpRequest } from "../api/http";

 const Contactme = ()=>{
  const [loading, setLoading] = useState(false);
   const [formData, setFormData] = useState({
     name: '',
     email: '',
     mobile: '',
     message: '',
  })


  // Function to handle input changes
  const handleInputChange = (name, value) => {
     setFormData({ ...formData, [name]: value });
   };


 // Function to handle form submission
   const handleContact = async () => {
     const { name, email, mobile, message } = formData;

     if (!name || !email || !message) {
       Alert.alert("Error", "Please fill in all required fields.");
       return;
     }

     try {
       setLoading(true);
       await httpRequest({
         method: 'POST',
         url: API.CONTACT,
         params: {
           name,
           email,
           mobile,
           message,
           type: 'QUERRY',
         },
       });
       setLoading(false);
       Alert.alert("Success", "Your message has been sent.");
     } catch (error) {
       setLoading(false);
       console.error("Error sending message:", error);
       Alert.alert("Error", "Failed to send your message.");
     }
   };






  return(
    <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.heading}>Booking Form</Text>
          
           <View style={styles.inputContainer}>
             <Text style={styles.label}>Full Name</Text>
             <TextInput
               label="Full Name"
               value={formData.name}
               onChangeText={(value) => handleInputChange('name', value)}
               placeholder="Example Doe"
             />
           </View>
    
           <View style={styles.inputContainer}>
             <Text style={styles.label}>Email Address</Text>
             <TextInput
               label="Email Address"
               value={formData.email}
               onChangeText={(value) => handleInputChange('email', value)}
               placeholder="example@example.com"
               keyboardType="email-address"
             />
           </View>
    
           <View style={styles.inputContainer}>
             <Text style={styles.label}>Mobile Number</Text>
             <TextInput
               label="Mobile Number"
               value={formData.mobile}
              onChangeText={(value) => handleInputChange('mobile', value)}
               placeholder="Enter your mobile number"
               keyboardType="phone-pad"
             />
           </View>
    
           <View style={styles.inputContainer}>
             <Text style={styles.label}>Message</Text>
             <TextInput
               label="Message"
               value={formData.message}
               onChangeText={(value) => handleInputChange('message', value)}
               placeholder="Write your message"
               multiline
               numberOfLines={6}
               style={styles.textarea}
             />
           </View>
    
          <Button
             mode="contained"
              onPress={handleContact}
             loading={loading}
             disabled={loading}
             style={styles.button}
           >
            
             {loading ? "Sending..." : "Send Message"}
           </Button>
         </ScrollView>
  )
 }
 export default Contactme;




// import React, { useState } from 'react';
// import { Text, View, StyleSheet, Alert, ScrollView } from 'react-native';
// import { Button } from 'react-native-paper'; // Button from react-native-paper
// import { TextInput } from '../components'; // Common TextInput component
// import { httpRequest } from '../api/hello/httpRequest'; // HTTP request function
// import { API } from '../constants'; // API constants

// const Contactme = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     mobile: '',
//     message: '',
//   });
//   const [loading, setLoading] = useState(false);

//   // Function to handle input changes
//   const handleInputChange = (name, value) => {
//     setFormData({ ...formData, [name]: value });
//   };

//   // Function to handle form submission
//   const handleContact = async () => {
//     const { name, email, mobile, message } = formData;

//     if (!name || !email || !message) {
//       Alert.alert("Error", "Please fill in all required fields.");
//       return;
//     }

//     try {
//       setLoading(true);
//       await httpRequest({
//         method: 'POST',
//         url: API.CONTACT,
//         params: {
//           name,
//           email,
//           mobile,
//           message,
//           type: 'QUERRY',
//         },
//       });
//       setLoading(false);
//       Alert.alert("Success", "Your message has been sent.");
//     } catch (error) {
//       setLoading(false);
//       console.error("Error sending message:", error);
//       Alert.alert("Error", "Failed to send your message.");
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.heading}>Contact</Text>
      
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Full Name</Text>
//         <TextInput
//           label="Full Name"
//           value={formData.name}
//           onChangeText={(value) => handleInputChange('name', value)}
//           placeholder="Example Doe"
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Email Address</Text>
//         <TextInput
//           label="Email Address"
//           value={formData.email}
//           onChangeText={(value) => handleInputChange('email', value)}
//           placeholder="example@example.com"
//           keyboardType="email-address"
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Mobile Number</Text>
//         <TextInput
//           label="Mobile Number"
//           value={formData.mobile}
//           onChangeText={(value) => handleInputChange('mobile', value)}
//           placeholder="Enter your mobile number"
//           keyboardType="phone-pad"
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Message</Text>
//         <TextInput
//           label="Message"
//           value={formData.message}
//           onChangeText={(value) => handleInputChange('message', value)}
//           placeholder="Write your message"
//           multiline
//           numberOfLines={6}
//           style={styles.textarea}
//         />
//       </View>

//       <Button
//         mode="contained"
//         onPress={handleContact}
//         loading={loading}
//         disabled={loading}
//         style={styles.button}
//       >
//         {loading ? "Sending..." : "Send Message"}
//       </Button>
//     </ScrollView>
//   );
// };

// // Styles for the Contact component
 const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  textarea: {
    height: 120,
  },
  button: {
    marginTop: 16,
  },
});

// export default Contactme;
