import React from 'react';
import {Div, Button, Text, Avatar} from 'react-native-magnus';

const stepTitles = [
  'Kasse',
  'Adresse',
  'Shipping',
  'Zahlungsart',
  'Bestätigen',
];

export default function Titles({handleGoTo, currentStep}) {
  return (
    <>
      <Div row justifyContent="space-between" px={10} mt={10}>
        {stepTitles.map((title, index) => {
          return (
            <Button
              key={index}
              disabled={currentStep + 1 <= index}
              maxW="20%"
              bg="transparent"
              p={0}
              color="black"
              onPress={() => handleGoTo(index)}>
              <Div
                column
                justifyContent="center"
                alignItems="center"
                textAlign="center">
                <Text fontSize={12}>{title}</Text>
                <Avatar
                  size={30}
                  mt={10}
                  bg={currentStep === index ? 'red500' : 'blue500'}>
                  <Text color="white">{index + 1}</Text>
                </Avatar>
              </Div>
            </Button>
          );
        })}
      </Div>
    </>
  );
}
