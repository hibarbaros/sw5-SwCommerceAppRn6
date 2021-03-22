import {createContext} from 'react';

const CheckoutContext = createContext([{}, () => {}]);

import React, {useState} from 'react';

export const CheckoutProvider = ({children}) => {
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
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContext;
