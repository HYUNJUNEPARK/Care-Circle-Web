import styles from './LoadingSpinner.module.css'

function LoadingSpinner() {
    return (
        <div className={styles.spinner}>
            <div className={styles.spinnerIcon}></div>
        </div>
    )
}

export default LoadingSpinner;