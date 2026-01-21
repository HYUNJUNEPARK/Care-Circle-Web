export interface SignOutData {
    uid: string;
    logoutAt: string,
    updateAt: string,
}

export default interface SignOutResponse {
    success: boolean;
    data: SignOutData;
}