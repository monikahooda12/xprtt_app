import AsyncStorage from "@react-native-async-storage/async-storage";
import { BackHandler, Share } from 'react-native';
import moment from 'moment';
import { parseString } from 'react-native-xml2js';
import { APP_EXCHANGE_RATE, LOCAL_DB } from "../constants";

//Local Storage Start
export const storeLocalData = async (key, data) => {
  await AsyncStorage.setItem(key, JSON.stringify(data));
}

export const deleteLocalData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('Data deleted successfully!');
  } catch (error) {
    console.log('Error deleting data:', error);
  }
};

export const deleteAllLocalData = async () => {
  try {
    await AsyncStorage.clear();
    console.log('All AsyncStorage data has been deleted.');
  } catch (error) {
    console.error('Error clearing AsyncStorage data:', error);
  }
};


export const getLocalData = async (key) => {

  const data = await AsyncStorage.getItem(key);
  return data != null ? JSON.parse(data) : null
};
//End

//Exit App on Back Button Pressed Start
let exitAppTimer = null;
export const handleBackButton = () => {

  if (exitAppTimer && new Date().getTime() - exitAppTimer < 1000) {
    BackHandler.exitApp(); // Exit the app
  } else {
    exitAppTimer = new Date().getTime();
    console.warn("Tap again to exit.");
  }
  return true;
};

export const exitAppOnBackPressed = () => {
  const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  return backHandler;
};
//End


export const UTCtoIST = (utcDate, output) => {
  var offset = moment().utcOffset();
  var localText = moment.utc(utcDate).utcOffset(offset).format(output);
  return localText
}

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getTimeDifference = (timestamp) => {
  const now = new Date();
  const date = new Date(timestamp);
  const diff = now - date;
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));

  if (diffMinutes < 1) {
    return 'just now';
  } else if (diffMinutes < 60) {
    return `${diffMinutes} minutes ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hours ago`;
  } else if (date.toDateString() === now.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString()) {
    return 'Yesterday';
  } else {
    // Format the date to your desired format here (e.g., "MMM dd, yyyy")
    const formattedDate = date.toDateString();
    return formattedDate;
  }
};


export const ShareApp = async (message) => {
  try {
    const result = await Share.share({
      message: message
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    console.log(error)
  }
}

// export const fetchRssFeed = async () => {
//   try {
//     const response = await fetch('https://economictimes.indiatimes.com/markets/stocks/rssfeeds/2146842.cms');
//     const text = await response.text();

//     parseString(text, (err, result) => {
//       if (err) {
//         console.error('Error parsing RSS feed:', err);
//       } else {
//         const parsedItems = result.rss.channel[0].item.map((item) => {
//             const description = item.description[0];
//             const imageRegex = /<img.*?src=['"](.*?)['"]/;
//             const imageMatch = description.match(imageRegex);
//             const image = imageMatch ? imageMatch[1] : null;

//             return {
//               title: item.title[0],
//               description: (description.replace(/<img.*?>/g, '')).replace(/<\/?a.*?>/g, ''), // Remove image tag from description
//               link: item.link[0],
//               pubDate: item.pubDate[0],
//               image,
//             };
//           });
//         // setFeedItems(parsedItems);
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching RSS feed:', error);
//   }
// };

export const fetchRssFeed = () => {
  return new Promise((resolve, reject) => {
    fetch('https://economictimes.indiatimes.com/markets/stocks/rssfeeds/2146842.cms')
      .then((response) => response.text())
      .then((text) => {
        parseString(text, (err, result) => {
          if (err) {
            console.error('Error parsing RSS feed:', err);
            reject(err);
          } else {
            const parsedItems = result.rss.channel[0].item.map((item) => {
              const description = item.description[0];
              const enclosure = item.enclosure[0];
              const image = enclosure ? enclosure.$.url : null;

              return {
                title: item.title[0],
                description: (description.replace(/<img.*?>/g, '')).replace(/<\/?a.*?>/g, ''), // Remove image tag from description
                link: item.link[0],
                pubDate: item.pubDate[0],
                image,
              };
            });
            resolve(parsedItems);
          }
        });
      })
      .catch((error) => {
        console.error('Error fetching RSS feed:', error);
        reject(error);
      });
  });
};

export const isEmailValid = (email) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

export const getAmount = async (amt, rate) => {
  const result = await getLocalData(LOCAL_DB.CONFIG);
  const EXCHANGE_RATE = result.INVESTMENT?.EXCHANGE_RATE;
  const currency = await getLocalData(LOCAL_DB.CURRENCY)
  let exchangeRate = rate || EXCHANGE_RATE || APP_EXCHANGE_RATE;
  let amount = 0;
  let symbol = '$';
  amt = parseFloat(amt)

  if (currency && currency.value === 'INR') {
    amount = amt
    symbol = '₹'
  } else {
    amount = (amt / exchangeRate)
    symbol = '$'
  }
  return {
    amount: parseFloat(amount.toFixed(2)),
    symbol: symbol
  };

};

export const calculateInterestPercentage = (principal, interest) => {
  if (principal == 0) {
    return 0
  }
  const percentage = ((interest / principal) * 100).toFixed(2);
  return percentage;
};

export const getLevels = (user) => {
  if (user.Level_1) {
    return 1
  } else if (user.Level_2) {
    return 2
  } else if (user.Level_3) {
    return 3
  }
}

export const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
  });
};