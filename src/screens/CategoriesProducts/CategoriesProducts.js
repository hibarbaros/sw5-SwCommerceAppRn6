import React, {useState, useRef, useEffect} from 'react';
import {FlatList, Modal, SafeAreaView} from 'react-native';
import {Div} from 'react-native-magnus';
import _ from 'lodash';
//*components
import ProductCardCategories from '../../components/Common/ProductCardCategories';
import LoadSpinner from '../../components/Common/LoadSpinner';
import ProductAttributes from '../../components/ProductComponents/ProductAttributes';
import CategoriesProductOrder from '../../components/ProductComponents/CategoriesProductOrder';
//*utils
import {useCategoryByCategoryId} from '../../utils/hooks/useCategory';
//*themes
import {Button, Headline} from '../../themes/components';

function CategoriesProducts({data, category}) {
  const actionSheetRef = useRef();
  const pageSize = 6;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(pageSize);
  const [initialProducts, setInitialProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState([]);

  // const [multiSliderValue, setMultiSliderValue] = useState([0, 0]);
  // const [highestPrice, setHighestPrice] = useState(null);

  useEffect(() => {
    if (filteredProducts) {
      setInitialProducts(_.slice(filteredProducts, 0, page));
    } else {
      setInitialProducts(_.slice(data.products, 0, page));
    }
  }, [filteredProducts, page]);

  const handleLoadMore = () => {
    setPage(page + pageSize);
  };

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
      <Div row p={10}>
        <Headline>{category.name}</Headline>
        <Div ml="auto" row>
          <Button
            variant="icon"
            suffix="filter"
            onPress={() => setIsModalOpen(true)}
          />
          <Button
            ml={10}
            variant="icon"
            suffix="bar-chart"
            onPress={() => actionSheetRef.current.open()}
          />
        </Div>
      </Div>
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
          scrollEnabled={true}
          data={initialProducts}
          keyExtractor={(item, index) => index}
          numColumns={2}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={1}
          renderItem={({item}) => (
            <Div h={300} mb={10} key={item.articleID}>
              <ProductCardCategories product={item} theme="theme02" />
            </Div>
          )}
        />
      )}
      <CategoriesProductOrder
        actionSheetRef={actionSheetRef}
        products={initialProducts}
        setProducts={setInitialProducts}
      />
      {/* Modal Start */}
      <Modal animationType="slide" transparent={false} visible={isModalOpen}>
        <SafeAreaView>
          <ProductAttributes
            products={data.products}
            setFilteredProducts={setFilteredProducts}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            setIsModalOpen={setIsModalOpen}
          />
        </SafeAreaView>
      </Modal>
    </>
  );
}

export default function ConnectedCategoriesProducts({route}) {
  const {category} = route.params;

  const {data, isLoading} = useCategoryByCategoryId(category.id);

  return (
    <>
      <LoadSpinner isVisible={isLoading} />
      {data && <CategoriesProducts data={data} category={category} />}
    </>
  );
}
