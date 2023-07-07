export interface NavbaritemType {
  label: string;
  href: string;
  isDropDown: boolean;
  dropDownData?: Array<NavbaritemType>;
}

export const NavbarArray: Array<NavbaritemType> = [
  {
    label: "Female",
    href: "/female/Female",
    isDropDown: true,
    dropDownData: [
      {
        label: "Dresses",
        href: "/female/Dresse",
        isDropDown: false,
      },
      {
        label: "TShirts",
        href: "/female/T-shirts",
        isDropDown: false,
      },
      {
        label: "Pents",
        href: "/female/Pent",
        isDropDown: false,
      },
      {
        label: "Jackets",
        href: "/female/Jacket",
        isDropDown: false,
      },
      {
        label: "Sweater",
        href: "/female/Sweater",
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
        href: "/Male/Sweater",
        isDropDown: false,
      },

      {
        label: "Jackets",
        href: "/Male/Jacket",
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
    href: "/products",
    isDropDown: false,
  },
];
