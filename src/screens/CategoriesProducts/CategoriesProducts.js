import React, {useState, useRef, useContext, useEffect} from 'react';
import {FlatList, Modal, SafeAreaView} from 'react-native';
import {Div} from 'react-native-magnus';
import _ from 'lodash';
//*components
import {CloseIcon} from '../../themes/components/IconSet';
import TopNavigationModal from '../../components/Common/TopNavigationModal';
import ProductCard from '../../components/Common/ProductCard';
import LoadSpinner from '../../components/Common/LoadSpinner';
import ProductAttributes from '../../components/ProductComponents/ProductAttributes';
import CategoriesProductOrder from '../../components/ProductComponents/CategoriesProductOrder';
//*utils
import {useCategoryByCategoryId} from '../../utils/hooks/useCategory';
//*themes
import {Button, Headline} from '../../themes/components';
//*context
import FilterContext from '../../context/FilterContext';

import {Styled} from './styles';

export default function CategoriesProducts({route}) {
  const {category} = route.params;
  const actionSheetRef = useRef();
  const {
    setSelectedOptions,
    filteredProducts,
    setFilteredProducts,
  } = useContext(FilterContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const pageSize = 6;
  const [page, setPage] = useState(pageSize);
  // const [multiSliderValue, setMultiSliderValue] = useState([0, 0]);
  // const [highestPrice, setHighestPrice] = useState(null);

  const {data, isLoading} = useCategoryByCategoryId(category.id);

  useEffect(() => {
    data && setFilteredProducts(_.slice(data?.products, 0, page));
  }, [data, page]);

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

  // return null;

  return (
    <>
      <LoadSpinner isVisible={isLoading} />
      <Div row p={10}>
        <Headline>{category.name}</Headline>
        <Div ml="auto" row>
          <Button suffix="filter" onPress={() => setIsModalOpen(true)} />
          <Button
            ml={10}
            suffix="bar-chart"
            onPress={() => actionSheetRef.current.setModalVisible()}
          />
        </Div>
      </Div>
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
      {data && (
        <FlatList
          contentInsetAdjustmentBehavior="automatic"
          scrollEnabled={true}
          data={filteredProducts}
          keyExtractor={(item) => item.articleID}
          numColumns={2}
          renderItem={({item}) => (
            <Styled.ProductCardContainer key={item.articleID}>
              <ProductCard productId={item.articleID} theme="theme02" />
            </Styled.ProductCardContainer>
          )}
        />
      )}
      <SafeAreaView>
        <Div justifyContent="center">
          <Button
            block
            text="Load More"
            onPress={() => setPage(page + pageSize)}
          />
        </Div>
      </SafeAreaView>
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
              products={data?.products}
              filteredProducts={filteredProducts}
              setFilteredProducts={setFilteredProducts}
            />
            <Styled.ClearFilterButton
              onPress={() => {
                setSelectedOptions([]);
                setFilteredProducts(data?.products);
              }}>
              Clear Filter
            </Styled.ClearFilterButton>
          </Styled.ModalWrapper>
        </SafeAreaView>
      </Modal>
    </>
  );
}
