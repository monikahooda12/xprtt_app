import { Text, View } from "react-native";

export const NoNetwork =(navigation)=>{

    return (
        <View>
            <Text onPress={()=> console.log(';;;;;')} style={{color:'black', fontSize:24}}>
                Retry
            </Text>
        </View>
    );

};