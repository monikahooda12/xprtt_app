import React, { useEffect, useState } from "react";
import { API } from "../constants";
import { ActivityIndicator, FlatList, View } from "react-native";
import { Notification as NotificationCard, ScreenLoading, screenLoading } from "../components";
import { httpRequest } from "../api/http";

export const Notifications = ({ navigation }) => {

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData(currentPage);
  }, [])

  const handleEndReached = () => {
    if (currentPage < totalPages-1) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      loadData(nextPage);
    }
  };

  const loadData = async (page) => {

    currentPage==0 && screenLoading(true)

    const params = {
      page,
      limit: 12
    };

    try {
      const response = await httpRequest({ method: "GET", params, url: API.TRANSACTIONS });
      if (data.length > 0) {
        let tempData = data;
        tempData.push(...response.data.list)
        setData(tempData);
      } else {
        setData(response.data.list);
      }
      setTotalPages(response.data.totalPages);
      screenLoading(false)
    } catch (error) {
      screenLoading(false)
    }
  }

  const renderLoader = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <ActivityIndicator size="small" color="black" />
      </View>
    );
  };

  return (

    <View style={{ backgroundColor: 'white' }}>
      <ScreenLoading />

      <FlatList
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        data={data}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={currentPage !== totalPages-1 ? renderLoader : null}
        renderItem={({ item, index }) => {
          return (
            <NotificationCard data={item} />
          )
        }}/>
    </View>

  );
};