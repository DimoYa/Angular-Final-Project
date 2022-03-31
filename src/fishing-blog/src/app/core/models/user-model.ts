interface UserModel {
    _id: string;
    username: string,
    fullname: string,
    email: string,
    password: string,
    confirmPassword: string,
    phoneNumber?: string,
    image?: string,
}
export default UserModel;