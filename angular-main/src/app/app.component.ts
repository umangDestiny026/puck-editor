import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JsonPipe } from '@angular/common';

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

  ngOnInit() {
    window.addEventListener("message", this.messageHandler);
  }

  ngOnDestroy() {
    window.removeEventListener("message", this.messageHandler);
  }
}
