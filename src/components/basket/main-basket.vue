<template>
  <div>
    <div class="font-['Ubuntu'] text-[#1B3C59] absolute left-0 top-0 mt-[1%] ml-[1.3%]">
      My Cart ({{ items.length }})
    </div>
    <div class="self-stretch w-[97.4%] absolute top-[3.7%] inset-y-0 right-0 m-4">
      <div class="w-full border border-[#D4D4D4]"></div>
      <div class="h-[calc(100vh-4rem)] overflow-y-auto">
        <ul>
          <li v-for="item in items" :key="item.id">
            <div class="h-[99px] w-[100%] mt-5 px-5 py-3 bg-[#f2f2f0] rounded-xl border border-[#d4d3d3] justify-between items-center inline-flex">
              <div class="h-[75px] justify-start items-center gap-[17px] flex">
                <img class="w-[75px] h-[75px] rounded-[10px] border-2 border-[#cdcdcd]" :src="item.images[0]" />
                <div class="w-[472px] h-[75px] flex-col justify-center items-start inline-flex">
                  <div class="self-stretch h-[29px] text-[#1e1e1e] text-xl font-medium font-['Ubuntu']">{{ item.model }}</div>
                  <div class="self-stretch h-[29px] text-[#1e1e1e] text-xs font-medium font-['Ubuntu']">{{ item.brand }}</div>
                  <div class="w-[98px] px-[5px] bg-[#e4e4e4] rounded-xl justify-start items-center gap-[5px] inline-flex">
                    <div :class="{'bg-[#22d056]': item.status === 'Almost new', 'bg-[#ffa057]': item.status === 'Slightly Worn', 'bg-[#ffd757]': item.status === 'Slightly Used', 'bg-[#ff5d57]': item.status === 'Defective'}" class="w-[9px] h-[9px] rounded-full"></div>
                    <div class="text-center text-[#1b3c59] text-xs font-medium font-['Ubuntu'] leading-[13.78px]">{{ item.status }}</div>
                  </div>
                </div>
              </div>
              <div class="justify-center items-center gap-5 flex">
                <div class="w-[130px] h-10 bg-[#1b3c59] rounded-lg shadow border border-[#d4d3d3] flex-col justify-center items-center gap-2 inline-flex">
                  <div class="self-stretch grow shrink basis-0 px-6 py-2.5 justify-center items-center gap-2 inline-flex hover:cursor-pointer" @click="removeFromCart(item.id)">
                    <div class="text-center text-[#f2f2f0] text-base font-normal font-['Ubuntu']">Remove</div>
                  </div>
                </div>
                <div class="w-[130px] h-10 bg-[#a6ed8e] rounded-lg shadow border border-[#d4d3d3] flex-col justify-center items-center gap-2 inline-flex">
                  <div class="self-stretch grow shrink basis-0 px-6 py-2.5 justify-center items-center gap-2 inline-flex" @click="buyNow(item.id)">
                    <div class="text-center text-[#456173] text-base font-normal font-['Ubuntu'] hover:cursor-pointer">Buy Now</div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="isEmpty" class="font-['Ubuntu'] text-[#1B3C59] text-[1.5vw] absolute top-0 inset-x-0 flex justify-center mt-12">
      <p>No Items Listed</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useItemStore } from '~/stores/store-itemStore';
import type { Item } from '~/types/item-type';

const itemStore = useItemStore();
const items = ref<Item[]>([]);

const isEmpty = ref(false);

// Load items from the store
items.value = itemStore.getItems.filter((item: Item) => item.isCart);

// Check if cart is empty
isEmpty.value = items.value.length === 0;

// Remove item from cart
const removeFromCart = (itemId: string) => {
  itemStore.updateItemStatus(itemId, false, true, false);
  items.value = items.value.filter(item => item.id !== itemId);
  isEmpty.value = items.value.length === 0;
  alert("Item removed from cart.");
};

// Buy item
const buyNow = (itemId: string) => {
  itemStore.updateItemStatus(itemId, false, false, true);
  items.value = items.value.filter(item => item.id !== itemId);
  isEmpty.value = items.value.length === 0;
  alert("Item purchased successfully.");
};
</script>
