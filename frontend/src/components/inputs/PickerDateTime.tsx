import React, { useState } from 'react';
import { View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from './Button';

interface Props {
  date: Date,
  setDate: (date: Date) => void,
};

const PickerDateTime = ({ date, setDate }: Props) => {
  const isIos = process.env.EXPO_OS === 'ios';
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    if (!isIos) setShow(false);
    if (selectedDate) setDate(selectedDate);
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      {!isIos && (
        <Button label="Pick a date" onPress={() => setShow(true)} />
      )}

      {(show || isIos) && (
        <DateTimePicker
          value={date}
          mode='datetime'
          display={isIos ? 'spinner' : 'default'}
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default PickerDateTime;