import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Import AntDesign icons
import { useFonts } from 'expo-font';
import moment from 'moment';
//Choko Milky Fonts by javapep
//link: https://www.fontspace.com/choko-milky-font-f89250 Copyright free Fonts


function calculateTimeDifference(estimatedArrival) {
  const currentTime = moment(); // Get the current time
  const arrivalTime = moment(estimatedArrival);// Parse the estimated arrival time
  // Calculate the difference in minutes
  const DiffInMinutes = arrivalTime.diff(currentTime, 'minutes');
  // Condition if the timing is less than 1 minute it shows that it is Arrving
  if (DiffInMinutes < 1) {
    return 'Arriving';
  } else {
    return `${DiffInMinutes} minutes`;
  }
}

function renderLoadIcon(load) {
  switch (load) {
    case 'SEA':
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('./../assets/images/SEA.jpg')} style={{ width: 20, height: 20 }} />
          <Text style={{ marginLeft: 5 }}> Few people</Text>
          </View>
        );
    case 'LSD':
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('./../assets/images/LSD.jpg')} style={{ width: 20, height: 20 }} />
          <Text style={{ marginLeft: 5 }}> Very Crowded</Text>
          </View>
        );
    case 'SDA':
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('./../assets/images/SDA.png')} style={{ width: 20, height: 20 }} />
          <Text style={{ marginLeft: 5 }}> Slightly Crowded</Text>
          </View>
        );
    default:
      return null; // Return null if no buses available
  }

}

function renderLoadTypeIcon(type) {
    switch (type) {
      case 'DD':
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('./../assets/images/DoubleDecker.jpg')} style={{ width: 20, height: 20 }} />
            <Text style={{ marginLeft: 5 }}> (Double Decker)</Text>
          </View>
        );
      case 'SD':
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('./../assets/images/SingleDecker.jpg')} style={{ width: 20, height: 20 }} />
            <Text style={{ marginLeft: 5 }}> (Single Decker)</Text>
          </View>
        );
      case 'BD':
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('./../assets/images/BendyBus.jpg')} style={{ width: 20, height: 20 }} />
            <Text style={{ marginLeft: 5 }}> (Bendy Bus)</Text>
          </View>
        );
      default:
        return null; // Return null for no buses available
    }
}
  
function BusStopInfoScreen({ route }) {
  const { busStopCode } = route.params;
  const [busStopInfo, setBusStopInfo] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});
  const [fontLoaded] = useFonts({
    "ChokoMilky": require('./../assets/fonts/ChokoMilky.otf'),
  });

  useEffect(() => {
    if (fontLoaded) {
    fetch(`http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=${busStopCode}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        AccountKey: 'fPOHHjmQQ2Cw0HbIs3oLUw==',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setBusStopInfo(json);
        console.log(json);
        if (json.Services.length === 0) {
          Alert.alert(
            'Bus Timings Not Available',
            'Sorry, the bus timings are not available at this time. Please try again later around 7am (SGT).',
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, [busStopCode, fontLoaded]);

  const toggleCard = (index) => {
    setExpandedCards((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  if (busStopInfo === null) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!fontLoaded) {
    // Handle font loading
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
    source={require('./../assets/images/BusSingapore.jpg')} // Set the background image source
    style={styles.backgroundImage} // Apply styles for the background image
    >
    <ScrollView>
      {busStopInfo.Services.map((service, index) => (
        <TouchableOpacity key={index} onPress={() => toggleCard(index)}>
          <View style={styles.cardContainer}>
            <View style={styles.headerContainer}>
              <AntDesign
                name={expandedCards[index] ? 'upcircleo' : 'downcircleo'} // Change the icon based on card state
                style={styles.arrowIcon}
              />
              <Text style={styles.header}>Bus No: {service.ServiceNo}</Text>
            </View>
            {expandedCards[index] && (
              <View style={styles.infoContainer}>
                <Text style={styles.subHeader}>
                  Estimated Arrival: {calculateTimeDifference(service.NextBus.EstimatedArrival)}
                </Text>
                <Text style={styles.infoText}>
                  Volume of Passengers: {renderLoadIcon(service.NextBus.Load)}
                </Text>
                <Text style={styles.infoText}>Bus Type: {renderLoadTypeIcon(service.NextBus.Type)}</Text>
                <View>
                <Text style={{ fontWeight: 'bold' }}>
                  Next Estimated Arrival: {calculateTimeDifference(service.NextBus2.EstimatedArrival)}
                </Text>
                <Text>
                  Volume of Passengers: {renderLoadIcon(service.NextBus2.Load)}
                </Text>
                <Text>Bus Type: {renderLoadTypeIcon(service.NextBus2.Type)}</Text>
              </View>
              <View>
                <Text style={{ fontWeight: 'bold' }}>
                  Last Estimated Arrival: {calculateTimeDifference(service.NextBus3.EstimatedArrival)}
                </Text>
                <Text>
                  Volume of Passengers: {renderLoadIcon(service.NextBus3.Load)}
                </Text>
                <Text>Bus Type: {renderLoadTypeIcon(service.NextBus3.Type)}</Text>
              </View>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ))}
      {busStopInfo.Services.length === 0 && (
        <View style={styles.cardContainer}>
          <Text style={styles.header}>Bus Timings Not Available</Text>
          <Text>
            Sorry, the bus timings are not available at this time. Please try again later around 7am (SGT).
          </Text>
        </View>
      )}
    </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain' as per your preference
  },
  cardContainer: {
    padding: 16,
    marginLeft: 10,
    marginRight:10,
    marginTop: 15,
    borderWidth: 10,
    borderColor: '#ddd',
    borderRadius: 20,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
    color: "#FFA600",
    fontFamily: "ChokoMilky",
  },
  subHeader: {
    fontWeight: 'bold',
  },
  infoContainer: {
    marginTop: 8,
  },
  infoText: {
    marginBottom: 4,
  },
    arrowIcon: {
    fontSize: 20,
    marginRight:20,
  },
});

export default BusStopInfoScreen;