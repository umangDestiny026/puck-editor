import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { demopage } from './demo-page'; // demo page json data // later on pass the json from the api 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'my-builder-app';

  publishedData: any;   // <-- Store data from React here

  // ✅ Define the message handler properly
  messageHandler = (event: MessageEvent) => {
    if (event.data?.type === "PUCK_PUBLISHED") {
      console.log("Received from React:", event.data.payload);

      this.publishedData = event.data.payload;
    }
  };

  // send json to puck(react editor)
  sendDataToReact(data: any) {
    const iframe = document.getElementById("puckFrame") as HTMLIFrameElement;

    if (!iframe || !iframe.contentWindow) {
      console.error("Iframe not ready yet!");
      return;
    }

    iframe.contentWindow.postMessage(
      { type: "LOAD_PUCK_DATA", payload: data },
      "http://localhost:4200/build/index.html"   // Chnage this url of genera url
    );
  }

  sendToReact() {
    this.sendDataToReact(demopage);
  }

  ngOnInit() {
    window.addEventListener("message", this.messageHandler);
  }

  ngOnDestroy() {
    window.removeEventListener("message", this.messageHandler);
  }
}
