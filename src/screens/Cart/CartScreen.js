import React, {useRef, useState, useCallback, useContext} from 'react';
import {ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Text, Div, Button} from 'react-native-magnus';
import Wizard from 'react-native-wizard';

import CartTotalPrice from '../../components/Common/CartTotalPrice';
import {Container} from '../../themes/components';
import AppContext from '../../context/AppContext';
import CartContext from '../../context/CartContext';
import CheckoutContext from '../../context/CheckoutContext';
import CartDropdown from './CartDropdown';

import Titles from './Titles';
import Step01 from './Step01';
import Step02 from './Step02';
import Step03 from './Step03';
import Step04 from './Step04';

const CartScreen = () => {
  const wizardRef = useRef();
  const {userCart} = useContext(CartContext);
  const {user} = useContext(AppContext);
  const {selectedShippingMethod, selectedPaymentMethod} = useContext(
    CheckoutContext,
  );
  const [isLastStep, setIsLastStep] = useState();
  const [currentStep, setCurrentStep] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const stepList = [
    {
      content: <Step01 userCart={userCart} />,
    },
    {
      content: <Step02 />,
    },
    {
      content: <Step03 />,
    },
    {
      content: <Step04 />,
    },
  ];

  const handleGoTo = (step) => {
    wizardRef?.current?.goTo(step);
    setCurrentStep(step);
  };

  useFocusEffect(
    useCallback(() => {
      handleGoTo(0);
    }, [userCart]),
  );

  const isNextDisabled = () => {
    if (currentStep === 1) {
      return selectedShippingMethod ? false : true;
    }
    if (currentStep === 2) {
      return selectedPaymentMethod ? false : true;
    }
    return false;
  };

  return (
    <>
      <Titles handleGoTo={handleGoTo} currentStep={currentStep} />
      {userCart ? (
        <>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <Wizard
              ref={wizardRef}
              steps={stepList}
              isLastStep={(val) => setIsLastStep(val)}
            />
            {currentStep < 2 && <CartTotalPrice userCart={userCart} />}
            <Div bg="white">
              {!isLastStep && (
                <Button
                  onPress={() =>
                    user ? handleGoTo(currentStep + 1) : setModalVisible(true)
                  }
                  disabled={isNextDisabled()}
                  w="100%"
                  rounded={0}>
                  Weiter
                </Button>
              )}
            </Div>
          </ScrollView>
        </>
      ) : (
        <Container>
          <Text>In Ihrem Warenkorb befinden sich keine Artikel</Text>
        </Container>
      )}
      <CartDropdown
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
    </>
  );
};

export default CartScreen;
