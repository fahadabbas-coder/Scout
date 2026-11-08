import { toast } from 'react-toastify'

const OPTIONS = {
    position: 'bottom-right',
    autoClose: 2200,
    hideProgressBar: true,
    pauseOnHover: true,
    closeOnClick: true,
    draggable: true,
    theme: 'dark',
    style: { width: '250px', minHeight: '50px', fontSize: '14px' },
}

export const savedToast = () => toast.success('Saved to collection', OPTIONS)
export const removedToast = () => toast.error('Removed from collection', OPTIONS)
export const clearedToast = () => toast.error('Collection cleared', OPTIONS)
