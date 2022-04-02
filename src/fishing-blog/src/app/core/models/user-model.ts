import Base from "./base-model";

interface UserModel extends Base {
    fullname: string,
    username: string,
    password: string,
    phoneNumber?: string,
    image?: string,
}
export default UserModel;