import Product from "../models/productModel.js";
import ERROR_LIST from "../helpers/errorList.js";
import ERROR_MESSAGE from "../helpers/errorMessage.js";
import ResponseStatus from "../helpers/responseStatus.js";

class ProductController {
  async getAllProduct(req, res) {
    try {
      const product = await Product.find();
      if (!product.length) {
        return res
          .status(ERROR_LIST.HTTP_NO_CONTENT)
          .send(ResponseStatus.failure(ERROR_LIST.HTTP_NO_CONTENT));
      }
      return res
        .status(ERROR_LIST.HTTP_OK)
        .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, product));
    } catch (error) {
      return res
        .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
        .send(
          ResponseStatus.failure(
            ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR,
            error
          )
        );
    }
  }
}

export default new ProductController();
