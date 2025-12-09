import api from "@/services/api";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

const BackendStatus: React.FC = (): null => {

  
  useEffect(() => {
    const checkBackendStatus = async () => {

      try {
        const res = await api.get<any>('/status');
        
        if (res.status === 200) {
          Toast.hide();
          
        } else {
          throw new Error();
        }

      } catch {
        Toast.show({
          type: 'error',
          text1: 'Server is offline',
          autoHide: false,
          swipeable: false,
          props: { toastId: 'server-offline' },
        });
      }

    }

    checkBackendStatus();

    const interval = setInterval(checkBackendStatus, 3000);
    return () => clearInterval(interval);
  }, [])

  return null;
};

export default BackendStatus;