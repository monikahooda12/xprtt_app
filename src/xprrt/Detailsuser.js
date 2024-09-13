import React, {useState} from 'react';
import { View,Text,StyleSheet,Image, ScrollView, TouchableOpacity,Linking,Dimensions, Modal,
} from 'react-native';
import Review from './Review';
import {useNavigation, useRoute} from '@react-navigation/native';

//components
import {Professional} from '../components/cards/ProfessionalDetails';
// import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

const {width} = Dimensions.get('window');
const placeholder_image = {uri: 'https://via.placeholder.com/150'};

const LazyImage = ({source, style, placeholder}) => {
  const [loaded, setLoaded] = useState(false);
  

  return (
    <View style={style}>
      <Image
        source={placeholder_image}
        style={[
          style,
          {position: 'absolute', top: 0, left: 0, opacity: loaded ? 0 : 1},
        ]}
      />
      <Image
        source={source}
        style={[style, {opacity: loaded ? 1 : 0}]}
        onLoad={() => setLoaded(true)}
      />
    </View>
  );
};

const Detailsuser = () => {
  const route = useRoute();
  const {data, portfolio} = route.params;
  console.log("portfolio data",portfolio)
  const [showCoverImages, setShowCoverImages] = useState(false);
const  navigation = useNavigation();
  const Card = ({children}) => <View style={styles.card}>{children}</View>;

  const Section = ({title, children}) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionUnderline} />
      {children}
    </View>
  );

  const DetailItem = ({label, value, isDescription}) => (
    <View style={styles.detailItem}>
      <Text style={styles.detailLabel}>{label}</Text>
      {/* <Text style={styles.detailValue}>{value}</Text> */}
      <Text
        style={isDescription ? styles.detailDescription : styles.detailValue}>
        {value}
      </Text>
    </View>
  );

  const DetailItemAbl = ({label, value}) => (
    <View style={styles.detailItemAbl}>
      <Text style={styles.detailLabelAbl}>{label}</Text>
      <View style={styles.detailValueContainer}>
        {typeof value === 'string' ? (
          <Text style={styles.detailValueAbl}>{value}</Text>
        ) : (
          value
        )}
      </View>
    </View>
  );

  const ServiceDetail = ({label, value}) => (
    <View style={styles.servicedetailItem}>
      <Text style={styles.servicedetailLabel}>{label}</Text>
      <Text style={styles.servicedetailValue}>{value}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Card>
        <View style={styles.profileHeader}>
          {data.professional.cover_images
            .slice(0, 1)
            .map((coverImage, coverImageIndex) => (
              <LazyImage
                key={coverImageIndex}
                source={{
                  uri: coverImage,
                }}
                style={styles.profileImage}
              />
            ))}

          <View style={styles.overlay}>
            <View style={styles.nameLocationContainer}>
           <Text style={styles.name}>{data.name}</Text>
           <View>
                <View style={styles.locationContainer}>
                <Image
                  source={require('../assets/icons/carbon_location-filled.png')}
                  style={{height: 16, width: 16}}
                />
                 
                <Text style={styles.location}>
                  {data.city}, {data.state}
                </Text>
                </View>
              </View>
            </View>
            <View style={styles.skillsContainer}>
  {data.professional.skill.slice(0,1).map((obj, index) => (
    <View
      key={index}
      style={styles.row}>
      {Object.values(obj).map((value, itemIndex) => (
        <TouchableOpacity
          key={itemIndex}
          style={[
            styles.skill,
            itemIndex !== Object.values(obj).length - 1
              ? styles.itemMargin
              : null,
          ]}>
          <Text style={styles.skillText}>
            {typeof value === 'string' ? value : '-'}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  ))}
  <TouchableOpacity style={styles.moreButton}>
    <Text style={styles.skill}>+3...</Text>
  </TouchableOpacity>
</View>



          </View>
        </View>

        <TouchableOpacity
          style={styles.coverImagesButton}
          onPress={() => setShowCoverImages(true)}>
          <LazyImage
            source={require('../assets/icons/IC_Bookmark.png')}
            style={{height: 20, width: 20, color: '#FFFFFF'}}
            />
        </TouchableOpacity>
      </Card>

      <Card>
        <View>
          <Text style={styles.title}>{data.professional.job_title}</Text>
        </View>
        <Section title="Professional Details">
          <View style={styles.detailItemskill}>
            <DetailItem label="Job Title" value={data.professional.job_title} />
            <DetailItem label="Bio" value={data.professional.bio} />
          </View>
        </Section>
      </Card>

      <Card></Card>

      <Card>
        <View
          style={{backgroundColor: '#FOFOFO', padding: 13, borderRadius: 10}}>
          <Section title="Availability">
            {Object.entries(data.professional.availability).map(
              ([day, {isOpen, timings}]) => (
                <DetailItemAbl
                key={day}
                label={day.charAt(0).toUpperCase() + day.slice(1)}
                style={styles.card}
                value={
                  <View
                  style={{display: 'flex', flexDirection: 'row', gap: 60}}>
                      <Text
                        style={[
                          styles.statusIcon,
                          isOpen ? styles.openIcon : styles.closedIcon,
                        ]}>
                        {isOpen ? '✓' : '✗'}
                      </Text>
                      <Text style={{paddingLeft: 20}}>
                        {isOpen
                          ? Array.isArray(timings)
                            ? timings.join(' - ') // Convert array to "10:00 - 19:00"
                            : 'Invalid timings'
                          : 'Closed'}
                      </Text>
                    </View>
                  }
                  />
                 
                ),
              )}
          </Section>
        </View>
      </Card>
      <Card>
        <View style={styles.servicecontainer}>
          <Text style={styles.Servicetitle}>SERVICES</Text>
          {data.professional.service.map((service, index) => (
            <View key={index} style={styles.serviceItem}>
              <ServiceDetail label="Title" value={service.servicetitle} />
              <ServiceDetail label="Category" value={service.servicecategory} />
              <ServiceDetail
                label="Price Range"
                value={`${service.min_price} - ${service.max_price}`}
              />
              <ServiceDetail
                label="Description"
                value={service.description}
                isDescription={true}
              />
            </View>
          ))}
          <TouchableOpacity style={styles.servicecontactButton} onPress={() => navigation.navigate("Contactme")} >
            <Text style={styles.servicecontactButtonText}>Contact Me</Text>
          </TouchableOpacity>
        </View>
      </Card>
      <Card>
        {/* ////////////skilll/////// */}
        <Section title="Skills">
          {data.professional.skill.map((obj, index) => (
            <View
              key={index}
              style={[styles.row, index % 2 === 0 ? styles.evenRow : null]}>
              {Object.values(obj).map((value, itemIndex) => (
                <View
                  key={itemIndex}
                  style={[
                    styles.item,
                    itemIndex !== Object.values(obj).length - 1
                      ? styles.itemMargin
                      : null,
                  ]}>
                  <Text style={styles.itemText}>
                    {typeof value === 'string' ? value : '-'}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </Section>
      </Card>
      {/* //////language///// */}
      <Card>
        <Section title="Language">
          {data.professional.language.map((obj, index) => (
            <View
              key={index}
              style={[styles.row, index % 2 === 0 ? styles.evenRow : null]}>
              {Object.values(obj).map((value, itemIndex) => (
                <View
                  key={itemIndex}
                  style={[
                    styles.item,
                    itemIndex !== Object.values(obj).length - 1
                      ? styles.itemMargin
                      : null,
                  ]}>
                  <Text style={styles.itemText}>
                    {typeof value === 'string' ? value : '-'}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </Section>
      </Card>

      {/* /////////////education/////// */}
      <Card>
        <Section title="Education">
          {data.professional.education.map((obj, index) => (
            <View key={index} style={[index % 2 === 0 ? styles.evenRow : null]}>
              <Text style={styles.text}>
                {obj.degree} - {obj.subjects}
              </Text>
              <Text style={styles.text}>
                {obj.university} - {obj.passing_year}
              </Text>
            </View>
          ))}
        </Section>
      </Card>

      {/* ///////////////////////////experience ///////////////////*/}
      <Card>
        <Section title="Experience">
          {data.professional.experience.map((exp, index) => (
            <View key={index} style={styles.detailItemskill}>
              <DetailItem label="Role" value={exp.role} />
              <DetailItem label="Job Title" value={exp.job_title} />

              <DetailItem label="Location" value={exp.location} />
              <DetailItem label="Company" value={exp.company_name} />
              <DetailItem label="Description" value={exp.description} />
            </View>
          ))}
        </Section>
      </Card>

      {/* /////////////////////////total///////////////// */}
      <Card>
        <Section title="Totalexpercience">
          <View style={styles.detailItemskill}>
            <View styles={styles.detailItemskill}>
              {/* <DetailItem> */}
              <Text style={styles.detailValue}>
                Total Experience: {data.professional.total_experience} years
              </Text>
              {/* </DetailItem> */}
            </View>
          </View>
        </Section>
      </Card>

      {/* //////////////website//////////// */}
      <Card>
        <Section title="Website">
          <TouchableOpacity
            onPress={() => Linking.openURL(user.professional.website)}>
            <Text style={styles.link}>{data.professional.website}</Text>
          </TouchableOpacity>
        </Section>
      </Card>
      <Modal
        visible={showCoverImages}
        transparent={true}
        onRequestClose={() => setShowCoverImages(false)}>
        <View style={styles.modalContainer}>
          <ScrollView horizontal pagingEnabled>
            {data.professional.cover_images.map((coverImage, index) => (
              <LazyImage
                key={index}
                source={{uri: coverImage}}
                style={styles.modalImage}
              />
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowCoverImages(false)}>
            <LazyImage
              source={require('../assets/icons/IC_Bookmark.png')}
              style={{height: 20, width: 20}}
            />
          </TouchableOpacity>
        </View>
      </Modal>
      
      <Review id={data.professional.id} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Portfolio</Text>
        {data.professional.portfolio.map((portfolio, portfolioIndex) => (
          <TouchableOpacity
            key={portfolioIndex}
            onPress={() => Linking.openURL(portfolio.link)}>
            <Text style={styles.link}>{portfolio.link}</Text>
            {/* Uncomment if image URL is valid and available */}
            {/* <LazyImage
              source={{uri: portfolio.image}}
              style={styles.portfolioImage}
            /> */}
            {/* <Text>{portfolio.details}</Text> */}
            <Text>{portfolio.description}</Text>
            <Text>{portfolio.portfolio_title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};
console.log('object', Professional);

const styles = StyleSheet.create({
  detailLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  detailValue: {
    fontSize: 14,
    color: '#888',
  },

  detailItemskill: {
    justifyContent: 'space-between',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    marginBottom: 10,
    padding: 12,
  },
  subDetailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  container: {
    backgroundColor: '#f8f9fa',
    margin: 15,
  },
  profileHeader: {
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    aspectRatio: 11.5 / 9,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'space-between',
    padding: 20,
  },
  nameLocationContainer: {},//////////////cover image///
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    
  },
  locationContainer: {
    flexDirection: 'row',
     alignItems: 'center',
    //  marginVertical: 25,
     marginTop:160,
     
     
  },
  location: {
    fontSize: 16,
     color:'white',
    

  },
  //////coverimage k uper skill show.....
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  skill: {
     backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 8,
    // marginBottom: -19,
  },
  skillText: {
    color: '#fff',
    fontSize: 14,
  },
  moreButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  coverImagesButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Roboto-Black',
    color: '#363C45',
    fontWeight: '500',
    height: 21.09,
    marginBottom: 10,
  },
  sectionUnderline: {
    height: 2,
    Width: 33,
    border: 1,
    backgroundColor: '#D5D5D5',
    width: 50,
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    flex: 2,
    textAlign: 'right',
  },
  subSection: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  portfolioLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  link: {
    color: '#007AFF',
    textDecorationLine: 'underline',
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: width * 0.8,
    height: width * 0.6,
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  ///////////////service
  servicecontainer: {
    padding: 20,
    backgroundColor: '#3E5B99',
    borderRadius: 10,
    //  margin: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  Servicetitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  serviceItem: {
    padding: 15,
    backgroundColor: '#4A6FA5',
    borderRadius: 5,
    marginBottom: 10,
  },
  servicedetailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  servicedetailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  servicedetailValue: {
    fontSize: 16,
    color: '#FFD700',
    justifyContent: 'flex-end',
    marginLeft: 96,
    marginRight: 62,
  },
  servicecontactButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  servicecontactButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3E5B99',
  },

  detailDescription: {
    fontSize: 16,
    color: '#FFD700',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  ////////////////////////////alb
  detailLabelAbl: {
    fontSize: 18,
    flex: 1,
    fontWeight: 'bold',
  },
  detailValueAbl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailItemAbl: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  statusIcon: {
    fontSize: 18,
    width: 24,
    textAlign: 'center',
    marginRight: 8,
  },
  openIcon: {
    color: '#4CAF50',
  },
  closedIcon: {
    color: '#F44336',
  },
  hours: {
    fontSize: 16,
    color: '#757575',
  },
  card: {
    display: 'flex',
    justifyContent: 'between',
  },
  //////////////////////////expercience////////////
  experienceItem: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  role: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  companyLocation: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'black',
  },
  company: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'black',
    marginRight: 10,
  },
  location: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'black',
  },
  description: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    fontWeight: 'bold',
  },
  portfolioImage: {
    height: 150,
    width: 150,
    marginTop: 12,
    borderRadius: 7,
  },
  /////////skill,language,education/////
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  evenRow: {
    backgroundColor: '#eee', // Light background for even rows
  },
  item: {
    padding: 16,
  },
  itemMargin: {
    marginRight: 16,
  },
  itemText: {
    flex: 1,
    textAlign: 'center',
  },
});

export default Detailsuser;