import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  Image,
  useWindowDimensions,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {
  News as NewsCard,
  ViewAll,
  screenLoading,
} from '../components';
import {API, COLORS, FIREBASE_REF, FONTS, LOCAL_DB} from '../constants';
import {httpRequest} from '../api/http';

import {getLocalData, storeLocalData} from '../utils';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import SearchBar from '../home/Searchbar';
import Home from '../home/Home';

import Homeslider from './homeslider';
import Iconhome from '../home/Iconhome';
import Homechild from '../home/homechild';
import ChildData from '../components/ChildData';
import Homesubchild from '../home/homesubchild';

import Subcategories from '../Categories/Subcategories';
import Superchildcategories from '../Categories/Subchildcategories';
import Subhome from '../Categories/Subhome';

export const Dashboard = ({navigation}) => {
  const {width} = useWindowDimensions();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (refreshing) {
      loadData();
    }
  }, [refreshing]);

  const loadData = async () => {
    try {
      const response = await httpRequest({method: 'GET', url: API.GET_PROFILE});
      await storeLocalData(LOCAL_DB.USER, response.data);

      const config = await getLocalData(LOCAL_DB.CONFIG);
      setConfig(config);
      setRefreshing(false);
      screenLoading(false);
    } catch (error) {
      setRefreshing(false);
      screenLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
         backgroundColor: COLORS.PRIMARY,
      }}>
      <View>
        <SearchBar />

        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              onRefresh={() => setRefreshing(true)}
              refreshing={refreshing}
            />
          }>
          <View style={{marginTop: 10}}>
            <Homeslider />
          </View>
          <View style={{paddingHorizontal: 5}}>
            {/* <Iconhome/>
            
           <Homechild/>
            <ChildData/> */}


{/* <Subcategories/> */}
{/* <Superchildcategories/> */}
            <Home />
           
          </View>
          <Homesubchild/>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrolling2: {
    backgroundColor: 'red',
    width: '100%',
    padding: 10,
    marginBottom: 10,
  },
  welcome: {
    width: 100,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
     backgroundColor: '#F5FCFF',
  },
  image: {
    width: 20,
    height: 20,
  },
  scrolling1: {
    width: 400,
    padding: 10,
     marginBottom: 10,
  },
});
