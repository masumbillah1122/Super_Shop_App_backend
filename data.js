import bcrypt  from 'bcryptjs';

const data = {
  users: [
    {
      name: "Admin",
      email: "admin@example.com",
      password: bcrypt.hashSync("admin"),
      address: "Uttara Dhaka-1230",
      phone: "+304092051",
      image: "./assets/images/sellers/ja.jpg",
      isAdmin: true
    },
    {
      name: "Billah",
      email: "billah@example.com",
      password: bcrypt.hashSync("billah"),
      address: "Uttara Dhaka-1230",
      phone: "+304092051",
      image: "./assets/images/sellers/seller.png",
      isAdmin: false
    },
  ],
  category: [
    {
      name: "Fruits",
    },
    {
      name: "Vegetables",
    },
  ],
  products: [
    {
      name: "Broccoli",
      slug: "broccoli",
      category: "Vegetables",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium culpa, tenetur sint aspernatur ullam numquam odio magni aliquid modi cumque quos delectus nihil tempore, fuga pariatur cupiditate, nemo rerum esse.",
      price: 0.95,
      image: "./assets/images/products/2.png",
      seller: "Admin",
    },
    {
      name: "Watermelon",
      slug: "watermelon",
      category: "fruits",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium culpa, tenetur sint aspernatur ullam numquam odio magni aliquid modi cumque quos delectus nihil tempore, fuga pariatur cupiditate, nemo rerum esse.",
      price: 1.20,
      image: "./assets/images/products/1.png",
      seller: "Billah",
    },
  ],
};

export default data;