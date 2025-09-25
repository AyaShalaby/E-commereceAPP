import toast from 'react-hot-toast'; 

export const defaultToastOptions = {
  style: {
    backgroundColor:'#A31D1D',
    color:'#FEF9E1',
    fontWeight: 'bold',
    fontSize:'15px'
  },


};

export const toastSuccess = (msg: string) => toast.success(msg, defaultToastOptions);
export const toastError = (msg: string) => toast.error(msg, defaultToastOptions);
export const toastNormal = (msg: string) => toast(msg, defaultToastOptions);
