import Base from "./base-model";

interface LoginModel extends Base {
    username: string,
    password: string,
}
export default LoginModel;