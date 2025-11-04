import React, { useState } from 'react';
import { View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from './Button';

interface Props {
  date: Date,
  setDate: (date: Date) => void,
};

const PickerDateTime = ({ date, setDate }: Props) => {
  const isAndroid = process.env.EXPO_OS !== 'ios';
  
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDate = date.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' });

  const onChange = (event: any, selectedDate?: Date) => {
    if (isAndroid) {
      setShowDate(false);
      setShowTime(false);
    }

    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      
      {isAndroid && (
        <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
          <Button
            label={formattedDate || "Pick a date"}
            onPress={() => setShowDate(true)}
            style={{ maxWidth: '49%', borderRadius: 16 }}
          />
          <Button
            label={formattedTime || "Pick a time"}
            onPress={() => setShowTime(true)}
            style={{ maxWidth: '49%', borderRadius: 16 }}
          />
        </View>
      )}

      {/* IOS COMBINED PICKER */}
      {!isAndroid && (
        <DateTimePicker
          value={date}
          mode='datetime'
          display={'spinner'}
          onChange={onChange}
        />
      )}

      {/* ANDROID DATE PICKER */}
      {(showDate && isAndroid) && (
        <DateTimePicker
          value={date}
          mode='date'
          onChange={onChange}
        />
      )}

      {/* ANDROID TIME PICKER */}
      {(showTime && isAndroid) && (
        <DateTimePicker
          value={date}
          mode='time'
          onChange={onChange}
        />
      )}

    </View>
  );
};

export default PickerDateTime;