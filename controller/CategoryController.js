import Category from "../models/categoryModel.js";
import ERROR_LIST from '../helpers/errorList.js';
import ERROR_MESSAGE from '../helpers/errorMessage.js';
import ResponseStatus from "../helpers/responseStatus.js";


class CategoryController {
    async getAllCategory (req, res) {
       try {
           const category = await Category.find();
           if (!category.length) {
               return res
                 .status(ERROR_LIST.HTTP_NO_CONTENT)
                 .send(ResponseStatus.failure(ERROR_LIST.HTTP_NO_CONTENT));
           }
           return res
               .status(ERROR_LIST.HTTP_OK)
               .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, category));
       } catch (error) {
           return res
               .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
               .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, error));
       }
    }
}

export default new CategoryController();