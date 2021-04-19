import React, {useContext} from 'react';
import NestedListView from 'react-native-nested-listview';
import {Div, Text, Icon} from 'react-native-magnus';
//*context
import {LocalizationContext} from '../../context/Translations';
import AppContext from '../../context/AppContext';
//*utils
import AppRoute from '../../utils/approutes';
import {setProductCategories} from '../../utils/functions';
import {useAllCategories} from '../../utils/hooks/useCategory';
//*components
import {Headline, Button} from '../../themes/components';
import LoadSpinner from '../../components/Common/LoadSpinner';

export default function CategoriesScreen({navigation}) {
  const {translations} = useContext(LocalizationContext);
  const {selectedLanguage} = useContext(AppContext);

  const {isLoading, data} = useAllCategories(selectedLanguage);

  // console.log('data :>> ', data);

  const renderNode = (node, level) => {
    const {opened, children} = node;
    const paddingLeft = level * 20;
    const arrow = children;

    return (
      <Div
        bg={opened && children ? 'light' : 'transparent'}
        borderTopColor="light"
        borderTopWidth={1}
        py={20}>
        <Div mx={10} row alignItems="center">
          {arrow && (
            <>
              <Icon
                name={opened ? 'minus' : 'plus'}
                color="red"
                fontSize="3xl"
                fontFamily="AntDesign"
              />
            </>
          )}
          <Text disabled pl={paddingLeft}>
            {node.name} {node.id}
          </Text>
          <Button
            text="All Products"
            suffix="arrow-right"
            ml="auto"
            onPress={() =>
              navigation.navigate(AppRoute.CATEGORIES_PRODUCTS, {
                category: node,
              })
            }
          />
        </Div>
      </Div>
    );
  };

  return (
    <>
      <LoadSpinner isVisible={isLoading} />
      <Headline mx={10} my={20}>
        {translations.allCategories}
      </Headline>
      {data && (
        <NestedListView
          data={setProductCategories(data, selectedLanguage)}
          getChildrenName={() => 'children'}
          renderNode={renderNode}
        />
      )}
    </>
  );
}
