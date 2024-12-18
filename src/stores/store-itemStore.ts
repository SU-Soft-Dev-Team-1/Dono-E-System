import { defineStore } from 'pinia';
import type { Item } from '~/types/item-type';

export const useItemStore = defineStore('itemStore', {
  state: () => ({
    items: [
      {
        userId: "user1",
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
      },
      {
        userId: "user2",
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
      },
      {
        userId: "user3",
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
      },
      {
        userId: "user4",
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
        status: "Slightly used",
        description: "New Cherry Mobile smartphone",
        isListed: true,
        isSold: false,
      },
      {
        userId: "user5",
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
      },
      {
        userId: "user1",
        id: "item6",
        name: "MacBook Air",
        model: "M1",
        type: "Laptop",
        brand: "Apple",
        weight: 2.8,
        images: ["https://via.placeholder.com/176x155", "https://via.placeholder.com/176x155"],
        video: null,
        sellerIdPhoto: "https://via.placeholder.com/100",
        height: 0.63,
        status: "Almost new",
        description: "MacBook Air with M1 chip.",
        isListed: true,
        isSold: false,
      },
      {
        userId: "user2",
        id: "item7",
        name: "Dell Inspiron",
        model: "Inspiron 15 3000",
        type: "Laptop",
        brand: "Dell",
        weight: 4.4,
        images: ["https://via.placeholder.com/176x155", "https://via.placeholder.com/176x155"],
        video: null,
        sellerIdPhoto: "https://via.placeholder.com/100",
        height: 0.74,
        status: "Slightly used",
        description: "Dell Inspiron 15 3000 with Intel i5.",
        isListed: true,
        isSold: false,
      },
      {
        userId: "user3",
        id: "item8",
        name: "HP Envy",
        model: "Envy x360",
        type: "Laptop",
        brand: "HP",
        weight: 4.5,
        images: ["https://via.placeholder.com/176x155", "https://via.placeholder.com/176x155"],
        video: null,
        sellerIdPhoto: "https://via.placeholder.com/100",
        height: 0.72,
        status: "Defective",
        description: "HP Envy x360 with AMD Ryzen 7.",
        isListed: true,
        isSold: false,
      },
      {
        userId: "user4",
        id: "item9",
        name: "Lenovo ThinkPad",
        model: "ThinkPad X1 Carbon",
        type: "Laptop",
        brand: "Lenovo",
        weight: 2.4,
        images: ["https://via.placeholder.com/176x155", "https://via.placeholder.com/176x155"],
        video: null,
        sellerIdPhoto: "https://via.placeholder.com/100",
        height: 0.6,
        status: "Almost new",
        description: "Lenovo ThinkPad X1 Carbon with Intel i7.",
        isListed: true,
        isSold: false,
      },
      {
        userId: "user5",
        id: "item10",
        name: "Acer Swift",
        model: "Swift 3",
        type: "Laptop",
        brand: "Acer",
        weight: 2.6,
        images: ["https://via.placeholder.com/176x155", "https://via.placeholder.com/176x155"],
        video: null,
        sellerIdPhoto: "https://via.placeholder.com/100",
        height: 0.63,
        status: "Slightly used",
        description: "Acer Swift 3 with AMD Ryzen 5.",
        isListed: true,
        isSold: false,
      },
      {
        userId: "user1",
        id: "item11",
        name: "Sony Bravia",
        model: "A8H",
        type: "TV",
        brand: "Sony",
        weight: 50.5,
        images: ["https://via.placeholder.com/176x155", "https://via.placeholder.com/176x155"],
        video: null,
        sellerIdPhoto: "https://via.placeholder.com/100",
        height: 32.0,
        status: "Slightly used",
        description: "55-inch Sony Bravia OLED TV.",
        isListed: true,
        isSold: false,
      },
      {
        userId: "user2",
        id: "item12",
        name: "Vizio",
        model: "P-Series Quantum",
        type: "TV",
        brand: "Vizio",
        weight: 53.0,
        images: ["https://via.placeholder.com/176x155", "https://via.placeholder.com/176x155"],
        video: null,
        sellerIdPhoto: "https://via.placeholder.com/100",
        height: 34.0,
        status: "Almost new",
        description: "65-inch Vizio P-Series Quantum 4K TV.",
        isListed: true,
        isSold: false,
      },
      {
        userId: "user3",
        id: "item13",
        name: "Samsung",
        model: "Q90T",
        type: "TV",
        brand: "Samsung",
        weight: 55.2,
        images: ["https://via.placeholder.com/176x155", "https://via.placeholder.com/176x155"],
        video: null,
        sellerIdPhoto: "https://via.placeholder.com/100",
        height: 32.8,
        status: "Slightly Worn",
        description: "65-inch Samsung QLED 4K TV.",
        isListed: true,
        isSold: false,
      },
      {
        userId: "user4",
        id: "item14",
        name: "LG",
        model: "CX Series",
        type: "TV",
        brand: "LG",
        weight: 50.0,
        images: ["https://via.placeholder.com/176x155", "https://via.placeholder.com/176x155"],
        video: null,
        sellerIdPhoto: "https://via.placeholder.com/100",
        height: 30.1,
        status: "Defective",
        description: "55-inch LG OLED TV.",
        isListed: true,
        isSold: false,
      },
      {
        userId: "user5",
        id: "item15",
        name: "TCL",
        model: "6-Series",
        type: "TV",
        brand: "TCL",
        weight: 48.5,
        images: ["https://via.placeholder.com/176x155", "https://via.placeholder.com/176x155"],
        video: null,
        sellerIdPhoto: "https://via.placeholder.com/100",
        height: 31.0,
        status: "Almost new",
        description: "55-inch TCL 6-Series 4K TV.",
        isListed: true,
        isSold: false,
      },
      {
        userId: "user1",
        id: "item16",
        name: "NVIDIA GeForce",
        model: "RTX 3080",
        type: "GPU",
        brand: "NVIDIA",
        weight: 1.2,
        images: ["https://via.placeholder.com/176x155", "https://via.placeholder.com/176x155"],
        video: null,
        sellerIdPhoto: "https://via.placeholder.com/100",
        height: 0.6,
        status: "Defective",
        description: "NVIDIA GeForce RTX 3080 with 10GB GDDR6X.",
        isListed: true,
        isSold: false,
      },
      {
        userId: "user2",
        id: "item17",
        name: "AMD Ryzen",
        model: "Ryzen 9 5900X",
        type: "CPU",
        brand: "AMD",
        weight: 0.2,
        images: ["https://via.placeholder.com/176x155", "https://via.placeholder.com/176x155"],
        video: null,
        sellerIdPhoto: "https://via.placeholder.com/100",
        height: 0.15,
        status: "Slightly used",
        description: "AMD Ryzen 9 5900X with 12 cores.",
        isListed: true,
        isSold: false,
      },
      {
        userId: "user3",
        id: "item18",
        name: "Corsair Vengeance",
        model: "32GB DDR4",
        type: "RAM",
        brand: "Corsair",
        weight: 0.1,
        images: ["https://via.placeholder.com/176x155", "https://via.placeholder.com/176x155"],
        video: null,
        sellerIdPhoto: "https://via.placeholder.com/100",
        height: 0.1,
        status: "Slightly Worn",
        description: "Corsair Vengeance 32GB DDR4 RAM.",
        isListed: true,
        isSold: false,
      },
      {
        userId: "user4",
        id: "item19",
        name: "Samsung SSD",
        model: "970 EVO Plus",
        type: "Storage",
        brand: "Samsung",
        weight: 0.05,
        images: ["https://via.placeholder.com/176x155", "https://via.placeholder.com/176x155"],
        video: null,
        sellerIdPhoto: "https://via.placeholder.com/100",
        height: 0.1,
        status: "Almost new",
        description: "Samsung 970 EVO Plus 1TB NVMe SSD.",
        isListed: true,
        isSold: false,
      },
      {
        userId: "user5",
        id: "item20",
        name: "ASUS Motherboard",
        model: "ROG Strix B550-F",
        type: "Motherboard",
        brand: "ASUS",
        weight: 1.0,
        images: ["https://via.placeholder.com/176x155", "https://via.placeholder.com/176x155"],
        video: null,
        sellerIdPhoto: "https://via.placeholder.com/100",
        height: 0.5,
        status: "Almost new",
        description: "ASUS ROG Strix B550-F Gaming Motherboard.",
        isListed: true,
        isSold: false,
      },   
    ] as Item[],
  }),
  getters: {
    getItems: (state) => state.items,
  },
});
