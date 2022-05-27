import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import SearchButtonComponent from '../ButtonsComponents/SearchButtonComponent';
import formsStyles from '../../styles/general/formsStyles';
import ProductCardFormComponent from './ProductCardFormComponent';

const ProductPickerComponent = ({
    data,
    setProductData,
    addQuantityToProductData,
    getSubTotal,
}) => {
    const navigation = useNavigation();

    const onDeleteHandler = product => {
        const newData = data.filter(newData => newData.id != product.id);
        setProductData(newData);
        getSubTotal(newData);
    };
    return (
        <View>
            <Text style={formsStyles.formLabelText}>Produits :</Text>
            <TouchableOpacity
                onPress={() =>
                    navigation.push('products', {
                        fromSelectProduct: true,
                        dataAlreadySelected: data,
                    })
                }
                activeOpacity={0.8}
                style={formsStyles.selectProductContainer}
            >
                {data.length > 0 ? (
                    <Text style={formsStyles.selectProductText}>Ajouter un produit</Text>
                ) : (
                    <Text style={formsStyles.selectProductText}>
                        Selectionner un produit
                    </Text>
                )}

                <SearchButtonComponent />
            </TouchableOpacity>
            <View>
                {data.map((product, index) => {
                    return (
                        <View key={index}>
                            <ProductCardFormComponent
                                data={data}
                                product={product}
                                index={index}
                                onDeleteHandler={onDeleteHandler}
                                addQuantityToProductData={addQuantityToProductData}
                                getSubTotal={getSubTotal}
                            />
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

export default ProductPickerComponent;
