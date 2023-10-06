import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Card } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useBusStops } from './components/getAllBusStops';
import BusStopInfoScreen from './components/getBusInfo';
import { useFonts } from 'expo-font';
// Rubber Duck by Pinisiart
// link: https://www.dafont.com/rubber-duck.font Copyright-free fonts

function HomeScreen({ navigation }) {
  const allBusStops = useBusStops(); // Fetch bus stops data using the custom hook

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    setFilteredDataSource(allBusStops);
    setMasterDataSource(allBusStops);
  }, [allBusStops]);

  ///// Search Bar Function //////////
  const searchFilterFunction = (text) => {
    const newData = masterDataSource.filter((busStop) => {
      const searchText = text.toUpperCase();
      return (
        busStop.RoadName.toUpperCase().includes(searchText) ||
        busStop.Description.toUpperCase().includes(searchText) ||
        busStop.BusStopCode.includes(text)
      );
    });
    setFilteredDataSource(newData);
    setSearch(text);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.cardContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
            placeholder="Search by Bus Stops / Street Names / Descriptions"
          />
        </View>
        {filteredDataSource.map((busStop, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              navigation.navigate('BusStopInfo', { busStopCode: busStop.BusStopCode });
            }}
          >
            <Card>
              <Text>Bus Stop No. {busStop.BusStopCode}</Text>
              <Text>Street Name: {busStop.RoadName}</Text>
              <Text>Description: {busStop.Description}</Text>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
/// Custom Header
function CustomHeader() {
  const [fontLoaded] = useFonts({
    RubberDuck: require('./assets/fonts/RubberDuck.ttf'), // Load the custom font
  });

  return (
    <ImageBackground
      source={require('./assets/images/busStops.jpg')} // Background image source
      style={styles.headerBackground}
    >
      <View style={styles.headerContent}>
        {fontLoaded && (
          <Text style={styles.headerText}>Show all Bus Stops</Text>
        )}
        <View style={styles.headerUnderline}></View>
      </View>
    </ImageBackground>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            header: () => <CustomHeader />, // Use the custom header component
            headerTitleAlign: 'center',
          }}
        />
        {/* Bus Stop Info Screen */}
        <Stack.Screen
          name="BusStopInfo"
          component={BusStopInfoScreen}
          options={{ title: "Bus Timing Info", headerTitleAlign: "center" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  headerBackground: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    padding: 10,
  },
  headerText: {
    marginTop: 30,
    fontSize: 34,
    fontWeight: 'bold',
    color: "red",
    fontFamily: 'RubberDuck', // Apply the custom font
  },
  cardContainer: {
    flex: 1,
    paddingTop: 10,
  },
  headerUnderline: {
    borderBottomWidth: 5,
    borderBottomColor: 'black',
    marginTop: 2,
  },
  searchContainer: {
    backgroundColor: 'white',
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
});

export default App;
