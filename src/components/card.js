




// import React from 'react';
// import { View, Text, TextInput, TouchableOpacity, Image, FlatList, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
// import { COLORS, FONTS } from '../constants';
// import { commonStyles } from '../theme/Styles';
// import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import { Responsive } from '../theme/Layout';
// import { useNavigation } from '@react-navigation/native';

// const { width, height } = Dimensions.get('window');

// const SearchBar = ({ onFilterPress }) => (
//   <View style={styles.searchBar}>
//     <TouchableOpacity onPress={onFilterPress} style={styles.filterButton}>
//       <Image
//         source={require('../assets/icons/filter.png')}
//         style={styles.filterIcon}
//       />
//     </TouchableOpacity>
//   </View>
// );



// // const SearchBar = ({ placeholder, onSearch ,onFilterPress}) => (
// //   <View style={styles.searchBar}>


// // <TouchableOpacity style={styles.searchIcon}>
// // <Image
// //          source={require('../assets/icons/Icon.png')}
// //          style={{ marginTop:3,marginLeft:10,height:20}}
// //           />
// //       {/* <Text>🔍</Text> */}

// //     </TouchableOpacity>

// //     <TextInput 
// //       style={styles.searchInput}
// //        placeholder={placeholder}
// //        onChangeText={onSearch}
// //     />
// //     <TouchableOpacity onPress={onFilterPress}>
// //    <Image
// //          source={require('../assets/icons/filter.png')}
// //          style={{padding:9 ,marginTop:15,marginRight:20}}
// //           />

// // </TouchableOpacity>

// //   </View>
// // );



// //////////////////////find data filter.............................
// // export const findItemWithParents = (data, itemName) => {
// //   console.log('Data:', data);
// //   console.log('Item Name:', itemName);

// //   const findItem = (items, itemName, parents = []) => {
// //     console.log('Items:', items);
// //     for (const item of items) {
// //       console.log('Current Item:', item);
// //       if (item.name === itemName) {
// //         return { item, parents };
// //       }
// //       // Check if item.child exists and is an array before accessing its length
// //       if (item.child && Array.isArray(item.child) && item.child.length > 0) {
// //         const result = findItem(item.child, itemName, [...parents, item.name]);
// //         if (result) {
// //           return result;
// //         }
// //       }
// //     }
// //     return null;
// //   };

// //   for (let i = 0; i < data.length; i++) {
// //     const parent = data[i];
// //     const result = findItem([parent], itemName);
// //     if (result) {
// //       return { ...result, mainParentIndex: i };
// //     }
// //   }
// //   return null;
// // };

// // const Card = ({ icon, title, onPress }) => (
// //   <>
// //    <TouchableOpacity style={{backgroundColor:"red"}} onPress={onPress}>
// //     <View style={{backgroundColor:}}>
// //     <Image source={icon} style={styles.cardIcon} />
// //     <Text style={[commonStyles,{color:COLORS.BLACK}]} numberOfLines={2}>{title}</Text>

// //     </View>

// //      </TouchableOpacity>
// //     </>

// // );




// const Card = (({ title, icon }) => {

//   return (
//     <View style={{ flex: 1,alignItems:"center" }}>
//       <View style={{ flex: 1, marginVertical: 10, }}>
//         <Image source={icon} style={styles.cardIcon} />
//         <Text style={[commonStyles, { color: COLORS.BLACK,fontWeight:"500",fontSize:11,lineHeight:15,alignItems:"center" }]} numberOfLines={2}>{title}</Text>


//       </View> 
//     </View>  
//   )
// })

// const CardGrid = ({ items, onCardPress }) => (
//   <FlatList
//     data={items}
//     renderItem={({ item }) => (
//       <Card
//         icon={item.icon}
//         title={item.title}
//         onPress={() => onCardPress(item)}
//       />
//     )}
//     keyExtractor={(item, index) => index.toString()}
//     numColumns={3}
//     columnWrapperStyle={styles.cardGridRow}
//   />
// );
//  const CommonLayout = ({ title, previousTitle, children, onTitlePress }) => {
//   const navigation = useNavigation();
//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.container}>
//         <View style={styles.headerContainer}>
//           <View style={styles.tit}>
//             <TouchableOpacity onPress={() => navigation.navigate('Parentcategories')}>
//               <Text style={styles.title}>All Categories {`>`}</Text>
//             </TouchableOpacity>

