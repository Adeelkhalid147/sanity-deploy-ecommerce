export interface NavbaritemType {
  label: string;
  href: string;
  isDropDown: boolean;
  dropDownData?: Array<NavbaritemType>;
}

export const NavbarArray: Array<NavbaritemType> = [
  {
    label: "Female",
    href: "/female",
    isDropDown: true,
    dropDownData: [
      {
        label: "Dresses",
        href: "/female/dresse",
        isDropDown: false,
      },
      {
        label: "TShirts",
        href: "/female/T-shirts",
        isDropDown: false,
      },
      {
        label: "Pents",
        href: "/female/pent",
        isDropDown: false,
      },
      {
        label: "Jackets",
        href: "/female/jacket",
        isDropDown: false,
      },
      {
        label: "Sweater",
        href: "/female/sweater",
        isDropDown: false,
      },
    ],
  },
  {
    label: "Male",
    href: "/male",
    isDropDown: true,
    dropDownData: [
      {
        label: "Sweaters",
        href: "/Male/sweater",
        isDropDown: false,
      },

      {
        label: "Jackets",
        href: "/Male/jacket",
        isDropDown: false,
      },
    ],
  },
  {
    label: "Kids",
    href: "/kids",
    isDropDown: false,
  },
  {
    label: "All Products",
    href: "/allproducts",
    isDropDown: false,
  },
];
