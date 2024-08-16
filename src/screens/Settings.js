import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { Menu } from '../components';

export const Settings = ({ navigation }) => {

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={{ paddingHorizontal: 15, marginTop:10, }}>

                <Menu title="Theme"/>
                <Menu title="Notification"/>
                <Menu title="Language"/>
                <Menu title="Currency"/>

            </View>

        </ScrollView>
    );
};