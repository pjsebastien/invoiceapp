import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import BackButtonComponent from '../../components/ButtonsComponents/BackButtonComponent';
import buttonsStyles from '../../styles/general/buttonsStyles';
import generalStyles from '../../styles/general/generalStyles';
import ViewButtonComponent from '../../components/ButtonsComponents/ViewButtonComponent';
import formsStyles from '../../styles/general/formsStyles';
import ClientPickerComponent from '../../components/GeneralFormComponents/ClientPickerComponent';
import { useForm, Controller } from 'react-hook-form';
import DatePickerComponent from '../../components/GeneralFormComponents/DatePickerComponent';
import ProductPickerComponent from '../../components/GeneralFormComponents/ProductPickerComponent';
import AttachmentsComponent from '../../components/GeneralFormComponents/AttachmentsComponent';
import { useSelector } from 'react-redux';
import TotalInvoiceComponent from '../../components/GeneralFormComponents/TotalInvoiceComponent';
import PaymentModeComponent from '../../components/GeneralFormComponents/PaymentModeComponent';
import TermsAndConditionsComponent from '../../components/GeneralFormComponents/TermsAndConditionsComponent';
import moment from 'moment';
import 'moment/locale/fr';

const CreateInvoiceForm = ({ route, navigation }) => {
    const userId = useSelector(state => state.authenticator.userId);
    const [onFocusInput, setOnFocusInput] = useState(null);
    const [customerData, setCustomerData] = useState();
    const [productData, setProductData] = useState([]);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [expirationDate, setExpirationDate] = useState(new Date());
    const [showExpiration, setShowExpiration] = useState(false);
    const [subTotal, setSubtotal] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [fixDiscount, setFixDiscount] = useState(0);
    const [percentDiscount, setPercentDiscount] = useState(0);
    const [tva, setTva] = useState(0);
    const [shipping, setShipping] = useState(null);
    const [paymentData, setPaymentData] = useState();
    const [termsAndConditionsData, setTermsAndConditionsData] = useState();
    const [attachmentImage, setAttachmentImage] = useState();
    const [finalInvoice, setFinalInvoice] = useState({
        data: 'ok',
        attachmentImage: null,
    });
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (typeof route?.params?.selectedCustomer !== 'undefined') {
            setCustomerData(route?.params.selectedCustomer);
        }
    }, [route?.params?.selectedCustomer]);

    useEffect(() => {
        if (typeof route?.params?.paymentMode !== 'undefined') {
            setPaymentData(route?.params.paymentMode.name);
        }
    }, [route?.params?.paymentMode]);
    useEffect(() => {
        if (typeof route?.params?.termsAndConditions !== 'undefined') {
            setTermsAndConditionsData(route?.params.termsAndConditions.name);
        }
    }, [route?.params?.termsAndConditions]);

    useEffect(() => {
        if (typeof route?.params?.selectedProduct !== 'undefined') {
            const selectedProduct = route?.params?.selectedProduct;
            let productsNewArray = [...productData, ...selectedProduct];
            productsNewArray = productsNewArray.filter(
                (value, index, self) =>
                    index ===
                    self.findIndex(t => t.id === value.id && t.name === value.name),
            );
            setProductData(productsNewArray);
        }
    }, [route?.params?.selectedProduct]);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        selectedDate ? setDate(currentDate) : null;
    };
    const onChangeExpiration = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowExpiration(false);
        selectedDate ? setExpirationDate(currentDate) : null;
    };

    const addQuantityToProductData = (product, count) => {
        const quantity = {
            quantity: count,
        };
        Object.assign(
            productData.find(p => p.id === product.id),
            quantity,
        );
    };

    const addAttachmentsToInvoice = image => {
        setFinalInvoice({ ...finalInvoice, attachmentImage: image });
        setAttachmentImage(image);
    };

    const getSubTotal = productData => {
        let countSubTotal = 0;
        productData?.length > 0
            ? productData.forEach(element => {
                  let subTotalElement =
                      Number(element.priceWithTaxesTvaFree) * Number(element.quantity);
                  countSubTotal += subTotalElement;
              })
            : null;
        let rounded = Math.round((countSubTotal + Number.EPSILON) * 100) / 100;
        setSubtotal(rounded);
    };

    const getTotalAmount = () => {
        let countTotal = subTotal;

        if (Number(fixDiscount) > 0) {
            countTotal -= fixDiscount;
        } else if (Number(percentDiscount) > 0) {
            countTotal -= (countTotal * Number(percentDiscount)) / 100;
        }
        if (Number(tva) > 0) {
            countTotal += (countTotal * Number(tva)) / 100;
        }
        if (Number(shipping) !== null) {
            countTotal += Number(shipping);
        }
        let rounded = Math.round((countTotal + Number.EPSILON) * 100) / 100;
        return rounded;
    };

    const getDataForPreview = () => {
        const dataForPreview = {
            customerData: customerData,
            productData: productData,
            date: moment(date).format('LL'),
            expirationDate: moment(expirationDate).format('LL'),
            paymentData: paymentData,
            subTotal: subTotal,
            fixDiscount: fixDiscount,
            percentDiscount: percentDiscount,
            tva: tva,
            shipping: shipping,
            totalAmount: getTotalAmount(),
            termsAndConditionsData: termsAndConditionsData,
            attachmentImage: attachmentImage,
        };

        return dataForPreview;
    };

    return (
        <View style={generalStyles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={generalStyles.container}>
                    <View style={buttonsStyles.topButtons}>
                        <BackButtonComponent />
                        <Text style={generalStyles.titleScreenText}>
                            Nouvelle Facture
                        </Text>
                        <ViewButtonComponent
                            onPress={() =>
                                navigation.push('previewModelInvoice', {
                                    data: getDataForPreview(),
                                })
                            }
                        />
                    </View>
                    <TouchableOpacity
                        style={{ marginTop: 20 }}
                        onPress={() =>
                            console.log(
                                'customerData:' + customerData,
                                'productData:' + productData,
                                'date:' + date,
                                'fixDiscount :' + fixDiscount,
                                'percentDiscount :' + percentDiscount,
                                'tva :' + tva,
                                'shipping :' + shipping,
                                'paymentData :' + paymentData,
                                'termsAndConditionsData :' + termsAndConditionsData,
                                'total :' + getTotalAmount(),
                            )
                        }
                    >
                        <Text>xxxxx</Text>
                    </TouchableOpacity>
                    <View style={formsStyles.formContainer}>
                        <Text style={formsStyles.formLabelText}>Numéro de facture :</Text>
                        <Text>D02022022001</Text>
                        <Controller
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <TextInput
                                    style={
                                        onFocusInput === 'familyName'
                                            ? formsStyles.formBorderBottomFocused
                                            : formsStyles.formInput
                                    }
                                    onFocus={() => setOnFocusInput('familyName')}
                                    onBlur={() => setOnFocusInput('')}
                                    placeholder={'Nom de famille'}
                                    value={value}
                                    onChangeText={value => onChange(value)}
                                    multiline={true}
                                />
                            )}
                            name="familyName"
                        />
                        <ClientPickerComponent
                            data={customerData}
                            onDeletePress={() => setCustomerData()}
                        />
                        <Text style={formsStyles.formLabelText}>
                            Date de facturation :
                        </Text>
                        <DatePickerComponent
                            date={date}
                            onChange={onChange}
                            show={show}
                            setShow={setShow}
                        />
                        <Text style={formsStyles.formLabelText}>Date d'échéance :</Text>
                        <DatePickerComponent
                            date={expirationDate}
                            onChange={onChangeExpiration}
                            show={showExpiration}
                            setShow={setShowExpiration}
                        />
                        <ProductPickerComponent
                            data={productData}
                            setProductData={setProductData}
                            addQuantityToProductData={addQuantityToProductData}
                            getSubTotal={getSubTotal}
                        />
                        <TotalInvoiceComponent
                            data={productData}
                            subTotal={subTotal}
                            totalAmount={getTotalAmount()}
                            setTva={setTva}
                            setShipping={setShipping}
                            setFixDiscount={setFixDiscount}
                            setPercentDiscount={setPercentDiscount}
                        />
                        <PaymentModeComponent
                            data={paymentData}
                            onDeletePress={() => setPaymentData()}
                            setPaymentData={setPaymentData}
                        />

                        <TermsAndConditionsComponent
                            data={termsAndConditionsData}
                            onDeletePress={() => setTermsAndConditionsData()}
                            setTermsAndConditionsData={setTermsAndConditionsData}
                        />

                        <AttachmentsComponent
                            addAttachmentsToInvoice={addAttachmentsToInvoice}
                            userId={userId}
                        />
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    );
};

export default CreateInvoiceForm;