//             <TouchableOpacity onPress={onTitlePress}>
//               <Text style={styles.title} ellipsizeMode="tail">
//                 {previousTitle ? ` ${previousTitle} > ${title}` : title}</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//         {children}
//       </View>
//     </SafeAreaView>
//   );
// };


// const CategorySection = ({ title, searchPlaceholder, isSearchbarHide, categories, onSearch, onCardPress, onFilterPress }) => (
//   <View style={styles.categorySection}>

//     <Text style={styles.sectionTitle}>{title}</Text>
//     {!isSearchbarHide &&
//       <SearchBar placeholder={searchPlaceholder} onSearch={onSearch} onFilterPress={onFilterPress} />}
//     <CardGrid items={categories} onCardPress={onCardPress} />
//   </View>
// );

// const styles = StyleSheet.create({
//   searchBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//     borderRadius: 28,
//     paddingHorizontal: 10,
//     height: 50,
//     marginBottom: 20,

//     justifyContent: 'flex-start',
//   },
//   filterButton: {
//     // To provide some space around the filter icon if needed
//     padding: 335,
//   },

//   filterIcon: {

//     paddingLeft: 0,
//     height: 14,


//   },
//   card: {
//     alignItems: 'center',
//     // width: (width - 60) / 3, // Adjust based on your layout needs
//     // marginHorizontal: responsiveWidth(10),
//     // marginVertical: 10,

//   },
//   cardIcon: {
//     width: 108,
//     height: 108,
//     borderRadius: 10,
//     marginBottom: 5,
//   },
//   cardTitle: {
//     fontFamily: FONTS.REGULAR,
//     fontSize: responsiveFontSize(2),
//     textAlign: 'center',
//     color: 'black',
//     paddingHorizontal: 5,

//   },
//   cardGridRow: {
//     // justifyContent: 'space-around',
//     flex:1,
//     justifyContent:"center",
//     alignItems:"center"
//   },
//   categorySection: {
//     padding: 10,
//   },
//   tit: {
//     fontSize: 20,
//     display: 'flex',
//     flexDirection: 'row',
//     fontWeight: 'bold',
//     // marginBottom: 10,
//     numberOfLines: 1,

//   },


//   safeArea: {
//     flex: 1,
//     backgroundColor: COLORS.PRIMARY,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.PRIMARY,
//   },
//   headerContainer: {


//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//     // paddingHorizontal:-3,
//   },
//   title: {
//     fontFamily: FONTS.ROBOTO_BLACK,
//     fontSize: responsiveFontSize(2),
//     paddingHorizontal: 5,
//     fontWeight: 'bold',
//     color: COLORS.TEXT,


//   },
// })

// export { SearchBar, Card, CardGrid, CategorySection, CommonLayout };
















import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { COLORS, FONTS } from '../constants';
import { commonStyles } from '../theme/Styles';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Responsive } from '../theme/Layout';
import { useNavigation } from '@react-navigation/native';
 const { width,height } = Dimensions.get('window');
 const SearchBar = ({ onFilterPress }) => (
  <View style={styles.searchBar}>
 <TouchableOpacity onPress={onFilterPress} style={styles.filterButton}>
      <Image
        source={require('../assets/icons/filter.png')}
        style={styles.filterIcon}
      />
    </TouchableOpacity>
  </View>
);
  

const Card = ({ icon, title, onPress }) => (
  <>
   <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.card}>
    <Image source={icon} style={styles.cardIcon} />
    </View>
    
    <Text style={[commonStyles,{color:COLORS.BLACK}]} numberOfLines={2}>{title}</Text>
     </TouchableOpacity>
    </>
  
);
const CardGrid = ({ items, onCardPress }) => (
  <FlatList
    data={items}
    renderItem={({ item }) => (
      <Card 
        icon={item.icon} 
         title={item.title} 
        onPress={() => onCardPress(item)}
      />
    )}
    keyExtractor={(item, index) => index.toString()}
    numColumns={3}
    columnWrapperStyle={styles.cardGridRow}
  />
);
const CommonLayout = ({ title, previousTitle, children, onTitlePress }) => {
    const navigation = useNavigation();
     return (
       <SafeAreaView style={styles.safeArea}>
         <View style={styles.container}>
           <View style={styles.headerContainer}>
             <View style={styles.tit}>
               <TouchableOpacity onPress={() => navigation.goBack()}>
                 <Text style={styles.title}>All Categories {`>`}</Text>
               </TouchableOpacity>
  
               <TouchableOpacity onPress={onTitlePress}>
                 <Text style={styles.title} ellipsizeMode="tail">
                   {previousTitle ? ` ${previousTitle} > ${title}` : title}</Text>
               </TouchableOpacity>
             </View>
           </View>
           {children}
         </View>
       </SafeAreaView>
     );
   };
