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
                  :src="item.images[0]"
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
      <div v-if="isBasketModalOpen" class="fixed top-0 left-[-20.438rem] w-screen h-screen bg-[rgba(0,0,0,0.5)] flex    justify-center items-center z-50">
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
                  class="w-[0.5625rem] h-[0.5625rem] rounded-[0.313rem]"
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
              class="mt-2 px-[1.875rem] py-2 text-[#456173] text-xs font-normal font-['Ubuntu'] underline">
                View Product Images
            </button>
          </div>
  
          <!-- View Product Images Modal -->
          <div v-if="isViewImagesModalOpen" 
              class="fixed top-0 left-[-20.438rem] w-screen h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50">
            <div class="w-[37.5rem] bg-[#f2f2f0] rounded-lg shadow-lg p-5">
  
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
            <button @click="openConfirmation('cancel')" class="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-200">
              Cancel
            </button>
  
            <button @click="openConfirmation('add')" class="px-4 py-2 bg-[#1b3c59] text-white rounded-lg hover:bg-[#163348]">
              <i class="fas fa-shopping-basket mr-2"></i> Add to Basket
            </button>
          </div>

          <!-- Confirmation Dialog -->
          <div v-if="showConfirmation" class="fixed top-0 left-[-20.438rem] w-screen h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50">
            <div class="w-[547px] h-[211px] bg-white rounded-lg shadow-lg p-6 flex flex-col gap-8">
                <h3 class="text-xl text-center font-bold text-[#1b3c59]">
                  {{ confirmationTitle }}
                </h3>
                <p class="text-gray-900 text-base font-['Ubuntu'] text-center">
                  {{ confirmationMessage }}
                </p>
              <div class="flex justify-end gap-2">
                <button @click="closeConfirmation" class="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-200">
                  Cancel
                </button>
                <button @click="confirmAction" class="px-4 py-2 bg-[#1b3c59] text-white rounded-lg hover:bg-[#163348]">
                  {{ confirmationButtonText }}
                </button>
              </div>
            </div>
          </div>
  
        </div>
      </div>
  
        <!-- Upload Tech Form Modal -->
        <div v-if="isUploadModalOpen" 
                class="fixed top-0 left-[-20.438rem] w-screen h-screen bg-[rgba(0,_0,_0,_0.5)] flex justify-center items-center">
          <div class="w-[37.5rem] max-h-[90vh] inset-0 bg-[#f2f2f0] rounded-[10px] px-[2.563rem] py-[1.125rem] overflow-hidden flex flex-col justify-center items-center" @click.stop>
            <!-- Modal Header -->
            <div class="text-[1.75rem] text-[#1b3c59] font-bold mb-[1.125rem] text-center">
              Upload Form
            </div>

        <!-- Success Notification -->
        <div v-if="showSuccess"
          class="w-[12.813rem] h-[3.813rem] px-5 py-3 bg-[#c3fad9] rounded-[10px] shadow justify-start items-center gap-5 inline-flex mt-3">
            <div class="flex-col justify-start items-start gap-2 inline-flex">
              <span class="w-6 h-6 relative inline-block align-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8">
                  <path
                    fill-rule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </div>
            <div class="w-[7rem] h-[2.563rem] justify-end items-center gap-4 flex">
              <div class="flex-col justify-center items-end gap-[0.313rem] inline-flex">
                <p class="text-[#2e2f33] text-base font-semibold font-['Ubuntu']">Success.</p>
                <p class="text-right text-[#2e2f33] text-sm font-normal font-['Ubuntu']">Item added</p>
              </div>
            </div>
          </div>

          <!-- Failure Notification -->
          <div v-if="showFailure"
            class="w-[12.813rem] h-[3.813rem] px-5 py-3 bg-[#f9dedc] rounded-[10px] shadow justify-start items-center gap-5 inline-flex mt-3">
            <span class="w-6 h-6 relative inline-block align-middle">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8">
                <path
                  fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <div class="w-[7.25rem] h-[3.063rem] justify-end items-center gap-4 flex">
              <div class="flex-col justify-center items-end gap-[0.313rem] inline-flex">
                <p class="text-[#2e2f33] text-base font-semibold font-['Ubuntu']">Action Failed.</p>
                <p class="text-right text-[#2e2f33] text-sm font-normal font-['Ubuntu']">Failed to add item</p>
              </div>
            </div>
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
  import { computed, ref, onMounted, watchEffect } from 'vue';
  import { useItemStore } from '~/stores/store-itemStore';
  import type { Item } from '~/types/item-type';
  
  const itemStore = useItemStore();
  const itemsData = ref<Item[]>([]);
  const selectedItem = ref<Item | null>(null);
  const currentSelectedItemId = ref<string | null>(null);
  const isUploadModalOpen = ref(false);
  const isBasketModalOpen = ref(false);
  const showConfirmation = ref(false);
  const confirmationType = ref<string>(''); // 'cancel' or 'add'
  const confirmationTitle = ref<string>('');
  const confirmationMessage = ref<string>('');
  const confirmationButtonText = ref<string>('');
  
  onMounted(() => {
    itemStore.initializeStore();
    itemsData.value = itemStore.getItems;
  });
  
  watch(selectedItem, (newVal: Item | null) => {
    currentSelectedItemId.value = newVal ? newVal.id : null;
    console.log(currentSelectedItemId.value);
  });
  
  watch(
    () => itemStore.items,
    (newItems: Item[]) => {
      itemsData.value = newItems;
    },
    { deep: true }
  );
  
  const openBasketModal = (item: Item) => {
    selectedItem.value = item;
    isBasketModalOpen.value = true;
  };
  
  const closeBasketModal = () => {
    isBasketModalOpen.value = false;
    selectedItem.value = null;
  };
  
  const openConfirmation = (type: string) => {
    confirmationType.value = type;
  
    if (type === 'cancel') {
      confirmationTitle.value = 'Cancel Transaction';
      confirmationMessage.value = `Are you sure you want to cancel your transaction for "${selectedItem.value?.name || 'item'}"?`;
      confirmationButtonText.value = 'Confirm';
    } else if (type === 'add') {
      confirmationTitle.value = 'Add To Basket';
      confirmationMessage.value = `Are you sure you want to add "${selectedItem.value?.name || 'item'}" to your basket?`;
      confirmationButtonText.value = 'Add to My Cart';
    }
  
    showConfirmation.value = true;
  };
  
  const closeConfirmation = () => {
    showConfirmation.value = false;
  };
  
  const confirmAction = () => {
    if (confirmationType.value === 'cancel') {
      alert('Transaction has been cancelled.');
    } else if (confirmationType.value === 'add' && currentSelectedItemId.value) {
      itemStore.updateItemStatus(currentSelectedItemId.value as string, true, false, false);
      alert('Item has been added to the basket.');
    }
  
    closeBasketModal(); // Close basket modal after any action
    showConfirmation.value = false; // Hide confirmation dialog
  };
  
  const uploadFile = ref<File | null>(null);
  const toggleUploadModal = () => {
    isUploadModalOpen.value = !isUploadModalOpen.value;
  };
  
  const isViewImagesModalOpen = ref(false);
  
  const openViewImagesModal = () => {
    isViewImagesModalOpen.value = true;
  };
  
  const closeViewImagesModal = () => {
    isViewImagesModalOpen.value = false;
  };
  
  const deviceName = ref<string>('');
  const brandName = ref<string>('');
  const modelName = ref<string>('');
  const descriptionDetails = ref<string>('');
  const weightNumber = ref<number>();
  const heightNumber = ref<number>();
  const deviceImages = ref<string[]>([]);
  const deviceType = ref<string>('');
  const selectedCondition = ref<string>('');
  const donatorName = ref<string>('');
  
  const generateRandomId = (): string => {
    return 'item-' + Math.random().toString(36).substr(2, 9);
  };
  
  const handleUpload = (event: Event) => {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files) {
      const uploadedFiles = Array.from(fileInput.files).map((file) =>
        URL.createObjectURL(file) // Convert files to URLs for display
      );
      if (selectedItem.value) {
        selectedItem.value = {
          ...selectedItem.value,
          images: uploadedFiles,
        };
      } else {
        selectedItem.value = {
          username: '',
          id: '',
          name: '',
          model: '',
          type: '',
          brand: '',
          weight: 0,
          images: uploadedFiles,
          video: null,
          sellerIdPhoto: '',
          height: 0,
          status: '',
          description: '',
          isListed: true,
          isSold: false,
          isCart: false,
        };
      }
      console.log('Uploaded Files:', uploadedFiles);
    }
  };
  
  const showSuccess = ref(false); // For success notification
  const showFailure = ref(false); // For failure notification
  
  const handleSubmit = (): void => {
    if (
      !deviceName.value ||
      !brandName.value ||
      !modelName.value ||
      !descriptionDetails.value ||
      !weightNumber.value ||
      !heightNumber.value ||
      !deviceType.value ||
      !selectedCondition.value ||
      !donatorName.value
    ) {
      showFailureNotification();
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
      sellerIdPhoto: 'https://via.placeholder.com/100', // Placeholder for now
      height: heightNumber.value!,
      status: selectedCondition.value,
      description: descriptionDetails.value,
      isListed: true,
      isSold: false,
      isCart: false,
    };
  
    itemStore.addItem(newItem); // Add the new item to the Pinia store
    showSuccessNotification();
    console.log('New Item Added:', newItem);
  
    // Delay closing the modal
    setTimeout(() => {
      toggleUploadModal();
    }, 3000); // Close the modal after 3 seconds
  };
  
  const showSuccessNotification = (): void => {
    showSuccess.value = true;
    showFailure.value = false;
    setTimeout(() => {
      showSuccess.value = false;
    }, 3000); // Hide the notification after 3 seconds
  };
  
  const showFailureNotification = (): void => {
    showFailure.value = true;
    showSuccess.value = false;
    setTimeout(() => {
      showFailure.value = false;
    }, 3000); // Hide the notification after 3 seconds
  };
  
  // Computed properties for filtered items by category
  const phones = ref<Item[]>([]);
  const laptops = ref<Item[]>([]);
  const tvs = ref<Item[]>([]);
  const others = ref<Item[]>([]);
  
  watchEffect(() => {
    phones.value = itemStore.getItems.filter((item: Item) => item.type === 'Phone' && item.isListed && !item.isSold && !item.isCart);
    laptops.value = itemStore.getItems.filter((item: Item) => item.type === 'Laptop' && item.isListed && !item.isSold && !item.isCart);
    tvs.value = itemStore.getItems.filter((item: Item) => item.type === 'TV' && item.isListed && !item.isSold && !item.isCart);
    others.value = itemStore.getItems.filter((item: Item) => !['Phone', 'Laptop', 'TV'].includes(item.type) && item.isListed && !item.isSold && !item.isCart);
  });
  
  // Rows for different sections
  const rows = ref([
    { title: 'Phones', data: phones.value },
    { title: 'Laptops', data: laptops.value },
    { title: 'TVs', data: tvs.value },
    { title: 'Others', data: others.value },
  ]);
  
  watchEffect(() => {
    rows.value = [
      { title: 'Phones', data: phones.value },
      { title: 'Laptops', data: laptops.value },
      { title: 'TVs', data: tvs.value },
      { title: 'Others', data: others.value },
    ];
  });
  </script>
  
  