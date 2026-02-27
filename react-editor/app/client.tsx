"use client";

import { Puck } from "@puckeditor/core";
// import { createAiPlugin } from "@puckeditor/plugin-ai";
import { useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";
import config from "../puck.config";
import { Render } from "@puckeditor/core";
import { megaMenuStore } from "./zone";
import { usePuck } from "./PuckContext";
import './client.css'
// const aiPlugin = createAiPlugin();
const initialData = { content: [] };

export function Client() {
  const { puckData, setPuckData } = usePuck();
  const [mode, setMode] = useState("edit");
  const [editorKey, setEditorKey] = useState(0);

  const debouncedPublish = useMemo(
    () =>
      debounce((data) => {
        console.log("Page save data =>", data);

        window.parent.postMessage(
          { type: "PUCK_PUBLISHED", payload: data },
          "*"
        );
      }, 3000),
    []
  );

  useEffect(() => {
    return () => {
      debouncedPublish.cancel();
    };
  }, [debouncedPublish]);

  // inject the import json in the preview bar
  useEffect(() => {
    const injectButton = () => {
      const container = document.querySelector(
        "._ViewportControls-actionsInner_e3unb_46"
      );

      if (!container) return;

      // Prevent duplicate button
      if (container.querySelector(".custom-import-json-btn")) return;

      const label = document.createElement("label");
      label.className = "custom-import-json-btn";
      label.style.padding = "9px 12px";
      label.style.borderRadius = "6px";
      label.style.border = "none";
      label.style.background = "#ffffff00";
      label.style.color = "#fff";
      label.style.display = "flex";
      label.style.alignItems = "center"
      label.style.cursor = "pointer";
      label.style.fontSize = "13px";
      label.style.marginLeft = "10px";
      label.title = "Import JSON";
      label.innerHTML = `
         <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#000" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
          >
            <!-- Arrow down -->
            <path d="M12 3v12" />
            <path d="M7 10l5 5 5-5" />
            
            <!-- Bottom tray -->
            <path d="M5 21h14" />
          </svg>
      `;

      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json";
      input.style.display = "none";

      input.onchange = (event: any) => {
        handleImportJSON(event);
        input.value = ""; // allow re-upload same file
      };

      label.appendChild(input);

      const exportBtn = document.createElement("button");
      exportBtn.className = "custom-export-json-btn";
      exportBtn.style.padding = "0";
      exportBtn.style.borderRadius = "6px";
      exportBtn.style.border = "none";
      exportBtn.style.display = "flex";
      exportBtn.style.alignItems = "center";
      exportBtn.style.background = "#ffffff00";
      exportBtn.style.color = "#fff";
      exportBtn.style.cursor = "pointer";
      exportBtn.style.fontSize = "13px";
      exportBtn.style.marginLeft = "10px";
      exportBtn.title = "Export JSON";
      exportBtn.innerHTML = `
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#000" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        >
          <path d="M12 3v12" />
          <path d="M7 8l5-5 5 5" />
          <path d="M5 21h14" />
        </svg>
      `;
      exportBtn.onclick = () => {
        handleExportJSON();
      };

      container.appendChild(exportBtn);
      container.appendChild(label);
    };

    // Initial attempt
    injectButton();

    // Watch for preview/edit DOM changes
    const observer = new MutationObserver(() => {
      injectButton();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    }
  }, [puckData]);

  // inject buttons of page + component
  useEffect(() => {
    const injectTabs = () => {
      const navList = document.querySelector('ul[class*="Nav-list"]');
      if (!navList) return;

      if (navList.querySelector(".custom-page-tab")) return;

      // === CREATE TABS HERE (your createTab function stays same) ===
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
        // li.style.borderRadius = "6px";
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
            li.classList.add("custom-tab-active");
          } else {
            li.classList.remove("custom-tab-active");
          }
        };

        // if (label === "Page") {
        //   setActive(true);
        // } else {
        //   setActive(false);
        // }

        li.onclick = () => {
          console.log("PUCK_PUBLISHED_PANEL =>", payload);

          window.parent.postMessage(
            {
              type: "PUCK_PUBLISHED_PANEL",
              payload,
            },
            "*"
          );
          // 🔥 1. Reset native Puck tabs
          resetNativeNavActive();

          // Reset all
          navList
            .querySelectorAll(".custom-page-tab, .custom-component-tab")
            .forEach((el: any) => {
              el.classList.remove("custom-tab-active");
            });

          setActive(true);
        };

        return li;
      };

      const pageTab = createTab(
        "Page",
        "PAGE_PANEL_CLICKED",
        "custom-page-tab",
        `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><script xmlns="" id="eppiocemhmnlbhjplcgkofciiegomcon"/><script xmlns=""/><script xmlns=""/><g clip-path="url(#clip0_3_49195)"><path d="M10.834 2.66699H5.00065C4.55862 2.66699 4.1347 2.84259 3.82214 3.15515C3.50958 3.46771 3.33398 3.89163 3.33398 4.33366V17.667C3.33398 18.109 3.50958 18.5329 3.82214 18.8455C4.1347 19.1581 4.55862 19.3337 5.00065 19.3337H15.0007C15.4427 19.3337 15.8666 19.1581 16.1792 18.8455C16.4917 18.5329 16.6673 18.109 16.6673 17.667V8.50033L10.834 2.66699Z" stroke="#868686" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.834 2.66699V8.50033H16.6673" stroke="#868686" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_3_49195"><rect width="20" height="20" fill="white"/></clipPath></defs></svg>`
      );

      const componentTab = createTab(
        "Component",
        "COMPONENT_PANEL_CLICKED",
        "custom-component-tab",
        `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><script xmlns="" id="eppiocemhmnlbhjplcgkofciiegomcon"/><script xmlns=""/><script xmlns=""/><g clip-path="url(#clip0_3_49178)"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.22708 4.19441C6.1021 4.31943 6.03189 4.48897 6.03189 4.66574C6.03189 4.84252 6.1021 5.01206 6.22708 5.13708L9.52708 8.43708C9.65209 8.56206 9.82163 8.63227 9.99841 8.63227C10.1752 8.63227 10.3447 8.56206 10.4697 8.43708L13.7697 5.13708C13.8947 5.01206 13.9649 4.84252 13.9649 4.66574C13.9649 4.48897 13.8947 4.31943 13.7697 4.19441L10.4697 0.89441C10.3447 0.769429 10.1752 0.699219 9.99841 0.699219C9.82163 0.699219 9.65209 0.769429 9.52708 0.89441L6.22708 4.19441ZM9.99908 7.02374L7.64174 4.66641L9.99908 2.30908L12.3551 4.66641L9.99908 7.02374ZM11.5591 9.52774C11.4341 9.65276 11.3639 9.8223 11.3639 9.99908C11.3639 10.1759 11.4341 10.3454 11.5591 10.4704L14.8591 13.7704C14.9841 13.8954 15.1536 13.9656 15.3304 13.9656C15.5072 13.9656 15.6767 13.8954 15.8017 13.7704L19.1017 10.4704C19.2267 10.3454 19.2969 10.1759 19.2969 9.99908C19.2969 9.8223 19.2267 9.65276 19.1017 9.52774L15.8017 6.22774C15.6767 6.10276 15.5072 6.03255 15.3304 6.03255C15.1536 6.03255 14.9841 6.10276 14.8591 6.22774L11.5591 9.52774ZM15.3324 12.3571L12.9751 9.99974L15.3324 7.64241L17.6897 9.99974L15.3324 12.3571ZM6.22574 15.8037C6.10076 15.6787 6.03055 15.5092 6.03055 15.3324C6.03055 15.1556 6.10076 14.9861 6.22574 14.8611L9.52574 11.5611C9.65076 11.4361 9.8203 11.3659 9.99708 11.3659C10.1739 11.3659 10.3434 11.4361 10.4684 11.5611L13.7684 14.8611C13.8934 14.9861 13.9636 15.1556 13.9636 15.3324C13.9636 15.5092 13.8934 15.6787 13.7684 15.8037L10.4684 19.1037C10.3434 19.2287 10.1739 19.2989 9.99708 19.2989C9.8203 19.2989 9.65076 19.2287 9.52574 19.1037L6.22574 15.8037ZM7.64041 15.3331L9.99908 17.6904L12.3551 15.3331L9.99908 12.9757L7.64041 15.3331ZM0.895077 9.52774C0.832993 9.58967 0.783736 9.66324 0.750127 9.74423C0.716519 9.82522 0.699219 9.91205 0.699219 9.99974C0.699219 10.0874 0.716519 10.1743 0.750127 10.2553C0.783736 10.3362 0.832993 10.4098 0.895077 10.4717L4.19374 13.7717C4.31876 13.8967 4.4883 13.9669 4.66508 13.9669C4.84185 13.9669 5.01139 13.8967 5.13641 13.7717L8.43641 10.4717C8.49849 10.4098 8.54775 10.3362 8.58136 10.2553C8.61497 10.1743 8.63227 10.0874 8.63227 9.99974C8.63227 9.91205 8.61497 9.82522 8.58136 9.74423C8.54775 9.66324 8.49849 9.58967 8.43641 9.52774L5.13641 6.22908C5.01139 6.1041 4.84185 6.03389 4.66508 6.03389C4.4883 6.03389 4.31876 6.1041 4.19374 6.22908L0.895077 9.52774ZM4.66574 12.3571L2.30841 9.99974L4.66574 7.64241L7.02174 9.99974L4.66574 12.3571Z" fill="#868686"/></g><defs><clipPath id="clip0_3_49178"><rect width="20" height="20" fill="white"/></clipPath></defs></svg>`
      );

      navList.prepend(componentTab);
      navList.prepend(pageTab);
    };

    injectTabs();

    // Watch DOM for sidebar rebuild
    const observer = new MutationObserver(() => {
      injectTabs();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  // for recive the json from another app
  useEffect(() => {
    const handleMessage = (event: any) => {
      if (event.data?.type === "LOAD_PUCK_DATA") {
        console.log("REACT APP:Received from Angular:", event.data.payload);
        setPuckData(event.data.payload);
        setEditorKey(prev => prev + 1);
        rebuildMegaMenuStore(event.data.payload);
        // window.parent.postMessage(
        //   {
        //     type: "PUCK_PUBLISHED_PANEL",
        //     payload: "PANEL_CLOSED",
        //   },
        //   "*"
        // );
        // setMode("preview");
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  // import json
  const handleImportJSON = (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);

        const mergedData = {
          root: {
            ...puckData.root,
            ...importedData.root,
          },

          content: mergeUniqueContent(
            puckData.content,
            importedData.content
          ),

          zones: mergeUniqueZones(
            puckData.zones,
            importedData.zones
          ),
        };

        console.log("Merged unique data:", mergedData);

        setPuckData(mergedData);
        rebuildMegaMenuStore(mergedData);
        setMode("preview");
      } catch (err) {
        alert("Invalid JSON file");
      }
    };

    reader.readAsText(file);
  };

  // export json
  const handleExportJSON = () => {
    try {
      const jsonString = JSON.stringify(puckData, null, 2);

      const blob = new Blob([jsonString], {
        type: "application/json",
      });

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "puck-data.json";
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      alert("Failed to export JSON");
    }
  };

  useEffect(() => {
    const attachPanelListeners = () => {
      // Select native nav items (Blocks + Outline)
      const navItems = document.querySelectorAll(
        'li[class*="NavItem"]'
      );

      if (!navItems.length) return;

      navItems.forEach((item) => {
        const text = item.textContent?.trim();

        if (text === "Blocks" || text === "Outline") {
          // Avoid duplicate binding
          if ((item as any)._panelListenerAttached) return;

          item.addEventListener("click", () => {
            console.log("PANEL_CLOSED triggered from:", text);
            document
              .querySelectorAll(".custom-page-tab, .custom-component-tab")
              .forEach((el: any) => {
                el.classList.remove("custom-tab-active");
              });

            window.parent.postMessage(
              {
                type: "PUCK_PUBLISHED_PANEL",
                payload: "PANEL_CLOSED",
              },
              "*"
            );
          });

          (item as any)._panelListenerAttached = true;
        }
      });
    };


    // Run initially
    attachPanelListeners();

    // Observe sidebar rebuild (Puck re-renders often)
    const observer = new MutationObserver(() => {
      attachPanelListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  const resetNativeNavActive = () => {
    setTimeout(() => {
      const nativeItems = document.querySelectorAll(
        'li[class*="_NavItem_"]'
      );

      nativeItems.forEach((item: any) => {
        item.classList.forEach((cls: string) => {
          if (cls.includes("_NavItem--active_")) {
            item.classList.remove(cls);
          }
        });
      });
    }, 0);
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
            key={editorKey}
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
                        onClick={() => {
                          setMode("preview")

                          window.parent.postMessage(
                            {
                              type: "PUCK_PUBLISHED_PANEL",
                              payload: "PANEL_CLOSED",
                            },
                            "*"
                          );
                        }}
                        style={{
                          padding: "5px 12px", marginRight: "10px", borderRadius: "6px", border: "1px solid #000000", background: "#ffffff", color: "#000000", cursor: "pointer",
                        }}
                      >
                        Preview
                      </button>
                    </div>
                  </div>
                );
              },
            }}
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


const mergeUniqueContent = (existing: any[] = [], incoming: any[] = []) => {
  const map = new Map();

  [...existing, ...incoming].forEach((item) => {
    if (item?.props?.id) {
      map.set(item.props.id, item);
    }
  });

  return Array.from(map.values());
};

const mergeUniqueZones = (existing: any = {}, incoming: any = {}) => {
  const mergedZones: any = { ...existing };

  Object.keys(incoming).forEach((zoneKey) => {
    const existingZoneItems = existing[zoneKey] || [];
    const incomingZoneItems = incoming[zoneKey] || [];

    const map = new Map();

    [...existingZoneItems, ...incomingZoneItems].forEach((item) => {
      if (item?.props?.id) {
        map.set(item.props.id, item);
      }
    });

    mergedZones[zoneKey] = Array.from(map.values());
  });

  return mergedZones;
};