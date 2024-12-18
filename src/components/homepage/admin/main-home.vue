<template>
  <div>
      <div class="absolute self-stretch w-full top-2 left-0 items-center grid grid-cols-3 gap-4 ">
          <div class="w-svw max-w-3xl my-2">
              <div class="relative flex items-center">
                      <button class="absolute left-3 group w-5 h-5">
                          <div class="flex flex-col justify-between w-[0.8125rem] h-[0.8125rem] transform transition-all duration-300 origin-center overflow-hidden group-focus:translate-x-1.5">
                              <div class="bg-[#456173] h-[0.125rem] w-7 transform transition-all duration-300 origin-left group-focus:rotate-[42deg] group-focus:w-2/3 delay-150"></div>
                              <div class="bg-[#456173] h-[0.125rem] w-7 rounded transform transition-all duration-300 group-focus:translate-x-10"></div>
                              <div class="bg-[#456173] h-[0.125rem] w-7 transform transition-all duration-300 origin-left group-focus:-rotate-[42deg] group-focus:w-2/3 delay-150"></div>
                          </div>
                      </button>
                  <input 
                  type="text"
                  name="search"
                  placeholder="Search item here"
                  autocomplete="off"
                  aria-label="Search item here"
                  class="w-full pr-3 pl-10 py-2 font-normal text-base rounded-2xl border-none">
                      <!-- <button type="submit" class="absolute right-0 w-5 h-5 mr-3 focus:outline-none focus:shadow-outline">
                          <svg 
                          fill="none" 
                          stroke="#456173" 
                          stroke-linecap="round" 
                          stroke-linejoin="round" 
                          stroke-width="2" 
                          viewBox="0 0 24 24" 
                          class="w-4 h-4">
                              <path 
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z">
                              </path>
                          </svg>
                      </button> -->
              </div>
          </div>
  
          <div class="absolute grid grid-flow-col gap-x-4 right-0">
              <button class="w-[10.25rem] h-9 bg-[#f2f2f0] rounded-lg shadow border border-[#d4d3d3] flex justify-center items-center">
                  <div class="self-stretch grow shrink basis-0 pl-4 pr-5 py-4 justify-center items-center gap-3 inline-flex">
                      <img class="w-[1.125rem] h-[1.125rem] relative" src="/assets/img/FilterIcon.png">
                      <span class="text-center text-[#456173] text-sm font-normal">Filter Searches</span>
                  </div>
              </button>
  
              <button class="w-[11.6875rem] h-9 bg-[#1b3c59] rounded-lg shadow border border-[#d4d3d3] flex justify-center items-center" @click="toggleUploadModal">
                  <div class="grow shrink basis-0 self-stretch pl-4 pr-5 py-4 justify-center items-center gap-3 inline-flex">
                      <img class="w-[1.125rem] h-[1.125rem] relative" src="/assets/img/UploadIcon.png">
                      <span class="text-center text-[#f2f2f0] text-sm font-normal">Upload Your Tech</span>
                  </div>
              </button>
          </div>
        </div>
      
      <!-- Section Rows -->
      <ul class="absolute flex flex-col left-0 top-14 space-y-4 overflow-auto max-h-[calc(100vh-4rem)] scrollbar-hide py-2">
        <li v-for="(row, rowIndex) in rows" :key="rowIndex">
          <div class="grid w-full top-[11%] left-0">
            <div class="text-[#1B3C59] text-xl font-medium mb-2">{{ row.title }} ({{ row.data.length }})</div>
  
            <!-- Items List -->
            <ul class="flex space-x-4 overflow-x-auto scrollbar-hide py-2">
              <li
                v-for="item in row.data"
                :key="item.id"
                @click="openBasketModal(item)"
                class="w-[13.375rem] h-[14.0625rem] px-[1.1875rem] py-[0.875rem] bg-[#f2f2f0] rounded-[0.625rem] flex-col justify-center items-start gap-[0.3125rem] inline-flex cursor-pointer"
              >
                <!-- Item Image -->
                <img
                  class="self-stretch h-[9.6875rem] rounded-xl border-2 border-[#d4d3d3]"
                  :src="item.images"
                  alt="Item Image"
                />
                <!-- Item Details -->
                <div class="w-[11.0625rem] justify-between items-center inline-flex">
                  <p class="w-[5.6875rem] h-[1.125rem] text-black text-sm font-medium">{{ item.model }}</p>
                  <p class="w-[5.6875rem] h-[1.125rem] text-black text-xs font-light text-right">{{ item.type }}</p>
                </div>
                <!-- Status Tag -->
                <div
                  class="px-[0.3125rem] bg-[#e4e4e4] rounded-xl justify-start items-center gap-[0.3125rem] inline-flex">
                  <div
                    class="w-[0.5625rem] h-[0.5625rem] rounded-[0.3125rem]"
                    :class="{
                      'bg-[#22d056]': item.status === 'Almost new',
                      'bg-[#ffa057]': item.status === 'Slightly Worn',
                      'bg-[#ffd757]': item.status === 'Slightly Used',
                      'bg-[#ff5d57]': item.status === 'Defective'
                    }">
                  </div>
                  <p class="text-center text-[#1b3c59] text-xs font-medium leading-[0.86125rem]">
                    {{ item.status }}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
  
      <!-- Basket Modal -->
      <div v-if="isBasketModalOpen" class="fixed top-0 left-[-327px] w-screen h-screen bg-[rgba(0,0,0,0.5)] flex    justify-center items-center z-50">
        <div class="w-[500px] bg-[#f3f4f6] rounded-lg shadow-lg p-5 flex flex-col gap-4">
            <!-- Modal Header -->
            <div class="text-2xl font-bold text-[#ffffff] bg-[#1b3c59] rounded-t-lg px-4 py-3">
              Add to Basket Modal
            </div>
  
          <!-- Selected Item Details -->
          <div class="flex items-start gap-4">
            <!-- Placeholder Image -->
            <div class="w-[10.938rem] h-[10.938rem] bg-gray-300 flex justify-center items-center rounded-md">
              <svg class="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l18 18M9.75 9.75A3 3 0 1112 12m0 0a3 3 0 11-2.25-2.25"></path>
              </svg>
            </div>
        
             <!-- Item Info -->
            <div class="flex-1">
              <p class="text-lg font-bold text-[#1b3c59]">{{ selectedItem?.model || 'Acer Laptop' }}</p>
              <p class="text-sm text-gray-600 mb-1">{{ selectedItem?.type || 'Predator Helios' }}</p>
              <p class="h-3.5 px-[0.3125rem] bg-[#e4e4e4] rounded-xl justify-start items-center gap-[0.3125rem] inline-flex">
                <span
                  class="w-[0.5625rem] h-[0.5625rem] rounded-[5px]"
                  :class="{
                    'bg-[#22d056]': selectedItem?.status === 'Almost new',
                    'bg-[#ffa057]': selectedItem?.status === 'Slightly Worn',
                    'bg-[#ffd757]': selectedItem?.status === 'Slightly used',
                    'bg-[#ff5d57]': selectedItem?.status === 'Defective'
                  }"
                ></span>
                <span class="text-center text-[#1b3c59] text-xs font-medium leading-[0.86125rem]">
                  {{ selectedItem?.status || 'NAN' }}
                </span>
              </p>
              <div class="flex row-span-2 items-center justify-center gap-2 text-sm text-gray-500 mt-2">
                  <div class="w-24 h-24 flex justify-center items-center relative inset-0">
                      <img class="w-20 h-20 flex justify-center items-center" src="/assets/img/Icon.png"> 
                  </div>
                    Donator: {{ selectedItem?.username || 'NAN' }}<br>
                    Brand: {{ selectedItem?.brand || 'NAN' }}<br>
                    Weight: {{ selectedItem?.weight || 'NAN' }}<br>
                    Height: {{ selectedItem?.height || 'NAN' }}
              </div>
            </div>
          </div>
  
          <!-- View Product Images Button -->
          <div v-if="selectedItem?.images && selectedItem.images.length">
            <button
              @click="openViewImagesModal"
              class="mt-2 px-4 py-2 text-[#456173] text-xs font-normal font-['Ubuntu'] underline">
                View Product Images
            </button>
          </div>
  
          <!-- View Product Images Modal -->
          <div v-if="isViewImagesModalOpen" 
              class="fixed top-0 left-[-327px] w-screen h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50">
            <div class="w-[600px] bg-[#f2f2f0] rounded-lg shadow-lg p-5">
  
              <!-- Modal Header -->
              <div class="text-2xl font-bold text-[#1b3c59] mb-4">Product Images</div>
      
              <!-- Images Display Grid -->
              <div class="grid grid-cols-2 gap-4 overflow-y-auto max-h-[60vh] scrollbar-hide">
                <img 
                  v-for="(imgSrc, index) in selectedItem?.images" 
                  :key="index"
                  :src="imgSrc" 
                  alt="Product Image" 
                  class="w-full h-40 object-cover rounded-lg border border-[#d9d9d9]" />
              </div>
  
              <!-- Close Button -->
              <div class="flex justify-end mt-4">
                <button @click="closeViewImagesModal" 
                    class="px-4 py-2 bg-[#456173] text-white rounded-lg hover:bg-[#163348]">
                  Close
                </button>
              </div>
            </div>
          </div>
  
          <!-- Footer Buttons -->
          <div class="flex justify-end gap-2">
            <button @click="closeBasketModal" class="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-200">
              Cancel
            </button>
  
            <button @click="addToBasket" class="px-4 py-2 bg-[#1b3c59] text-white rounded-lg hover:bg-[#163348]">
              <i class="fas fa-shopping-basket mr-2"></i> Add to Basket
            </button>
          </div>
  
        </div>
      </div>
  
        <!-- Upload Tech Form Modal -->
        <div v-if="isUploadModalOpen" 
                class="fixed top-0 left-[-327px] w-screen h-screen bg-[rgba(0,_0,_0,_0.5)] flex justify-center items-center">
          <div class="w-[600px] max-h-[90vh] inset-0 bg-[#f2f2f0] rounded-[10px] px-[41px] py-[18px] overflow-hidden flex flex-col justify-center items-center" @click.stop>
            <!-- Modal Header -->
            <div class="text-[28px] text-[#1b3c59] font-bold mb-[18px] text-center">
              Upload Form
            </div>
  
            <!-- Modal Content (with scrollbar) -->
            <div class="overflow-y-auto max-h-[calc(100vh-10rem)] w-full p-2" style="border-radius: 8px;">
              <!-- Device Information Section -->
              <div class="mb-4">
                <div class="h-[1.563rem] text-black text-2xl font-normal font-['Ubuntu'] mb-[10px]">
                  Device Information
                </div>
                <input id="deviceName" v-model="deviceName" type="text" 
                      class="w-full p-3 bg-white rounded-lg border border-[#d9d9d9] text-[#1b3c59] text-base font-['Ubuntu']" 
                      placeholder="Enter device name" />
  
                <!-- Brand and Model -->
                <div class="flex gap-2 mt-3">
                  <input id="brandName" v-model="brandName" type="text" 
                        class="w-1/2 p-3 bg-white rounded-lg border border-[#d9d9d9] text-[#1b3c59] text-base font-['Ubuntu']" 
                        placeholder="Brand" />
                  <input id="modelName" v-model="modelName" type="text" 
                        class="w-1/2 p-3 bg-white rounded-lg border border-[#d9d9d9] text-[#1b3c59] text-base font-['Ubuntu']" 
                        placeholder="Model" />
                </div>
  
                <!-- Description/Specs -->
                <textarea id="deviceSpecs" v-model="descriptionDetails" 
                          class="w-full h-[120px] p-3 mt-3 bg-white rounded-lg border border-[#d9d9d9] text-[#1b3c59] text-base font-['Ubuntu'] resize-none"
                          placeholder="Description Details..."></textarea>
              </div>

              <!-- Weight and Height -->
              <div class="flex gap-2 mt-3">
                  <input id="weightNumber" v-model="weightNumber" type="text" 
                        class="w-1/2 p-3 bg-white rounded-lg border border-[#d9d9d9] text-[#1b3c59] text-base font-['Ubuntu']" 
                        placeholder="Weight" />
                  <input id="heightNumber" v-model="heightNumber" type="text" 
                        class="w-1/2 p-3 bg-white rounded-lg border border-[#d9d9d9] text-[#1b3c59] text-base font-['Ubuntu']" 
                        placeholder="Height" />
                </div>
  
              <!-- Device Type and Condition -->
              <div class="flex gap-4 mt-3">
                <!-- Device Type -->
                <div class="w-1/2">
                  <label class="block text-black text-sm font-semibold font-['Ubuntu'] mb-1">Device Type</label>
                  <input id="deviceType" v-model="deviceType" type="text" class="w-full h-9 px-3 bg-white rounded-lg border border-gray-300 flex items-center gap-2 text-sm" placeholder="Type(Phone/Laptop/etc.)"/>
                </div>
  
                <!-- Device Condition -->
                <div class="w-1/2">
                  <label class="block text-black text-sm font-semibold font-['Ubuntu'] mb-1">
                    Device Condition
                  </label>
                  <div class="w-full h-9 px-3 bg-white rounded-lg border border-gray-300 flex items-center justify-between text-sm relative">
                    <select v-model="selectedCondition" class="w-full h-full px-3 bg-white rounded-lg border-none appearance-none focus:outline-none text-[#1b3c59] text-sm font-medium font-['Ubuntu']">
                      <option value="Almost new">Almost new</option>
                      <option value="Slightly Used">Slightly Used</option>
                      <option value="Slightly Worn">Slightly Worn</option>
                      <option value="Defective">Defective</option>
                    </select>
  
                    <div class="ml-auto w-4 h-4">
                      <!-- Dropdown Icon -->
                      <svg fill="none" stroke="#1b3c59" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </div>
  
                  </div>
                </div>
              </div>
  
              <!-- File Upload -->
              <div class="my-4">
                <label for="uploadFile" class="block text-black text-xl font-normal font-['Ubuntu'] mb-2">
                  Add Device Images
                </label>
                  <input id="uploadFile" v-on:change="handleUpload" type="file" multiple
                      class="w-full p-3 bg-white rounded-lg border border-[#d9d9d9] text-[#1b3c59] text-base font-['Ubuntu']" />
              </div>
  
              <!-- Donator Information Section -->
              <div class="mb-4">
                <div class="h-[1.563rem] text-black text-2xl font-normal font-['Ubuntu'] mb-[10px]">
                  Donator Information
                </div>
  
                <input id="donatorName" v-model="donatorName" type="text" 
                      class="w-full p-3 mt-3 bg-white rounded-lg border border-[#d9d9d9] text-[#1b3c59] text-base font-['Ubuntu']" 
                      placeholder="Username" />
              </div>
  
              <!-- Upload Button -->
              <button @click="handleSubmit" 
                class="w-full h-10 mt-3 bg-[#1b3c59] rounded-lg shadow border border-[#d4d3d3] text-white">
                    Upload
              </button>
  
              <!-- Close Button -->
              <button @click="toggleUploadModal" 
                class="mt-4 text-center text-[#1b3c59] text-sm">
                    Close
              </button>
            </div>
          </div>
        </div>
  
  
  </div>
  </template>
  
  <script setup lang="ts">
  import { computed, ref, onMounted } from 'vue';
  import { useItemStore } from '~/stores/store-itemStore';
  import { StatusColor } from '~/common/enums/StatusColors';
  import { StatusText } from '~/common/enums/StatusText';
  import type { displayItem } from '~/types/displayItem-type';
