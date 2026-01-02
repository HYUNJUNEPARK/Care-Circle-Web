import { createContext, type ReactNode, useCallback, useMemo, useState } from 'react';
import CustomAlert from './CustomAlert';
import strings from '../../res/strings';

type ShowAlertParams = {
    title: string;
    message?: string | null;
    confirmText?: string | null;
    onConfirmAction?: () => void;
    cancelText?: string | null;
    onCancelAction?: () => void;
};

type AlertContextValue = {
    open: boolean;
    title: string;
    message: string | null;
    confirmText: string | null;
    cancelText: string | null;
    onConfirmAction: (() => void) | null;
    onCancelAction: (() => void) | null;
    showAlert: (params: ShowAlertParams) => void;
    closeAlert: () => void;
};

export const AlertContext = createContext<AlertContextValue | undefined>(undefined);

const noop = () => { };

export function AlertProvider({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const [confirmText, setConfirmText] = useState<string | null>(strings.confirm);
    const [cancelText, setCancelText] = useState<string | null>(strings.cancel);
    const [onConfirmAction, setOnConfirmAction] = useState<(() => void) | null>(null);
    const [onCancelAction, setOnCancelAction] = useState<(() => void) | null>(null);

    const closeAlert = useCallback(() => {
        setOpen(false);
        setOnConfirmAction(null);
        setOnCancelAction(null);
    }, []);

    const showAlert = useCallback(({
        title,
        message = null,
        confirmText = strings.confirm,
        onConfirmAction = noop,
        cancelText = strings.cancel,
        onCancelAction = noop,
    }: ShowAlertParams) => {
        setTitle(title);
        setMessage(message);
        setConfirmText(confirmText);
        setCancelText(cancelText);
        setOnConfirmAction(() => onConfirmAction);
        setOnCancelAction(() => onCancelAction);
        setOpen(true);
    }, []);

    const handleConfirm = useCallback(() => {
        try {
            onConfirmAction?.();
        } finally {
            closeAlert();
        }
    }, [closeAlert, onConfirmAction]);

    const handleCancel = useCallback(() => {
        try {
            onCancelAction?.();
        } finally {
            closeAlert();
        }
    }, [closeAlert, onCancelAction]);

    const contextValue = useMemo<AlertContextValue>(() => ({
        open,
        title,
        message,
        confirmText,
        cancelText,
        onConfirmAction,
        onCancelAction,
        showAlert,
        closeAlert,
    }), [open, title, message, confirmText, cancelText, onConfirmAction, onCancelAction, showAlert, closeAlert]);

    return (
        <AlertContext.Provider value={contextValue}>
            {children}
            <CustomAlert
                show={open}
                title={title}
                message={message}
                confirmText={confirmText ?? strings.confirm}
                cancelText={cancelText}
                onConfirm={handleConfirm}
                onCancel={cancelText ? handleCancel : undefined}
            />
        </AlertContext.Provider>
    );
}

// export function useAlert() {
//     const context = useContext(AlertContext);

//     if (!context) {
//         throw new Error('useAlert must be used within an AlertProvider');
//     }

//     return context;
// }

//export default AlertContext;
