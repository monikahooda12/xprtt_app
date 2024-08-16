import React, { useEffect, useState } from "react";
import { FlatList, View, RefreshControl } from "react-native";
import { News as NewsCard, ScreenLoading, hideLoader, screenLoading, showLoader } from "../components";
import { fetchRssFeed } from "../utils";
import { COLORS } from "../constants";

export const News = ({ navigation }) => {

  const [refreshing, setRefreshing] = useState(false);
  const [feedItems, setFeedItems] = useState([]);

  useEffect(() => {
    screenLoading(true)
    fetchNews()
  }, []);

  useEffect(() => {
    refreshing && fetchNews()
  }, [refreshing])

  const fetchNews = async () => {
    const parsedItems = await fetchRssFeed();
    setFeedItems(parsedItems)
    screenLoading(false)
    setRefreshing(false)
  }

  return (
    <View style={{flex:1, backgroundColor:COLORS.PRIMARY}}>
      <ScreenLoading />
      <FlatList
        refreshing={refreshing}
        onRefresh={() => setRefreshing(true)}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        data={feedItems}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <NewsCard data={item} />
          )
        }}>
      </FlatList>
    </View>

  );
};