import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS } from '../constants';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Subchildcategories = () => {
  const navigation = useNavigation();
  const selectedService = useSelector(state => state.categories.selectedService);

  const handlePress = () => {
    // navigation.navigate(Welcome2);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{selectedService?.name || 'Service Details'}</Text>
        </View>
        {selectedService && (
          <>
            <View style={styles.imageContainer}>
              {/* <Image
                source={{ uri: selectedService.icon || 'https://via.placeholder.com/100' }}
                style={styles.icon}
                resizeMode="cover"
              /> */}
              <View style={styles.overlay} />
            </View>
            <View style={styles.childrenContainer}>
              {selectedService.child && selectedService.child.length > 0 && (
                selectedService.child.map((childService, index) => (
                  <TouchableOpacity 
                    key={childService.id || index} 
                    style={styles.childCard}
                    onPress={handlePress}
                  >
                    <Text style={styles.childName}>
                      {childService.name || 'Unnamed Child Service'}
                    </Text>
                    <Image
                      source={{ uri: childService.icon }}
                      style={styles.serviceIcon}
                       resizeMode="cover"
                    />
                  </TouchableOpacity>
                ))
              )}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: COLORS.TEXT,
    textAlign: 'center',
  },
  // imageContainer: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   width: '100%',
  //   height: height * 0.3,
  //   marginBottom: height * 0.02,
  //   paddingHorizontal: width * 0.04,
  // },
  icon: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
     resizeMode:"cover",

  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 20,
  },
  childrenContainer: {
    padding: width * 0.04,
  },
  childCard: {
    padding: width * 0.04,
    marginBottom: height * 0.02,
    borderRadius: 10,
    backgroundColor: COLORS.BACKGROUND,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
          // elevation: 1,
      },
    }),
  },
  childName: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: COLORS.TEXT,
    marginBottom: height * 0.01,
  },
  serviceIcon: {
    width: '100%',
     height: height * 0.15,
    borderRadius: 10,
    // height:'auto'

  },
});

export default Subchildcategories;