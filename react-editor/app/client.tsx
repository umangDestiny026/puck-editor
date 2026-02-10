"use client";

import type { Data } from "@puckeditor/core";
import { Puck, ActionBar } from "@puckeditor/core";
import { createAiPlugin } from "@puckeditor/plugin-ai";
import { useEffect, useState } from "react";

import config from "../puck.config";

const aiPlugin = createAiPlugin();
const initialData = { content: [] };

export function Client() {
  const [puckData, setPuckData] = useState(initialData);

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
    const handleMessage = (event) => {
      if (event.data?.type === "LOAD_PUCK_DATA") {
        console.log("Umang Received from Angular:", event.data.payload);
        setPuckData(event.data.payload);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);


  return (
    <Puck
      key={JSON.stringify(puckData)}
      plugins={[aiPlugin]}
      config={config as any}
      data={puckData}
      onPublish={(data) => {
        setPuckData(data);   // keep latest version
        
        window.parent.postMessage(
          { type: "PUCK_PUBLISHED", payload: data },
          "*"
        );
      }}
    />
  );
}
