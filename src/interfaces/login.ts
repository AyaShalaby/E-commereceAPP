export interface SuccessLogInResponse{
    message: string,
    user: UserResponse,
    token: string
}
export interface FailedLogInResponse{
    statusMsg: string,
    message: string
}

export interface UserResponse {
        name: string,
        email:string,
        role: string
    }
    