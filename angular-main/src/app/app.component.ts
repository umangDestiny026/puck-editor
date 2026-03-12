import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { demopage } from './demo-page';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // ✅ Required for <puck-editor>
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'my-builder-app';
  publishedData: any = null;
  status: string = 'No data loaded';
  statusColor: string = '#666';

  // ✅ Listen for published data FROM the editor
  messageHandler = (event: MessageEvent) => {
    if (event.data?.type === 'PUCK_PUBLISHED') {
      console.log('📦 Received from Puck editor:', event.data.payload);
      this.publishedData = event.data.payload;
      this.status = `💾 Saved at ${new Date().toLocaleTimeString()}`;
      this.statusColor = '#2196F3';
    }
  };

  // ✅ Send JSON data TO the editor
  loadDemoData() {
    window.postMessage(
      { type: 'LOAD_PUCK_DATA', payload: demopage },
      '*'
    );
    this.status = `✅ Loaded ${demopage.content.length} components`;
    this.statusColor = '#4CAF50';
  }

  // ✅ Clear the editor
  clearEditor() {
    window.postMessage(
      { type: 'LOAD_PUCK_DATA', payload: { root: { props: {} }, content: [], zones: {} } },
      '*'
    );
    this.status = 'Editor cleared';
    this.statusColor = '#f44336';
  }

  ngOnInit() {
    window.addEventListener('message', this.messageHandler);
  }

  ngOnDestroy() {
    window.removeEventListener('message', this.messageHandler);
  }
}