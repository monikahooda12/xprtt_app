import { View } from "react-native";
import { WebView } from 'react-native-webview';
import { errorToast } from "../components";
import { COLORS } from "../constants";

export const Webview = ({ route }) => {

    const { url } = route.params;

    return (
        <View style={{ flex: 1}}>

            <WebView
                showsVerticalScrollIndicator={false}
                injectedJavaScript={`
                document.querySelector('.nc-Header').style.display = 'none';
                document.querySelectorAll('.nc-Footer').forEach(function(el) {
                    el.style.display = 'none';
                    });
                document.querySelector('.scrollToTop').style.display = 'none';
                document.addEventListener('click', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                  }, true);
              `}
                cacheEnabled={true}
                startInLoadingState={true}
                javaScriptEnabled={true}
                source={{ uri: url }}
                onError={(error) => errorToast('Something went wrong. Try after sometime.')}
            />

        </View>
    )
}