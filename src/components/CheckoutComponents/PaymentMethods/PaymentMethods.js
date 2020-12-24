import React, {useState, useContext} from 'react';
import {useQuery} from 'react-query';
import {Text} from 'react-native-ui-lib';

import CheckoutContext from '../../../context/CheckoutContext';

import {paymentsData} from '../../../utils/actions/appactions';
import {Styled} from './styles';

export default function PaymentMethods() {
  const {setselectedPaymentMethod} = useContext(CheckoutContext);

  const [isSelected, setIsSelected] = useState(null);

  const {isLoading, error, data} = useQuery('paymentMethodsData', () =>
    paymentsData(),
  );

  isLoading && <Text>Loading...</Text>;

  error && <Text>{error.message}</Text>;

  function handleSetSelected(item) {
    setIsSelected(item.id);
    setselectedPaymentMethod(item);
  }

  return (
    <>
      {data &&
        data.map((item) => (
          <Styled.PaymentCard
            key={item.id}
            selected={isSelected === item.id && true}
            onPress={() => handleSetSelected(item)}>
            <Text>{item.description}</Text>
          </Styled.PaymentCard>
        ))}
    </>
  );
}
