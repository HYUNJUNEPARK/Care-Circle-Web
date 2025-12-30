import styles from "./CustomAlert.module.css";

type CustomAlertProps = {
    show: boolean;
    title: string;
    message?: string | null;
    confirmText?: string | null;
    cancelText?: string | null;
    onConfirm: () => void;
    onCancel?: () => void;
};

const CustomAlert = ({
    show,
    title,
    message,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
}: CustomAlertProps) => {
    if (!show) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.alertBox}>
                <div className={styles.title}>{title}</div>

                {message && <div className={styles.message}>{message}</div>}

                <div className={styles.buttonGroup}>
                    {cancelText && (
                        <button className={styles.cancelButton} onClick={onCancel}>
                            {cancelText}
                        </button>
                    )}
                    <button className={styles.confirmButton} onClick={onConfirm}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomAlert;
