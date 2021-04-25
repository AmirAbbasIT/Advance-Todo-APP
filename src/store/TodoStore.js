import { observable } from "mobx";
import { v4 as uuid } from "uuid";

function createTodoStore() {
  const self = observable({
    focusInput: "",
    seachFilter: "",
    actionLogs: ["item added blah blah"],
    items: [
      {
        id: uuid(),
        name: "Sample item",
        isComplete: false,
        isInProgress: false,
        tags: [],
      },
    ],

    get activeItems() {
      return self.items.filter((i) => !i.isComplete && !i.isInProgress);
    },
    get getFocusInput() {
      return self.focusInput;
    },
    get completedItems() {
      if (self.seachFilter) {
        return self.items.filter(item => item.tags.indexOf(this.seachFilter) !== -1 && item.isComplete)
      }
      else
        return self.items.filter((i) => i.isComplete);
    },

    get inProgressItems() {
      if (self.seachFilter) {
        return self.items.filter(item => item.tags.indexOf(this.seachFilter) !== -1 && item.isInProgress)
      } else
        return self.items.filter((i) => i.isInProgress);
    },
    get getUniquetags() {
      let tags = [];
      self.items.forEach(item => {
        tags.push(...item.tags);
      })
      return [...new Set([...tags])];
    },
    get searchFilter() {
      return self.seachFilter;
    },
    get getActionLogs() {
      return self.actionLogs;
    },
    setFilter(filter) {
      self.seachFilter = filter;
    },
    setFocusInput(name) {
      self.focusInput = name;
    },
    addItem() {
      self.items.push({
        id: uuid(),
        name: `Item ${self.items.length}`,
        animate: true,
        tags: []
      });
    },
    updateItem(eitem) {
      const item = self.items.find(item => item.id === eitem.id);
      item.name = eitem.name;
      self.actionLogs.push(`Item Updated: ${eitem.name}`)

    },
    addTag(id, tagName) {
      const item = self.items.find(i => i.id === id);
      item.tags.push(tagName);
      self.actionLogs.push(`Tag Added: ${tagName}`)
    },
    deleteTag(id, tage) {
      const item = self.items.find(i => i.id === id);
      item.tags = item.tags.filter(tag => tag !== tage)
      self.actionLogs.push(`Tag Deleted: ${tage}`)
    },

    setItemName(id, name, ref) {
      const item = self.items.find((i) => i.id === id);
      item.name = name;
      ref?.current?.focus()
    },
    setCompleted(id) {
      const item = self.items.find((i) => i.id === id);
      item.isInProgress = false;
      item.isComplete = true;
      item.animate = false;
      self.actionLogs.push(`Item status changed to complete: ${item.name}`)
    },
    setAnimate(id) {
      const item = self.items.find((i) => i.id === id);
      item.animate = false;
    },

    setInProgress(id) {
      const item = self.items.find((i) => i.id === id);
      item.isInProgress = true;
      self.actionLogs.push(`Item status changed to InProgress: ${item.name}`)
    },

    deleteItem(id) {
      let item = self.items.find((i) => i.id === id);
      self.items = self.items.filter((i) => i.id !== id);
      self.actionLogs.push(`Item Deleted : ${item.name}`)
    },
  });

  return self;
}

export { createTodoStore };
