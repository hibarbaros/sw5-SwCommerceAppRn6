import React, {useState} from 'react';
import CheckoutContext from './CheckoutContext';

const CheckoutProvider = (props) => {
  const [selectedBilllingAddress, setselectedBilllingAddress] = useState(null);
  const [selectedShippingAddress, setselectedShippingAddress] = useState(null);
  const [selectedPaymentMethod, setselectedPaymentMethod] = useState(null);
  const [selectedShippingMethod, setselectedShippingMethod] = useState(null);

  return (
    <CheckoutContext.Provider
      value={{
        selectedBilllingAddress,
        setselectedBilllingAddress,
        selectedShippingAddress,
        setselectedShippingAddress,
        selectedPaymentMethod,
        setselectedPaymentMethod,
        selectedShippingMethod,
        setselectedShippingMethod,
      }}>
      {props.children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutProvider;
