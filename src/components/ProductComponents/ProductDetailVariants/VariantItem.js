import React, {createRef, useState} from 'react';
import { Dropdown, Button, Text, Div } from 'react-native-magnus';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

export default function VariantItem({ item, details, handleSetVariant }) {
  const dropdownRef = createRef();
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemName, setSelectedItemName] = useState(null);

  const mapped = _.map(details, 'configuratorOptions');
  const flattenDeep = _.flattenDeep(mapped);
  const unique = _.uniqBy(flattenDeep, 'id');
  const filtered = _.filter(unique, { groupId: item.id });

  return (
    <Div>
      <Button
        block
        bg="pink500"
        mt="sm"
        p="md"
        color="white"
        onPress={() => dropdownRef.current.open()}
      >
        <Text color="white" fontSize="xl">
          {item.name} - {selectedItemName}
        </Text>
      </Button>
      {filtered && (
        <Dropdown
          ref={dropdownRef}
          title={
            <Text mx="xl" color="gray500" pb="md">
              {item.name}
            </Text>
          }
          mt="md"
          pb="2xl"
          showSwipeIndicator={true}
          roundedTop="xl"
        >
          {filtered.map((variant) => (
            <Dropdown.Option
              key={variant.id}
              py="md"
              px="xl"
              block
              underlayColor="gray100"
              suffix={selectedItem === variant.id && <Icon name="check" size={30} color="#900" />}
              disabled={selectedItem === variant.id}
              onPress={() => {
                handleSetVariant(variant);
                setSelectedItem(variant.id);
                setSelectedItemName(variant.name);
              }}
            >
              {variant.name}
            </Dropdown.Option>
          ))}
        </Dropdown>
      )}
    </Div>
  );
}
