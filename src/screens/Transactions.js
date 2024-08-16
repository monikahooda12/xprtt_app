import React, { useEffect, useState } from "react";
import { API, COLORS, FONTS } from "../constants";
import { ActivityIndicator, SectionList, StyleSheet, Text, View } from "react-native";
import { NoData, ScreenLoading, Transaction as TransactionCard, screenLoading } from "../components";
import { httpRequest } from "../api/http";

export const Transactions = ({ navigation }) => {

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    screenLoading(true)
    loadData(currentPage);
  }, [])

  const handleEndReached = () => {
    if (currentPage < totalPages - 1) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      loadData(nextPage);
    }
  };

  const loadData = async (page) => {

    const params = {
      page
    };

    try {
      const response = await httpRequest({ method: "GET", params, url: API.TRANSACTIONS });
      setData(prevData => [...prevData, ...response.data.list]);
      console.log(response.data.list);
      setTotalPages(response.data.totalPages);
      screenLoading(false)
    } catch (error) {
      screenLoading(false)
    }
  }

  const groupedData = data.reduce((acc, item) => {
    const month = new Date(item.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(item);
    return acc;
  }, {});

  // Convert the grouped data into an array of sections
  const sections = Object.keys(groupedData).map(month => ({
    title: month,
    data: groupedData[month]
  }));

  const SectionHeader = ({ section: { title } }) => (
    <View style={{ backgroundColor: COLORS.PRIMARY_LIGHTER, paddingVertical: 10, paddingHorizontal: 15, }}>
      <Text style={{
        fontFamily: FONTS.SEMI_BOLD,
        fontSize: 16,
        color: COLORS.DESCRIPTION
      }}>
        {title}
      </Text>
    </View>
  );

  const renderLoader = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <ActivityIndicator size="small" color={COLORS.WHITE} />
      </View>
    );
  };

  return (

    <View style={{ backgroundColor: COLORS.PRIMARY, flex: 1 }}>
      <ScreenLoading />

      {!data.length > 0 ?
        <NoData />
        :
        <SectionList
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          sections={sections}
          renderSectionHeader={SectionHeader}
          stickySectionHeadersEnabled={true}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={currentPage !== totalPages - 1 ? renderLoader : null}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <TransactionCard data={item} />
            )
          }}>
        </SectionList>
      }
    </View>

  );
};