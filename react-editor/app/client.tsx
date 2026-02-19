"use client";

import { Puck } from "@puckeditor/core";
// import { createAiPlugin } from "@puckeditor/plugin-ai";
import { useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";
import config from "../puck.config";
import { Render } from "@puckeditor/core";
import { megaMenuStore } from "./zone";
import { usePuck } from "./PuckContext";

// const aiPlugin = createAiPlugin();
const initialData = { content: [] };

export function Client() {
  const { puckData, setPuckData } = usePuck();
  const [mode, setMode] = useState("edit");

  const debouncedPublish = useMemo(
    () =>
      debounce((data) => {
        console.log("Page save data =>", data);

        window.parent.postMessage(
          { type: "PUCK_PUBLISHED", payload: data },
          "*"
        );
      }, 500),
    []
  );

  useEffect(() => {
    return () => {
      debouncedPublish.cancel();
    };
  }, [debouncedPublish]);

  // inject the import json in the preview bar
  useEffect(() => {
    const interval = setInterval(() => {
      const container = document.querySelector(
        "._ViewportControls-actionsInner_e3unb_46"
      );

      if (!container) return;

      if (container.querySelector(".custom-import-json-btn")) {
        clearInterval(interval);
        return;
      }

      const label = document.createElement("label");
      label.className = "custom-import-json-btn";
      label.style.padding = "9px 12px";
      label.style.borderRadius = "6px";
      label.style.border = "1px solid #2563eb";
      label.style.background = "#2563eb";
      label.style.color = "#fff";
      label.style.cursor = "pointer";
      label.style.fontSize = "13px";
      label.style.marginLeft = "10px";
      label.innerText = "Import JSON";

      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json";
      input.style.display = "none";

      input.onchange = (event: any) => {
        handleImportJSON(event);
      };

      label.appendChild(input);

      container.appendChild(label);

      clearInterval(interval);
    }, 300);

    return () => clearInterval(interval);
  }, [puckData]);

  // inject buttons
  useEffect(() => {
    const interval = setInterval(() => {
      const navList = document.querySelector(
        'ul[class*="Nav-list"]'
      );

      if (!navList) return;

      // Prevent duplicate injection
      if (navList.querySelector(".custom-page-tab")) {
        clearInterval(interval);
        return;
      }

      // Helper to create li
      const createTab = (
        label: string,
        payload: string,
        className: string,
        svgMarkup: string
      ) => {
        const li = document.createElement("li");
        li.className = className;
        li.style.cursor = "pointer";
        li.style.padding = "8px 4px";
        li.style.borderRadius = "6px";
        li.style.marginBottom = "6px";
        li.style.display = "flex";
        li.style.justifyContent = "center";
        li.style.alignItems = "center";
        li.style.gap = "8px";
        li.style.fontWeight = "500";

        // Create wrapper
        const wrapper = document.createElement("div");
        wrapper.style.display = "flex";
        wrapper.style.alignItems = "center";
        wrapper.style.gap = "8px";
        wrapper.style.flexDirection = "column";
        wrapper.style.justifyContent = "center";

        // Inject SVG
        const iconWrapper = document.createElement("div");
        iconWrapper.innerHTML = svgMarkup;

        // Remove unwanted script tags (browser extensions sometimes inject)
        iconWrapper.querySelectorAll("script").forEach((s) => s.remove());

        // Create label
        const textSpan = document.createElement("span");
        textSpan.innerText = label;
        textSpan.style.fontSize = "10px"

        wrapper.appendChild(iconWrapper);
        wrapper.appendChild(textSpan);
        li.appendChild(wrapper);

        // Default active state for Page
        const setActive = (active: boolean) => {
          if (active) {
            // li.style.background = "#2563eb";
            li.style.color = "#000000";
            li.querySelectorAll("path").forEach((p: any) => {
              p.setAttribute("stroke", "#ffffff");
              p.setAttribute("fill", "#ffffff");
            });
          } else {
            li.style.background = "#f3f4f6";
            li.style.color = "#111827";
            li.querySelectorAll("path").forEach((p: any) => {
              p.setAttribute("stroke", "#868686");
              p.setAttribute("fill", "#868686");
            });
          }
        };

        if (label === "Page") {
          setActive(true);
        } else {
          setActive(false);
        }

        li.onclick = () => {
          console.log("PUCK_PUBLISHED_PANEL =>", payload);

          window.parent.postMessage(
            {
              type: "PUCK_PUBLISHED_PANEL",
              payload,
            },
            "*"
          );

          // Reset all
          navList
            .querySelectorAll(".custom-page-tab, .custom-component-tab")
            .forEach((el: any) => {
              el.style.background = "#f3f4f6";
              el.style.color = "#111827";
              el.querySelectorAll("path").forEach((p: any) => {
                p.setAttribute("stroke", "#868686");
                p.setAttribute("fill", "#868686");
              });
            });

          setActive(true);
        };

        return li;
      };

      const pageTab = createTab(
        "Page",
        "PAGE_PANEL_CLICKED",
        "custom-page-tab",
        `<img alt="page" src="https://app.genera.sh/assets/images/icon-pages.svg" />`
      );

      const componentTab = createTab(
        "Component",
        "COMPONENT_PANEL_CLICKED",
        "custom-component-tab",
        `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><script xmlns="" id="eppiocemhmnlbhjplcgkofciiegomcon"/><script xmlns=""/><script xmlns=""/><g clip-path="url(#clip0_3_49178)"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.22708 4.19441C6.1021 4.31943 6.03189 4.48897 6.03189 4.66574C6.03189 4.84252 6.1021 5.01206 6.22708 5.13708L9.52708 8.43708C9.65209 8.56206 9.82163 8.63227 9.99841 8.63227C10.1752 8.63227 10.3447 8.56206 10.4697 8.43708L13.7697 5.13708C13.8947 5.01206 13.9649 4.84252 13.9649 4.66574C13.9649 4.48897 13.8947 4.31943 13.7697 4.19441L10.4697 0.89441C10.3447 0.769429 10.1752 0.699219 9.99841 0.699219C9.82163 0.699219 9.65209 0.769429 9.52708 0.89441L6.22708 4.19441ZM9.99908 7.02374L7.64174 4.66641L9.99908 2.30908L12.3551 4.66641L9.99908 7.02374ZM11.5591 9.52774C11.4341 9.65276 11.3639 9.8223 11.3639 9.99908C11.3639 10.1759 11.4341 10.3454 11.5591 10.4704L14.8591 13.7704C14.9841 13.8954 15.1536 13.9656 15.3304 13.9656C15.5072 13.9656 15.6767 13.8954 15.8017 13.7704L19.1017 10.4704C19.2267 10.3454 19.2969 10.1759 19.2969 9.99908C19.2969 9.8223 19.2267 9.65276 19.1017 9.52774L15.8017 6.22774C15.6767 6.10276 15.5072 6.03255 15.3304 6.03255C15.1536 6.03255 14.9841 6.10276 14.8591 6.22774L11.5591 9.52774ZM15.3324 12.3571L12.9751 9.99974L15.3324 7.64241L17.6897 9.99974L15.3324 12.3571ZM6.22574 15.8037C6.10076 15.6787 6.03055 15.5092 6.03055 15.3324C6.03055 15.1556 6.10076 14.9861 6.22574 14.8611L9.52574 11.5611C9.65076 11.4361 9.8203 11.3659 9.99708 11.3659C10.1739 11.3659 10.3434 11.4361 10.4684 11.5611L13.7684 14.8611C13.8934 14.9861 13.9636 15.1556 13.9636 15.3324C13.9636 15.5092 13.8934 15.6787 13.7684 15.8037L10.4684 19.1037C10.3434 19.2287 10.1739 19.2989 9.99708 19.2989C9.8203 19.2989 9.65076 19.2287 9.52574 19.1037L6.22574 15.8037ZM7.64041 15.3331L9.99908 17.6904L12.3551 15.3331L9.99908 12.9757L7.64041 15.3331ZM0.895077 9.52774C0.832993 9.58967 0.783736 9.66324 0.750127 9.74423C0.716519 9.82522 0.699219 9.91205 0.699219 9.99974C0.699219 10.0874 0.716519 10.1743 0.750127 10.2553C0.783736 10.3362 0.832993 10.4098 0.895077 10.4717L4.19374 13.7717C4.31876 13.8967 4.4883 13.9669 4.66508 13.9669C4.84185 13.9669 5.01139 13.8967 5.13641 13.7717L8.43641 10.4717C8.49849 10.4098 8.54775 10.3362 8.58136 10.2553C8.61497 10.1743 8.63227 10.0874 8.63227 9.99974C8.63227 9.91205 8.61497 9.82522 8.58136 9.74423C8.54775 9.66324 8.49849 9.58967 8.43641 9.52774L5.13641 6.22908C5.01139 6.1041 4.84185 6.03389 4.66508 6.03389C4.4883 6.03389 4.31876 6.1041 4.19374 6.22908L0.895077 9.52774ZM4.66574 12.3571L2.30841 9.99974L4.66574 7.64241L7.02174 9.99974L4.66574 12.3571Z" fill="#868686"/></g><defs><clipPath id="clip0_3_49178"><rect width="20" height="20" fill="white"/></clipPath></defs></svg>`
      );

      // Insert at top
      navList.prepend(componentTab);
      navList.prepend(pageTab);

      clearInterval(interval);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMessage = (event: any) => {
      if (event.data?.type === "LOAD_PUCK_DATA") {
        console.log("REACT APP:Received from Angular:", event.data.payload);
        setPuckData(event.data.payload);
        rebuildMegaMenuStore(event.data.payload);
        setMode("preview");
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const handleImportJSON = (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);

        const mergedData = {
          ...puckData, // start from existing state
          ...importedData, // override top-level if needed
          content: [
            ...(puckData.content || []),
            ...(importedData.content || []),
          ],
          zones: {
            ...(puckData.zones || {}),
            ...(importedData.zones || {}),
          },
        };

        console.log("Merged data:", mergedData);
        setPuckData(mergedData);
        rebuildMegaMenuStore(mergedData);
        setMode("preview");
      } catch (err) {
        alert("Invalid JSON file");
      }
    };

    reader.readAsText(file);
  };

  return (
    <>
      <style>
        {`
          span._Button_10byl_1._Button--primary_10byl_48._Button--medium_10byl_29 {
            display: none !important;
          }
        `}
      </style>
      {
        mode === "edit" ? (
          <Puck
            plugins={[]}
            config={config as any}
            onChange={(updatedData) => {
              setPuckData(updatedData);
              rebuildMegaMenuStore(updatedData);

              debouncedPublish(updatedData);
            }}
            data={puckData}
            overrides={{
              header: ({ children, actions }) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <div style={{ width: "100%" }}>

                      {children}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", maxHeight: "66px" }}>
                      <button
                        onClick={() => setMode("preview")}
                        style={{
                          padding: "5px 12px", marginRight: "10px", borderRadius: "6px", border: "1px solid #000000", background: "#ffffff", color: "#000000", cursor: "pointer",
                        }}
                      >
                        Preview
                      </button>
                    </div>
                    {/* <div style={{ display: "flex", alignItems: "center" }}>
                      <label
                        style={{
                          width: "120px",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "8px 16px",
                          backgroundColor: "#0158ad",
                          color: "#ffffff",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "14px",
                          fontWeight: 500,
                          border: "1px solid #2563eb",
                          transition: "all 0.2s ease",
                          height: "36px",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#1d4ed8")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = "#2563eb")
                        }
                      >
                        Import JSON
                        <input
                          type="file"
                          accept=".json"
                          onChange={handleImportJSON}
                          style={{ display: "none" }}
                        />
                      </label>
                    </div> */}
                  </div>
                );
              },
            }}
          // onPublish={(data) => {
          //   setPuckData(data);
          //   console.log("Page save data =>", data);

          //   window.parent.postMessage(
          //     { type: "PUCK_PUBLISHED", payload: data },
          //     "*"
          //   );
          // }}
          />) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "end"
              }}>

              <button
                onClick={() => setMode("edit")}
                style={{
                  padding: "8px 14px",
                  marginTop: "8px",
                  borderRadius: "8px",
                  border: "1px solid #2563eb",
                  background: "#2563eb",
                  color: "white",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: mode === "edit" ? "0 1px 3px rgba(37,99,235,0.3)" : "none",
                }}
              >
                ← Edit page
              </button>
            </div>
            <hr />

            <div>
              <Render
                data={puckData}
                config={config as any}
              />
            </div>
          </>
        )
      }

    </>
  );
}


const rebuildMegaMenuStore = (data: any) => {
  megaMenuStore.items = [];

  if (!data?.content) return;

  data.content.forEach((block: any) => {
    if (block.type === "MegaMenu") {
      const id = block.props.id;

      megaMenuStore.addOrUpdate({
        id,
        content: data.zones?.[`${id}:${id}`] || [],
      });
    }
  });
};