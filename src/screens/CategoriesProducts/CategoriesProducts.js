import React, {useState, useRef, useContext} from 'react';
import {FlatList, Modal, SafeAreaView} from 'react-native';
import _ from 'lodash';
import {Button} from '@ui-kitten/components';

import {
  CloseIcon,
  SettingsIcon,
  FilterIcon,
} from '../../themes/components/IconSet';
import TopNavigationModal from '../../components/Common/TopNavigationModal';
import {useCategoryByCategoryId} from '../../utils/hooks/useCategory';
import ProductCard from '../../components/Common/ProductCard';
import LoadSpinner from '../../components/Common/LoadSpinner';
import ProductAttributes from '../../components/ProductComponents/ProductAttributes';
import CategoriesProductOrder from '../../components/ProductComponents/CategoriesProductOrder';
import {Styled} from './styles';

import FilterContext from '../../context/FilterContext';

export default function CategoriesProducts({route}) {
  const actionSheetRef = useRef();
  const {
    setSelectedOptions,
    filteredProducts,
    setFilteredProducts,
  } = useContext(FilterContext);

  const {category} = route.params;
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [multiSliderValue, setMultiSliderValue] = useState([0, 0]);
  // const [highestPrice, setHighestPrice] = useState(null);

  const {data, isLoading} = useCategoryByCategoryId(category.id, {
    onSuccess: (response) => {
      setFilteredProducts(_.unionBy(response.products, 'articleID'));
    },
  });

  if (isLoading) {
    return <LoadSpinner isVisible={true} />;
  }

  const uniqueData = _.unionBy(data.products, 'articleID');

  // function handleProductsPriceFilter() {
  // 	var listOfvalues = [];
  // 	for (var i = 0; i < products.length; i++) {
  // 		if (
  // 			products[i].price > multiSliderValue.rangeLow &&
  // 			products[i].price < multiSliderValue.rangeHigh
  // 		) {
  // 			listOfvalues.push(products[i]);
  // 		}
  // 	}
  // 	setProducts(listOfvalues);
  // }

  return (
    <>
      <Styled.TopContainer>
        <Styled.CategoryTitle>{category.name}</Styled.CategoryTitle>
        <Styled.TopIconContainer>
          <Button
            appearance="ghost"
            accessoryLeft={FilterIcon}
            onPress={() => setIsModalOpen(true)}
          />
          <Button
            appearance="ghost"
            accessoryLeft={SettingsIcon}
            onPress={() => actionSheetRef.current.setModalVisible()}
          />
        </Styled.TopIconContainer>
      </Styled.TopContainer>
      <Styled.SelectContainer>
        <CategoriesProductOrder
          actionSheetRef={actionSheetRef}
          products={filteredProducts}
          setProducts={setFilteredProducts}
        />
      </Styled.SelectContainer>
      {/* <Styled.RangeContainer>
						<Styled.RangeTitle>Price Filter</Styled.RangeTitle>
						{highestPrice && (
							<>
								<Styled.StyledRangeSlider
									labelStyle="none"
									gravity={'center'}
									min={0}
									max={highestPrice}
									step={5}
									selectionColor="#3df"
									blankColor="#f618"
									onValueChanged={(low, high) => {
										setMultiSliderValue({rangeLow: low, rangeHigh: high});
									}}
									onTouchEnd={() => {
										handleProductsPriceFilter();
									}}
								/>
								<Text text90 marginL-s5>
									{multiSliderValue.rangeLow} - {multiSliderValue.rangeHigh}
								</Text>
							</>
						)}
					</Styled.RangeContainer> */}
      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        scrollEnabled={true}
        data={filteredProducts}
        keyExtractor={(item) => item.articleID}
        numColumns={2}
        renderItem={({item}) => (
          <Styled.ProductCardContainer key={item.articleID}>
            <ProductCard productId={item.articleID} theme="theme03" />
          </Styled.ProductCardContainer>
        )}
      />
      {/* Modal Start */}
      <Modal animationType="slide" transparent={false} visible={isModalOpen}>
        <SafeAreaView>
          <TopNavigationModal
            modalTitle="Products Filter"
            icon={CloseIcon}
            onPress={() => setIsModalOpen(false)}
          />
          <Styled.ModalWrapper>
            <ProductAttributes
              products={uniqueData}
              filteredProducts={filteredProducts}
              setFilteredProducts={setFilteredProducts}
            />
            <Styled.ClearFilterButton
              onPress={() => {
                setSelectedOptions([]);
                setFilteredProducts(uniqueData);
              }}>
              Clear Filter
            </Styled.ClearFilterButton>
          </Styled.ModalWrapper>
        </SafeAreaView>
      </Modal>
    </>
  );
}
