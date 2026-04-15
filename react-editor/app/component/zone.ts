// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const zone: any = {
};

export interface MegaMenuItem {
  id: string;
  isOpen?: boolean;
  backgroundColor?: string;
  className?: string;
  customCss?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  zones?: any;
}

interface MegaMenuStore {
  items: MegaMenuItem[];
  addOrUpdate: (item: MegaMenuItem) => void;
  remove: (id: string) => void;
  get: (id: string) => MegaMenuItem | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateContent: (id: string, content: any[]) => void;
}

export const megaMenuStore: MegaMenuStore = {
  items: [
  ],

  /**
   *
   * @param item
   */
  addOrUpdate(item: MegaMenuItem) {
    const exists = this.items.some(i => i.id === item.id);

    if (!exists) {
      this.items.push(item);
    }
  },

  /**
   *
   * @param zoneId
   * @param content
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateContent(zoneId: string, content: any[]) {
    const cleanId = zoneId.split(':')[0];
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

  /**
   *
   * @param id
   */
  remove(id) {
    this.items = this.items.filter(i => i.id !== id);
  },

  /**
   *
   * @param id
   */
  get(id) {
    return this.items.find(i => i.id === id);
  },
};
