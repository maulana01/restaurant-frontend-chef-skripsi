import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native';

const Details = ({route, navigation}) => {
  const {nama, order_code} = route.params;
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Text>{order_code}</Text>
      <Text>{nama}</Text>
    </TouchableOpacity>
  );
};

export default Details;
