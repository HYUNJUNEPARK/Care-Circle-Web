export default interface ResetPasswordResponse {
    success: boolean;
    uid: string;
    status: string;
    updatedAt: string;
    passwordResetAt: string;
    logoutAt: string;
}
