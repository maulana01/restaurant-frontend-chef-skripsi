import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native';

const ProcessedOrders = ({route, navigation}) => {
  // const {nama, order_code} = route.params;
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Text>Test123</Text>
    </TouchableOpacity>
  );
};

export default ProcessedOrders;
