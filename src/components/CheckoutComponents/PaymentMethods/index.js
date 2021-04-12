import React, {useContext} from 'react';
import {Text} from 'react-native-ui-lib';

import CheckoutContext from '../../../context/CheckoutContext';
import {usePaymentMethods} from '../../../utils/hooks/useApp';
import {Styled} from './styles';

export default function PaymentMethods() {
  const {selectedPaymentMethod, setselectedPaymentMethod} = useContext(
    CheckoutContext,
  );

  const {isLoading, data} = usePaymentMethods();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      {data &&
        data.map((item) => (
          <Styled.PaymentCard
            key={item.id}
            selected={selectedPaymentMethod?.id === item.id && true}
            onPress={() => setselectedPaymentMethod(item)}>
            <Text>{item.description}</Text>
          </Styled.PaymentCard>
        ))}
    </>
  );
}
