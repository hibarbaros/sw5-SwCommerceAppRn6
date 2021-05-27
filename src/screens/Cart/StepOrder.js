import React from 'react';
import {Text} from 'react-native-magnus';

import {useCreateOrder, useOrderByOrderId} from '../../utils/hooks/useOrder';

import LoadSpinner from '../../components/Common/LoadSpinner';
import {Button} from '../../themes/components';

export default function StepOrder() {
  const {mutate, isLoading, data = null} = useCreateOrder();

  const {data: orderData} = useOrderByOrderId(data);

  return (
    <>
      <LoadSpinner isVisible={isLoading} />
      <Text>Order</Text>
      <Button text="Checkout" onPress={mutate} />
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
