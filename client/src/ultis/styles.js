// active style
export const isActiveStyles =
  " text-2xl text-red-700 font-semibold hover:text-red-700 px-4 py-2 duration-100 transition-all ease-in-out";

export const isNotActiveStyles =
  " text-xl text-textColor hover:text-red-700 duration-100 px-4 py-2 transition-all ease-in-out";

//category data
export const statuses = [
  { id: 0, title: "All", category: "all" },

  { id: 1, title: "Drinks", category: "drinks" },
  { id: 2, title: "Deserts", category: "deserts" },
  { id: 3, title: "Fruits", category: "fruits" },
  { id: 4, title: "Rice", category: "rice" },
  { id: 5, title: "Icecream", category: "icecream" },
  { id: 6, title: "Chicken", category: "chicken" },
];

///dummy data can delete later
export const randomData = [
  {
    id: 1,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/food-app-nov-22.appspot.com/o/Pictures%2F1674704862591_dessert2.png?alt=media&token=7c001521-f0ac-40a8-b07a-42dc4aab444a",
    product_name: "Iceream",
    product_category: "Chocolate & vanilla",
    product_price: "23.00",
  },
  {
    id: 2,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/food-app-nov-22.appspot.com/o/Pictures%2F1674797445483_f1.png?alt=media&token=8b46c1ce-9600-4f9a-8ff7-3518b1bf6db3",
    product_name: "Strawberries",
    product_category: "Fresh Strawberries",
    product_price: "18.00",
  },
  {
    id: 3,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/food-app-nov-22.appspot.com/o/Pictures%2F1674797463817_f2.png?alt=media&token=69ab9301-ef04-4690-bc68-e537cdc1985e",
    product_name: "Pine Apple",
    product_category: "Juicy Apples",
    product_price: "16.00",
  },
  {
    id: 4,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/food-app-nov-22.appspot.com/o/Pictures%2F1674797033037_c3.png?alt=media&token=7644719f-95ae-42f2-8227-3fb843faa567",
    product_name: "Chicken Kebab",
    product_category: "Mixed Kebab Plate",
    product_price: "22.0",
  },
];
