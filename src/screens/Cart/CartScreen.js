import React, {useRef, useState, useCallback, useContext} from 'react';
import {ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Text, Div, Button} from 'react-native-magnus';
import Wizard from 'react-native-wizard';

import CartTotalPrice from '../../components/Common/CartTotalPrice';
import {Container} from '../../themes/components';
import CartContext from '../../context/CartContext';
import {useMigrateUserCart} from '../../utils/hooks/useCart';

import Titles from './Titles';
import Step01 from './Step01';
import Step02 from './Step02';
import Step03 from './Step03';
import Step04 from './Step04';

const CartScreen = () => {
  const wizardRef = useRef();
  const {userCart} = useContext(CartContext);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLastStep, setIsLastStep] = useState();
  const [currentStep, setCurrentStep] = useState(0);

  const {mutate} = useMigrateUserCart();

  const stepList = [
    {
      content: <Step01 userCart={userCart} />,
    },
    {
      content: <Step02 setIsDisabled={setIsDisabled} />,
    },
    {
      content: <Step03 setIsDisabled={setIsDisabled} />,
    },
    {
      content: <Step04 setIsDisabled={setIsDisabled} />,
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

  return (
    <>
      <Titles handleGoTo={handleGoTo} currentStep={currentStep} />
      {userCart ? (
        <>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={{paddingBottom: 200}}>
            <Wizard
              ref={wizardRef}
              steps={stepList}
              isLastStep={(val) => setIsLastStep(val)}
            />
            <Button
              onPress={() => mutate()}
              disabled={isDisabled}
              w="100%"
              rounded={0}>
              Migrate
            </Button>
          </ScrollView>

          <Div position="absolute" bottom={0} bg="white">
            {!isLastStep ? (
              <>
                <CartTotalPrice userCart={userCart} />
                <Button
                  onPress={() => handleGoTo(currentStep + 1)}
                  disabled={isDisabled}
                  w="100%"
                  rounded={0}>
                  Weiter
                </Button>
              </>
            ) : null}
          </Div>
        </>
      ) : (
        <Container>
          <Text>In Ihrem Warenkorb befinden sich keine Artikel</Text>
        </Container>
      )}
    </>
  );
};

export default CartScreen;
