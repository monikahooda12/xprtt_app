import React, {useEffect, useState} from 'react';
import {
  _View,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//constants
import {API, FONTS} from '../constants';

//api
import {httpRequest} from '../api/http';

const {width} = Dimensions.get('window');

const Xpertsubcat = ({route}) => {
  const {id} = route.params
  const navigation = useNavigation();
  const [categoriesData, setCategoriesData] = useState([]);
  const [subCategoriesData, setSubCategoriesData] = useState({});

  const getallcatergies = async () => {
    try {
      const response = await httpRequest({
        method: 'GET',
        url: API.GET_CATEGORIES,
      });
      const childcategoriesArray = response.data.list.reduce((acc, item) => {
        acc[item.id] = item.child;
        return acc;
      }, {});
      console.log(response.data.list)
      const childcategory = childcategoriesArray[id];

      const subChildArray = {};

      childcategory.map(category => {
        subChildArray[category.name] = category.child;
      });

      setCategoriesData(childcategory);
      setSubCategoriesData(subChildArray);

    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryPress = category => {
    navigation.navigate('Homesubchild', {categoryId: category.id});
  };

  useEffect(() => {
    getallcatergies();
  }, []);

  const RenderCategoryItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => handleCategoryPress(item)}>
        <View style={styles.categoryItem}>
          <Image
            source={{uri: item.icon}}
            style={styles.serviceIcon}
            resizeMode="cover"
          />
          <Text style={styles.categoryTitle}>
            {item.name || 'Unnamed Category'}
          </Text>
          {/* <Text style={styles.arrowIcon}>{'>'}</Text> Arrow indicator   */}
        </View>
        

        
      </TouchableOpacity>
    );
  };

  return (
    <TouchableOpacity>
    <View style={styles.container}>

      <FlatList
         data={categoriesData}
        renderItem={({item}) => (
          <>
          <View>
            <Text style={styles.text}>{item.name}</Text>
            <View style={{paddingHorizontal:46}}>
            <View style={{width:35,backgroundColor:'#D8D8D8',height:1,marginBottom:20,marginTop:10,alignSelf:'flex-start'}}/>
            </View>
            </View>
              {/* Horizontal ScrollView for subcategories */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{flexDirection: 'row'}}>
              {subCategoriesData[item.name]?.map(subItem => (
                <RenderCategoryItem key={subItem.id} item={subItem} />
              ))}
            </View>
            </ScrollView>
          </>
        )}
        keyExtractor={(item, index) => item.id.toString() || index.toString()}
        ListEmptyComponent={<Text>No categories available</Text>}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
    </TouchableOpacity>
  );
};

export default Xpertsubcat;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical:16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    // color:'red,'
  },
  text:{
 color:'#313131',
fontFamily:FONTS.ROBOTO_BLACK,
 fontWeight:'500',
fontSize:20,
lineHeight:25,
paddingHorizontal:9 

  },
  subCategoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',  // Allows horizontal wrapping
    justifyContent: 'space-between',  // Space out items
  },

  categoryItem: {
    alignItems: 'center',
    width: width / 3 - 20, // Adjust based on your layout needs
    marginHorizontal: 5,
    marginVertical: 10,
  },
  serviceIcon: {
    width: 112,
    height: 112,
    borderRadius: 10,
    marginBottom: 5,
  },
  categoryTitle: {
    fontSize: 12,
    textAlign: 'center',
    color: 'black',
    paddingHorizontal: 5,
    height: 30, // Set a fixed height for two lines of text
  },
});