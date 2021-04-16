import React, {useContext} from 'react';
import {Text} from 'react-native-magnus';
import _ from 'lodash';

import UserOrderCard from '../UserOrderCard';
import AppContext from '../../../context/AppContext';
import {useOrdersByCustomerId} from '../../../utils/hooks/useOrder';

export default function UserOrderList() {
  const {user} = useContext(AppContext);

  const {data, isLoading} = useOrdersByCustomerId(user);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  const ordered = _.orderBy(data, ['ordernumber'], ['desc']);

  return (
    <>
      {ordered.length ? (
        ordered.map((order) => <UserOrderCard key={order.id} order={order} />)
      ) : (
        <Text>Order list empty</Text>
      )}
    </>
  );
}
