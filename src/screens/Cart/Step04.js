import React from 'react';
import {Text, Button} from 'react-native-magnus';

import {useCreateOrder, useOrderByOrderId} from '../../utils/hooks/useOrder';

import LoadSpinner from '../../components/Common/LoadSpinner';

export default function Step04() {
  const {mutate, isLoading, data = null} = useCreateOrder();

  const {data: orderData} = useOrderByOrderId(data);

  console.log(`orderData`, orderData);
  console.log(`data`, data);

  return (
    <>
      <LoadSpinner isVisible={isLoading} />
      <Text>Order</Text>
      <Button onPress={() => mutate()}>Order</Button>
      {orderData && (
        <>
          <Text>Order number : {orderData.number}</Text>
          <Text>Order Date : {orderData.orderTime}</Text>
          <Text>Invoice Amount Net : {orderData.invoiceAmountNet}</Text>
          <Text>Invoice Amount : {orderData.invoiceAmount}</Text>
          <Text>Invoice Shipping : {orderData.invoiceShipping}</Text>
          <Text>Invoice Shipping : {orderData.invoiceShipping}</Text>
        </>
      )}
    </>
  );
}
