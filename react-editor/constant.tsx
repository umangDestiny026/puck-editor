import { DropZone } from "@puckeditor/core";
import { megaMenuStore } from "./app/zone";
import { useEffect } from "react";

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

const MegaMenuRenderer = (props: any) => {
  const {
    id,
    isOpen,
    backgroundColor,
    className,
    customCss,
  } = props;



  const uniqueClass = `id-${id}`;
  const zoneKey = id;

  useEffect(() => {
    megaMenuStore.addOrUpdate({
      id,
      isOpen,
      backgroundColor,
      className,
      customCss,
      content: []
    });
  }, [id]);

  if (!isOpen) return null;
  console.log("megamenu", megaMenuStore.items);


  return (
    <>
      {customCss && (
        <style>{`.${uniqueClass} { ${customCss} }`}</style>
      )}

      <div
        className={`${className || ""} ${uniqueClass}`}
        style={{
          position: "relative",
          inset: "60px 0px 0px",
          paddingTop: "30px",
          backgroundColor,
          height: "200px",
          zIndex: 9999999,
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <DropZone zone={zoneKey} />
      </div>
    </>
  );
}


export default MegaMenuRenderer;