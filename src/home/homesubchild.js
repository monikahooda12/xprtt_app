import { useEffect } from "react";
import { Text, View } from "react-native";

const Homesubchild = () => {
  const getallcatergies = async () => {
    try {
      const response = await httpRequest({
        method: 'GET',
        url: API.GET_CATEGORIES,
      });

      // Log the entire list to see the structure
      console.log("Full Response Data:", response.data.list);

      // Create a map of child categories keyed by ID
      const childcategoriesArray = response.data.list.reduce((acc, item) => {
        acc[item.id] = item.child;
        return acc;
      }, {});

      // Check if ID 44 exists in childcategoriesArray
      if (childcategoriesArray[44]) {
        const childcategory = childcategoriesArray[44];
        console.log("Child category for ID 44:", childcategory);

        const subChildArray = {};
        childcategory.map(category => {
          subChildArray[category.name] = category.child;
        });

        // You can log subChildArray if needed
        console.log("Sub Child Array for ID 44:", subChildArray);

        // If you want to set this data in state, uncomment the lines
        // setCategoriesData(childcategory);
        // setSubCategoriesData(subChildArray);
      } else {
        console.log("ID 44 not found in the data.");
      }

    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Call the function when the component mounts
  useEffect(() => {
    getallcatergies();
  }, []);

  return (
    <View>
      <Text style={{ backgroundColor: 'red', fontSize: 30 }}>
        hi
      </Text>
    </View>
  );
};

export default Homesubchild;
