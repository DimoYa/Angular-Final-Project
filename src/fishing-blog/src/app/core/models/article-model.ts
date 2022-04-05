import Base from "./base-model";

interface ArticleModel extends Base {
    url: string;
    header: string;
    content: string;
    image: string;
}
export default ArticleModel;