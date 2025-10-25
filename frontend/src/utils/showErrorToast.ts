import Toast from 'react-native-toast-message';
import isApiError from '@/utils/isApiError';

const showErrorToast = (err: unknown) => {
  if (isApiError(err)) {
    Toast.show({
      type: 'error',
      text1: 'Something went wrong',
      text2: err.message,
    });
  } else {
    Toast.show({
      type: 'error',
      text1: 'Something went wrong',
      text2: String(err),
    });
  }
};

export default showErrorToast;