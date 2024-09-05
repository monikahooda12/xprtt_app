// import React, { useState } from 'react';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import { StyleSheet } from 'react-native';

// const LocationPicker = ({ apiKey, handleLocationChange, filters, setFilters }) => {
//   const [locationIsSelected, setLocationIsSelected] = useState(false);
//    apiKey="AIzaSyD8y4F3DecFx7ayX9ECDwAsOPnaLJb8QqU"
//   return (
//     <GooglePlacesAutocomplete
//       placeholder="Select Location"
//       fetchDetails={true}
//       onPress={(data, details = null) => {
//         try {
//           const location = data.description;
//           setFilters({ ...filters, location });
//           setLocationIsSelected(true);
//           handleLocationChange(location);
//         } catch (error) {
//           console.error('Error fetching location details:', error);
//         }
//       }}
//       query={{
//         key: apiKey, // Pass the Google API Key via props
//         types: '(cities)',
//         componentRestrictions: { country: 'in' },
//       }}
//       styles={{
//         textInput: [
//           styles.input,
//           locationIsSelected ? styles.selectedInput : styles.defaultInput,
//         ],
//         container: { flex: 0 },
//       }}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   input: {
//     borderColor: '#ccc',
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 5,
//   },
//   selectedInput: {
//     borderColor: 'green',
//   },
//   defaultInput: {
//     borderColor: 'red',
//   },
// });

// export default LocationPicker;


function searchPlaces(keyword, country) {
    const apiKey = vars.gcp_key;
    const regionParam = country
      ? `&region=${encodeURIComponent(country)}`
      : '&region=ca';
    const countryRestrictions = '&components=country:ca';
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${keyword}${regionParam}${countryRestrictions}&key=${AIzaSyD8y4F3DecFx7ayX9ECDwAsOPnaLJb8QqU}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'OK') {
          const placeIds = data.predictions.map(
            prediction => prediction.place_id,
          );
          // Fetch details for each place using Geocoding API
          return Promise.all(
            placeIds.map(placeId => fetchPlaceDetails(placeId, apiKey)),
          );
        } else {
          console.error('Error:', data.status);
        }
      })
      .then(detailsArray => {
        // Extract postal codes from detailsArray
        const postalCodeResults = detailsArray
          .filter(details =>
            details.address_components.some(component =>
              component.types.includes('postal_code'),
            ),
          )
          .map(details => details.formatted_address);

        setSearchedData(prev => [...prev, ...postalCodeResults]);
      })
      .catch(error => console.error('Error:', error));
  }

/////////////////////////////////////////////

  // onChangeText={() => {
  //   handlePlacesSearch();
  // }}




  /////////////////////////////
//   function handlePlacesSearch(text) { setTimeout(function () {
//     if (text.length > 1) {
//       searchPlaces(text);
//     }
//   }, 200);
// }