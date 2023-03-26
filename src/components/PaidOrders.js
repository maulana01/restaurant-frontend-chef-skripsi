import React, {
  useState,
  useEffect,
  // useRef
} from 'react';
// import BackgroundTimer from 'react-native-background-timer';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  // AppState,
  ScrollView,
  Button,
} from 'react-native';
import io from 'socket.io-client';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const socket = io('http://192.168.123.238:3000'); // replace with your server address

const Orders = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [paidOrders, setpaidOrders] = useState([]);

  const fetchPaidOrders = async () => {
    try {
      const response = await fetch(
        'http://192.168.123.238:3000/api/v1/orders/paid-orders',
      );
      const json = await response.json();
      console.log('iniresponse', json.data);
      // setpaidOrders(prevpaidOrders => [...prevpaidOrders, json.data]);
      setpaidOrders(json.data);
      // return json.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('paid-orders', paidOrder => {
      setpaidOrders(prevpaidOrders => [...prevpaidOrders, paidOrder]);
      setLoading(false);
    });

    fetchPaidOrders();

    // AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      // socket.disconnect();
      paidOrders;
      // AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  // console.log('paidOrders: ', paidOrders);
  // paidOrders.push(fetchPaidOrders());

  // filter duplicate order_code
  const uniquePaidOrders = paidOrders.filter((item, index) => {
    return (
      paidOrders.findIndex(
        paidOrder => paidOrder.order_code === item.order_code,
      ) === index
    );
  });

  // console.log('uniquePaidOrders: ', uniquePaidOrders);
  // console.log('paidOrders: ', paidOrders);

  return (
    <View style={{flex: 1, padding: 18, backgroundColor: '#ffffff'}}>
      {isLoading ? (
        // <ActivityIndicator />
        <View>
          <Text>Icikiwir</Text>
          {/* <Button onPress={fetchPaidOrders} title="Refresh">
            <Text>Fetch Paid Orders</Text>
          </Button> */}
        </View>
      ) : (
        <View>
          <ScrollView>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 30,
                color: '#000',
                letterSpacing: 3,
                marginVertical: 20,
              }}>
              Daftar Pesanan
            </Text>
            {uniquePaidOrders.map((item, index) => (
              <TouchableOpacity
                activeOpacity={0.9}
                key={index}
                style={{
                  margin: 5,
                  padding: 5,
                  backgroundColor: '#408E91',
                  flexDirection: 'row',
                  borderRadius: 10,
                }}
                onPress={() =>
                  navigation.push('details', {
                    nama: item.nama,
                    order_code: item.order_code,
                    // navigation: navigation,
                  })
                }>
                <View>
                  <MaterialCommunityIcons
                    name="clipboard-outline"
                    style={{
                      color: '#fff',
                      fontSize: 120,
                      marginVertical: 15,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 55,
                      position: 'absolute',
                      left: 42.5,
                      top: 37.5,
                      color: '#fff',
                    }}>
                    {item.table_number}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    height: '100%',
                    width: '100%',
                  }}>
                  <View style={{paddingVertical: 20, paddingHorizontal: 10}}>
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: '#fff',
                      }}>
                      {item.order_code}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#fff',
                      }}>
                      {item.nama}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          color: '#fff',
                        }}>
                        Rp.
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: '#fff',
                          alignSelf: 'flex-end',
                        }}>
                        {item.payment_amount}
                      </Text>
                    </View>
                  </View>
                  <View style={{marginHorizontal: 150, marginVertical: 20}}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      {item.status}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      {/* {paidOrders.map((item, index) =>
        item.map((data, ds) => (
          <Text key={ds} style={{color: '#000000'}}>
            {data.order_code}, {data.nama}
          </Text>
        )),
      )} */}
      {/* {isLoading ? (
        <ActivityIndicator />
      ) : (
        paidOrders[0].map((item, index) => (
          <Text key={index} style={{color: '#000000'}}>
            {item.order_code}, {item.nama}
          </Text>
        ))
      )} */}
    </View>
  );
};

export default Orders;
