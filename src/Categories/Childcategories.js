




// Subchild.js
// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, Text } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import { COLORS } from '../constants';
// import { setselectedService } from '../redux/categories/categorySlice';
// import { CategorySection, CommonLayout } from '../components/card';

// const Subchild = ({ route, navigation }) => {
//   const [servicesData, setServicesData] = useState([]);
//   const [filteredServices, setFilteredServices] = useState([]);
//   const [title, setTitle] = useState('Service Details');
//   const categories = useSelector(state => state.categories.categories);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const selectedCategory = categories?.find(category => category.id === route?.params?.id);
//     if (selectedCategory) {
//       const data = selectedCategory.child || selectedCategory.services || [];
//       setTitle(selectedCategory.name || 'Service Details');
//       setServicesData(data);
//       setFilteredServices(data);
//     } else {
//       setServicesData([]);
//       setFilteredServices([]);
//     }
//   }, [categories, route?.params?.id]);

//   const handleServicePress = (service) => {
//     dispatch(setselectedService(service));
//     navigation.navigate('SuperSubchild');
//   };

//   const handleSearch = (text) => {
//     const filtered = servicesData.filter(service => 
//       service.name.toLowerCase().includes(text.toLowerCase())
//     );
//     setFilteredServices(filtered);
//   };

//   return (
//     <CommonLayout title=
//     {title}>
//       <View style={styles.container}>
       
//         <CategorySection
//           searchPlaceholder="Search services..."
//           categories={filteredServices.map(service => ({
//             icon: { uri: service.icon },
//             title: service.name || 'Unnamed Service',
//           }))}
//           onSearch={handleSearch}
//           onCardPress={handleServicePress}
//         />
//       </View>
//     </CommonLayout>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.PRIMARY,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: COLORS.BLACK,
//     padding: 15,
//     textAlign:'center'
//   },
// });

// export default Subchild;







import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS } from '../constants';
import { setselectedService } from '../redux/categories/categorySlice';
import { CategorySection, CommonLayout } from '../components/card';

const Childcategories = ({ route, navigation }) => {
  const [servicesData, setServicesData] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [title, setTitle] = useState('Service Details');

  const categories = useSelector(state => state.categories.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    const selectedCategory = categories?.find(category => category.id === route?.params?.id);
    if (selectedCategory) {
      const data = selectedCategory.child || selectedCategory.services || [];
        setTitle(selectedCategory.name || 'Service Details');
      setServicesData(data);
      setFilteredServices(data);
    } else {
      setServicesData([]);
      setFilteredServices([]);
    }
  }, [categories, route?.params?.id]);

  const handleServicePress = (service) => {
    dispatch(setselectedService(service));
    navigation.navigate('Subchildcategories', { id: service.id, title });
  };

  const handleselectsubcat = (Service) => {
    navigation.navigate("Xprrt", { categoriesSlug: Service });
  };

console.log(title,'titlesbsdk')
  return (
    
    <CommonLayout title= {title}  onPress={() =>{navigation.navigate('Parentcategories')}}>
      <View style={styles.container}>
        <CategorySection
        isSearchbarHide={true}
          categories={filteredServices.map(service => ({
            icon: { uri: service.icon },
             title: service.name || 'Unnamed Service',
            id: service.id
          }))}
          onCardPress={handleServicePress}
        />
      </View>
    </CommonLayout>
  );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
     backgroundColor: COLORS.PRIMARY,
   },
});

export default Childcategories;


