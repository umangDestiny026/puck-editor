import ReactDOM from "react-dom/client";
import { PuckProvider } from "../app/component/PuckContext";
import { Client } from "../app/client";

class PuckEditorElement extends HTMLElement {
    connectedCallback() {
        const root = ReactDOM.createRoot(this);

        root.render(
            <PuckProvider>
                <Client />
            </PuckProvider>
        );
    }
}

customElements.define("puck-editor", PuckEditorElement);