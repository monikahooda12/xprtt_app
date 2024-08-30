import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Button,
  Image,
} from 'react-native';
import { API } from '../constants';
import { httpRequest } from '../api/http';
import { cleanSingle } from 'react-native-image-crop-picker';

import { faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import { RNSVGFeColorMatrix } from "react-native-svg";




const FiveStartIconForRate = ({ onRate, rating }) => {
  const [selectedRating, setSelectedRating] = useState(rating);

  useEffect(() => {
    setSelectedRating(rating);
  }, [rating]);

  const handleRate = (rate) => {
    setSelectedRating(rate);
    onRate(rate);
  };
   
  return (
    <View style={styles.ratingContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => handleRate(star)}>
          <Text style={selectedRating >= star ? styles.starSelected : styles.star}>
            ★
          </Text>

          <Text>{}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const Review = ({ id }) => {
  console.log(id, 'value id in review page');

  const [reviewStar, setReviewStar] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [totalPage,setTotalPage] = useState(0);
  const [currentPage,setCurrentPage] = useState(0);
  const [totalCount,setTotalCount] = useState(0);

  useEffect(() => {
     fetchReviews();
  }, []);

  // Added this function to fetch reviews
  const fetchReviews = async () => {
    try {
      const response = await httpRequest({
        //  url: `${API.REVIEWS}/${id}`, 
         url: API.REVIEWS,
        method: 'GET',
        params:{expert_id:id},

      });
      if (response.data) {
        setReviews(response.data.list);
        setTotalPage(response.data.totalPage);
        setCurrentPage(response.data.currentPage);
        setTotalCount(response.data.totalCount);

        console.log('response', response.data);
      }
    } catch (error) {
      console.warn('Error fetching reviews:', error.message);
    }
  };

  const ReviewUser = async () => {
    try {
      const reviewResponse = await httpRequest({
        //  url: `${API.REVIEWS}/${id}`,
        url: API.REVIEWS, 
        method: 'POST',
        data: {  // Changed from params to data
          rating: reviewStar,
          review: reviewComment,
          expert_id:id,
          
        },
        
      });
      console.log('id',id)

      if (reviewResponse.data) {
        alert('Review submitted successfully');
        fetchReviews();  // Refresh the reviews after submission
        setReviewStar(0);
        setReviewComment('');
      } else {
        alert('Failed to submit review');
      }
    } catch (error) {
      console.warn('Error submitting review:', error.message);
    }
  };    

  const handleReview = () => {
    ReviewUser();
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.reviewContainer}>
      
      <View style={styles.userInfoContainer}>
        {item.user.profile_image ? (
          <Image 
            source={{ uri: item.user.profile_image }} 
            style={styles.profileImage} 
          />
        ) : (
          <View style={styles.placeholderImage} />
        )}
        <View>
          <View style={{display:'flex', flexDirection:'row', gap:95,}}>
          <Text style={styles.userName}>{item.user.name || 'Anonymous'}</Text>
          <Text style={{color:"#FFDC60"}}> ★ ★ ★ ★ ★</Text>
          </View>
          <Text style={styles.userLocation}>
            {item.user.city && item.user.state 
              ? `${item.user.city}, ${item.user.state}`
              : 'Location not provided'}
          </Text>
        </View>
      </View>
      <Text style={styles.reviewText}>{item.review}</Text>
      <Text style={styles.ratingText}>Rating: {item.rating}/5</Text>
      <Text style={styles.dateText}>
        {new Date(item.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row',gap:120}}>
      <Text style={styles.heading}>Reviews ({totalCount})</Text>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.writeReviewText}>Write a review</Text>
      </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Button title="Close" onPress={() => setModalVisible(false)} />
            <FiveStartIconForRate onRate={setReviewStar} rating={reviewStar} />
            <TextInput
              style={styles.textarea}
              placeholder="Write your Review"
              value={reviewComment}
              onChangeText={setReviewComment}
              multiline
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleReview}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

         <FlatList
        data={reviews}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />

    </View>
  );
};





const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  writeReviewText: {
    color: '#007AFF',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  textarea: {
    height: 100,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  submitButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#FFFFFF',
  },
  reviewContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userName: {
    fontWeight: 'bold',
    fontSize:24,
  },
  reviewText: {
    marginTop: 5,
  },
  ratingText: {
    marginTop: 5,
    color: '#888',
  },
  dateText: {
    marginTop: 5,
    color: '#888',
  },
  listContainer: {
    paddingBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  star: {
    fontSize: 30,
    color: '#FFDC60',
  },
  starSelected: {
    fontSize: 30,
    color: 'gold',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  placeholderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  userLocation: {
    color: '#666',
    fontSize: 14,
  },





});

export default Review;

 



