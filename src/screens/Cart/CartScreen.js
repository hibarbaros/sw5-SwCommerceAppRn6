import React, {useRef, useState, useCallback, useContext} from 'react';
import {ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Div} from 'react-native-magnus';
import Wizard from 'react-native-wizard';
//*components
import CartTotalPrice from '../../components/Common/CartTotalPrice';
import {Container, Button, Headline} from '../../themes/components';
import CartDropdown from './CartDropdown';
//*context
import CheckoutContext from '../../context/CheckoutContext';
import CartContext from '../../context/CartContext';
import AppContext from '../../context/AppContext';

import Titles from './Titles';
import Step01 from './Step01';
import Step02 from './Step02';
import Step03 from './Step03';
import Step04 from './Step04';

const CartScreen = () => {
  const wizardRef = useRef();
  const scrollRef = useRef();
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
      {userCart.length ? (
        <ScrollView ref={scrollRef} contentInsetAdjustmentBehavior="automatic">
          <Wizard
            ref={wizardRef}
            steps={stepList}
            isLastStep={(val) => setIsLastStep(val)}
          />
          {currentStep < 2 && <CartTotalPrice userCart={userCart} />}

          {!isLastStep && (
            <Div row justifyContent="center" mb={20}>
              <Button
                w="60%"
                text="Weiter"
                onPress={() => {
                  user ? handleGoTo(currentStep + 1) : setModalVisible(true);
                  scrollRef.current?.scrollTo({
                    y: 0,
                  });
                }}
                disabled={isNextDisabled()}
                rounded={0}
              />
            </Div>
          )}
        </ScrollView>
      ) : (
        <Container>
          <Headline variant="h1">
            In Ihrem Warenkorb befinden sich keine Artikel
          </Headline>
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
