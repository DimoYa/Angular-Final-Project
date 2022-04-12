import Base from "./base-model";

interface UserModel extends Base {
    fullname: string,
    username: string,
    password: string,
    phoneCode?: string,
    phoneNumber?: string,
    photo?: string,
    isDisabled?: boolean
}
export default UserModel;