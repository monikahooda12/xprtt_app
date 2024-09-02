import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from "react-native";
import { API, COLORS } from "../constants";
import { httpRequest } from "../api/http";
import { useNavigation } from "@react-navigation/native";
import { commonStyles } from "../theme/Styles";


const { width, height } = Dimensions.get('window');
const DEFAULT_IMAGE = "https://via.placeholder.com/150";  // Default image placeholder

const CategoryItem = ({ item }) => {

  const navigation = useNavigation()
  const handleCategoryPress = category => {
    navigation.navigate('Xprrt', { categoriesSlug: category.slug });
  };
return(


  <TouchableOpacity
  onPress={()=>{handleCategoryPress(item)}}
  style={styles.item}>
    <View style={styles.Cards}> 
      <Image
        source={{ uri: item.icon || DEFAULT_IMAGE }}
        style={styles.cardIcon}
        onError={(e) => { e.target.src = DEFAULT_IMAGE }}
      />
      {/* <Text style={styles.itemText}>{item.name}</Text> */}
      <Text style={[commonStyles,{color:COLORS.BLACK}]}>{item.name}</Text>
    </View>
  </TouchableOpacity>
)};


const Homesubchild = () => {
  const [categories, setCategories] = useState([]);

  const getallcategories = async () => {
    try {
      const response = await httpRequest({
        method: 'GET',
        url: API.GET_CATEGORIES,
      });

      const formattedCategories = response.data.list.map(category => ({
        id: category.id,
        name: category.name,
        image: category.image,
        subcategories: category.child
      }));

      setCategories(formattedCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

 



  useEffect(() => {
    getallcategories();
  }, []);

  const renderCategory = ({ item }) => (
    <View style={styles.categoryContainer }
    key={item.id}>
      <Text style={styles.categoryTitle}>{item.name}
       
      </Text>
      <Text style={styles.content}>We Provide best services</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {item.subcategories.map((subItem) => (
          <CategoryItem key={subItem.id} item={subItem}
          
          />
        ))}
      </ScrollView>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {categories.map((category) => renderCategory({ item: category }))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 8,
      marginLeft: 10,
      
      
  },
  Cards: {
    alignItems: 'center',
    width: 133, // Adjust based on your layout needs
    height:112.29,
     marginHorizontal: 5,
    marginVertical: 10,
    marginBottom:24,
    paddingLeft:20,
    

  },
  categoryTitle: {
     fontFamily: 'Roboto-Black',
    fontSize: 20,
    fontWeight: 'bold',
    // marginBottom: 20,
    color: '#0F0F0F',
    paddingHorizontal:15,
  },
  cardIcon: {
    width: 133,
    height: 112.29,
     borderRadius: 10,
    marginBottom: 5,
    paddingHorizontal: 10,
  }, 
  item: {
    alignItems: 'center',
    marginRight: 15,
  },
  itemText: {  
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'ROBOTO_BLACK',
    color:COLORS.BLACK,
     numberOfLines:2,
  },
  content:{
   flex:1,
   widthidth:182,
   marginBottom:10,
   paddingHorizontal:15,

  }
}); 

export default Homesubchild;
