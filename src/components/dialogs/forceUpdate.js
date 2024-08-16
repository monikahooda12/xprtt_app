import { Alert } from "react-native";

export const ForceUpdate = (cancelable, onButtonPress)=> {

    const buttons = [
        {
          text: 'Update',
          onPress: () => onButtonPress('Update')
          
        }
      ];
  
      if (cancelable) {
        buttons.unshift({
          text: 'No Thanks',
          onPress: () => onButtonPress('No Thanks')
        });
      }

    Alert.alert(
        'New Update Required!',
        'A new version is available to download. Please update to continue.',
        buttons
    );

}