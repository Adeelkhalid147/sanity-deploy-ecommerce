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
        href: "/female/Dresses",
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
    href: "/male/Male",
    isDropDown: true,
    dropDownData: [
      {
        label: "Sweaters",
        href: "/male/Sweater",
        isDropDown: false,
      },

      {
        label: "Jackets",
        href: "/male/Jacket",
        isDropDown: false,
      },
    ],
  },
  {
    label: "Kids",
    href: "/kid",
    isDropDown: false,
  },
  {
    label: "All Products",
    href: "/products",
    isDropDown: false,
  },
];
