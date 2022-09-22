import User from "../models/userModel.js";
import ERROR_LIST from "../helpers/errorList.js";
import ERROR_MESSAGE from "../helpers/errorMessage.js";
import ResponseStatus from "../helpers/responseStatus.js";
import bcrypt from 'bcryptjs';

class UserController {
  async getAllUser(req, res) {
    try {
      const user = await User.find();
      if (!user.length) {
        return res
          .status(ERROR_LIST.HTTP_NO_CONTENT)
          .send(ResponseStatus.failure(ERROR_LIST.HTTP_NO_CONTENT));
      }
      return res
        .status(ERROR_LIST.HTTP_OK)
        .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, user));
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
    
    // for login user
    async login(req, res) {
        try {
            const user = await User.findOne({ email: req.body.email });
            //if user exists
          if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res
                .status(ERROR_LIST.HTTP_ACCEPTED)
                .send({
                _id: user._id,
                name: user.name,
                email: user.email,
                address: user.address,
                phone: user.phone,
                image: user.image,
                isAdmin: user.isAdmin,
                });
                return;
              }  
          } else {
                return res
                  .status(ERROR_LIST.HTTP_UNAUTHORIZED)
                  .send({ message: "Invalid username or password" });
            }
             
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

    //for register user
    async register(req, res) {
        try {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password),
                address: req.body.address,
                phone: req.body.phone,
                image: req.body.image || "./assets/images/sellers/seller.png", //for default image
            });
            const user = await newUser.save();
            res.status(ERROR_LIST.HTTP_ACCEPTED).send({
              _id: user._id,
              name: user.name,
              email: user.email,
              address: user.address,
              phone: user.phone,
              image: user.image,
              isAdmin: user.isAdmin,
            });
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

    // for update users
    async update(req, res) {
        try {
            const user = await User.findById(req.body._id);
            //if user exists
            if (user) {
              user.name = req.body.name || user.name;
              user.email = req.body.email || user.email;
              user.address = req.body.address || user.address;
              user.phone = req.body.phone || user.phone;
              user.image = req.body.image || user.image;
              if (req.body.password) {
                user.password = bcrypt.hashSync(req.body.password);
              }

              const updateUser = await user.save();
              return res.status(ERROR_LIST.HTTP_ACCEPTED).send({
                _id: updateUser._id,
                name: updateUser.name,
                email: updateUser.email,
                address: updateUser.address,
                phone: updateUser.phone,
                image: updateUser.image,
                isAdmin: updateUser.isAdmin,
              });
            }else {
              return res
                .status(ERROR_LIST.USER_NOT_FOUND)
                .send({ message: "User Not Found" });
              }
          }
          catch (error) {
            return res
              .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
              .send(
                ResponseStatus.failure(
                  ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR,
                  error
                )
            );
        }
      
      // try {
      //   let existUser = await User.findById(req.params.id);
      //   if (!existUser) {
      //     return res
      //       .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
      //       .send(
      //         ResponseStatus.failure(
      //           ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, {}));
      //   }
      //   existUser = await User.findByIdAndUpdate(
      //     req.params.id,
      //     req.body,
      //     {
      //       new: true,
      //       runValidators: true,
      //       useUnified: false,
      //     }
      //   );
      //   return res
      //     .status(ERROR_LIST.HTTP_OK)
      //     .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, existUser));
      // } catch (err) {
      //   return res
      //     .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
      //     .send(
      //       ResponseStatus.failure(
      //         ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR,
      //         err
      //       )
      //     );
      // }
    }
}

export default new UserController();
