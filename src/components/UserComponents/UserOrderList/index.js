import React, {useContext} from 'react';
import {Text} from 'react-native-ui-lib';
import _ from 'lodash';

import UserOrderCard from '../UserOrderCard';
import AppContext from '../../../context/AppContext';
import {useOrdersByCustomerId} from '../../../utils/hooks/useOrder';

export default function UserOrderList() {
  const {user} = useContext(AppContext);

  const {data: userOrderList, isLoading} = useOrdersByCustomerId(user);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  const ordered = _.orderBy(userOrderList, ['ordernumber'], ['desc']);

  return (
    <>
      {ordered.map((order) => (
        <UserOrderCard key={order.id} order={order} />
      ))}
    </>
  );
}
