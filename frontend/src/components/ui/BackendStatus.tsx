import api from "@/services/api";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

const TOAST_VISIBILITY_TIME = 3000;

const BackendStatus: React.FC = (): null => {

  
  useEffect(() => {
    const checkBackendStatus = async () => {

      try {
        const res = await api.get<any>('/status');
        
        if (res.status !== 200) throw new Error();

      } catch {
        Toast.show({
          type: 'error',
          text1: 'Server is offline',
          swipeable: false,
          autoHide: true, // will never auto hide since it will create another toast after the visibility time
          visibilityTime: TOAST_VISIBILITY_TIME,
          props: { toastId: 'server-offline' },
        });
      }

    }

    checkBackendStatus();

    const interval = setInterval(checkBackendStatus, TOAST_VISIBILITY_TIME);
    return () => clearInterval(interval);
  }, [])

  return null;
};

export default BackendStatus;