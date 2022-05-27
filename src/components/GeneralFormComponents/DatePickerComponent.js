import { View, Text } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'react-moment';
import 'moment/locale/fr';
import CalendarButtonComponent from '../ButtonsComponents/CalendarButtonComponent';
import formStyles from '../../styles/general/formsStyles';

const DatePickerComponent = ({ date, onChange, show, setShow }) => {
    const [mode, setMode] = useState('date');
    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    return (
        <View style={formStyles.calendarContainer}>
            <View style={formStyles.calendarTopContainer}>
                <CalendarButtonComponent onPress={showDatepicker} />

                <Moment
                    style={formStyles.calendarText}
                    locale="fr"
                    element={Text}
                    format="D MMM YYYY"
                >
                    {date}
                </Moment>
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                />
            )}
        </View>
    );
};

export default DatePickerComponent;
