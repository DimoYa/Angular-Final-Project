import Base from "./base-model";

interface ArticleModel extends Base {
    author: string;
    header: string;
    content: string;
    image: string;
}
export default ArticleModel;