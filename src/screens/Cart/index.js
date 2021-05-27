import React, {
  useRef,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {Div} from 'react-native-magnus';
import Wizard from 'react-native-wizard';
import StickyHeaderFooterScrollView from 'react-native-sticky-header-footer-scroll-view';
//*components
import CartTotalPrice from '../../components/Common/CartTotalPrice';
import {Container, Button, Headline} from '../../themes/components';
//*context
import CartContext from '../../context/CartContext';
import AppContext from '../../context/AppContext';

import Titles from './Titles';
import StepUserCartBox from './StepUserCartBox';
import StepAddress from './StepAddress';
import StepShipping from './StepShipping';
import StepPayments from './StepPayments';
import StepOrder from './StepOrder';
import StepForm from './StepForm';

const CartScreen = () => {
  const wizardRef = useRef();
  const {userCart} = useContext(CartContext);
  const {user} = useContext(AppContext);
  const [isLastStep, setIsLastStep] = useState();
  const [currentStep, setCurrentStep] = useState(0);
  const [isNextButtonDisable, setIsNextButtonDisable] = useState(false);

  const stepList = [
    {
      content: <StepUserCartBox userCart={userCart} />,
    },
    {
      content: (
        <StepForm user={user} setIsNextButtonDisable={setIsNextButtonDisable} />
      ),
    },
    {
      content: <StepAddress />,
    },
    {
      content: <StepShipping setIsNextButtonDisable={setIsNextButtonDisable} />,
    },
    {
      content: <StepPayments setIsNextButtonDisable={setIsNextButtonDisable} />,
    },
    {
      content: <StepOrder />,
    },
  ];

  const handleGoTo = (step) => {
    wizardRef?.current?.goTo(step);
    setCurrentStep(step);
    setIsNextButtonDisable(false);
  };

  useFocusEffect(
    useCallback(() => {
      handleGoTo(0);
    }, [userCart]),
  );

  useEffect(() => {
    !user && handleGoTo(0);
  }, [user]);

  return (
    <>
      <StickyHeaderFooterScrollView
        makeScrollable={true}
        fitToScreen={false}
        additionalHeightReserve={100}
        renderStickyHeader={() => (
          <Div backgroundColor="white" py={5}>
            <Titles handleGoTo={handleGoTo} currentStep={currentStep} />
          </Div>
        )}
        renderStickyFooter={() =>
          userCart.length ? (
            <Div backgroundColor="white">
              {currentStep === 1 ? null : (
                <CartTotalPrice userCart={userCart} />
              )}
              {!isLastStep && (
                <Div row justifyContent="center" mt={10}>
                  <Button
                    w="60%"
                    p="lg"
                    variant="secondary"
                    text="Weiter"
                    onPress={() => handleGoTo(currentStep + 1)}
                    disabled={isNextButtonDisable}
                    rounded={0}
                  />
                </Div>
              )}
            </Div>
          ) : null
        }>
        {userCart.length ? (
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
    </>
  );
};

export default CartScreen;
