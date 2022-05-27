import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import DeleteButtonComponent from '../ButtonsComponents/DeleteButtonComponent';
import formsStyles from '../../styles/general/formsStyles';
import customerCard from '../../styles/customers/customerCard';
import appTheme from '../../theme/fonts';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Ionicons } from '@expo/vector-icons';

const ProductCardFormComponent = ({
    product,
    onDeleteHandler,
    index,
    addQuantityToProductData,
    getSubTotal,
    data,
}) => {
    const [count, setCount] = useState(0);
    return (
        <View>
            <View style={formsStyles.selectedProductContainer}>
                <View>
                    <Text style={formsStyles.selectedProductText}>{product.name}</Text>
                    <Text style={customerCard.customerSentText}>
                        <Ionicons name="pricetag" size={12} color={Colors.third} />:{' '}
                        {product.isTaxesFree
                            ? product.priceWithTaxesTvaFree + ' € '
                            : product.priceWithoutTaxes + ' € ( HT ) '}
                        {product.unit}
                    </Text>
                </View>
                <DeleteButtonComponent
                    size={appTheme.Size.size18}
                    color={Colors.primaryDarker}
                    onPress={() => onDeleteHandler(product, index)}
                />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 5,
                }}
            >
                <Text style={formsStyles.formLabelText}>Quantité :</Text>
                <View style={formsStyles.counterContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={formsStyles.counterLeft}
                        onPress={() =>
                            count > 0
                                ? (setCount(count - 1),
                                  addQuantityToProductData(product, count - 1),
                                  getSubTotal(data))
                                : null
                        }
                    >
                        <Text>-</Text>
                    </TouchableOpacity>
                    <View style={formsStyles.counterMiddle}>
                        <Text>{count}</Text>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={formsStyles.counterRight}
                        onPress={() => (
                            setCount(count + 1),
                            addQuantityToProductData(product, count + 1),
                            getSubTotal(data)
                        )}
                    >
                        <Text>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ProductCardFormComponent;
