import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { FONTS } from '../constants';

const { width } = Dimensions.get('window');
const services = [
  { title: 'Graphic & Design', image: require('../assets/icons/Rect.png') },
  { title: 'Programming & Tech', image: require('../assets/icons/Rect.png') },
  { title: 'Video $ Animation', image: require('../assets/icons/Rect.png') },
  { title: 'Writing & Translation', image: require('../assets/icons/Rect.png') },
  { title: 'Video & Animations', image: require('../assets/icons/Rect.png') },
  { title: 'Digital Marketing', image: require('../assets/icons/Rect.png') },
];

const Iconhome = () => {
  return (
    <View style={styles.container}>
      {services.map((service, index) => (
        <View key={index} style={styles.serviceContainer}>
          <TouchableOpacity style={styles.card}>
            <Image source={service.image} style={styles.image} />
          </TouchableOpacity>
          <Text style={styles.title}>{service.title}</Text>
        </View>
      ))}



<View>
<View style={{width:321,backgroundColor:'##D0D0D0',height:1,alignSelf:'center',marginBottom:10}}/>

<Text style={styles.sectionTitle}>Graphices & Design</Text>
            <View style={styles.sectionHeader}>
         <Text style={{ fontWeight: 'bold',marginStart:-8}} >we provide best service</Text>
         
         <Text style={styles.viewAllText}>view all (12)</Text>
         </View>
</View>

    </View>

 

  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -35,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 17,
  },
  serviceContainer: {
    alignItems: 'center', // Center title text under the card
    marginBottom: 20, // Space between grid items
    width: (width - 75) / 3, // Adjust width based on screen size
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
     elevation: 1,
    alignItems: 'center',
    padding: 10,
     borderColor: '#E8E8E8',
  },
  image: {
    width: 90,
    height: 60,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10, // Space between the card and the title text
  },
  sectionHeader: {
    flex:1,
     flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  sectionTitle: {
    fontSize: 23,
     fontWeight: 'bold',
    color: '#000000',
    marginBottom: -16,
     marginLeft:5,
//  fontFamily: FONTS.SEMI_BOLD,
 fontFamily:FONTS.ROBOTO_BLACK
  },
  viewAllText: {
     color: '#333',
      marginLeft:134,
    marginRight:-15
  },
      line: {
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 1,
        marginVertical: 10,
      },
});

export default Iconhome;








// import React from 'react';
// import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

// const Iconhome = () => {
//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity>
//           <Image source={require('../assets/icons/logo.png')} style={styles.icon} />
//         </TouchableOpacity>
//         <Text style={styles.title}>Home</Text>
//         <TouchableOpacity>
//           <Image source={require('../assets/icons/logo.png')} style={styles.icon} />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.searchBar}>
//         <TextInput 
//           placeholder="Search here..."
//           style={styles.searchInput}
//         />
//       </View>

//       {/* <View style={styles.specialDeal}>
//         <Image source={require('../assets/icons/logo.png')} style={styles.dealImage} />
//         <Text style={styles.dealText}>Special Deal For October</Text>
//         <TouchableOpacity style={styles.dealButton}>
//           <Text>Become an Xpert</Text>
//         </TouchableOpacity>
//       </View> */}

//       <View style={styles.servicesGrid}>
//         {/* Repeat this for each service */}
//         <View style={styles.serviceItem}>
//           <Image source={require('../assets/icons/logo.png')} style={styles.serviceIcon} />
//           <Text style={styles.serviceText}>Logo & Brand Identity</Text>
//         </View>
//         {/* ... other service items ... */}
//       </View>
// {/* 
//       <View style={styles.sectionHeader}>
//         <Text style={styles.sectionTitle}>Services We Provide</Text>
//         <TouchableOpacity>
//           <Text style={styles.viewAllText}>view all (12)</Text>
//         </TouchableOpacity>
//       </View> */}

//       {/* <View style={styles.bottomNav}>
//         <TouchableOpacity style={styles.navItem}>
//           <Image source={require('../assets/icons/logo.png')} style={styles.navIcon} />
//           <Text>Home</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navItem}>
//           <Image source={require('../assets/icons/logo.png')} style={styles.navIcon} />
//           <Text>Experts</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navItem}>
//           <Image source={require('../assets/icons/logo.png')} style={styles.navIcon} />
//           <Text>Profile</Text>
//         </TouchableOpacity>
//       </View> */}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 15,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   icon: {
//     width: 24,
//     height: 24,
//   },
//   searchBar: {
//     margin: 15,
//   },
//   searchInput: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 25,
//     padding: 10,
//   },
//   specialDeal: {
//     margin: 15,
//     backgroundColor: '#3f51b5',
//     borderRadius: 10,
//     padding: 20,
//   },
//   dealImage: {
//     width: '100%',
//     height: 150,
//     resizeMode: 'contain',
//   },
//   dealText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginVertical: 10,
//   },
//   dealButton: {
//     backgroundColor: '#fff',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   servicesGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     padding: 15,
//   },
//   serviceItem: {
//     width: '30%',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   serviceIcon: {
//     width: 50,
//     height: 50,
//     marginBottom: 5,
//   },
//   serviceText: {
//     textAlign: 'center',
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 15,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   viewAllText: {
//     color: '#3f51b5',
//   },
//   bottomNav: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     borderTopWidth: 1,
//     borderTopColor: '#ddd',
//     paddingVertical: 10,
//   },
//   navItem: {
//     alignItems: 'center',
//   },
//   navIcon: {
//     width: 24,
//     height: 24,
//     marginBottom: 5,
//   },
// });

// export default Iconhome;