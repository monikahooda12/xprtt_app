import { API, LOCAL_DB } from "../constants";
import { deleteAllLocalData, deleteLocalData, getLocalData } from "../utils";
import { successToast, errorToast} from "../components";
import NavigationService from '../navigator/NavigationService';

export const httpRequest = async (data) => {  

  let controller = new AbortController();
  let signal = controller.signal;
  setTimeout(() => controller.abort(), 20000);  // abort after 20 seconds

  const { url, params, method, alert } = data
  const token = await getLocalData(LOCAL_DB.TOKEN);
  const apiPath = API.BASE_URL + API.VERSION + url
  let response;

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }

  try {

    if (method == "POST" || method == "PUT" || method == "DELETE") {
      response = await fetch(apiPath, { method, headers, body: JSON.stringify(params), signal })
    } else if (method == "GET") {
      const payload = new URLSearchParams(params)
      console.log(apiPath + "?" + payload,"0000000000000000000000000000000000000999999" )
      console.log( payload,"0000000000000000000000000000000000000999999" )
      response = await fetch(apiPath +"?"+  payload, { method, headers, signal })

    }

    console.log(response.status)

    if(response.status==401) {
      errorToast('Please Login again to Continue')
      await deleteAllLocalData();
      return NavigationService.navigate('Splash')
    }

    const responseObj = await response.json();
    console.log(JSON.stringify((responseObj),null,2));

    if (!response.ok) {
      errorToast(responseObj.message);
      throw new Error(responseObj.message);
    } else {
      if (alert)
        successToast(responseObj.message);
    }
    return responseObj;
  } catch (error) {
    //Gaurav - Screen implementation on Network Error.
     errorToast(error.message);
    throw new Error(error.message);
  }

};