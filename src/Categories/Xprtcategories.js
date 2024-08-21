// import React, { useState } from "react";
// import { SafeAreaView, ScrollView, Text, StyleSheet, View } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { useSelector } from "react-redux";
// import { COLORS } from "../constants";
// import { CardGrid, CommonLayout, SearchBar } from "../components/card";
// import CategoryModal from '../Modals/categorymodal';

// const Xprtcategories = ({ route }) => {
//   const navigation = useNavigation();
//   const [modalVisible, setModalVisible] = useState(false);
//   const [filteredServices, setFilteredServices] = useState([]);
//   const [selectedServices, setSelectedServices] = useState({});
//   const selectedService = useSelector((state) => state.categories);

//   // Find the subcategory based on the id from route params
//   const subCategory = selectedService.categories
//     .map((category) => category.child)
//     .flat()
//     .find((subCat) => subCat.id === route?.params?.id);

//   // Prepare the subcategory children data for CardGrid
//   const subCategoryChildren = subCategory?.child?.map((child) => ({
    
//     title: child.name,
//     id: child.id,
//   }));

//   // Handle search input and filter subcategory children
//   const handleSearch = (text) => {
//     const filtered = subCategoryChildren.filter(service =>
//       service.title.toLowerCase().includes(text.toLowerCase())
//     );
//     setFilteredServices(filtered);
//   };

//   // Handle checkbox toggle in the modal
//   const handleCheckboxToggle = serviceId => {
//     setSelectedServices(prevState => ({
//       ...prevState,
//       [serviceId]: !prevState[serviceId],
//     }));
//   };

//   return (
//     <CommonLayout title={subCategory?.name || "Subcategory"}>
//       <SafeAreaView style={styles.container}>
//         <ScrollView>
          
          

//           {subCategory ? (
//             <View style={styles.content}>
//               {filteredServices.length > 0 ? (
//                 <CardGrid
//                   items={filteredServices}
//                   onCardPress={(item) =>
//                     console.log(`Pressed on child: ${item.title}`)
//                   }
//                 />
//               ) : subCategoryChildren.length > 0 ? (
//                 <CardGrid
//                   items={subCategoryChildren}
//                   onCardPress={(item) =>
//                     console.log(`Pressed on child: ${item.title}`)
//                   }
//                 />
//               ) : (
//                 <Text style={styles.noChildrenText}>
//                   No children available
//                 </Text>
//               )}
//             </View>
//           ) : (
//             <Text style={styles.noSubCategoryText}>No subcategory found</Text>
//           )}
//         </ScrollView>
//       </SafeAreaView>

//       {/* Category Modal */}
//       <CategoryModal
//         visible={modalVisible}
//         onClose={() => setModalVisible(false)}
//         services={subCategory.child}
//         selectedServices={selectedServices}
//         label="Select Subcategories"
//         onCheckboxToggle={handleCheckboxToggle}
//       />
//     </CommonLayout>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: COLORS.PRIMARY,
//   },
//   noChildrenText: {
//     fontSize: 16,
//     textAlign: "center",
//   },
//   noSubCategoryText: {
//     fontSize: 16,
//     color: COLORS.TEXT,
//     textAlign: "center",
//   },
//   content: {
//     // padding: 20,
//   },
// });

// export default Xprtcategories;