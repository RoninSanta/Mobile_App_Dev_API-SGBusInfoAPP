# SGBusInfoAPP
A mobile app I created to show `Bus Stops` and associated `Bus Information` in Singapore, the data is being constantly updated in real-time.

This is the `Third` application I created using Expo with React Native, check out the `second` app [FoodOrderingAPP](https://github.com/RoninSanta/Mobile_Project_2-FoodOrderingAPP), and the first app I created [CalculatorAPP](https://github.com/RoninSanta/Mobile_Project_1-CalculatorAPP)

## Background
This app aims to simplify and provide a friendly UI for users to interact with Singapore's Bus API. More information about the API can be located inside the documentation [here](https://www.mytransport.sg/content/dam/datamall/datasets/LTA_DataMall_API_User_Guide.pdf). 

The API is subjected to updates constantly (usually **2-3 minutes**) since it follows the Singapore's Public Transport operational hours, fewer buses will become available after 12.30 midnight.

## Prerequisites - get API KEY
Before using this app, the first step will be to request for your own personal `API key` from **MyTransport**, which can be located [here](https://datamall.lta.gov.sg/content/datamall/en/dynamic-data.html), this process is very straight-forward and free.

It is recommended to use [**POSTMAN**](https://www.postman.com/), an API data platform to test your API key and check is you are able to retrieve the csv file properly. More details on how to do so can be found on the **MyTransport** API Documentation.

## Supported Services
Using the **MyTransport** `API KEY`, I can access many services but not all of them are currently present inside this application. In future, I am intending to support more endpoints but for now these are the available bus information displayed.

1. **Bus Arrivals Timing**
2. **Bus Services**
3. **Bus Type(Double/Single Decker)**
4. **Volume of Passangers**
5. **Timing for next subsequent Bus**
6. **Bus Stops**
7. **Bus Stop Search**

## Offline Emulation ##
- Install Andriod Studio to emulate andriod environment
[Andriod Studio](https://developer.android.com/studio)

- Install XCode to emulate IOS environment [XCode](https://developer.apple.com/xcode/)

## Online Demo ##
The link below is a online DEMO of the application run in Expo works on both Andriod and IOS.

[Expo SGBusInfoAPP DEMO HERE](https://snack.expo.dev/@joseph_shen/fyp-busarrivalapp?platform=ios)

[Screenshots]

<img src="https://github.com/RoninSanta/Mobile_Project_3-SGBusInfoAPP/assets/109457795/813cf2ea-d7b8-4258-a5f0-99f7d1e3b3b3" width="250" height="500">
<img src="https://github.com/RoninSanta/Mobile_Project_3-SGBusInfoAPP/assets/109457795/e09bea17-2de7-409e-8d3e-20468c7b25a9" width="250" height="500">
