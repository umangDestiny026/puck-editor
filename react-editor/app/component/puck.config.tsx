import { RichTextMenu } from "@puckeditor/core";
import Superscript from "@tiptap/extension-superscript";
import { Superscript as SuperscriptIcon } from "lucide-react";
import React, { useEffect } from "react";
import { MegaMenu } from "./constant";
import SliderSection from "./SliderSection";
import ModalBlock from "./ModalBlock";
import HistoryTimelineConfig from "./HistoryTimeline";
import FooterBlock from "./Footer";
import FlexBlock from "./FlexBlock";
import Grid from "./Grid";
import Accordion from "./Accordion";
import Container from "./Container";
import Card from "./Card";
import Text from "./Text";
import Header from "./Header";
import MulipleMegaMenuItems from "./MulipleMegaMenuItems";
import CardSliderBlock from "./CardSliderBlock";
import Image from "./Image";
import Video from "./Video";
import Button from "./Button";
import ThreeNineGrid from "./ThreeNineGrid";
import CardCustom from "./CardCustom";
import GridZone from "./GridZone";
import Flex from "./Flex";
import Table from "./Table";
import Carousel from "./Carousel";
import Tabs from "./Tabs";
import ImageText from "./ImageText";
import Stepper from "./Stepper";
import Input from "./Input";
import Checkbox from "./Checkbox";
import DatePicker from "./DatePicker";
import Dropdown from "./Dropdown";
import SearchableDropdown from "./SearchableDropdown";
import RadioGroup from "./RadioGroup";
import Form from "./Form";
import RichTextBlock from "./RichTextBlock";
import { megaMenuStore } from "./zone";
import LinkComponent from "./LinkComponent";

