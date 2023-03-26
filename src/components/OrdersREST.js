import {ActivityIndicator, View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';

const OrdersREST = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch('http://192.168.105.238:3000/api/v1/menus');
      const json = await response.json();
      setData(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        // <Text>Pesanan Belum Ada</Text>
        // 'Belum Ada Pesanan'
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <Text>
              {item.nama}, {item.harga}
            </Text>
          )}
        />
      )}
    </View>
  );
};

export default OrdersREST;
