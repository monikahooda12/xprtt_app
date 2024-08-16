import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { COLORS, FONTS, ICONS } from "../../constants";

export const About =(data)=>{

    const {onPress, icon, iconBackgroundColor, title } = data;
    
    return(

        <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.container}>
            <View style={styles.block1}>
                <Text style={styles.text}>{title}</Text>
            </View>
            <View style={styles.block2}>
                <Image style={{height:14,width:14, tintColor:COLORS.DARK_GRAY}} source={ICONS.ARROW_FORWARD}/>
            </View>
        </TouchableOpacity>

    );

};

const styles = StyleSheet.create({
    container:{
        paddingVertical:15,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    block1:{
        flexDirection:'row',
        alignItems:'center'
    },
    block2:{
        justifyContent:'center'
    },
    image:{
        width:20,
        height:20,
    },
    text:{
        fontFamily:FONTS.SEMI_BOLD,
        fontSize:16,
        color:'black'
    },
    
});