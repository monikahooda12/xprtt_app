




import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { COLORS, FONTS } from '../constants';
import { commonStyles } from '../theme/Styles';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Responsive } from '../theme/Layout';

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
const CommonLayout = ({ title, previousTitle, children }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>
            {previousTitle ? `${previousTitle} > ${title}` : title}
          </Text>
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