import type { Item } from '~/types/item-type';

// Initialize data on component mount
onMounted(() => {
  itemStore.initializeStore();
  itemsData.value = itemStore.getItems;
});
  
  // State: Modal visibility and selected item for basket modal
  const isUploadModalOpen = ref(false); // For Upload Modal
  const isBasketModalOpen = ref(false); // For Basket Modal
  const selectedItem = ref<displayItem | null>(null);
  
  // File upload (Upload Modal Logic)
  const uploadFile = ref<File | null>(null);
  const toggleUploadModal = () => {
    isUploadModalOpen.value = !isUploadModalOpen.value;
  };
  
  // State for View Product Images Modal
  const isViewImagesModalOpen = ref(false);
  
  // Open and Close Modal
  const openViewImagesModal = () => {
    isViewImagesModalOpen.value = true;
  };
  
  const closeViewImagesModal = () => {
    isViewImagesModalOpen.value = false;
  };

  const itemStore = useItemStore();
  const itemsData = ref<Item[]>([]);  

  const deviceName = ref<string>('');
  const brandName = ref<string>('');
  const modelName = ref<string>('');
  const descriptionDetails = ref<string>('');
  const weightNumber = ref<number>();
  const heightNumber = ref<number>();
  const deviceImages = ref<string[]>([]);
  const deviceType = ref<string>('');
  const selectedCondition = ref<string>('');
  const donatorName = ref<string>('')

  const generateRandomId = (): string => { 
    return 'item-' + Math.random().toString(36).substr(2, 9); 
  };
  
  const handleUpload = (event: Event) => {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files) {
      const uploadedFiles = Array.from(fileInput.files).map(file =>
        URL.createObjectURL(file) // Convert files to URLs for display
      );
      selectedItem.value = {
        ...selectedItem.value,
        images: uploadedFiles
      };
      console.log("Uploaded Files:", uploadedFiles);
    }
  };

  const handleSubmit = () => { 
    if (!deviceName.value || !brandName.value || !modelName.value || !descriptionDetails.value || !weightNumber.value || !heightNumber.value || !deviceType.value || !selectedCondition.value || !donatorName.value) { 
      alert("Please fill in all the required fields before uploading."); 
      return; 
    }

    const newItem: Item = { 
      username: donatorName.value, 
      id: generateRandomId(), 
      name: deviceName.value, 
      model: modelName.value, 
      type: deviceType.value, 
      brand: brandName.value, 
      weight: weightNumber.value!, 
      images: deviceImages.value, 
      video: null, // Assuming no video upload functionality for now 
      sellerIdPhoto: "https://via.placeholder.com/100", // Placeholder for now 
      height: heightNumber.value!, 
      status: selectedCondition.value, 
      description: descriptionDetails.value, 
      isListed: true, 
      isSold: false, 
      isCart: false, 
    }; 
    
    itemStore.addItem(newItem); // Add the new item to the Pinia store 
    console.log("New Item Added:", newItem); 
  };

