




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



// const SearchBar = ({ placeholder, onSearch ,onFilterPress}) => (
//   <View style={styles.searchBar}>


// <TouchableOpacity style={styles.searchIcon}>
// <Image
//          source={require('../assets/icons/Icon.png')}
//          style={{ marginTop:3,marginLeft:10,height:20}}
//           />
//       {/* <Text>🔍</Text> */}
      
//     </TouchableOpacity>
   
//     <TextInput 
//       style={styles.searchInput}
//        placeholder={placeholder}
//        onChangeText={onSearch}
//     />
//     <TouchableOpacity onPress={onFilterPress}>
//    <Image
//          source={require('../assets/icons/filter.png')}
//          style={{padding:9 ,marginTop:15,marginRight:20}}
//           />

// </TouchableOpacity>
    
//   </View>
// );



//////////////////////find data filter.............................
// export const findItemWithParents = (data, itemName) => {
//   console.log('Data:', data);
//   console.log('Item Name:', itemName);

//   const findItem = (items, itemName, parents = []) => {
//     console.log('Items:', items);
//     for (const item of items) {
//       console.log('Current Item:', item);
//       if (item.name === itemName) {
//         return { item, parents };
//       }
//       // Check if item.child exists and is an array before accessing its length
//       if (item.child && Array.isArray(item.child) && item.child.length > 0) {
//         const result = findItem(item.child, itemName, [...parents, item.name]);
//         if (result) {
//           return result;
//         }
//       }
//     }
//     return null;
//   };

//   for (let i = 0; i < data.length; i++) {
//     const parent = data[i];
//     const result = findItem([parent], itemName);
//     if (result) {
//       return { ...result, mainParentIndex: i };
//     }
//   }
//   return null;
// };

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
const CommonLayout = ({ title, previousTitle, children,navigate,onTitlePress }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style= {styles.tit}>
          <TouchableOpacity onPress={() => navigation.navigate('Parentcategories')}>
          <Text style={styles.title}>AllCategories {`>`}</Text>
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


const CategorySection = ({ title, searchPlaceholder,isSearchbarHide,categories, onSearch, onCardPress ,onFilterPress}) => (
  <View style={styles.categorySection}>

    <Text style={styles.sectionTitle}>{title}</Text>
    {!isSearchbarHide&&
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
    width: (width - 60) / 3, // Adjust based on your layout needs
      marginHorizontal: responsiveWidth(10),
     marginVertical: 10,
  },
  cardIcon: {
    width: 110,
    height: 100,
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
   tit: {
       fontSize: 20,
       display:'flex',
       flexDirection: 'row',
      fontWeight: 'bold',
      // marginBottom: 10,
      numberOfLines:1,
      
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
        borderBottomWidth: 13,
        borderBottomColor: '#e0e0e0',
        // paddingHorizontal:-3,
    },
    title: {
       fontFamily:FONTS.ROBOTO_BLACK,
      fontSize: responsiveFontSize(2),
      paddingHorizontal: 5,
      fontWeight: 'bold',
      color: COLORS.TEXT,
      
      
    },
  })
  
  export { SearchBar, Card, CardGrid, CategorySection,CommonLayout };
