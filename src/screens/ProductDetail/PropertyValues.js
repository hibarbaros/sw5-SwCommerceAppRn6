import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Api from '../../utils/api';
export default function PropertyValues({valueId}) {
  const [value, setValue] = useState(0);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    Api.get(`/propertyGroups/${valueId}`)
      .then((res) => {
        setValue(res.data);
      })
      .then(() => {
        setloading(true);
      });
  }, []);

  return (
    <>
      <View>{loading && <Text>{value.name}</Text>}</View>
    </>
  );
}
