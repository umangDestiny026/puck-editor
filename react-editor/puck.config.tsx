import { DropZone, Render, RichTextMenu } from "@puckeditor/core";
import Superscript from "@tiptap/extension-superscript";
import { Superscript as SuperscriptIcon } from "lucide-react";
import MainSlider from "./app/component/MainSlider";
import PuckInput from "./app/component/Input";
import PuckCheckbox from "./app/component/Checkbox";
import PuckDatePicker from "./app/component/DatePicker";
import PuckDropdown from "./app/component/Dropdown";
import PuckSearchableDropdown from "./app/component/SearchDropdown";
import PuckRadioGroup from "./app/component/RadioBtn";
import PuckForm from "./app/component/Form";
import TabsRenderer from "./app/component/Tab";
import { Flex, Link, Text, View } from "@aws-amplify/ui-react";

export const config = {
  categories: {
    Navigation: {
      components: ["Footer", "Header", "MegaMenu", "MulipleMegaMenuItems"],
    },
    typography: {
      components: ["Text", "Image", "Video", "Button"],
    },
    layout: {
      components: ["Grid", "Flex", "Flexbox", "Accordion", "Tabs"],
    },
    Form: {
      components: ["Form", "Input", "Checkbox", "DatePicker", "Dropdown", "SearchableDropdown", "RadioGroup"],
    }
  },

  components: {
    // Simple text block (baseline comparison)
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

        /* -------- WIDTH CONTROLS -------- */

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

      render: ({
        content,
        level: Level,
        size,
        align,

        widthValue,
        widthUnit,
        maxWidthValue,
        maxWidthUnit,
        minWidthValue,
        minWidthUnit,

        textColor,
        backgroundColor,
        className,
        customCss,
      }) => {
        const fontSizeMap = {
          sm: 14,
          md: 16,
          lg: 22,
          xl: 32,
        };

        const style = {
          textAlign: align,
          margin: align === "center" ? "0 auto" : undefined,

          fontSize:
            Level === "p" ? fontSizeMap[size] : undefined,

          color: textColor || undefined,
          backgroundColor: backgroundColor || undefined,

          width:
            widthValue != null
              ? `${widthValue}${widthUnit}`
              : undefined,

          maxWidth:
            maxWidthValue != null
              ? `${maxWidthValue}${maxWidthUnit}`
              : undefined,

          minWidth:
            minWidthValue != null
              ? `${minWidthValue}${minWidthUnit}`
              : undefined,
        };

        const wrapperClass = className || "";
        const uniqueClass = `text-${Math.random().toString(36).substr(2, 9)}`;

        return (<Level style={style} className={`${wrapperClass} ${uniqueClass}`}>
          {customCss && <style>{`.${uniqueClass} { ${customCss} }`}</style>}
          {content}
        </Level>);
      },
    },

    Header: {
      label: "🚗 Header",
      resolveFields: (data: any) => {
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
              // savedMegaMenu: {
              //   type: "select",
              //   label: "Select Saved Mega Menu (Mega mode)",
              //   options: getSavedMegaMenus().map((m: any) => ({
              //     label: m.name,
              //     value: m.name,
              //   })),
              // },
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
        logoUrl: "https://toyota.com.co/images/Logo.svg",
        hamburgerIcon: "https://toyota.com.co/images/menu.svg",

        menuItems: [
          { label: "Vehículos", menuMode: "dropdown", dropdownItems: [], savedMegaMenu: "" },
          { label: "Cotiza tu Toyota", menuMode: "linksonly", dropdownItems: [], savedMegaMenu: "" },
          { label: "Mi Toyota", menuMode: "linksonly", dropdownItems: [], savedMegaMenu: "" },
          { label: "Descubre Toyota", menuMode: "linksonly", dropdownItems: [], savedMegaMenu: "" },
          { label: "Alquila", menuMode: "linksonly", dropdownItems: [], savedMegaMenu: "" },
          { label: "Noticias", menuMode: "linksonly", dropdownItems: [], savedMegaMenu: "" },
          { label: "Deportivos TGR", menuMode: "linksonly", dropdownItems: [], savedMegaMenu: "" },
        ],

        rightLinks: [
          { label: "Cotizador", href: "#" },
          { label: "Concesionarios Toyota", href: "#" },
          { label: "WhatsApp", href: "#", icon: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" },
        ],
      },

      render: (props: any) => {
        return <Navbar {...props} />;
      },
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

        className: "footer-001",
        customCss: "",
      },

      render: ({
        layout,
        columns = [],
        infoTitle,
        socialLinks = [],
        infoText,
        backgroundColor,
        textColor,
        className,
        customCss,
      }) => {
        const uniqueClass = `footer-${Math.random()
          .toString(36)
          .substr(2, 9)}`;

        return (
          <View
            backgroundColor={backgroundColor}
            color={textColor}
            className={`${className || ""} ${uniqueClass}`}
            padding="40px"
          >
            {customCss && (
              <style>{`.${uniqueClass} { ${customCss} }`}</style>
            )}

            <Flex
              direction="row"
              wrap="wrap"
              gap="40px"
              marginBottom={"30px"}
              justifyContent="space-between"
            >
              {(layout === "infoAndLinks" ||
                layout === "infoAndLinksSocial") && (
                  <View maxWidth="300px">
                    <>
                      {infoTitle && (
                        <Text fontSize="20px" fontWeight="bold">
                          {infoTitle}
                        </Text>
                      )}

                      {infoText && (
                        <Text fontSize="14px" marginTop="8px">
                          {infoText}
                        </Text>
                      )}
                    </>
                    {/* <DropZone zone="text-zone" /> */}
                  </View>
                )}

              {/* LINKS SECTION */}
              <Flex direction="row" gap="40px" wrap="wrap">
                {columns.map((col, i) => (
                  <View key={i}>
                    {col.title && (
                      <Text fontWeight="bold" marginBottom="8px">
                        {col.title}
                      </Text>
                    )}

                    <Flex direction="column" gap="6px">
                      {(col.links || []).map((link: any, j: any) => (
                        <Link
                          key={j}
                          href={link.href || "#"}
                          color={textColor}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </Flex>
                  </View>
                ))}
              </Flex>
              {layout === "infoAndLinksSocial" && socialLinks.length > 0 && (
                <View minWidth="160px">
                  <Text fontWeight="bold" marginBottom="8px">
                    Social
                  </Text>

                  <Flex direction="column" gap="8px">
                    {socialLinks.map((social, i) => (
                      <Link
                        key={i}
                        href={social.href || "#"}
                        color={textColor}
                        display="flex"
                        style={{
                          alignItems: "center",
                          gap: "8px"
                        }}
                      >
                        {social.icon && (
                          <img src={social.icon} className={`icon-${social.label}`} />
                        )}
                        {social.label}
                      </Link>
                    ))}
                  </Flex>
                </View>
              )}

            </Flex>
            <DropZone zone="text-zone" />
          </View>
        );
      },
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

      render: ({ direction, justify, align, gap, items, className, customCss }) => {
        const style = {
          display: "flex",
          flexDirection: direction,
          justifyContent: justify,
          alignItems: align,
          gap: `${gap}px`,
        };
        const uniqueClass = `flexbox-${Math.random().toString(36).substr(2, 9)}`;

        return (
          <div style={style} className={`${className || ""} ${uniqueClass}`}>
            {customCss && <style>{`.${uniqueClass} { ${customCss} }`}</style>}

            {items?.map((item: any, index: number) => (
              <>
                <DropZone zone={`flex-item-${index}`} />
              </>
            ))}
          </div>
        );
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
        image: "https://png.pngtree.com/thumb_back/fh260/background/20240522/pngtree-abstract-cloudy-background-beautiful-natural-streaks-of-sky-and-clouds-red-image_15684333.jpg",
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

      render: ({ sourceType, image, alt, align, className, customCss,
        widthValue, widthUnit, maxWidthValue, maxWidthUnit, heightValue, heightUnit, maxHeightValue, maxHeightUnit,
        objectFit, objectPosition, overflow, borderRadius,
      }) => {
        const wrapperStyle = {
          textAlign: align,
          overflow,
        };

        const imgStyle = {
          display: "inline-block",

          width:
            widthValue != null
              ? `${widthValue}${widthUnit}`
              : undefined,

          maxWidth:
            maxWidthValue != null
              ? `${maxWidthValue}${maxWidthUnit}`
              : undefined,

          height:
            heightValue != null
              ? `${heightValue}${heightUnit}`
              : undefined,

          maxHeight:
            maxHeightValue != null
              ? `${maxHeightValue}${maxHeightUnit}`
              : undefined,

          objectFit,
          objectPosition,
          borderRadius,
        };

        if (sourceType === "gallery") {
          return (
            <div style={{ padding: 16, border: "1px dashed #ccc" }}>
              Gallery integration placeholder
            </div>
          );
        }
        const wrapperClass = className || "";
        const uniqueClass = `image-${Math.random().toString(36).substr(2, 9)}`;

        return (
          <div style={wrapperStyle} className={`${wrapperClass} ${uniqueClass}`}>
            {customCss && <style>{`.${uniqueClass} { ${customCss} }`}</style>}
            <img src={image} alt={alt} style={imgStyle} />
          </div>
        );
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

      render: ({
        url,
        width,
        widthUnit,
        maxWidth,
        height,
        maxHeight,
        className,
        customCss,
      }) => {
        const wrapperStyle = {
          width: `${width}${widthUnit}`,
          maxWidth: `${maxWidth}px`,
          margin: "0 auto",
        };

        const iframeStyle = {
          width: "100%",
          height: `${height}px`,
          maxHeight: `${maxHeight}px`,
          borderRadius: 8,
          display: "block",
        };

        const wrapperClass = className || "";
        const uniqueClass = `video-${Math.random().toString(36).substr(2, 9)}`;

        return (
          <div className={`video-wrapper ${wrapperClass} ${uniqueClass}`} style={wrapperStyle}>
            {customCss && <style>{`.${uniqueClass} { ${customCss} }`}</style>}
            <iframe
              src={url}
              title="Video"
              allowFullScreen
              style={iframeStyle}
            />
          </div>
        );
      },
    },

    Button: {
      label: "🔘 Button",
      fields: {
        className: { type: "text", label: "Custom class" },
        customCss: {
          type: "textarea",
          label: "Custom CSS",
        },
        text: {
          type: "text",
          label: "Button text",
        },

        type: {
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

        /* -------- LINK -------- */

        href: {
          type: "text",
          label: "Link URL",
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
          ],
        },

        heightValue: { type: "number", label: "Height" },
        heightUnit: {
          type: "select",
          label: "Height unit",
          options: [
            { label: "px", value: "px" },
          ],
        },

        maxWidthValue: { type: "number", label: "Max width" },
        maxWidthUnit: {
          type: "select",
          label: "Max width unit",
          options: [
            { label: "px", value: "px" },
            { label: "%", value: "%" },
          ],
        },

        maxHeightValue: { type: "number", label: "Max height" },
        maxHeightUnit: {
          type: "select",
          label: "Max height unit",
          options: [
            { label: "px", value: "px" },
          ],
        },

        paddingX: {
          type: "number",
          label: "Horizontal padding (px)",
        },

        paddingY: {
          type: "number",
          label: "Vertical padding (px)",
        },

        borderRadius: {
          type: "number",
          label: "Border radius (px)",
        },


      },

      defaultProps: {
        text: "Click me",
        type: "primary",

        href: "",
        external: false,

        align: "left",

        widthValue: undefined,
        widthUnit: "px",

        heightValue: undefined,
        heightUnit: "px",

        maxWidthValue: undefined,
        maxWidthUnit: "px",

        maxHeightValue: undefined,
        maxHeightUnit: "px",

        paddingX: 16,
        paddingY: 10,
        borderRadius: 6,
        className: "button-001",
        customCss: "",
      },

      render: ({
        text,
        type,
        href,
        external,
        align,

        widthValue,
        widthUnit,
        heightValue,
        heightUnit,
        maxWidthValue,
        maxWidthUnit,
        maxHeightValue,
        maxHeightUnit,

        paddingX,
        paddingY,
        borderRadius,
        className,
        customCss,
      }) => {
        const typeStyles = {
          default: {
            background: "#e5e7eb",
            color: "#111827",
          },
          primary: {
            background: "#2563eb",
            color: "#ffffff",
          },
          basic: {
            background: "transparent",
            color: "#111827",
            border: "1px solid #d1d5db",
          },
          success: {
            background: "#16a34a",
            color: "#ffffff",
          },
          info: {
            background: "#0284c7",
            color: "#ffffff",
          },
          danger: {
            background: "#dc2626",
            color: "#ffffff",
          },
          link: {
            background: "transparent",
            color: "#2563eb",
            padding: 0,
          },
        };

        const wrapperStyle = {
          textAlign: align,
        };

        const buttonStyle = {
          display: "inline-block",
          cursor: "pointer",
          textDecoration: "none",

          padding:
            type === "link"
              ? undefined
              : `${paddingY}px ${paddingX}px`,

          borderRadius:
            type === "link" ? 0 : `${borderRadius}px`,

          width:
            widthValue != null
              ? `${widthValue}${widthUnit}`
              : undefined,

          height:
            heightValue != null
              ? `${heightValue}${heightUnit}`
              : undefined,

          maxWidth:
            maxWidthValue != null
              ? `${maxWidthValue}${maxWidthUnit}`
              : undefined,

          maxHeight:
            maxHeightValue != null
              ? `${maxHeightValue}${maxHeightUnit}`
              : undefined,

          ...typeStyles[type],
        };
        const wrapperClass = className || "";
        const uniqueClass = `button-${Math.random().toString(36).substr(2, 9)}`;

        return (
          <div style={wrapperStyle} className={`${wrapperClass}`}>
            <a
              href={href || "#"}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className={uniqueClass}
              style={buttonStyle}
            >
              {text}

              {customCss && (
                <style>
                  {`
                .${uniqueClass} {
                  ${customCss}
                }
              `}
                </style>
              )}
            </a>
          </div>
        );
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
        alignItems: "start",
        justifyItems: "center",
        maxWidth: 1200,
        padding: 0,
        className: "",
        customCss: "",
      },

      render: ({
        columns,
        rows,
        gap,
        alignItems,
        justifyItems,
        maxWidth,
        padding,
        className,
        customCss,
      }) => {
        const gridId = `grid-${Math.random().toString(36).slice(2)}`;

        return (
          <>
            <style>
              {`
          /* Base grid styles */
          .${gridId} {
            gap: ${gap}px;
            align-items: ${alignItems};
            justify-items: ${justifyItems};
            max-width: ${maxWidth}px;
            padding: ${padding}px;
            margin: 0 auto;
          }

          /* Custom user CSS attached to class */
            ${className && customCss
                  ? `.${className} { ${customCss} }`
                  : ""
                }
            `}
            </style>

            <DropZone
              // id={gridId}
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${columns || 1}, 1fr)`,
                gridTemplateRows: `repeat(${rows || 1}, auto)`,
              }}
              zone="grid-zone"
              className={`${className} ${gridId}`}
            />
          </>
        );
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

      render: ({
        direction,
        wrap,
        justifyContent,
        alignItems,
        gap,
        flex,
        className,
        customCss,
      }) => {
        const flexId = `flex-${Math.random().toString(36).slice(2)}`;

        return (
          <>
            <style>
              {`
            /* Base flex styles */
            .${flexId} {
              ${flex ? `flex: ${flex};` : ""}
            }

            /* Custom user CSS attached to class */
            ${className && customCss
                  ? `.${className} { ${customCss} }`
                  : ""
                }
          `}
            </style>

            <DropZone
              // id={flexId}
              zone="flex-zone"
              className={`${className} ${flexId}`}
              style={{
                display: "flex",
                gap: `${gap}px`,
                flexDirection: direction,
                flexWrap: wrap,
                alignItems: alignItems,
                justifyContent: justifyContent,
              }}
            />
          </>
        );
      },
    },

    Accordion: {
      label: "🧷 Accordion",

      defaultProps: {
        backgroundColor: "#ffffff",
        itemSpacing: 12,
        iconPosition: "right",
        items: [
          {
            id: "acc-1",
            title: "First accordion item",
            description: "Click here to edit description...",
          },
        ],
      },

      fields: {
        className: { type: "text", label: "Custom class" },
        customCss: {
          type: "textarea",
          label: "Custom CSS",
        },

        items: {
          type: "array",
          label: "Accordion items",
          arrayFields: {
            title: { type: "text", label: "Title" },

            description: {
              type: "textarea",
              label: "Description",
              contentEditable: true,
            },
          },

          getItemSummary: (item) => item.title || "Accordion item",
        },

        itemSpacing: {
          type: "number",
          label: "Vertical spacing (px)",
        },
        iconImage: {
          type: "text",
          label: "Accordion icon (image URL)",
        },

        iconPosition: {
          type: "select",
          label: "Icon position",
          options: [
            { label: "Left", value: "left" },
            { label: "Right", value: "right" },
          ],
        },
      },

      // defaultProps: {
      //   className: "accordion-001",
      //   customCss: "",
      // },
      render: ({ itemSpacing, iconPosition, items, iconImage, className,
        customCss, }) => {

        const wrapperClass = className || "";
        const uniqueClass = `accordion-${Math.random().toString(36).substr(2, 9)}`;
        return (
          <div
            className={`${wrapperClass} ${uniqueClass}`}
            style={{
              padding: "10px",
              borderRadius: "12px",
            }}
          >
            {customCss && <style>{`.${uniqueClass} { ${customCss} }`}</style>}

            {items?.map((item, i) => (
              <details
                key={item.id || i}
                style={{
                  marginBottom: `${itemSpacing}px`,
                  borderRadius: "10px",
                  border: "1px solid #e5e7eb",
                  background: "#ffffff",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  overflow: "hidden",
                }}
              >
                <summary
                  style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: iconPosition === "left" ? "row-reverse" : "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "16px",
                    padding: "14px 16px",
                    background: "#f8fafc",
                    transition: "background 0.2s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background = "#f1f5f9")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background = "#f8fafc")
                  }
                >
                  <span>{item.title}</span>

                  {iconImage ? (
                    <img
                      src={iconImage}
                      alt="accordion icon"
                      style={{
                        width: "18px",
                        height: "18px",
                        transition: "transform 0.2s ease",
                        marginLeft: iconPosition === "right" ? "8px" : "0",
                        marginRight: iconPosition === "left" ? "8px" : "0",
                      }}
                      className="accordion-icon"
                    />
                  ) : (
                    <span style={{ marginLeft: "8px" }}>▼</span>
                  )}
                </summary>

                <div
                  style={{
                    padding: "12px 16px",
                    background: "#ffffff",
                    color: "#374151",
                    fontSize: "14px",
                    lineHeight: "1.6",
                  }}
                >
                  {item.description}
                </div>
              </details>
            ))}

            <style>{`
        details[open] summary .accordion-icon {
          transform: rotate(180deg);
        }
      `}</style>
          </div>
        );
      },
    },

    Carousel: {
      label: "🎞️ Carousel",

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

      render: ({
        slides,
        slidesPerView,
        spaceBetween,
        loop,
        autoplayDelay,
        paginationClickable,
        showNavigationArrows,
        isPlayicon,
        alignBottom,
        height,
        minHeight,
      }) => {
        const sliderConfig = {
          slidesPerView,
          spaceBetween,
          loop,
          autoplay: { delay: autoplayDelay },
          pagination: { clickable: paginationClickable },
          navigation: true,
        };

        return (
          <MainSlider
            slides={slides}
            sliderConfig={sliderConfig}
            alignBottom={alignBottom}
            isPlayicon={isPlayicon}
            showNavigationArrows={showNavigationArrows}
            containerProps={{
              height,
              minHeight,
            }}
          />
        );
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
              label: "Active tab (for editing)",
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
        title: "Descubre Toyota",
        subTitle: "Sub title",
        TabItemPosition: "center",
        theme: "light",
        backgroundColor: "#ffffff",
        tabs: [
          {
            label: "Tab 1",
            icon: "",
            defaultContent:
              "Hello, this is tab 1 default content.",
          },
          {
            label: "Tab 2",
            icon: "",
            defaultContent:
              "Hello, this is tab 2 default content.",
          },
        ],
        activeTabIndex: 0,
        className: "tab-content-00",
        customCss: "",
      },

      render: (props: any) => {
        const uniqueClass = `tab-${Math.random()
          .toString(36)
          .substr(2, 9)}`;
        return <TabsRenderer {...props} />;
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
        backgroundColor: "#f5f5f5",
      },

      render: ({
        className,
        customCss,
        marginValue,
        paddingValue,
        backgroundColor,
      }) => {
        const uniqueClass = `container-${Math.random()
          .toString(36)
          .substr(2, 9)}`;

        const style = {
          margin: marginValue != null ? `0 ${marginValue}px` : "0 auto",
          padding: paddingValue != null ? `${paddingValue}px` : undefined,
          backgroundColor: backgroundColor || undefined,
          minHeight: "120px",
        };

        return (
          <div className={`${className} ${uniqueClass}`} style={style}>
            {customCss && (
              <style>{`
            .${uniqueClass} {
              ${customCss}
            }
          `}</style>
            )}

            {/* THIS IS YOUR DROPZONE */}
            <DropZone zone="content" />
          </div>
        );
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

        image: "data:image/jpeg;base64,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",
        imageWidth: "50%",
        imageHeight: undefined,
        imageMaxWidth: 0,
        imageMaxHeight: undefined,
        imageBorderRadius: 8,
        imageObjectFit: "cover",

        title: "This is the title",
        subtitle: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nobis, recusandae explicabo quisquam commodi vel animi. A perferendis sit possimus dolorem fugiat reiciendis aliquam sint quibusdam, maiores nihil eligendi repudiandae. Dolor, eius dolorum. Quas adipisci facilis itaque eligendi, quod eveniet blanditiis pariatur vero molestias fugiat necessitatibus placeat illo culpa est doloremque! Odit sunt officiis enim similique commodi, vel culpa exercitationem illo deleniti minima vero dicta quia at ipsum ut quidem magni voluptas quisquam maiores nemo! Minus molestiae fuga architecto, unde eius quo magnam nihil sapiente consequatur odit vero iusto cupiditate earum aut quae labore fugit amet laboriosam! Quos, quod vitae?",
        titleColor: "#111827",
        subtitleColor: "#374151",
        textAlign: "left",
        textMaxWidth: 500,
        className: "section-00414",
        customCss: "",
      },

      render: ({
        imagePosition,
        gap,
        paddingY,

        image,
        imageWidth,
        imageHeight,
        imageMaxWidth,
        imageMaxHeight,
        imageBorderRadius,
        imageObjectFit,

        title,
        subtitle,
        titleColor,
        subtitleColor,
        textAlign,
        textMaxWidth,
        className,
        customCss,
      }) => {
        const isLeft = imagePosition === "left";
        const wrapperClass = className || "";
        const uniqueClass = `section-${Math.random().toString(36).substr(2, 9)}`;

        const containerStyle: React.CSSProperties = {
          display: "flex",
          flexDirection: (isLeft ? "row" : "row-reverse") as React.CSSProperties["flexDirection"],
          alignItems: "center",
          gap: `${gap}px`,
          paddingTop: `${paddingY}px`,
          paddingBottom: `${paddingY}px`,
          flexWrap: "wrap",
        };

        const imgStyle = {
          width: imageWidth ? `${imageWidth}` : "auto",
          height: imageHeight ? `${imageHeight}px` : "auto",
          maxWidth: imageMaxWidth ? `${imageMaxWidth}px` : "100%",
          maxHeight: imageMaxHeight ? `${imageMaxHeight}px` : "none",
          borderRadius: `${imageBorderRadius}px`,
          objectFit: imageObjectFit,
          flexShrink: 0,
        };

        const textStyle = {
          maxWidth: textMaxWidth ? `${textMaxWidth}px` : "100%",
          textAlign,
        };

        return (
          <div className={wrapperClass + " " + uniqueClass} style={containerStyle}>
            {customCss && <style>{`.${uniqueClass} { ${customCss} }`}</style>}

            <img src={image} alt="Image" style={imgStyle} />
            <div style={textStyle}>
              <h2 style={{ color: titleColor, margin: 0 }}>{title}</h2>
              <p style={{ color: subtitleColor, marginTop: 8 }}>{subtitle}</p>
            </div>
          </div>
        );
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
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Lis_3i5dNLgq9f8sPu1grpzbCnGcW66pJA&s",
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
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nobis, recusandae explicabo quisquam commodi vel animi. A perferendis sit possimus dolorem fugiat reiciendis aliquam sint quibusdam, maiores nihil eligendi repudiandae. Dolor, eius dolorum. Quas adipisci facilis itaque eligendi, quod eveniet blanditiis pariatur vero molestias fugiat necessitatibus placeat illo culpa est doloremque! Odit sunt officiis enim similique commodi, vel culpa exercitationem illo deleniti minima vero dicta quia at ipsum ut quidem magni voluptas quisquam maiores nemo! Minus molestiae fuga architecto, unde eius quo magnam nihil sapiente consequatur odit vero iusto cupiditate earum aut quae labore fugit amet laboriosam! Quos, quod vitae?",
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

      render: ({
        image,
        imageWidth,
        imageHeight,
        imageMaxWidth,
        imageMaxHeight,
        imageBorderRadius,
        imageObjectFit,
        imageAlign,

        title,
        titleColor,
        description,
        descriptionColor,
        textAlign,

        buttonText,
        buttonType,
        className,
        customCss,
        buttonHref,
        buttonExternal,

        cardWidth,
        cardMaxWidth,
        cardPadding,
        cardBorderRadius,
        cardShadow,
      }) => {
        const wrapperClass = className || "";
        const uniqueClass = `card-${Math.random().toString(36).substr(2, 9)}`;
        // image style
        const imgStyle = {
          width: imageWidth ? `${imageWidth}px` : "100%",
          height: imageHeight ? `${imageHeight}px` : "auto",
          maxWidth: imageMaxWidth ? `${imageMaxWidth}px` : "100%",
          maxHeight: imageMaxHeight ? `${imageMaxHeight}px` : "none",
          borderRadius: `${imageBorderRadius}px`,
          objectFit: imageObjectFit,
          display: "block",
          marginBottom: imageAlign === "top" ? "12px" : undefined,
          marginRight:
            imageAlign === "left" ? "12px" : imageAlign === "right" ? "12px" : 0,
          marginLeft: imageAlign === "right" ? "12px" : 0,
        };

        // button style (reuse type styles)
        const buttonTypes = {
          default: { background: "#e5e7eb", color: "#111827" },
          primary: { background: "#2563eb", color: "#fff" },
          basic: { background: "transparent", color: "#111827", border: "1px solid #d1d5db" },
          success: { background: "#16a34a", color: "#fff" },
          info: { background: "#0284c7", color: "#fff" },
          danger: { background: "#dc2626", color: "#fff" },
          link: { background: "transparent", color: "#2563eb", padding: 0 },
        };

        const buttonStyle = {
          display: buttonText ? "inline-block" : "none",
          cursor: "pointer",
          textDecoration: "none",
          padding: buttonType === "link" ? undefined : "8px 16px",
          borderRadius: "6px",
          ...buttonTypes[buttonType],
          marginTop: "12px",
        };

        // text container style
        const textStyle = {
          textAlign,
          flex: imageAlign === "left" || imageAlign === "right" ? 1 : "unset",
        };

        // card container flex
        const isHorizontal = imageAlign === "left" || imageAlign === "right";
        const containerStyle: React.CSSProperties = {
          display: isHorizontal ? "flex" : "block",
          flexDirection: (imageAlign === "right" ? "row-reverse" : "row") as React.CSSProperties['flexDirection'],
          width: cardWidth ? `${cardWidth}px` : "100%",
          maxWidth: cardMaxWidth ? `${cardMaxWidth}px` : "100%",
          padding: `${cardPadding}px`,
          borderRadius: `${cardBorderRadius}px`,
          boxShadow: cardShadow,
          alignItems: "flex-start",
          gap: "12px",
        };

        return (
          <div className={wrapperClass + " " + uniqueClass} style={containerStyle}>
            {customCss && <style>{`.${uniqueClass} { ${customCss} }`}</style>}
            {image && <img src={image} alt="Card image" style={imgStyle} />}
            <div style={textStyle}>
              {title && <h3 style={{ color: titleColor, margin: 0 }}>{title}</h3>}
              {description && <p style={{ color: descriptionColor, marginTop: 6 }}>{description}</p>}
              {buttonText && (
                <a
                  href={buttonHref || "#"}
                  target={buttonExternal ? "_blank" : undefined}
                  rel={buttonExternal ? "noopener noreferrer" : undefined}
                  style={buttonStyle}
                >
                  {buttonText}
                </a>
              )}
            </div>
          </div>
        );
      },
    },

    Input: {
      label: "✏️ Input",
      fields: {
        className: { type: "text", label: "Custom class" },
        customCss: { type: "textarea", label: "Custom CSS" },
        name: { type: "text", label: "Field name (for form submit)" },
        placeholder: { type: "text", label: "Placeholder" },

        type: {
          type: "select",
          label: "Input type",
          options: [
            { label: "Text", value: "text" },
            { label: "Email", value: "email" },
            { label: "Password", value: "password" },
            { label: "Number", value: "number" },
            { label: "Tel", value: "tel" },
            { label: "URL", value: "url" },
            { label: "Search", value: "search" },
            { label: "Date", value: "date" },
            { label: "Time", value: "time" },
          ],
        },

        /* ---------- LAYOUT ---------- */
        width: { type: "number", label: "Width (px)" },
        height: { type: "number", label: "Height (px)" },
        padding: { type: "text", label: "Padding (CSS)" },
        margin: { type: "text", label: "Margin (CSS)" },

        /* ---------- VALIDATION ---------- */
        required: {
          type: "radio", label: "Required", options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ]
        },

        minLength: { type: "number", label: "Min length" },
        maxLength: { type: "number", label: "Max length" },

        pattern: {
          type: "text",
          label: "Regex pattern (optional)",
          description: "Example: ^[A-Za-z]+$"
        },

        errorMessage: {
          type: "textarea",
          label: "Custom error message",
        },

        /* ---------- ONCHANGE EDITOR ---------- */
        onChangeCode: {
          type: "textarea",
          label: "Custom onChange logic (JS)",
          description: "You can write: value => { your logic }",
        },
      },

      defaultProps: {
        type: "text",
        placeholder: "Enter text...",
        width: 320,
        height: 40,
        padding: "8px 10px",
        name: "input_1",
        margin: "8px 0",
        className: "",
        customCss: "",
        required: false,
        minLength: undefined,
        maxLength: undefined,
        pattern: "",
        errorMessage: "Invalid input",
        onChangeCode: "value => console.log(value)",
      },

      render: (props: any) => {
        const uniqueClass = `input-${Math.random()
          .toString(36)
          .substr(2, 9)}`;

        return (
          <PuckInput
            {...props}
            uniqueClass={uniqueClass}
          />
        );
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
        const uniqueClass = `checkbox-${Math.random()
          .toString(36)
          .substr(2, 9)}`;

        return <PuckCheckbox {...props} uniqueClass={uniqueClass} />;
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
        const uniqueClass = `datepicker-${Math.random()
          .toString(36)
          .substr(2, 9)}`;

        return <PuckDatePicker {...props} uniqueClass={uniqueClass} />;
      },
    },

    Dropdown: {
      label: "📥 Dropdown",
      fields: {
        className: { type: "text", label: "Custom class" },
        customCss: { type: "textarea", label: "Custom CSS" },

        name: { type: "text", label: "Field name (for form submit)" },
        label: { type: "text", label: "Field label" },

        options: {
          type: "array",
          label: "Options",
          arrayFields: {
            label: { type: "text", label: "Option label" },
            value: { type: "text", label: "Option value" },
          },
          getItemSummary: (item) =>
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

        onChangeCode: {
          type: "textarea",
          label: "Custom onChange logic (JS)",
          description: "Example: value => { console.log(value) }",
        },
      },

      defaultProps: {
        label: "Choose an option",
        className: "",
        customCss: "",
        required: false,
        name: "dropdown_1",
        errorMessage: "Please select an option",
        onChangeCode: "value => console.log(value)",

        options: [
          { label: "Option 1", value: "option1" },
          { label: "Option 2", value: "option2" },
          { label: "Option 3", value: "option3" },
        ],

        defaultValue: "",
      },

      render: (props: any) => {
        const uniqueClass = `dropdown-${Math.random()
          .toString(36)
          .substr(2, 9)}`;

        return <PuckDropdown {...props} uniqueClass={uniqueClass} />;
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
          getItemSummary: (item) =>
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
        const uniqueClass = `searchdd-${Math.random()
          .toString(36)
          .substr(2, 9)}`;

        return <PuckSearchableDropdown {...props} uniqueClass={uniqueClass} />;
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
          getItemSummary: (item) =>
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
        const uniqueClass = `radiogroup-${Math.random()
          .toString(36)
          .substr(2, 9)}`;

        return <PuckRadioGroup {...props} uniqueClass={uniqueClass} />;
      },
    },

    Form: {
      label: "📝 Form",
      fields: {
        className: { type: "text", label: "Custom class" },
        customCss: { type: "textarea", label: "Custom CSS" },
        formLabel: {
          type: "text",
          label: "Form title"
        },
        submitLabel: {
          type: "text",
          label: "Submit button text"
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
        onSubmitCode: "(values) => console.log(values)",
      },

      render: (props: any) => {
        const uniqueClass = `form-${Math.random()
          .toString(36)
          .substr(2, 9)}`;

        return (
          <PuckForm {...props} uniqueClass={uniqueClass} />
        );
      },
    },

    RichTextBlock: {
      label: "Rich Text",
      fields: {
        content: {
          type: "richtext",

          // Add custom TipTap extension
          tiptap: {
            extensions: [Superscript],
            selector: ({ editor }) => ({
              isSuperscript: editor?.isActive("superscript"),
              canSuperscript: editor
                ?.can()
                .chain()
                .toggleSuperscript()
                .run(),
            }),
          },

          // Custom toolbar with a Superscript control
          renderMenu: ({ children, editor, editorState }) => (
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
      render: ({ content }) => (
        <div style={{ padding: 64, maxWidth: 700, margin: "0 auto" }}>
          {content}
        </div>
      ),
    },
  },
};

export default config;