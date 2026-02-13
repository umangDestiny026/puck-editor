"use client";

import { Puck } from "@puckeditor/core";
import { createAiPlugin } from "@puckeditor/plugin-ai";
import { useEffect, useState } from "react";

import config from "../puck.config";
import { Render } from "@puckeditor/core";
import { megaMenuStore } from "./zone";

const aiPlugin = createAiPlugin();
const initialData = { content: [] };

export function Client() {
  const [puckData, setPuckData] = useState(initialData);
  const [mode, setMode] = useState("edit");

  useEffect(() => {
    const interval = setInterval(() => {
      const spans = document.querySelectorAll(
        '._PuckHeader-tools_63pti_75 span'
      );

      spans.forEach((span) => {
        if (span.textContent?.trim() === "Publish") {
          span.textContent = "Save page";
        }
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    const handleMessage = (event: any) => {
      if (event.data?.type === "LOAD_PUCK_DATA") {
        console.log("REACT APP:Received from Angular:", event.data.payload);
        setPuckData(event.data.payload);
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
          ...importedData,
          content: [...puckData.content, ...importedData.content],
        };

        console.log("Merged data:", mergedData);
        setPuckData(mergedData);
      } catch (err) {
        alert("Invalid JSON file");
      }
    };

    reader.readAsText(file);
  };

  return (
    <>
      {
        mode === "edit" ? (
          <Puck
            plugins={[]}
            config={config as any}
            onChange={(updatedData) => {
              setPuckData(updatedData);

              Object.entries(updatedData.zones || {}).forEach(
                ([zoneId, zoneContent]) => {
                  megaMenuStore.updateContent(zoneId, zoneContent as any[]);
                }
              );

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
                    <div style={{ display: "flex", alignItems: "center" }}>
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
                    </div>
                  </div>
                );
              },
            }}
            onPublish={(data) => {
              setPuckData(data);
              window.parent.postMessage(
                { type: "PUCK_PUBLISHED", payload: data },
                "*"
              );
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
