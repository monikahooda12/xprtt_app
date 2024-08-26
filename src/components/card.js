// import React from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

// const Card = ({ title, icon, onPress }) => {
//   return (
//     <TouchableOpacity style={styles.card} onPress={onPress}>
//       <Image source={icon} style={styles.icon} />
//       <Text style={styles.title}>{title}</Text>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.Cast.create({
//   card: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '30%',
//     aspectRatio: 1,
//     margin: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   icon: {
//     width: 50,
//     height: 50,
//     marginBottom: 8,
//   },
//   title: {
//     fontSize: 12,
//     textAlign: 'center',
//   },
// });

// export default Card;




import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { COLORS } from '../constants';
import { commonStyles } from '../theme/Styles';

 const { width,height } = Dimensions.get('window');

const SearchBar = ({ placeholder, onSearch ,onFilterPress}) => (
  <View style={styles.searchBar}>


<TouchableOpacity style={styles.searchIcon}>
<Image
         source={require('../assets/icons/Icon.png')}
         style={{ marginTop:3,marginLeft:10,height:20}}
          />
      {/* <Text>🔍</Text> */}
      
    </TouchableOpacity>
   
    <TextInput 
      style={styles.searchInput}
      placeholder={placeholder}
      onChangeText={onSearch}
    />
    <TouchableOpacity onPress={onFilterPress}>
   <Image
         source={require('../assets/icons/filter.png')}
         style={{padding:9 ,marginTop:15,marginRight:20}}
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
    
    <Text style={[commonStyles.twelveGilroy500,{color:COLORS}]} numberOfLines={2}>{title}</Text>
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
const CommonLayout = ({ title, children }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        {children}
      </View>
    </SafeAreaView>
  );
};

const CategorySection = ({ title, searchPlaceholder, categories, onSearch, onCardPress ,onFilterPress}) => (
  <View style={styles.categorySection}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <SearchBar placeholder={searchPlaceholder} onSearch={onSearch} onFilterPress={onFilterPress} />
    <CardGrid items={categories} onCardPress={onCardPress} />
  </View>
);

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 40,
    padding: 5,
     marginBottom: 10,
   
  },
  searchInput: {
    flex: 1,
    // paddingHorizontal: 60,
  },
  searchIcon: {
    
     padding: 14,
     
  },
  card: {
    alignItems: 'center',
    width: width / 3 - 20, // Adjust based on your layout needs
    marginHorizontal: 5,
    marginVertical: 10,
  },
  cardIcon: {
    width: 112,
    height: 112,
    borderRadius: 10,
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 12,
    textAlign: 'center',
    color: 'black',
    paddingHorizontal: 5,
    height: 30, // Set a fixed height for two lines of text
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
      fontSize: width * 0.06,
      fontWeight: 'bold',
      color: COLORS.TEXT,
      textAlign: 'center',
    },
  });
  
  export { SearchBar, Card, CardGrid, CategorySection,CommonLayout };
