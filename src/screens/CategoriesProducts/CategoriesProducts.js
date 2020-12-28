import React, {useState, useRef, useContext} from 'react';
import {ScrollView, FlatList, Modal, SafeAreaView} from 'react-native';
import _ from 'lodash';
import {Text} from '@ui-kitten/components';

import {CloseIcon} from '../../themes/components/IconSet';
import TopNavigationModal from '../../components/Common/TopNavigationModal/TopNavigationModal';
import {useCategoryByCategoryId} from '../../utils/hooks/useCategory';
import ProductCard from '../../components/Common/ProductCard/ProductCard';
import LoadSpinner from '../../components/Common/LoadSpinner/LoadSpinner';
import ProductAttributes from '../../components/ProductComponents/ProductAttributes/ProductAttributes';
import CategoriesProductOrder from '../../components/ProductComponents/CategoriesProductOrder/CategoriesProductOrder';
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

  const categoryDetailData = useCategoryByCategoryId(category.id, {
    onSuccess: (data) => {
      setFilteredProducts(_.unionBy(data.products, 'articleID'));
    },
    onError: (error) => {
      console.log('error', error);
    },
  });

  if (!categoryDetailData.isSuccess) {
    return <LoadSpinner isVisible={true} />;
  }

  if (categoryDetailData.error) {
    return (
      <Text>An error has occurred: {categoryDetailData.error.message} </Text>
    );
  }

  const uniqueData = _.unionBy(categoryDetailData.data.products, 'articleID');

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
          <Styled.FilterIcon
            name="filter"
            type="font-awesome"
            onPress={() => setIsModalOpen(true)}
          />
          <Styled.OrderIcon
            name="sort"
            type="font-awesome"
            onPress={() => actionSheetRef.current.setModalVisible()}
          />
        </Styled.TopIconContainer>
      </Styled.TopContainer>
      <ScrollView>
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
          scrollEnabled={false}
          data={filteredProducts}
          keyExtractor={(item) => item.articleID}
          numColumns={2}
          renderItem={({item}) => (
            <Styled.ProductCardContainer key={item.articleID}>
              <ProductCard productId={item.articleID} theme="theme03" />
            </Styled.ProductCardContainer>
          )}
        />
      </ScrollView>
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
