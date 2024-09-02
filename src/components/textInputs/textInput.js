import React from 'react';
import { StyleSheet } from 'react-native'
import { COLORS, FONTS } from '../../constants';
import { TextInput as MaterialTextInput } from 'react-native-paper';
import { responsiveHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';

export const TextInput = (data) => {

    let { label, id, value, onChangeText, keyboardType, disabled, onPress, style, secureTextEntry, autoCapitalize } = data;

    return (
        <MaterialTextInput
            autoCapitalize={autoCapitalize}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            onPressIn={onPress}
            label={label}
            id={id}
            value={value}
            theme={{colors: {primary: COLORS.SECONDARY, onSurfaceDisabled:COLORS.DESCRIPTION, onSurfaceVariant:COLORS.DESCRIPTION}}}
            onChangeText={onChangeText}
            style={[styles.textInput,style]}
            contentStyle={{fontFamily: FONTS.REGULAR, color: disabled ? COLORS.DESCRIPTION : COLORS.LIGHTGRAY}}
            outlineStyle={{borderWidth: responsiveWidth(0.3), borderColor:"#999", borderRadius:10 }}
            // borderColor:COLORS.PRIMARY_LIGHTER
            mode="outlined"
            disabled={disabled}
        />
    )
};

const styles = StyleSheet.create({

    textInput: {
        backgroundColor: COLORS.PRIMARY_LIGHT,
        marginVertical: responsiveHeight(1),
        marginHorizontal:responsiveScreenWidth(1.3),
        
    },
});











// import React from 'react';
// import { StyleSheet, View, TextInput as RNTextInput } from 'react-native';
// import { COLORS, FONTS } from '../../constants';
// import { responsiveHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';

// export const TextInput = (data) => {
//     let { label, value, onChangeText, keyboardType, disabled, style, secureTextEntry, autoCapitalize } = data;

//     return (
//         <View style={styles.inputContainer}>
//             <RNTextInput
//                 autoCapitalize={autoCapitalize}
//                 secureTextEntry={secureTextEntry}
//                 keyboardType={keyboardType}
//                 placeholder={label} // Use placeholder instead of label for simple TextInput
//                 value={value}
//                 theme={{colors: {primary: COLORS.SECONDARY, onSurfaceDisabled:COLORS.DESCRIPTION, onSurfaceVariant:COLORS.DESCRIPTION}}}
//                 onChangeText={onChangeText}
//                 style={[styles.textInput, style]}
//                 placeholderTextColor={disabled ? COLORS.DESCRIPTION : COLORS.LIGHTGRAY} // Use placeholderTextColor for placeholder color
//                 editable={!disabled} // Use editable prop to disable/enable text input
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     inputContainer: {
//         marginVertical: responsiveHeight(1),
//         marginHorizontal: responsiveScreenWidth(1.3),
//     },
//     textInput: {
//         // backgroundColor: COLORS.PRIMARY_LIGHT,
//         paddingHorizontal: 10,
//         // paddingVertical: 8,
//         borderWidth: 1,
//         // borderColor: COLORS.PRIMARY_LIGHTER,
//           borderRadius: 8,
//          fontFamily: FONTS.REGULAR,
//          color: COLORS.LIGHTGRAY,
//     },
// });
