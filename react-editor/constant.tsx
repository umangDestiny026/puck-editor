'use client';

import MegaMenuRenderer  from "./app/component/MegaMenu";

export const MegaMenu = {
  label: "🧾 Mega Menu",

  resolveFields: (data: any) => ({
    isOpen: {
      type: "radio",
      label: "Mega menu state",
      options: [
        { label: "Closed", value: false },
        { label: "Open", value: true },
      ],
    },

    backgroundColor: {
      type: "text",
      label: "Background color",
    },

    className: {
      type: "text",
      label: "Custom class",
    },

    customCss: {
      type: "textarea",
      label: "Custom CSS",
    },
  }),

  defaultProps: {
    isOpen: true,
    backgroundColor: "#ffffff",
    className: "mega-menu-001",
    customCss: "",
  },
  render: (props: any) => <MegaMenuRenderer {...props} />,
}