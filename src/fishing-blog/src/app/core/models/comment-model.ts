import Base from "./base-model";

interface CommentModel extends Base {
    _id: string;
    content: string;
    author: string;
    articleId: string;
}
export default CommentModel;