export const config = {
  categories: {
    Layout: {
      components: [
        "Container",
        "Flex",
        "Flexbox",
        "Grid",
        "GridZone",
        "ThreeNineGrid",
      ],
    },

    Sections: {
      components: [
        "SliderSection",
        "CardSliderBlock",
        "Carousel",
        "ImageText",
        "Card",
        "CardCustom",
      ],
    },

    Content: {
      components: ["Text", "RichTextBlock", "Button", "Link"],
    },

    Media: {
      components: ["Image", "Video"],
    },

    Forms: {
      components: [
        "Form",
        "Input",
        "Checkbox",
        "RadioGroup",
        "Dropdown",
        "SearchableDropdown",
        "DatePicker",
        "Stepper",
      ],
    },

    Navigation: {
      components: [
        "Header",
        "Footer",
        "MegaMenu",
        "MulipleMegaMenuItems",
        "Tabs",
        "Accordion",
      ],
    },
  },
  components: {
    Text: {
      label: "📝 Text",
      fields: {
        className: { type: "text", label: "Custom class" },
        customCss: { type: "textarea", label: "Custom CSS" },
        content: {
          type: "textarea",
          label: "Text content",
        },

        level: {
          type: "select",
          label: "Level",
          options: [
            { label: "Paragraph", value: "p" },
            { label: "H1", value: "h1" },
            { label: "H2", value: "h2" },
            { label: "H3", value: "h3" },
            { label: "H4", value: "h4" },
            { label: "H5", value: "h5" },
            { label: "H6", value: "h6" },
          ],
        },

        size: {
          type: "select",
          label: "Size",
          options: [
            { label: "Small", value: "sm" },
            { label: "Medium", value: "md" },
            { label: "Large", value: "lg" },
            { label: "XL", value: "xl" },
          ],
        },

        align: {
          type: "radio",
          label: "Align",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ],
        },

        widthValue: { type: "number", label: "Width" },
        widthUnit: {
          type: "select",
          label: "Width unit",
          options: [
            { label: "px", value: "px" },
            { label: "%", value: "%" },
            { label: "vw", value: "vw" },
          ],
        },

        maxWidthValue: { type: "number", label: "Max width" },
        maxWidthUnit: {
          type: "select",
          label: "Max width unit",
          options: [
            { label: "px", value: "px" },
            { label: "%", value: "%" },
            { label: "vw", value: "vw" },
          ],
        },

        minWidthValue: { type: "number", label: "Min width" },
        minWidthUnit: {
          type: "select",
          label: "Min width unit",
          options: [
            { label: "px", value: "px" },
            { label: "%", value: "%" },
            { label: "vw", value: "vw" },
          ],
        },

        textColor: {
          type: "text",
          label: "Text color",
        },

        backgroundColor: {
          type: "text",
          label: "Background color",
        },
      },

      defaultProps: {
        content: "Hello, world",
        level: "h1",
        size: "lg",
        align: "left",
        className: "text-001",
        customCss: "",

        widthValue: undefined,
        widthUnit: "px",

        maxWidthValue: 700,
        maxWidthUnit: "px",

        minWidthValue: undefined,
        minWidthUnit: "px",

        textColor: "#000000",
        backgroundColor: undefined,
      },

      render: (props: any) => {
        return <Text {...props} />;
      },
    },

    Header: {
      label: "🚗 Header",
      resolveFields: (data: any) => {
        const MegaMenuoptions = [
          { label: "Select the mega menu", value: "" }, // default empty option
          ...megaMenuStore.items.map((m: any) => ({
            label: m.id,
            value: m.id,
          })),
        ];

        const baseFields = {
          layout: {
            type: "select",
            label: "Header layout",
            options: [
              { label: "Logo + Menu + CTA", value: "LogoMenuCTA" },
              { label: "Logo + CTA", value: "LogoCTA" },
              { label: "Logo + Menu", value: "LogoMenu" },
            ],
          },

          backgroundColor: {
            type: "text",
            label: "Background color",
          },

          textColor: {
            type: "text",
            label: "Text color",
          },

          logoUrl: {
            type: "text",
            label: "Logo image URL",
          },

          navPosition: {
            type: "select",
            label: "Navbar position",
            options: [
              { label: "Static (default)", value: "static" },
              { label: "Sticky", value: "sticky" },
              { label: "Fixed", value: "fixed" },
            ],
          },

          hamburgerIcon: {
            type: "text",
            label: "Hamburger icon URL (optional)",
          },
        };

        if (data.props.layout === "LogoCTA") {
          return {
            ...baseFields,
            rightLinks: {
              type: "array",
              label: "Right side links",
              itemLabel: "Utility link",
              arrayFields: {
                label: { type: "text", label: "Label" },
                href: { type: "text", label: "URL" },
                icon: { type: "text", label: "Icon URL (optional)" },
              },
            },
          };
        }

        if (data.props.layout === "LogoMenu") {
          return {
            ...baseFields,
            menuItems: {
              type: "array",
              label: "Navigation items",
              itemLabel: "Menu item",
              arrayFields: {
                menuMode: {
                  type: "select",
                  label: "Menu mode",
                  options: [
                    { label: "Link", value: "linksonly" },
                    { label: "Dropdown", value: "dropdown" },
                    { label: "Mega Menu", value: "megamenu" },
                  ],
                },
                label: { type: "text", label: "Menu label (Menu mode: Link)" },
                href: { type: "text", label: "URL (Menu mode: Link)" },

                dropdownItems: {
                  type: "array",
                  label: "Dropdown items",
                  itemLabel: "Dropdown link (Menu mode: Dropdown)",
                  arrayFields: {
                    label: { type: "text", label: "Label" },
                    href: { type: "text", label: "URL" },
                  },
                },

                savedMegaMenu: {
                  type: "select",
                  label: "Select Saved Mega Menu (Mega mode)",
                  options: MegaMenuoptions,
                },
              },
            },
          };
        }

        // ---- Default: LogoMenuCTA (SHOW ALL) ----
        return {
          ...baseFields,
          menuItems: {
            type: "array",
            label: "Navigation items",
            itemLabel: "Menu item",
            arrayFields: {
              menuMode: {
                type: "select",
                label: "Menu mode",
                options: [
                  { label: "Select menu mode", value: "" },
                  { label: "Link", value: "linksonly" },
                  { label: "Dropdown", value: "dropdown" },
                  { label: "Mega Menu", value: "megamenu" },
                ],
              },
              label: { type: "text", label: "Menu label (Menu mode: Link)" },
              href: { type: "text", label: "URL (Menu mode: Link)" },

              dropdownItems: {
                type: "array",
                label: "Dropdown items",
                itemLabel: "Dropdown link",
                arrayFields: {
                  label: { type: "text", label: "Label" },
                  href: { type: "text", label: "URL" },
                },
              },
              savedMegaMenu: {
                type: "select",
                label: "Select Saved Mega Menu (Mega mode)",
                options: MegaMenuoptions,
              },
            },
          },
          rightLinks: {
            type: "array",
            label: "Right side links",
            itemLabel: "Utility link",
            arrayFields: {
              label: { type: "text", label: "Label" },
              href: { type: "text", label: "URL" },
              icon: { type: "text", label: "Icon URL (optional)" },
            },
          },
        };
      },

      defaultProps: {
        backgroundColor: "#ffffff",
        layout: "LogoMenuCTA",
        menuMode: "linksonly",
        textColor: "#000000",
        navPosition: "static",
        logoUrl: "https://sso.genera.sh/assets/images/genera-logo.svg",
        hamburgerIcon: "https://toyota.com.co/images/menu.svg",

        menuItems: [
          {
            label: "Home",
            menuMode: "",
            dropdownItems: [],
            savedMegaMenu: null,
          },
          {
            label: "About",
            menuMode: "",
            dropdownItems: [],
            savedMegaMenu: null,
          },
          {
            label: "Service",
            menuMode: "",
            dropdownItems: [],
            savedMegaMenu: null,
          },
        ],

        rightLinks: [
          { label: "contact-us", href: "#" },
          {
            label: "WhatsApp",
            href: "#",
            icon: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
          },
        ],
      },

      render: (props: any) => {
        return <Header {...props} />;
      },
    },

    MegaMenu,

    // history timeline block
    HistoryTimelineConfig: {
      label: "History Timeline",

      fields: {
        // ===== Section Content =====
        title: {
          type: "text",
          label: "Title",
        },
        subtitle: {
          type: "text",
          label: "Subtitle",
        },

        // ===== Colors =====
        bgColor: {
          type: "text",
          label: "Background Color",
        },
        textColor: {
          type: "text",
          label: "Text Color",
        },
        accentColor: {
          type: "text",
          label: "Accent Color (// separator)",
        },
        expandButtonColor: {
          type: "text",
          label: "Expand Button Color",
        },

        // ===== Period Settings =====
        periodStartYear: {
          type: "text",
          label: "Period Start Year",
        },
        periodEndYear: {
          type: "text",
          label: "Period End Year",
        },
        periodSummary: {
          type: "textarea",
          label: "Period Summary",
        },
        periodIcon: {
          type: "text",
          label: "Period Icon URL",
        },
        periodIconAlt: {
          type: "text",
          label: "Period Icon Alt Text",
        },

        // ===== Timeline Items =====
        items: {
          type: "array",
          label: "Timeline Items",
          getItemSummary: (item: any) =>
            item?.year
              ? `${item.year} — ${item.title || "Untitled"}`
              : "New Timeline Item",

          arrayFields: {
            year: {
              type: "text",
              label: "Year",
            },
            title: {
              type: "text",
              label: "Title",
            },
            description: {
              type: "textarea",
              label: "Description",
            },
            icon: {
              type: "text",
              label: "Icon URL",
            },

            images: {
              type: "array",
              label: "Images",
              getItemSummary: (img: any) =>
                img?.alt ? img.alt : img?.src ? "Image" : "New Image",
              arrayFields: {
                src: {
                  type: "text",
                  label: "Image URL",
                },
                alt: {
                  type: "text",
                  label: "Alt Text",
                },
              },
            },
          },
        },
      },

      defaultProps: {
        title: "Historia",
        subtitle: "Toyota en Colombia",
        bgColor: "#000000",
        textColor: "#ffffff",
        accentColor: "#c8312b",
        expandButtonColor: "#ffffff",

        items: [
          {
            year: "1967",
            title: "Inicio en Colombia",
            description: "Toyota comienza operaciones en Colombia.",
            images: [],
          },
        ],
      },

      render: (props: any) => <HistoryTimelineConfig {...props} />,
    },

    MulipleMegaMenuItems: {
      label: "🍔 Multiple Menu Items",
      fields: {
        className: { type: "text", label: "Custom class" },
        customCss: { type: "textarea", label: "Custom CSS" },

        columns: {
          type: "array",
          label: "Top Level Columns",
          arrayFields: {
            title: { type: "text", label: "Column Title" },

            links: {
              type: "array",
              label: "Menu Items (Level 1)",
              arrayFields: {
                label: { type: "text", label: "Label" },
                href: { type: "text", label: "URL (optional)" },

                submenu: {
                  type: "array",
                  label: "Submenu Level 2",
                  arrayFields: {
                    title: { type: "text", label: "Section Title (optional)" },
                    subtitle: { type: "text", label: "Subtitle (optional)" },

                    links: {
                      type: "array",
                      label: "Items in this section",
                      arrayFields: {
                        label: { type: "text", label: "Label" },
                        href: { type: "text", label: "URL (optional)" },

                        submenu: {
                          type: "array",
                          label: "Submenu Level 3",
                          arrayFields: {
                            title: {
                              type: "text",
                              label: "Section Title (optional)",
                            },
                            subtitle: {
                              type: "text",
                              label: "Subtitle (optional)",
                            },

                            links: {
                              type: "array",
                              label: "Final Links",
                              arrayFields: {
                                label: { type: "text", label: "Label" },
                                href: { type: "text", label: "URL" },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },

      defaultProps: {
        className: "mega-menu",
        customCss: "",
        columns: [
          {
            title: "Mega menu title",
            links: [
              {
                label: "Item 1",
                submenu: [
                  {
                    title: "Sub Item title",
                    links: [
                      {
                        label: "sub item 1",
                        href: "/#",
                      },
                      {
                        label: "sub item 2",
                        href: "/#",
                      },
                    ],
                  },
                ],
              },
              {
                label: "Item 2",
                submenu: [
                  {
                    title: "Sub Item 2 title",
                    links: [
                      {
                        label: "sub item 1",
                        submenu: [
                          {
                            title: "level 3 title",
                            links: [
                              {
                                label: "sub item 1",
                                href: "/#",
                              },
                            ],
                          },
                          {
                            subtitle: "Other section title",
                            links: [
                              {
                                label: "sub item",
                                href: "/#",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                label: "Cumplimiento",
                href: "/descubre-toyota/cumplimiento",
              },
            ],
          },
        ],
      },

      render: (props: any) => {
        return (
          <MulipleMegaMenuItems
            columns={props.columns}
            titleStyle={{
              fontWeight: 600,
              fontSize: "18px",
            }}
          />
        );
      },
    },

    CardSliderBlock: {
      label: "🎞 Slider (Cards)",

      fields: {
        slidesPerViewMobile: {
          type: "number",
          label: "Mobile Cards",
          min: 1,
          max: 3,
        },

        slidesPerViewTablet: {
          type: "number",
          label: "Tablet Cards",
          min: 1,
          max: 4,
        },

        slidesPerViewDesktop: {
          type: "number",
          label: "Desktop Cards",
          min: 1,
          max: 6,
        },

        spaceBetween: {
          type: "number",
          label: "Space Between",
        },
        infinite: {
          type: "radio",
          label: "Infinite Scroll",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },

        centeredSlides: {
          type: "radio",
          label: "Center Slides",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },

        imagePosition: {
          type: "select",
          label: "Image Position",
          options: [
            { label: "Left", value: "left" },
            { label: "Right", value: "right" },
            { label: "Top (Mobile Style)", value: "top" },
          ],
        },

        items: {
          type: "array",
          label: "Slides",
          arrayFields: {
            id: { type: "text", label: "ID" },
            img: { type: "text", label: "Image URL" },
            bgColor: { type: "text", label: "Background Color" },
            objectFit: {
              type: "select",
              label: "Image Fit",
              options: [
                { label: "Contain (Show full image)", value: "contain" },
                { label: "Cover (Fill & crop)", value: "cover" },
                { label: "Fill (Stretch)", value: "fill" },
                { label: "None (Original size)", value: "none" },
                { label: "Scale Down", value: "scale-down" },
              ],
            },
            content: {
              type: "slot",
            },
          },
        },

        cardWidth: {
          type: "text",
          label: "Card Width (e.g. 320px or 100%)",
        },

        cardHeight: {
          type: "text",
          label: "Card Height (e.g. 400px)",
        },

        cardPadding: {
          type: "text",
          label: "Inner Padding (e.g. 20px)",
        },
      },

      defaultProps: {
        cardWidth: "100%",
        cardHeight: "auto",
        cardPadding: "20px",
        slidesPerViewMobile: 1,
        slidesPerViewTablet: 2,
        slidesPerViewDesktop: 3,
        infinite: true,
        spaceBetween: 30,
        centeredSlides: false,
        imagePosition: "left",
        items: [
          {
            id: "1",
            img: "https://static01.nyt.com/images/2020/01/28/multimedia/28xp-memekid3/28cp-memekid3-superJumbo.jpg",
            objectFit: "contain",
            bgColor: "#000000",
          },
          {
            id: "2",
            img: "https://cdn.britannica.com/19/213119-050-C81C786D/Grumpy-Cat-2015-memes.jpg",
            objectFit: "contain",
            bgColor: "#2d0404",
          },
          {
            id: "3",
            img: "https://static01.nyt.com/images/2020/01/28/multimedia/28xp-memekid3/28cp-memekid3-superJumbo.jpg",
            objectFit: "contain",
            bgColor: "#073e55",
          },
          {
            id: "4",
            img: "https://cdn.shopify.com/s/files/1/0069/9783/5833/files/Grumpy_Cat.png?v=1738071084",
            objectFit: "contain",
            bgColor: "#23353d",
          },
        ],
      },

      render: (props: any) => <CardSliderBlock {...props} />,
    },

    Footer: {
      label: "🦶 Footer",

      resolveFields: (data: any) => {
        const baseFields = {
          layout: {
            type: "select",
            label: "Footer layout",
            options: [
              { label: "Links only", value: "linksOnly" },
              { label: "Info + Links", value: "infoAndLinks" },
              { label: "Info + Links + Social", value: "infoAndLinksSocial" },
            ],
          },

          columns: {
            type: "array",
            label: "Link columns",
            itemLabel: "Column",
            arrayFields: {
              title: { type: "text", label: "Column title" },
              links: {
                type: "array",
                label: "Links",
                itemLabel: "Link",
                arrayFields: {
                  label: { type: "text", label: "Label" },
                  href: { type: "text", label: "URL" },
                },
              },
            },
          },

          backgroundColor: {
            type: "text",
            label: "Background color",
          },

          gap: {
            type: "text",
            label: "Gap between columns",
          },

          textColor: {
            type: "text",
            label: "Text color",
          },

          className: {
            type: "text",
            label: "Custom class",
          },

          customCss: {
            type: "textarea",
            label: "Custom CSS",
          },
        };

        // -------- If layout = infoAndLinks --------
        if (data.props.layout === "infoAndLinks") {
          return {
            ...baseFields,
            infoTitle: {
              type: "text",
              label: "Info title",
            },
            infoText: {
              type: "textarea",
              label: "Info text",
            },
          };
        }

        // -------- If layout = infoAndLinksSocial --------
        if (data.props.layout === "infoAndLinksSocial") {
          return {
            ...baseFields,
            infoTitle: {
              type: "text",
              label: "Info title",
            },
            infoText: {
              type: "textarea",
              label: "Info text",
            },
            socialLinks: {
              type: "array",
              label: "Social links",
              itemLabel: "Social link",
              arrayFields: {
                label: { type: "text", label: "Label" },
                href: { type: "text", label: "URL" },
                icon: { type: "text", label: "Icon URL (optional)" },
              },
            },
          };
        }

        // Default (linksOnly)
        return baseFields;
      },

      defaultProps: {
        layout: "infoAndLinks",
        columns: [
          {
            title: "Home",
            links: [
              { label: "Recordings", href: "#" },
              { label: "Statistics", href: "#" },
            ],
          },
          {
            title: "About",
            links: [
              { label: "Recordings", href: "#" },
              { label: "Statistics", href: "#" },
            ],
          },
          {
            title: "Company",
            links: [
              { label: "Recordings", href: "#" },
              { label: "Statistics", href: "#" },
            ],
          },
        ],
        socialLinks: [
          {
            label: "Instagram",
            icon: "https://example.com/home-icon.png",
            href: "#",
          },
          {
            label: "Whatsapp",
            icon: "https://example.com/home-icon.png",
            href: "#",
          },
        ],

        infoTitle: "Puck Visual Editor",
        infoText: "Build visually. Launch instantly.",

        backgroundColor: "#ffffff",
        textColor: "#000000",
        gap: "40px",

        className: "footer-001",
        customCss: "",
      },

      render: (props: any) => {
        return <FooterBlock {...props} />;
      },
    },

    SliderSection: {
      label: "🎞 Slider (Image + Text)",

      fields: {
        /* ---------- CORE ---------- */

        theme: {
          type: "text",
          label: "Background Theme / Color",
        },

        color: {
          type: "text",
          label: "Heading Color",
        },

        title: {
          type: "text",
          label: "Section Title",
        },

        headingAs: {
          type: "select",
          label: "Heading Level",
          options: [
            { label: "H1", value: 1 },
            { label: "H2", value: 2 },
            { label: "H3", value: 3 },
            { label: "H4", value: 4 },
            { label: "H5", value: 5 },
            { label: "H6", value: 6 },
          ],
        },

        description: {
          type: "textarea",
          label: "Section Description",
        },

        subtitleAs: {
          type: "select",
          label: "Description Level",
          options: [
            { label: "H2", value: 2 },
            { label: "H3", value: 3 },
            { label: "H4", value: 4 },
            { label: "H5", value: 5 },
            { label: "H6", value: 6 },
          ],
        },

        displayType: {
          type: "select",
          label: "Display Type",
          options: [
            { label: "Standard", value: "standard" },
            { label: "Card", value: "card" },
          ],
        },

        showImageReference: {
          type: "radio",
          label: "Show Image Reference",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },

        showPagination: {
          type: "radio",
          label: "Show Pagination",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },

        /* ---------- STYLING ---------- */

        className: {
          type: "text",
          label: "Custom Class Name",
        },

        Headingpadding: {
          type: "text",
          label: "Heading Padding",
        },

        imagePadding: {
          type: "text",
          label: "Image Padding",
        },

        paddingBottom: {
          type: "text",
          label: "Padding Bottom (Desktop)",
        },

        minHeight: {
          type: "text",
          label: "Min Height",
        },

        Bgcolor: {
          type: "text",
          label: "Mobile Background Color",
        },

        paginationWidth: {
          type: "text",
          label: "Pagination Width",
        },

        paginationLeft: {
          type: "text",
          label: "Pagination Left",
        },

        paginationBottom: {
          type: "text",
          label: "Pagination Bottom",
        },

        SliderBgColor: {
          type: "text",
          label: "Slide bg color",
        },
        items: {
          type: "array",
          label: "Slides",
          arrayFields: {
            title: { type: "text", label: "Slide Title" },
            description: {
              type: "richtext",

              // Add custom TipTap extension
              tiptap: {
                extensions: [Superscript],
                selector: ({ editor }: any) => ({
                  isSuperscript: editor?.isActive("superscript"),
                  canSuperscript: editor
                    ?.can()
                    .chain()
                    .toggleSuperscript()
                    .run(),
                }),
              },

              // Custom toolbar with a Superscript control
              renderMenu: ({ children, editor, editorState }: any) => (
                <RichTextMenu>
                  {children}

                  <RichTextMenu.Group>
                    <RichTextMenu.Control
                      title="Superscript"
                      icon={<SuperscriptIcon size={16} />}
                      onClick={() =>
                        editor?.chain().focus().toggleSuperscript().run()
                      }
                      active={editorState?.isSuperscript}
                      disabled={!editorState?.canSuperscript}
                    />
                  </RichTextMenu.Group>
                </RichTextMenu>
              ),
            },

            image: {
              type: "object",
              label: "Slide Image",
              defaultProps: undefined,
              objectFields: {
                src: {
                  type: "text",
                  label: "Image URL",
                },
                alt: {
                  type: "text",
                  label: "Alt Text",
                },
                objectFit: {
                  type: "select",
                  label: "Object Fit",
                  options: [
                    { label: "Cover", value: "cover" },
                    { label: "Contain", value: "contain" },
                  ],
                },
              },
            },

            logos: {
              type: "array",
              label: "Logos",
              defaultProps: [],
              arrayFields: {
                src: { type: "text", label: "Logo URL" },
                alt: { type: "text", label: "Alt Text" },
                height: { type: "text", label: "Height" },
                width: { type: "text", label: "Width" },
                objectFit: { type: "text", label: "Object Fit" },
              },
            },

            mobileLogos: {
              type: "array",
              label: "Mobile Logos",
              arrayFields: {
                src: { type: "text", label: "Logo URL" },
                alt: { type: "text", label: "Alt Text" },
              },
            },

            desktopLogos: {
              type: "array",
              label: "Desktop Logos",
              arrayFields: {
                src: { type: "text", label: "Logo URL" },
                alt: { type: "text", label: "Alt Text" },
              },
            },
          },
        },
      },

      defaultProps: {
        theme: "#ffffff",
        color: "#000",
        headingAs: 2,
        subtitleAs: 5,
        displayType: "standard",
        showImageReference: false,
        showPagination: false,
        paginationWidth: "auto",
        paginationLeft: "0",
        paginationBottom: "0",
        SliderBgColor: "#000",
        className: "",
        // customStyles: {},
        title: "GENERA",
        description:
          "Find the most effective suite for both corporates and individuals. Explore our comprehensive solutions tailored to meet your needs.",
        items: [
          {
            image: {
              src: "https://sso.genera.sh/assets/images/genera-logo.svg",
              alt: "Genera",
            },
            title: "Slide 1 title",
            description:
              "Description",
          },
          {
            image: {
              src: "https://sso.genera.sh/assets/images/genera-logo.svg",
              alt: "Genera",
            },
            title: `Slide 2 title`,
            description:
              "Description 2",

            SliderBgColor: "#d83b3b",
          },
        ],
      },

      render: (props: any) => <SliderSection {...props} />,
    },

    ModalBlock: {
      label: "🪟 Modal",

      fields: {
        showModalButton: {
          type: "radio",
          label: "Want to see Modal ?",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },
        title: {
          type: "text",
          label: "Modal Title",
        },

        description: {
          type: "textarea",
          label: "Modal Description",
        },

        modalSize: {
          type: "select",
          label: "Modal Width",
          options: [
            { label: "Full Screen", value: "full" },
            { label: "Large Center (80%)", value: "large" },
            { label: "Medium Center (60%)", value: "medium" },
            { label: "Half Screen Center", value: "half" },
            { label: "Small Center (400px)", value: "small" },
            { label: "Fixed Width (600px)", value: "fixed" },
          ],
        },

        closeOnOverlay: {
          type: "radio",
          label: "Close On Overlay Click",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },

        showCloseButton: {
          type: "radio",
          label: "Show Close Button (X)",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },

        modalBackground: {
          type: "text",
          label: "Modal Background Color",
        },

        modalTextColor: {
          type: "text",
          label: "Modal Text Color",
        },

        overlayColor: {
          type: "text",
          label: "Overlay Background Color",
        },

        openButtonLabel: {
          type: "text",
          label: "Open Button Label",
        },

        openType: {
          type: "select",
          label: "Open Modal Trigger",
          options: [
            { label: "Button Click", value: "button" },
            { label: "Auto Open (On Load)", value: "auto" },
            { label: "Dropdown Toggle", value: "dropdown" },
          ],
        },
        customButtonCss: {
          type: "textarea",
          label: "Custom Button CSS",
        },

        openButtonIcon: {
          type: "text",
          label: "Button Icon URL",
        },

        buttonBackground: {
          type: "text",
          label: "Button Background Color",
        },

        buttonTextColor: {
          type: "text",
          label: "Button Text Color",
        },

        borderRadius: {
          type: "text",
          label: "Modal Border Radius",
        },

        dropdownWidth: {
          type: "select",
          label: "Dropdown Width",
          options: [
            { label: "Full Width", value: "100%" },
            { label: "Half Width (50%)", value: "50%" },
            { label: "Fixed 300px", value: "300px" },
            { label: "Auto", value: "auto" },
          ],
        },

        className: {
          type: "text",
          label: "Custom Class Name",
        },
      },

      defaultProps: {
        title: "Modal Title",
        description: "This is a modal description.",
        showOpenButton: true,
        openButtonLabel: "Open Modal",
        openType: "button",
        modalSize: "medium",
        closeOnOverlay: true,
        customButtonCss: "",
        showCloseButton: true,
        modalBackground: "#ffffff",
        modalTextColor: "#000000",
        showModalButton: true,
        openButtonIcon: "",
        overlayColor: "rgba(0,0,0,0.6)",
        buttonBackground: "#d42224",
        buttonTextColor: "#ffffff",
        borderRadius: "12px",
        dropdownWidth: "100%",
        className: "",
      },

      render: (props: any) => <ModalBlock {...props} />,
    },

    Flexbox: {
      label: "📦 Flexbox",
      fields: {
        className: { type: "text", label: "Custom class" },
        customCss: { type: "textarea", label: "Custom CSS" },
        direction: {
          type: "select",
          label: "Direction",
          options: [
            { label: "Row", value: "row" },
            { label: "Column", value: "column" },
          ],
        },

        justify: {
          type: "select",
          label: "Justify Content",
          options: [
            { label: "Start", value: "flex-start" },
            { label: "Center", value: "center" },
            { label: "End", value: "flex-end" },
            { label: "Space Between", value: "space-between" },
            { label: "Space Around", value: "space-around" },
          ],
        },

        align: {
          type: "select",
          label: "Align Items",
          options: [
            { label: "Start", value: "flex-start" },
            { label: "Center", value: "center" },
            { label: "End", value: "flex-end" },
            { label: "Stretch", value: "stretch" },
          ],
        },
        wrap: {
          type: "select",
          label: "Flex wrap",
          options: [
            { label: "No wrap", value: "nowrap" },
            { label: "Wrap", value: "wrap" },
            { label: "Wrap reverse", value: "wrap-reverse" },
          ],
        },
        gap: {
          type: "number",
          label: "Gap (px)",
        },

        items: {
          type: "array",
          label: "Content Blocks",
          arrayFields: {},
        },
      },

      defaultProps: {
        className: "flexbox-001",
        customCss: "",
        direction: "row",
        justify: "flex-start",
        align: "center",
        wrap: "nowrap",
        gap: 10,

        items: [
          {
            type: "Text",
            props: { content: "Text 1", level: "p" },
          },
          {
            type: "Text",
            props: { content: "Text 2", level: "p" },
          },
          {
            type: "Text",
            props: { content: "Text 3", level: "p" },
          },
        ],
      },

      render: (props: any) => {
        return <FlexBlock {...props} />;
      },
    },

    Image: {
      label: "🖼️ Image",
      category: "Typography",
      fields: {
        className: { type: "text", label: "Custom class" },
        customCss: { type: "textarea", label: "Custom CSS" },

        sourceType: {
          type: "select",
          label: "Image source",
          options: [
            { label: "Image URL", value: "url" },
            { label: "Gallery (custom)", value: "gallery" },
          ],
        },

        image: {
          type: "text",
          label: "Image URL",
        },

        alt: {
          type: "text",
          label: "Alt text",
        },

        /* -------- LAYOUT -------- */

        align: {
          type: "radio",
          label: "Align",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ],
        },

        widthValue: { type: "number", label: "Width" },
        widthUnit: {
          type: "select",
          label: "Width unit",
          options: [
            { label: "px", value: "px" },
            { label: "%", value: "%" },
            { label: "vw", value: "vw" },
          ],
        },

        maxWidthValue: { type: "number", label: "Max width" },
        maxWidthUnit: {
          type: "select",
          label: "Max width unit",
          options: [
            { label: "px", value: "px" },
            { label: "%", value: "%" },
            { label: "vw", value: "vw" },
          ],
        },

        heightValue: { type: "number", label: "Height" },
        heightUnit: {
          type: "select",
          label: "Height unit",
          options: [
            { label: "px", value: "px" },
            { label: "%", value: "%" },
            { label: "vh", value: "vh" },
          ],
        },

        maxHeightValue: { type: "number", label: "Max height" },
        maxHeightUnit: {
          type: "select",
          label: "Max height unit",
          options: [
            { label: "px", value: "px" },
            { label: "%", value: "%" },
            { label: "vh", value: "vh" },
          ],
        },

        /* -------- IMAGE BEHAVIOR -------- */

        objectFit: {
          type: "select",
          label: "Object fit",
          options: [
            { label: "Contain", value: "contain" },
            { label: "Cover", value: "cover" },
            { label: "Fill", value: "fill" },
            { label: "None", value: "none" },
            { label: "Scale down", value: "scale-down" },
          ],
        },

        objectPosition: {
          type: "text",
          label: "Object position",
        },

        overflow: {
          type: "select",
          label: "Overflow",
          options: [
            { label: "Visible", value: "visible" },
            { label: "Hidden", value: "hidden" },
            { label: "Scroll", value: "scroll" },
          ],
        },

        borderRadius: {
          type: "number",
          label: "Border radius (px)",
        },
      },

      defaultProps: {
        sourceType: "url",
        className: "image-001",
        customCss: "",
        image:
          "https://sso.genera.sh/assets/images/genera-logo.svg",
        alt: "Image",

        align: "center",

        widthValue: undefined,
        widthUnit: "px",

        maxWidthValue: 100,
        maxWidthUnit: "%",

        heightValue: undefined,
        heightUnit: "px",

        maxHeightValue: undefined,
        maxHeightUnit: "px",

        objectFit: "contain",
        objectPosition: "center",
        overflow: "hidden",

        borderRadius: 0,
      },

      render: (props: any) => {
        return <Image {...props} />;
      },
    },

    Video: {
      label: "🎬 Video",

      fields: {
        className: {
          type: "text",
          label: "Custom class",
        },

        customCss: {
          type: "textarea",
          label: "Custom CSS",
        },
        url: {
          type: "text",
          label: "Video URL (YouTube/Vimeo)",
        },

        width: {
          type: "number",
          label: "Width",
          defaultValue: 100,
        },

        widthUnit: {
          type: "select",
          label: "Width unit",
          options: [
            { label: "%", value: "%" },
            { label: "px", value: "px" },
            { label: "vw", value: "vw" },
          ],
          defaultValue: "%",
        },

        maxWidth: {
          type: "number",
          label: "Max width (px)",
          defaultValue: 900,
        },

        height: {
          type: "number",
          label: "Height (px)",
          defaultValue: 315,
        },

        maxHeight: {
          type: "number",
          label: "Max height (px)",
          defaultValue: 600,
        },
      },

      defaultProps: {
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        width: 100,
        widthUnit: "%",
        maxWidth: 900,
        height: 315,
        maxHeight: 600,
        className: "video-00414",
        customCss: "",
      },

      render: (props: any) => {
        return <Video {...props} />;
      },
    },
    Link: {
      label: "🔗 Link",
      fields: {
        className: { type: "text", label: "Custom class" },
        customCss: { type: "textarea", label: "Custom CSS" },

        text: { type: "text", label: "Link text" },

        href: {
          type: "text",
          label: "URL",
          placeholder: "https://example.com",
        },

        target: {
          type: "select",
          label: "Open in",
          options: [
            { label: "Same Tab", value: "_self" },
            { label: "New Tab", value: "_blank" },
          ],
        },

        rel: {
          type: "text",
          label: "Rel attribute",
          placeholder: "noopener noreferrer",
        },

        color: {
          type: "select",
          label: "Text Color",
          options: [
            { label: "Red", value: "red" },
            { label: "Deep Red", value: "deepred" },
            { label: "White", value: "white" },
            { label: "Black", value: "black" },
          ],
        },

        underline: {
          type: "radio",
          label: "Underline",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },

        align: {
          type: "radio",
          label: "Alignment",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ],
        },

        onClickCode: {
          type: "textarea",
          label: "Custom onClick JS",
          description: "Example: () => console.log('Clicked')",
        },
      },

      defaultProps: {
        text: "Visit link",
        href: "#",
        target: "_self",
        rel: "",
        color: "black",
        underline: true,
        align: "left",
        className: "",
        customCss: "",
        onClickCode: "",
      },

      render: (props: any) => {
        return <LinkComponent {...props} />;
      },
    },

    Button: {
      label: "🔘 Button",
      fields: {
        className: { type: "text", label: "Custom class" },
        customCss: { type: "textarea", label: "Custom CSS" },
        text: { type: "text", label: "Button text" },

        type: {
          type: "select",
          label: "Button type",
          options: [
            { label: "Button", value: "button" },
            { label: "Submit", value: "submit" },
            { label: "Reset", value: "reset" },
          ],
        },

        color: {
          type: "select",
          label: "Color Theme",
          options: [
            { label: "Red", value: "red" },
            { label: "Deep Red", value: "deepred" },
            { label: "White", value: "white" },
            { label: "Black", value: "black" },
            { label: "Transparent", value: "transparent" },
            { label: "Transparent Black", value: "transparentBlack" },
            { label: "Underlined", value: "underlined" },
          ],
        },

        size: {
          type: "select",
          label: "Size",
          options: [
            { label: "Small", value: "small" },
            { label: "Large", value: "large" },
          ],
        },

        align: {
          type: "radio",
          label: "Alignment",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ],
        },

        isFullWidth: {
          type: "radio",
          label: "Full Width",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },

        disabled: {
          type: "radio",
          label: "Disabled",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },

        isLoading: {
          type: "radio",
          label: "Loading State",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },

        loadingText: { type: "text", label: "Loading text" },

        onClickCode: {
          type: "textarea",
          label: "Custom onClick JS",
          description: "Example: () => alert('Clicked')",
        },
      },

      defaultProps: {
        text: "Click me",
        type: "button",
        color: "red",
        size: "large",
        align: "left",
        isFullWidth: false,
        disabled: false,
        isLoading: false,
        loadingText: "Loading...",
        onClickCode: "() => console.log('Clicked')",
        className: "",
        customCss: "",
      },

      render: (props: any) => {
        return <Button {...props} />;
      },
    },

    ThreeNineGrid: {
      label: "🧱 3 / 9 Grid",

      fields: {
        className: {
          type: "text",
          label: "Custom class",
        },

        customCss: {
          type: "textarea",
          label: "Custom CSS",
        },

        gap: {
          type: "number",
          label: "Gap (px)",
        },

        stackOnMobile: {
          type: "select",
          label: "Mobile layout",
          options: [
            { label: "Stack (default)", value: "stack" },
            { label: "Keep 3/9", value: "inline" },
          ],
        },

        padding: {
          type: "number",
          label: "Padding (px)",
        },
      },

      defaultProps: {
        gap: 24,
        stackOnMobile: "stack",
        padding: 0,
        className: "",
        customCss: "",
      },

      render: (props: any) => {
        return <ThreeNineGrid {...props} />;
      },
    },

    CardCustom: {
      label: "🃏 Custom Card",

      fields: {
        className: {
          type: "text",
          label: "Custom class",
        },

        customCss: {
          type: "textarea",
          label: "Custom CSS",
        },

        borderRadius: {
          type: "number",
          label: "Border radius (px)",
        },

        boxShadow: {
          type: "text",
          label: "Box shadow (CSS value)",
        },

        width: {
          type: "text",
          label: "Width (e.g. 100%, 300px)",
        },

        maxWidth: {
          type: "number",
          label: "Max width (px)",
        },

        height: {
          type: "text",
          label: "Height (e.g. auto, 400px)",
        },

        padding: {
          type: "number",
          label: "Padding (px)",
        },

        backgroundColor: {
          type: "text",
          label: "Background color",
        },

        border: {
          type: "text",
          label: "Border (CSS value)",
        },
      },

      defaultProps: {
        borderRadius: 12,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        width: "100%",
        maxWidth: 400,
        height: "auto",
        padding: 20,
        backgroundColor: "#ffffff",
        border: "1px solid #eee",
        className: "",
        customCss: "",
      },

      render: (props: any) => {
        return <CardCustom {...props} />;
      },
    },
    GridZone: {
      label: "🧱 Multi Content - Grid",
      fields: {
        className: {
          type: "text",
          label: "Custom class",
        },
        columns: {
          type: "number",
          label: "Columns",
        },

        rows: {
          type: "number",
          label: "Rows",
        },

        gap: {
          type: "number",
          label: "Gap (px)",
        },
        customCss: {
          type: "textarea",
          label: "Custom CSS",
        },
        alignItems: {
          type: "select",
          label: "Align items",
          options: [
            { label: "Stretch", value: "stretch" },
            { label: "Start", value: "start" },
            { label: "Center", value: "center" },
            { label: "End", value: "end" },
          ],
        },

        justifyItems: {
          type: "select",
          label: "Justify items",
          options: [
            { label: "Start", value: "start" },
            { label: "Center", value: "center" },
            { label: "End", value: "end" },
            { label: "Stretch", value: "stretch" },
          ],
        },
        maxWidth: {
          type: "number",
          label: "Max width (px)",
        },

        padding: {
          type: "number",
          label: "Padding (px)",
        },
      },

      defaultProps: {
        columns: 2,
        rows: undefined,
        gap: 16,
        alignItems: "",
        justifyItems: "",
        maxWidth: 1200,
        padding: 0,
        className: "",
        customCss: "",
      },

      render: (props: any) => {
        return <GridZone {...props} />;
      },
    },

    Grid: {
      label: "🧱 Grid",
      fields: {
        className: {
          type: "text",
          label: "Custom class",
        },
        columns: {
          type: "number",
          label: "Columns",
        },

        rows: {
          type: "number",
          label: "Rows",
        },

        gap: {
          type: "number",
          label: "Gap (px)",
        },
        customCss: {
          type: "textarea",
          label: "Custom CSS",
        },
        alignItems: {
          type: "select",
          label: "Align items",
          options: [
            { label: "Stretch", value: "stretch" },
            { label: "Start", value: "start" },
            { label: "Center", value: "center" },
            { label: "End", value: "end" },
          ],
        },

        justifyItems: {
          type: "select",
          label: "Justify items",
          options: [
            { label: "Start", value: "start" },
            { label: "Center", value: "center" },
            { label: "End", value: "end" },
            { label: "Stretch", value: "stretch" },
          ],
        },
        maxWidth: {
          type: "number",
          label: "Max width (px)",
        },

        padding: {
          type: "number",
          label: "Padding (px)",
        },
      },

      defaultProps: {
        columns: 2,
        rows: undefined,
        gap: 16,
        alignItems: "",
        justifyItems: "",
        maxWidth: 1200,
        padding: 0,
        className: "",
        customCss: "",
      },

      render: (props: any) => {
        return <Grid {...props} />;
      },
    },

    Flex: {
      label: "🧷 Flex",
      fields: {
        className: {
          type: "text",
          label: "Custom class",
        },

        customCss: {
          type: "textarea",
          label: "Custom CSS",
        },

        direction: {
          type: "select",
          label: "Flex direction",
          options: [
            { label: "Row", value: "row" },
            { label: "Row reverse", value: "row-reverse" },
            { label: "Column", value: "column" },
            { label: "Column reverse", value: "column-reverse" },
          ],
        },

        wrap: {
          type: "select",
          label: "Flex wrap",
          options: [
            { label: "No wrap", value: "nowrap" },
            { label: "Wrap", value: "wrap" },
            { label: "Wrap reverse", value: "wrap-reverse" },
          ],
        },

        justifyContent: {
          type: "select",
          label: "Justify content",
          options: [
            { label: "Start", value: "flex-start" },
            { label: "Center", value: "center" },
            { label: "End", value: "flex-end" },
            { label: "Space between", value: "space-between" },
            { label: "Space around", value: "space-around" },
            { label: "Space evenly", value: "space-evenly" },
          ],
        },

        alignItems: {
          type: "select",
          label: "Align items",
          options: [
            { label: "Stretch", value: "stretch" },
            { label: "Start", value: "flex-start" },
            { label: "Center", value: "center" },
            { label: "End", value: "flex-end" },
            { label: "Baseline", value: "baseline" },
          ],
        },

        gap: {
          type: "number",
          label: "Gap (px)",
        },

        flex: {
          type: "text",
          label: "Flex (e.g. 1 1 auto)",
        },
      },

      defaultProps: {
        direction: "row",
        wrap: "nowrap",
        justifyContent: "flex-start",
        alignItems: "stretch",
        gap: 0,
        flex: "",
        className: "",
        customCss: "",
      },

      render: (props: any) => {
        return <Flex {...props} />;
      },
    },

    Table: {
      label: "📊 Table",
      fields: {
        rows: {
          type: "number",
          label: "Rows",
          min: 1,
          defaultValue: 3,
        },

        columns: {
          type: "number",
          label: "Columns",
          min: 1,
          defaultValue: 3,
        },

        hasHeader: {
          type: "radio",
          label: "Header Row",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },

        bordered: {
          type: "radio",
          label: "Table Border",
          options: [
            { label: "Bordered", value: "bordered" },
            { label: "Default", value: undefined },
          ],
        },

        highlightOnHover: {
          type: "radio",
          label: "Highlight on hover",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },

        className: {
          type: "text",
          label: "Class name",
        },

        uniqueClass: {
          type: "text",
          label: "Unique class",
        },

        customCss: {
          type: "textarea",
          label: "Custom CSS",
        },
      },

      defaultProps: {
        rows: 3,
        columns: 3,
        hasHeader: true,
        bordered: "bordered",
        highlightOnHover: false,
        className: "",
        uniqueClass: "",
        customCss: "",
      },

      render: (props: any) => <Table {...props} />,
    },

    Accordion: {
      label: "🧷 Accordion",

      resolveFields: (data: any) => {
        const items = data.props?.items || [];

        const baseFields: any = {
          className: { type: "text", label: "Custom class" },
          customCss: { type: "textarea", label: "Custom CSS" },

          title: {
            type: "text",
            label: "Section Title",
          },

          backgroundColor: {
            type: "text",
            label: "Background color (CSS value)",
          },

          itemSpacing: {
            type: "number",
            label: "Vertical spacing (px)",
          },

          iconImage: {
            type: "text",
            label: "Accordion icon (image URL)",
          },

          items: {
            type: "array",
            label: "Accordion items",
            arrayFields: {
              title: { type: "text", label: "Title" },
              description: {
                type: "textarea",
                label: "Description",
              },
            },
            defaultItemProps: {
              title: "Accordion Item",
              description: "Accordion description...",
            },
          },
        };

        if (items.length > 0) {
          return {
            ...baseFields,
            activeItemIndex: {
              type: "select",
              label: "Active accordion (for editing)",
              options: items.map((item: any, index: number) => ({
                label: item.title || `Item ${index + 1}`,
                value: index,
              })),
            },
          };
        }

        return baseFields;
      },

      defaultProps: {
        title: "Accordion Title",
        backgroundColor: "#ffffff",
        itemSpacing: 12,
        activeItemIndex: 0,
        items: [
          {
            title: "First accordion item",
            description: "Click here to edit description...",
          },
          {
            title: "Second accordion item",
            description: "Another description...",
          },
        ],
      },

      render: (props: any) => {
        return <Accordion {...props} />;
      },
    },

    Carousel: {
      label: "🎞️ Slider (Image)",

      fields: {
        slides: {
          type: "array",
          label: "Slides",
          arrayFields: {
            imageMobile: { type: "text", label: "Mobile image URL" },
            imageDesktop: { type: "text", label: "Desktop image URL" },
            title: { type: "text", label: "Title" },
            description: { type: "textarea", label: "Description" },
            link: { type: "text", label: "Link (optional)" },
            videoUrl: { type: "text", label: "Video URL (optional)" },

            showButton: {
              type: "radio",
              label: "Show button?",
              options: [
                { label: "Yes", value: true },
                { label: "No", value: false },
              ],
            },

            buttonLink: { type: "text", label: "Button link" },
          },
        },

        /* ===== SLIDER CONFIG (maps to your defaultConfig) ===== */

        slidesPerView: {
          type: "number",
          label: "Slides per view",
        },

        spaceBetween: {
          type: "number",
          label: "Space between slides",
        },

        loop: {
          type: "radio",
          label: "Loop slider?",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },

        autoplayDelay: {
          type: "number",
          label: "Autoplay delay (ms)",
        },

        paginationClickable: {
          type: "radio",
          label: "Clickable dots?",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },

        showNavigationArrows: {
          type: "radio",
          label: "Show navigation arrows?",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },

        isPlayicon: {
          type: "radio",
          label: "Show play/pause icon?",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },

        alignBottom: {
          type: "radio",
          label: "Align text bottom?",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },

        height: {
          type: "text",
          label: "Container height (e.g. 50vh or 630px)",
        },

        minHeight: {
          type: "text",
          label: "Container min-height (e.g. 630px)",
        },
      },

      defaultProps: {
        slides: [],
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplayDelay: 3000,
        paginationClickable: true,
        showNavigationArrows: false,
        isPlayicon: true,
        alignBottom: false,
        height: "50vh",
        minHeight: "400px",
      },

      render: (props: any) => {
        return <Carousel {...props} />;
      },
    },

    Tabs: {
      label: "🏷️ Tabs",

      resolveFields: (data: any) => {
        const tabs = data.props?.tabs || [];

        const baseFields = {
          className: { type: "text", label: "Custom class" },
          customCss: { type: "textarea", label: "Custom CSS" },
          subTitle: {
            type: "text",
            label: "Section Title",
          },
          title: {
            type: "text",
            label: "Section Title",
          },

          activeTabColor: {
            type: "text",
            label: "Active Tab Color",
            placeholder: "e.g. black, red, #000",
          },
          itemLabelColor: {
            type: "text",
            label: "Item Label Color",
            placeholder: "e.g. black, red, #000",
          },

          tabitemType: {
            type: "select",
            label: "Tab item type",
            options: [
              { label: "Standard", value: "standard" },
              { label: "Display", value: "display" },
            ],
          },

          theme: {
            type: "select",
            label: "Theme (Light / Dark)",
            options: [
              { label: "Dark", value: "dark" },
              { label: "Light", value: "light" },
            ],
          },

          backgroundColor: {
            type: "text",
            label: "Background color (CSS value)",
          },
          TabItemPosition: {
            type: "select",
            label: "Tab item position",
            options: [
              { label: "Left", value: "start" },
              { label: "Center", value: "center" },
              { label: "Right", value: "end" },
            ],
          },

          tabs: {
            type: "array",
            label: "Tabs",
            arrayFields: {
              label: { type: "text", label: "Tab label" },
              icon: { type: "text", label: "Tab icon (emoji or class)" },
              defaultContent: {
                type: "textarea",
                label: "Tab default content",
              },
            },
            defaultItemProps: {
              label: "Tab",
              icon: "",
              defaultContent: "",
            },
          },
        };

        if (tabs.length > 0) {
          return {
            ...baseFields,

            activeTabIndex: {
              type: "select",
              label: "Active tab",
              options: tabs.map((tab: any, index: any) => ({
                label: tab.label || `Tab ${index + 1}`,
                value: index,
              })),
            },
          };
        }

        return baseFields;
      },

      defaultProps: {
        title: "Genera Tabs",
        subTitle: "Sub title",
        TabItemPosition: "center",
        activeTabColor: "black",
        tabitemType: "standard",
        itemLabelColor: "black",
        theme: "light",
        backgroundColor: "#ffffff",
        tabs: [
          {
            label: "Tab 1",
            icon: "",
            defaultContent: "Hello, this is tab 1 default content.",
          },
          {
            label: "Tab 2",
            icon: "",
            defaultContent: "Hello, this is tab 2 default content.",
          },
        ],
        activeTabIndex: 0,
        className: "tab-content-00",
        customCss: "",
      },

      render: (props: any) => {
        return <Tabs {...props} />;
      },
    },

    Container: {
      label: "📦 Container",

      fields: {
        className: { type: "text", label: "Custom class" },
        customCss: { type: "textarea", label: "Custom CSS" },

        marginValue: { type: "number", label: "Side margin" },
        paddingValue: { type: "number", label: "Padding" },

        backgroundColor: { type: "text", label: "Background color" },
      },

      defaultProps: {
        className: "container-001",
        customCss: "",
        marginValue: 40,
        paddingValue: 20,
        backgroundColor: "#ffff",
      },

      render: (props: any) => {
        return <Container {...props} />;
      },
    },

    ImageText: {
      label: "🖼️ Image + Text",
      fields: {
        className: {
          type: "text",
          label: "Custom class",
        },

        customCss: {
          type: "textarea",
          label: "Custom CSS",
        },
        /* -------- LAYOUT -------- */
        imagePosition: {
          type: "select",
          label: "Image position",
          options: [
            { label: "Left", value: "left" },
            { label: "Right", value: "right" },
          ],
        },

        gap: {
          type: "number",
          label: "Gap between image and text (px)",
        },

        paddingY: {
          type: "number",
          label: "Vertical padding (px)",
        },

        /* -------- IMAGE -------- */
        image: {
          type: "text",
          label: "Image URL",
        },
        imageWidth: {
          type: "text",
          label: "Width",
        },
        imageHeight: {
          type: "number",
          label: "Height",
        },
        imageMaxWidth: {
          type: "number",
          label: "Max-width",
        },
        imageMaxHeight: {
          type: "number",
          label: "Max-height",
        },
        imageBorderRadius: {
          type: "number",
          label: "Border radius",
        },
        imageObjectFit: {
          type: "select",
          label: "Object fit",
          options: [
            { label: "cover", value: "cover" },
            { label: "contain", value: "contain" },
            { label: "fill", value: "fill" },
            { label: "none", value: "none" },
            { label: "scale-down", value: "scale-down" },
          ],
        },

        /* -------- TEXT -------- */
        title: {
          type: "textarea",
          label: "Title",
        },
        subtitle: {
          type: "textarea",
          label: "Subtitle",
        },
        titleColor: {
          type: "text",
          label: "Title color (hex / rgb)",
        },
        subtitleColor: {
          type: "text",
          label: "Subtitle color (hex / rgb)",
        },
        textAlign: {
          type: "select",
          label: "Text alignment",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ],
        },
        textMaxWidth: {
          type: "number",
          label: "Text max width (px)",
        },
      },

      defaultProps: {
        imagePosition: "left",
        gap: 24,
        paddingY: 24,

        image: "https://sso.genera.sh/assets/images/genera-logo.svg",
        imageWidth: "50%",
        imageHeight: undefined,
        imageMaxWidth: 0,
        imageMaxHeight: undefined,
        imageBorderRadius: 8,
        imageObjectFit: "cover",

        title: "This is the title",
        subtitle:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nobis, recusandae explicabo quisquam commodi vel animi. A perferendis sit possimus dolorem fugiat reiciendis aliquam sint quibusdam, maiores nihil eligendi repudiandae. Dolor, eius dolorum. Quas adipisci facilis itaque eligendi, quod eveniet blanditiis pariatur vero molestias fugiat necessitatibus placeat illo culpa est doloremque! Odit sunt officiis enim similique commodi, vel culpa exercitationem illo deleniti minima vero dicta quia at ipsum ut quidem magni voluptas quisquam maiores nemo! Minus molestiae fuga architecto, unde eius quo magnam nihil sapiente consequatur odit vero iusto cupiditate earum aut quae labore fugit amet laboriosam! Quos, quod vitae?",
        titleColor: "#111827",
        subtitleColor: "#374151",
        textAlign: "left",
        textMaxWidth: 500,
        className: "section-00414",
        customCss: "",
      },

      render: (props: any) => {
        return <ImageText {...props} />;
      },
    },

    Stepper: {
      label: "🪜 Stepper",
      fields: {
        className: { type: "text", label: "Custom Class" },
        customCss: { type: "textarea", label: "Custom CSS" },
        maxWidth: { type: "text", label: "Container Max-Width" },
        steps: {
          type: "array",
          label: "Steps",
          arrayFields: {
            title: { type: "text", label: "Step Title" },
          },
          getItemSummary: (item: any) =>
            item?.title ? item.title : "New Step",
        },

        showStepNumbers: {
          type: "radio",
          label: "Show Step Numbers",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },

        nextLabel: { type: "text", label: "Next Button Label" },
        backLabel: { type: "text", label: "Back Button Label" },
        finishLabel: { type: "text", label: "Finish Button Label" },

        activeColor: { type: "text", label: "Active Step Color" },
        completedColor: { type: "text", label: "Completed Step Color" },
        buttonColor: { type: "text", label: "Button Background Color" },
      },

      defaultProps: {
        showStepNumbers: true,
        nextLabel: "Next",
        backLabel: "Back",
        finishLabel: "Finish",
        activeColor: "#2563eb",
        completedColor: "#16a34a",
        maxWidth: "684px",
        buttonColor: "#111827",
        className: "",
        customCss: "",
        steps: [{ title: "Step 1" }, { title: "Step 2" }, { title: "Step 3" }],
      },

      render: (props: any) => {
        return <Stepper {...props} />;
      },
    },

    Card: {
      label: "🧱 Card",
      fields: {
        /* -------- IMAGE -------- */
        image: {
          type: "text",
          label: "Image URL",
        },
        imageWidth: { type: "number", label: "Width" },
        imageHeight: { type: "number", label: "Height" },
        imageMaxWidth: { type: "number", label: "Max-width" },
        imageMaxHeight: { type: "number", label: "Max-height" },
        imageBorderRadius: { type: "number", label: "Border radius" },
        imageObjectFit: {
          type: "select",
          label: "Object fit",
          options: [
            { label: "cover", value: "cover" },
            { label: "contain", value: "contain" },
            { label: "fill", value: "fill" },
            { label: "none", value: "none" },
            { label: "scale-down", value: "scale-down" },
          ],
        },
        imageAlign: {
          type: "select",
          label: "Image alignment",
          options: [
            { label: "Top", value: "top" },
            { label: "Left", value: "left" },
            { label: "Right", value: "right" },
          ],
        },

        /* -------- TEXT -------- */
        title: { type: "textarea", label: "Title" },
        titleColor: { type: "text", label: "Title color" },
        description: { type: "textarea", label: "Description" },
        descriptionColor: { type: "text", label: "Description color" },
        textAlign: {
          type: "select",
          label: "Text alignment",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ],
        },

        /* -------- BUTTON (optional) -------- */
        buttonText: { type: "text", label: "Button text" },
        buttonType: {
          type: "select",
          label: "Button type",
          options: [
            { label: "Default", value: "default" },
            { label: "Primary", value: "primary" },
            { label: "Basic", value: "basic" },
            { label: "Success", value: "success" },
            { label: "Info", value: "info" },
            { label: "Danger", value: "danger" },
            { label: "Link", value: "link" },
          ],
        },
        buttonHref: { type: "text", label: "Button URL" },
        buttonExternal: { type: "text", label: "Open in new tab" },

        /* -------- CARD LAYOUT -------- */
        cardWidth: { type: "number", label: "Card width (px)" },
        cardMaxWidth: { type: "number", label: "Card max-width (px)" },
        cardPadding: { type: "number", label: "Card padding (px)" },
        cardBorderRadius: { type: "number", label: "Card border radius (px)" },
        cardShadow: { type: "text", label: "Box shadow (optional CSS)" },
      },

      defaultProps: {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Lis_3i5dNLgq9f8sPu1grpzbCnGcW66pJA&s",
        imageWidth: undefined,
        imageHeight: undefined,
        imageMaxWidth: 400,
        imageMaxHeight: undefined,
        imageBorderRadius: 8,
        imageObjectFit: "cover",
        imageAlign: "top",
        className: "card-001",
        customCss: "",
        title: "Card Title",
        titleColor: "#111827",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas adipisci facilis fugiat necessitatibus placeat illo culpa est doloremque! Odit sunt officiis enim similique commodi, vel culpa exercitationem illo deleniti minima vero dicta quia at ipsum ut quidem magni voluptas quisquam maiores nemo! Minus molestiae fuga architecto, unde eius quo magnam nihil sapiente consequatur odit vero iusto cupiditate earum aut quae labore fugit amet laboriosam! Quos, quod vitae?",
        descriptionColor: "#374151",
        textAlign: "left",

        buttonText: "",
        buttonType: "primary",
        buttonHref: "",
        buttonExternal: false,

        cardWidth: undefined,
        cardMaxWidth: 400,
        cardPadding: 16,
        cardBorderRadius: 12,
        cardShadow: "0 2px 8px rgba(0,0,0,0.1)",
      },

      render: (props: any) => {
        return <Card {...props} />;
      },
    },

    Input: {
      label: "✏️ Input",
      fields: {
        className: { type: "text", label: "Custom class" },
        customCss: { type: "textarea", label: "Custom CSS" },

        label: { type: "text", label: "Label" },
        placeholder: { type: "text", label: "Placeholder" },
        name: { type: "text", label: "Field ID / Name" },

        labelColor: { type: "text", label: "Label Color" },
        inputBackground: { type: "text", label: "Input Background" },
        inputBorder: { type: "text", label: "Input Border" },

        variant: {
          type: "select",
          label: "Variant",
          options: [
            { label: "Desktop", value: "desktop" },
            { label: "Mobile (Tel)", value: "mobile" },
          ],
        },

        pattern: {
          type: "text",
          label: "Validation Regex",
          description: "Example: ^[0-9]+$",
        },

        errorMessage: {
          type: "text",
          label: "Error Message",
        },

        onChangeCode: {
          type: "textarea",
          label: "Custom onChange logic (JS)",
          description: "value => { console.log(value) }",
        },
      },

      defaultProps: {
        label: "Full Name",
        placeholder: "Enter value...",
        name: "input_1",
        labelColor: "#ffffff",
        inputBackground: "#ffffff",
        inputBorder: "1px solid black",
        variant: "desktop",
        pattern: "",
        errorMessage: "",
        className: "",
        customCss: "",
        onChangeCode: "value => console.log(value)",
      },

      render: (props: any) => {
        return <Input {...props} />;
      },
    },

    Checkbox: {
      label: "☑️ Checkbox",
      fields: {
        className: { type: "text", label: "Custom class" },
        customCss: { type: "textarea", label: "Custom CSS" },
        name: { type: "text", label: "Field name (for form submit)" },

        label: { type: "text", label: "Checkbox label" },

        /* ---------- BEHAVIOR ---------- */
        defaultChecked: {
          type: "radio",
          label: "Checked by default",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },

        required: {
          type: "radio",
          label: "Required",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },

        errorMessage: {
          type: "textarea",
          label: "Custom error message",
        },

        /* ---------- ONCHANGE EDITOR ---------- */
        onChangeCode: {
          type: "textarea",
          label: "Custom onChange logic (JS)",
          description: "Example: checked => { console.log(checked) }",
        },
      },

      defaultProps: {
        label: "Accept terms and conditions",
        defaultChecked: false,
        required: false,
        name: "checkbox_1",
        className: "",
        customCss: "",
        errorMessage: "This field is required",
        onChangeCode: "checked => console.log(checked)",
      },

      render: (props: any) => {
        return <Checkbox {...props} />;
      },
    },

    DatePicker: {
      label: "📅 Date Picker",
      fields: {
        className: { type: "text", label: "Custom class" },
        customCss: { type: "textarea", label: "Custom CSS" },
        name: { type: "text", label: "Field name (for form submit)" },
        label: { type: "text", label: "Field label" },

        defaultValue: {
          type: "text",
          label: "Default date (YYYY-MM-DD)",
          description: "Example: 2025-02-05",
        },

        minDate: {
          type: "text",
          label: "Min date (YYYY-MM-DD)",
        },

        maxDate: {
          type: "text",
          label: "Max date (YYYY-MM-DD)",
        },

        required: {
          type: "radio",
          label: "Required",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },

        errorMessage: {
          type: "textarea",
          label: "Custom error message",
        },

        /* ---------- ONCHANGE EDITOR ---------- */
        onChangeCode: {
          type: "textarea",
          label: "Custom onChange logic (JS)",
          description: "Example: date => { console.log(date) }",
        },
      },

      defaultProps: {
        label: "Select date",
        defaultValue: "",
        minDate: "",
        name: "datepicker_1",

        maxDate: "",
        required: false,
        className: "",
        customCss: "",
        errorMessage: "Please select a valid date",
        onChangeCode: "date => console.log(date)",
      },

      render: (props: any) => {
        return <DatePicker {...props} />;
      },
    },

    Dropdown: {
      label: "📥 Dropdown",
      fields: {
        className: { type: "text", label: "Custom class" },
        customCss: { type: "textarea", label: "Custom CSS" },

        name: { type: "text", label: "Field name" },
        placeholder: { type: "text", label: "Placeholder" },

        theme: {
          type: "select",
          label: "Theme",
          options: [
            { label: "Light", value: "light" },
            { label: "Dark", value: "dark" },
            { label: "Light (No Border)", value: "light-no-border" },
            { label: "Transparent", value: "transparent" },
          ],
        },

        fixedPlaceholder: {
          type: "radio",
          label: "Fixed Placeholder",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },

        options: {
          type: "array",
          label: "Options",
          arrayFields: {
            label: { type: "text", label: "Option label" },
            value: { type: "text", label: "Option value" },
          },
          getItemSummary: (item: any) =>
            item?.label ? `${item.label} (${item.value})` : "New option",
        },

        defaultValue: {
          type: "text",
          label: "Default selected value",
          description: "Must match one option value",
        },

        noOptionsMessage: {
          type: "text",
          label: "No options message",
        },

        onChangeCode: {
          type: "textarea",
          label: "Custom onChange logic (JS)",
          description: "Example: value => { console.log(value) }",
        },
      },

      defaultProps: {
        className: "",
        customCss: "",
        theme: "light",
        name: "select_1",
        placeholder: "Select an option",
        fixedPlaceholder: false,
        noOptionsMessage: "No Options",
        onChangeCode: "value => console.log(value)",

        options: [
          { label: "Option 1", value: "option1" },
          { label: "Option 2", value: "option2" },
          { label: "Option 3", value: "option3" },
        ],

        defaultValue: "",
      },

      render: (props: any) => {
        return <Dropdown {...props} />;
      },
    },

    SearchableDropdown: {
      label: "📥 Searchable Dropdown",
      fields: {
        className: { type: "text", label: "Custom class" },
        customCss: { type: "textarea", label: "Custom CSS" },
        name: { type: "text", label: "Field name (for form submit)" },
        label: { type: "text", label: "Field label" },

        /* ---------- OPTIONS (ARRAY FIELD) ---------- */
        options: {
          type: "array",
          label: "Options",
          arrayFields: {
            label: { type: "text", label: "Option label" },
            value: { type: "text", label: "Option value" },
          },
          getItemSummary: (item: any) =>
            item?.label ? `${item.label} (${item.value})` : "New option",
        },

        placeholder: {
          type: "text",
          label: "Search placeholder",
        },

        required: {
          type: "radio",
          label: "Required",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },

        errorMessage: {
          type: "textarea",
          label: "Custom error message",
        },

        /* ---------- ONCHANGE EDITOR ---------- */
        onChangeCode: {
          type: "textarea",
          label: "Custom onChange logic (JS)",
          description: "Example: value => { console.log(value) }",
        },
      },

      defaultProps: {
        label: "Search and select",
        placeholder: "Type to search...",
        name: "searchdd_1",
        className: "",
        customCss: "",
        required: false,
        errorMessage: "Please select an option",
        onChangeCode: "value => console.log(value)",

        // default 3 options
        options: [
          { label: "Apple", value: "apple" },
          { label: "Banana", value: "banana" },
          { label: "Orange", value: "orange" },
        ],
      },

      render: (props: any) => {
        return <SearchableDropdown {...props} />;
      },
    },

    RadioGroup: {
      label: "🔘 Radio Group",
      fields: {
        className: { type: "text", label: "Custom class" },
        customCss: { type: "textarea", label: "Custom CSS" },

        label: { type: "text", label: "Field label" },

        /* ---------- OPTIONS (ARRAY FIELD) ---------- */
        options: {
          type: "array",
          label: "Radio options",
          arrayFields: {
            label: { type: "text", label: "Option label" },
            value: { type: "text", label: "Option value" },
          },
          getItemSummary: (item: any) =>
            item?.label ? `${item.label} (${item.value})` : "New option",
        },

        defaultValue: {
          type: "text",
          label: "Default selected value",
          description: "Must match one option value",
        },

        required: {
          type: "radio",
          label: "Required",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },

        errorMessage: {
          type: "textarea",
          label: "Custom error message",
        },

        /* ---------- ONCHANGE EDITOR ---------- */
        onChangeCode: {
          type: "textarea",
          label: "Custom onChange logic (JS)",
          description: "Example: value => { console.log(value) }",
        },
      },

      defaultProps: {
        label: "Choose one option",
        className: "",
        customCss: "",
        required: false,
        errorMessage: "Please select an option",
        onChangeCode: "value => console.log(value)",

        // Default 3 options
        options: [
          { label: "Option A", value: "A" },
          { label: "Option B", value: "B" },
          { label: "Option C", value: "C" },
        ],

        defaultValue: "",
      },

      render: (props: any) => {
        return <RadioGroup {...props} />;
      },
    },

    Form: {
      label: "📝 Form",
      fields: {
        className: { type: "text", label: "Custom class" },
        customCss: { type: "textarea", label: "Custom CSS" },
        formLabel: {
          type: "text",
          label: "Form title",
        },
        formPadding: {
          type: "text",
          label: "Form padding (e.g. 24px or 1rem)",
        },

        /* ---------- ON SUBMIT EDITOR ---------- */
        onSubmitCode: {
          type: "textarea",
          label: "Custom onSubmit logic (JS)",
          description: `
          You will receive an object: values

          Example:
          (values) => {
            console.log(values);
          }
      `,
        },
      },

      defaultProps: {
        submitLabel: "Submit",
        className: "",
        formLabel: "Checkout form",
        customCss: "",
        formPadding: "24px",
        onSubmitCode: "(values) => console.log(values)",
      },

      render: (props: any) => {
        return <Form {...props} />;
      },
    },

    RichTextBlock: {
      label: "Text Editor",
      fields: {
        className: { type: "text", label: "Custom class" },
        customCss: { type: "textarea", label: "Custom CSS" },
        content: {
          type: "richtext",

          // Add custom TipTap extension
          tiptap: {
            extensions: [Superscript],
            selector: ({ editor }: any) => ({
              isSuperscript: editor?.isActive("superscript"),
              canSuperscript: editor?.can().chain().toggleSuperscript().run(),
            }),
          },

          // Custom toolbar with a Superscript control
          renderMenu: ({ children, editor, editorState }: any) => (
            <RichTextMenu>
              {children}

              <RichTextMenu.Group>
                <RichTextMenu.Control
                  title="Superscript"
                  icon={<SuperscriptIcon size={16} />}
                  onClick={() =>
                    editor?.chain().focus().toggleSuperscript().run()
                  }
                  active={editorState?.isSuperscript}
                  disabled={!editorState?.canSuperscript}
                />
              </RichTextMenu.Group>
            </RichTextMenu>
          ),
        },
      },
      defaultProps: {
        content: "Hello, world",
        className: "text-001",
        customCss: "",
      },

      render: (props: any) => {
        return <RichTextBlock {...props} />;
      },
    },
  },
};

export default config;