interface DisplayItem {
  brand: string;
  weight: number;
  height: number;
  model: string;
  username: string;
  images: string;
  status: string;
  type: string;
  id: string;
}

// Computed properties for filtered items by category
const phones = computed<DisplayItem[]>(() =>
  itemStore.getItems
    .filter((item: Item) => item.type === 'Phone' && item.isListed && !item.isSold && !item.isCart)
    .map((item: Item) => ({
      brand: item.brand,
      weight: item.weight,
      height: item.height,
      model: item.model,
      username: item.username,
      images: item.images[0],
      status: item.status,
      type: item.type,
      id: item.id
    }))
);

const laptops = computed<DisplayItem[]>(() =>
  itemStore.getItems
    .filter((item: Item) => item.type === 'Laptop' && item.isListed && !item.isSold && !item.isCart)
    .map((item: Item) => ({
      brand: item.brand,
      weight: item.weight,
      height: item.height,
      model: item.model,
      username: item.username,
      images: item.images[0],
      status: item.status,
      type: item.type,
      name: item.name,
      id: item.id
    }))
);

const tvs = computed<DisplayItem[]>(() =>
  itemStore.getItems
    .filter((item: Item) => item.type === 'TV' && item.isListed && !item.isSold && !item.isCart)
    .map((item: Item) => ({
      brand: item.brand,
      weight: item.weight,
      height: item.height,
      model: item.model,
      username: item.username,
      images: item.images[0],
      status: item.status,
      type: item.type,
      name: item.name,
      id: item.id
    }))
);

