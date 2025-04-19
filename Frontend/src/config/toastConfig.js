import { toast } from 'react-toastify';

const toastConfig = (message, type = 'success') => {
    const config = {
        autoClose: 2000,  // Close toast after 1 second (1000ms)
        hideProgressBar: true, // Hide progress bar
        closeButton: true, 
    };

    if (type === 'success') {
        toast.success(message, config);
    } else if (type === 'error') {
        toast.error(message, config);
    } else {
        toast(message, config); 
    }
};

export default toastConfig;