const CategorySection = ({ title, searchPlaceholder, isSearchbarHide, categories, onSearch, onCardPress, onFilterPress }) => (
     <View style={styles.categorySection}>
  
       <Text style={styles.sectionTitle}>{title}</Text>
       {!isSearchbarHide &&
         <SearchBar placeholder={searchPlaceholder} onSearch={onSearch} onFilterPress={onFilterPress} />}
       <CardGrid items={categories} onCardPress={onCardPress} />
     </View>
   );
const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 28,
    paddingHorizontal: 10,
    height: 50,
    // marginTop:20,
    marginBottom: 20,

     justifyContent: 'flex-start',
  },
  filterButton: {
    // To provide some space around the filter icon if needed
    padding: 335,
  },

  filterIcon: {

    paddingLeft: 0,
    height: 14,


  },
  card: {
    alignItems: 'center',
    // width: (width - 60) / 3, // Adjust based on your layout needs
    // marginHorizontal: responsiveWidth(10),
    // marginVertical: 10,

  },
  cardIcon: {
    width: 108,
    height: 108,
    borderRadius: 10,
    marginBottom: 5,
  },
  cardTitle: {
    fontFamily: FONTS.REGULAR,
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
    color: 'black',
    paddingHorizontal: 5,

  },
  cardGridRow: {
    // justifyContent: 'space-around',
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  categorySection: {
    padding: 10,
  },
  tit: {
    fontSize: 20,
    display: 'flex',
    flexDirection: 'row',
    fontWeight: 'bold',
    // marginBottom: 10,
    numberOfLines: 1,

  },


  safeArea: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
  },
  headerContainer: {


    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    // paddingHorizontal:-3,
  },
  title: {
    fontFamily: FONTS.ROBOTO_BLACK,
    fontSize: responsiveFontSize(2),
    paddingHorizontal: 5,
    fontWeight: 'bold',
    color: COLORS.TEXT,


  },





  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 28,
    paddingHorizontal: 10,
    height: 50,
    marginBottom: 20,
    
    justifyContent: 'flex-start',
  },
  filterButton: {
    // To provide some space around the filter icon if needed
      padding:335,
  },
  
  filterIcon: {
   
    paddingLeft:0,
    height: 14,
    
  },
  card: {
    alignItems: 'center',
    width: width / 3 - 20, // Adjust based on your layout needs
      marginHorizontal: responsiveWidth(10),
     marginVertical: 10,
  },
  cardIcon: {
    width: 112,
    height: 112,
    borderRadius: 10,
    marginBottom: 5,
  },
  cardTitle: {
    fontFamily:FONTS.REGULAR,
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
    color: 'black',
     paddingHorizontal: 5,
    
  },
  cardGridRow: {
    justifyContent: 'space-around',
  },
  categorySection: {
    padding: 10,
  },
    sectionTitle: {
       fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    safeArea: {
      flex: 1,
      backgroundColor: COLORS.PRIMARY,
    },
    container: {
      flex: 1,
      backgroundColor: COLORS.PRIMARY,
    },
    headerContainer: {
      backgroundColor: COLORS.PRIMARY,
      paddingVertical: height * 0.02,
      paddingHorizontal: width * 0.04,
    },
    title: {
       fontFamily:FONTS.ROBOTO_BLACK,
      fontSize: width * 0.06,
      fontWeight: 'bold',
      color: COLORS.TEXT,
      textAlign: 'center',
    },
  });
  
  export { SearchBar, Card, CardGrid, CategorySection,CommonLayout };