const others = computed<DisplayItem[]>(() =>
  itemStore.getItems
    .filter((item: Item) => !['Phone', 'Laptop', 'TV'].includes(item.type) && item.isListed && !item.isSold && !item.isCart)
    .map((item: Item) => ({
      brand: item.brand,
      weight: item.weight,
      height: item.height,
      model: item.model,
      username: item.username,
      images: item.images[0],
      status: item.status,
      type: item.type,
      name: item.name,
      id: item.id
    }))
);

// Rows for different sections
const rows = [
  { title: 'Phones', data: phones.value },
  { title: 'Laptops', data: laptops.value },
  { title: 'TVs', data: tvs.value },
  { title: 'Others', data: others.value },
];

// Initialize data on component mount
onMounted(() => {
  itemsData.value = itemStore.getItems;
});

  // Status Text and Color Helpers
  const getStatusText = (status: number) => {
    const statusText: { [key: number]: string } = {
      1: StatusText.AlmostNew,
      2: StatusText.SlightlyWorn,
      3: StatusText.SlightlyUsed,
      4: StatusText.Defective
    };
    return statusText[status] || "";
  };
  
  const classTag = (status: number) => {
    const statusColor: { [key: number]: string } = {
      1: StatusColor.AlmostNew,
      2: StatusColor.SlightlyWorn,
      3: StatusColor.SlightlyUsed,
      4: StatusColor.Defective
    };
    return statusColor[status] || "";
  };
  
  // Basket Modal Logic
  const openBasketModal = (item: displayItem) => {
    selectedItem.value = item;
    isBasketModalOpen.value = true;
  };
  
  const closeBasketModal = () => {
    isBasketModalOpen.value = false;
    selectedItem.value = null;
  };
  </script>