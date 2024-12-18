import { defineStore } from 'pinia';
import type { Item } from '~/types/item-type';

const mockItems: Item[] = [
  {
    username: "user1",
    id: "item1",
    name: "iPhone",
    model: "iPhone 16",
    type: "Phone",
    brand: "iPhone",
    weight: 2.3,
    images: ["https://via.placeholder.com/176x155", "https://via.placeholder.com/176x155"],
    video: null,
    sellerIdPhoto: "https://via.placeholder.com/100",
    height: 1.5,
    status: "Almost new",
    description: "All new iPhone 16",
    isListed: true,
    isSold: false,
    isCart: false,
  },
  {
    username: "user2",
    id: "item2",
    name: "Huawei",
    model: "Huawei Nova 7i",
    type: "Phone",
    brand: "Huawei",
    weight: 2.5,
    images: ["https://via.placeholder.com/176x155", "https://via.placeholder.com/176x155"],
    video: null,
    sellerIdPhoto: "https://via.placeholder.com/100",
    height: 1.4,
    status: "Almost new",
    description: "Huawei Nova 7i",
    isListed: true,
    isSold: false,
    isCart: false,
  },
  {
    username: "user3",
    id: "item3",
    name: "Samsung",
    model: "Samsung Galaxy S24",
    type: "Phone",
    brand: "Samsung",
    weight: 0.1,
    images: ["https://via.placeholder.com/176x155", "https://via.placeholder.com/176x155"],
    video: null,
    sellerIdPhoto: "https://via.placeholder.com/100",
    height: 0.1,
    status: "Slightly Worn",
    description: "The best Samsung phone",
    isListed: true,
    isSold: false,
    isCart: false,
  },
  {
    username: "user4",
    id: "item4",
    name: "Cherry Mobile",
    model: "Aqua SV",
    type: "Phone",
    brand: "Cherry Mobile",
    weight: 15.0,
    images: ["https://via.placeholder.com/176x155", "https://via.placeholder.com/176x155"],
    video: null,
    sellerIdPhoto: "https://via.placeholder.com/100",
    height: 2.5,
    status: "Slightly Used",
    description: "New Cherry Mobile smartphone",
    isListed: true,
    isSold: false,
    isCart: false,
  },
  {
    username: "user5",
    id: "item5",
    name: "iPhone",
    model: "iPhone 13",
    type: "Phone",
    brand: "Apple",
    weight: 0.2,
    images: ["https://via.placeholder.com/176x155", "https://via.placeholder.com/176x155"],
    video: null,
    sellerIdPhoto: "https://via.placeholder.com/100",
    height: 0.2,
    status: "Defective",
    description: "Smartphone with minor defects.",
    isListed: true,
    isSold: false,
    isCart: false,
  },
]

export const useItemStore = defineStore('itemStore', {
  state: () => ({
    items: [] as Item[],
  }),
  getters: {
    getItems: (state) => state.items,
  },
  actions:{
    initializeStore() {
      const storedItems = localStorage.getItem('items');
      if (storedItems) {
        this.items = JSON.parse(storedItems) as Item[];
      } else {
        this.items = mockItems;
        this.saveItemsToLocalStorage();
      }
    },
    addItem(newItem: Item) {
      this.items.push(newItem);
      this.saveItemsToLocalStorage(); 
    },
    saveItemsToLocalStorage() { 
      localStorage.setItem('items', JSON.stringify(this.items)); 
    }, 
    loadItemsFromLocalStorage() { 
      this.items = JSON.parse(localStorage.getItem('items') || '[]'); 
    },
    updateItemStatus(itemId: string, isCart: boolean, isListed: boolean, isSold:boolean) {
      const item = this.items.find(item => item.id === itemId);
      if (item) {
        item.isCart = isCart;
        item.isListed = isListed;
        item.isSold = isSold;
        this.saveItemsToLocalStorage();
      }
    }
  }
});
