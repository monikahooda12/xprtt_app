import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, FlatList, Text, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { useSelector } from 'react-redux';
import { getLocalData } from '../utils';
import { COLORS, ICONS, LOCAL_DB } from '../constants';

const SearchBar = () => {
  const navigation = useNavigation();
  const categoriesData = useSelector(state => state.categories);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [image,setImage] = useState('');

  const handleProfileOpen = () => {
    navigation.navigate('Account2'); // Replace 'Profile' with the name of your profile screen
  };

  useEffect(() => {
    setFilteredCategories(categoriesData);
  }, [categoriesData]);



  useEffect(() => {
    const fetchData = async () => {
        const user = await getLocalData(LOCAL_DB.USER);
        setImage(user.profile_image);

       
    };
    fetchData();
    
},[]);
console.log("image",image)

  const navigateToSearchResults = () => {
    navigation.navigate('SearchResults', { searchTerm });
  };

  return (
   <View >

<View style={styles.header}>
         <TouchableOpacity>
           <Image source={require('../assets/icons/logo.png')} style={styles.icon} />
         </TouchableOpacity>
         <Text style={styles.title}>Home</Text>
         <TouchableOpacity    onPress={handleProfileOpen}>
           {/* <Image source={require('../assets/icons/account.png')} style={styles.icon} /> */}
           <View style={{ ...styles.imageContainer, overflow: 'hidden' }}>
                                <Image
                                    source={image ? { uri: image } : ICONS.AVATAR}
                                    style={{ height: 60, width: 60, resizeMode: 'contain' }}
                                />
                            </View>

         </TouchableOpacity>
       </View>
   
   <View style={styles.container}>


      <TouchableOpacity 
        style={styles.inputContainer} 
        onPress={navigateToSearchResults}
        activeOpacity={0.7}
      >
         <Image
        source={require('../assets/icons/Icon.png')}
        style={styles.image}
      />



        {/* <FontAwesome name="search" size={20} color="gray" style={styles.searchIcon} /> */}
        <TextInput
          placeholder="Search..."
          style={styles.input}
          value={searchTerm}
          onChangeText={setSearchTerm}
          editable={false}
        />

{/* /////////////////////////////filter///// */}
<Image
        source={require('../assets/icons/filter.png')}
        style={styles.image}
      />
      </TouchableOpacity>

      <FlatList
        data={filteredCategories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.categoryItem}
            onPress={() => navigation.navigate('CategoryDetails', { category: item })}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
        style={styles.categoryList}
      />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({

  imageContainer: {
    borderRadius: 100,
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
},

  container: {

    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
     paddingTop: 32,
     marginBottom:48,
     zIndex:12,
    backgroundColor: '#f5f5f5',
  },
  // container: {
  //        flex: 1,
  //        backgroundColor: '#fff',
  //      },
       header: {
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
         padding: 16,
         marginRight:14
        
       },
       title: {
         fontSize: 20,
         fontWeight: 'bold',
       },
  inputContainer: {
    
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: responsiveWidth(90),
    height: 50,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 25,
     paddingHorizontal: 15,
     marginTop: -30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  icon: {
         width: 24,
         height: 24,
         marginLeft:11
       },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
     fontSize: 16,
    color: '#333',
    // marginLeft:'9',
  },
  categoryList: {
    width: '100%',
    paddingHorizontal: 20,
  },
  categoryItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  image:{
     marginRight:9,
  }
});

export default SearchBar;