import React, { useRef, useState, useEffect } from 'react';
import { View, Animated, FlatList, useWindowDimensions } from 'react-native';
import { COLORS, onboardData } from '../constants';
import { Paginator, OnboardingItem, Button } from '../components';
import { responsiveWidth } from 'react-native-responsive-dimensions';

export const Onboarding = ({ navigation }) => {

    const { width } = useWindowDimensions();
    const scrollX = useRef(new Animated.Value(0)).current;
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const ref = useRef(null);
    const [btnName, setBtnName] = useState('');

    useEffect(() => {
        currentSlideIndex === onboardData.length - 1 ? setBtnName("Get Started") : setBtnName("Next");
    }, [currentSlideIndex]);


    const updateCurrentSlideIndex = e => {
        const currentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(currentOffsetX / width);
        setCurrentSlideIndex(currentIndex)
    }

    const goNextSlide = () => {
        const nextSlideIndex = currentSlideIndex + 1;
        if (nextSlideIndex != onboardData.length) {
            const offset = nextSlideIndex * width;
            ref?.current?.scrollToOffset({ offset });
            setCurrentSlideIndex(nextSlideIndex);
        }
    };

    const login = () => {
        navigation.replace('Login');
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.PRIMARY, }}>
            <View style={{ flex: 3, }}>
                <FlatList
                    onMomentumScrollEnd={updateCurrentSlideIndex}
                    ref={ref}
                    data={onboardData}
                    renderItem={({ item }) => <OnboardingItem item={item} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                        useNativeDriver: false,
                        currentSlideIndex
                    })}
                />
            </View>

            <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center', }} >
                <Paginator color={COLORS.SECONDARY} data={onboardData} scrollX={scrollX} />
            </View>

            <View style={{ flex: 0.8, justifyContent: 'center', paddingHorizontal:responsiveWidth(3.8)}}>
                <Button onPress={btnName == "Next" ? goNextSlide : login} name={btnName} />
            </View>

        </View>
    );
};