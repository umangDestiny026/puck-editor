export let zone: any = {};

export interface MegaMenuItem {
    id: string;
    isOpen?: boolean;
    backgroundColor?: string;
    className?: string;
    customCss?: string;
    content?: any[];
    zones?: any;   // 👈 ADD THIS
}

interface MegaMenuStore {
    items: MegaMenuItem[];
    addOrUpdate: (item: MegaMenuItem) => void;
    remove: (id: string) => void;
    get: (id: string) => MegaMenuItem | undefined;
    updateContent: (id: string, content: any[]) => void;
}

export const megaMenuStore: MegaMenuStore = {
    items: [],

    addOrUpdate(item: MegaMenuItem) {
        const exists = this.items.some(i => i.id === item.id);

        if (!exists) {
            this.items.push(item);
        }
    },

    updateContent(zoneId: string, content: any[]) {
        const cleanId = zoneId.split(":")[0];
        const item = this.items.find(i => i.id === cleanId);

        if (!item) return;

        // If it's the main MegaMenu zone
        if (zoneId === `${cleanId}:${cleanId}`) {
            item.content = content;
        }

        // Always store zone content
        item.zones[zoneId] = content;

        return item;
    },

    remove(id) {
        this.items = this.items.filter(i => i.id !== id);
    },

    get(id) {
        return this.items.find(i => i.id === id);
    }
};
