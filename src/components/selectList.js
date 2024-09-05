import { View, Text, TouchableOpacity, TextInput, FlatList, Modal, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import { COLORS, FONTS } from '../constants';
import { ArrowSvg } from '../assets/icons/svg';
import { capitalize } from '../utils';
import { responsiveWidth } from 'react-native-responsive-dimensions';

export const SelectList = (data) => {

    const { label, list, searchEnabled, getValue, value } = data;

    const [search, setSearch] = useState('');
    const [clicked, setClicked] = useState(false);
    const [items, setItems] = useState(list);
    const [selectedItem, setSelectedItem] = useState();
    const searchRef = useRef();

    // const handleOptionSelect = (selectedValue) => {
    //     // Call the onSelect callback with the selected value
    //     getValue(selectedValue);
    //   };

    const onSearch = search => {
        if (search !== '') {
            let tempData = items.filter(item => {
                return item.value.toLowerCase().indexOf(search.toLowerCase()) > -1;
            });
            setItems(tempData);
        } else {
            setItems(list);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', marginVertical: 8, marginHorizontal: 5 }}>
            <TouchableOpacity
                activeOpacity={0.7}
                style={{
                    // backgroundColor: COLORS.PRIMARY_LIGHT,
                     width: '100%',
                    height: 50,
                    borderWidth: responsiveWidth(0.3),
                    // borderColor: COLORS.PRIMARY_LIGHTER,
                    borderRadius:8,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingLeft: 15,
                    marginTop: 6,
                    paddingRight: 15,
                }}
                onPress={() => { setClicked(!clicked); }}>
                <Text style={{ fontFamily: FONTS.SEMI_BOLD, color: COLORS.BLACK, fontSize: 16 }}>
                    {value ? capitalize(value) : selectedItem ? selectedItem : label}
                </Text>
                <ArrowSvg color={COLORS.SECONDARY} />

            </TouchableOpacity>

            {clicked ? (
                <Modal visible={true} animationType='none' transparent={true}>
                    <View style={styles.modalContainer}>

                        <View style={styles.modalContent}>
                            {searchEnabled ?
                                <TextInput
                                    placeholder="Search.."
                                    value={search}
                                    ref={searchRef}
                                    onChangeText={txt => {
                                        onSearch(txt);
                                        setSearch(txt);
                                    }}
                                    style={{
                                        color: COLORS.WHITE,
                                        width: '90%',
                                        height: 50,
                                        alignSelf: 'center',
                                        borderWidth: 0.2,
                                        borderColor: COLORS.DESCRIPTION,
                                        borderRadius: 7,
                                        marginTop: 20,
                                        paddingLeft: 20,
                                    }}
                                />
                                : null}

                            <FlatList
                                data={items}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            style={{
                                                width: '85%',
                                                alignSelf: 'center',
                                                height: 50,
                                                justifyContent: 'center',
                                                borderBottomWidth: 0.5,
                                                borderColor: COLORS.DESCRIPTION,
                                            }}
                                            onPress={() => {
                                                getValue(item.value);
                                                setSelectedItem(item.value);
                                                setClicked(false);
                                                onSearch('');
                                                setSearch('');
                                            }
                                            }>
                                            <Text style={{ color: COLORS.DESCRIPTION, fontFamily: FONTS.MEDIUM }}>{item.value}</Text>
                                        </TouchableOpacity>
                                    );
                                }}
                            />
                        </View>
                    </View>
                </Modal>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //  backgroundColor: 'rgba(0,0,0,0.3)'
        backgroundColor:'white',
    },
    modalContent: {
        maxHeight: 300,
        backgroundColor: COLORS.PRIMARY_LIGHT,
        padding: 20,
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});