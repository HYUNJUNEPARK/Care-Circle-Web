import React from "react";
import styles from "./Input.module.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";

export type InputType = "plaintext" | "password";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    inputType: InputType;
    id: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    show?: boolean;
    setShow?: React.Dispatch<React.SetStateAction<boolean>>;
}

function Input({
    inputType,
    id,
    label,
    placeholder,
    value,
    onChange,
    show,
    setShow,
    ...rest
}: InputProps) {
    return (
        <div className={styles.inputGroup}>
            <label htmlFor={id} className={styles.label}>{label}</label>
            <div className={styles.inputGroupInner}>
                {/* 인풋 필드 */}
                <input
                    id={id}
                    type={show || inputType === "plaintext" ? "text" : "password"}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required
                    className={styles.inputTypeToggle}
                    autoCapitalize="off"
                    autoComplete="off"
                    spellCheck={false}
                    {...rest}
                />
                {/* 비밀번호 표시/숨기기 버튼 */}
                {value && setShow !== undefined && (
                    <button
                        type="button"
                        onClick={() => setShow(prev => !prev)}
                        className={styles.eyeBtn}
                        tabIndex={-1}>
                        {show ? <FiEye size={16} color="#888" /> : <FiEyeOff size={16} color="#888" />}
                    </button>
                )}
                {/* 입력 지우기 */}
                {value && (
                    <button
                        type="button"
                        onClick={() => onChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>)}
                        className={styles.clearBtn}
                        tabIndex={-1}
                    >
                        <TiDelete size={20} color="#888" />
                    </button>
                )}
            </div>
        </div>
    );
}

export default Input;