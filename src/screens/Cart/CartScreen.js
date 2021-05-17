import React, {useRef, useState, useCallback, useContext} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {Div} from 'react-native-magnus';
import Wizard from 'react-native-wizard';
import StickyHeaderFooterScrollView from 'react-native-sticky-header-footer-scroll-view';
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
import Step05 from './Step04';

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
    {
      content: <Step05 />,
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
      <StickyHeaderFooterScrollView
        makeScrollable={true}
        fitToScreen={false}
        renderStickyHeader={() => (
          <Div backgroundColor="white" py={5}>
            <Titles handleGoTo={handleGoTo} currentStep={currentStep} />
          </Div>
        )}
        renderStickyFooter={() => (
          <Div backgroundColor="white">
            {currentStep < 3 && <CartTotalPrice userCart={userCart} />}
            {!isLastStep && (
              <Div row justifyContent="center">
                <Button
                  block
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
          </Div>
        )}>
        {userCart?.length ? (
          <Container>
            <Wizard
              ref={wizardRef}
              steps={stepList}
              isLastStep={(val) => setIsLastStep(val)}
            />
          </Container>
        ) : (
          <Container>
            <Headline variant="h1">
              In Ihrem Warenkorb befinden sich keine Artikel
            </Headline>
          </Container>
        )}
      </StickyHeaderFooterScrollView>
      <CartDropdown
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
    </>
  );
};

export default CartScreen;
