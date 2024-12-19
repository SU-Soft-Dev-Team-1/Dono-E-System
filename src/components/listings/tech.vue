<template>
  <div v-if="userItems.length > 0">
    <div
      v-for="item in userItems"
      :key="item.id"
      class="h-[99px] w-[100%] mt-5 px-5 py-3 bg-[#f2f2f0] rounded-xl border border-[#d4d3d3] justify-between items-center inline-flex"
    >
      <div class="h-[75px] justify-start items-center gap-[17px] flex">
        <img
          class="w-[75px] h-[75px] rounded-[10px] border-2 border-[#cdcdcd]"
          :src="item.images[0]"
          alt="Uploaded image"
        />
        <div class="w-[472px] h-[75px] flex-col justify-center items-start inline-flex">
          <div class="self-stretch h-[29px] text-[#1e1e1e] text-xl font-medium font-['Ubuntu']">
            {{ item.name }}
          </div>
          <div class="self-stretch h-6 text-[#1e1e1e] text-sm font-normal font-['Ubuntu']">
            {{ item.description }} • {{ item.status }}
          </div>
          <div class="w-[98px] px-[5px] bg-[#e4e4e4] rounded-xl justify-start items-center gap-[5px] inline-flex">
            <div class="w-[9px] h-[9px] bg-[#ffd757] rounded-full"></div>
            <div class="text-center text-[#1b3c59] text-xs font-medium font-['Ubuntu'] leading-[13.78px]">
              {{ item.status }}
            </div>
          </div>
        </div>
      </div>
      <div class="justify-center items-center flex">
        <div class="w-[130px] h-10 bg-[#1b3c59] rounded-lg shadow border border-[#d4d3d3] flex-col justify-center items-center gap-2 inline-flex">
          <div class="self-stretch grow shrink basis-0 px-6 py-2.5 justify-center items-center gap-2 inline-flex hover:cursor-pointer" @click="removeItem(item.id)">
            <div class="text-center text-[#f2f2f0] text-base font-normal font-['Ubuntu']">Remove</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center text-[#1b3c59] text-lg font-medium">No Tech Listings</div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useItemStore } from '~/stores/store-itemStore';
import { useUserStore } from '~/stores/store-currentUserStore';
import type { Item } from '~/types/item-type';

export default defineComponent({
  setup() {
    const itemStore = useItemStore();
    const userStore = useUserStore();

    const userItems = computed<Item[]>(() => {
      return itemStore.getItems.filter(
        (item: Item) => item.username === userStore.getUsername && item.isListed && !item.isSold && !item.isCart
      );
    });

    onMounted(() => {
      itemStore.loadItemsFromLocalStorage();
    });

    const removeItem = (itemId: string) => {
      itemStore.updateItemStatus(itemId, false, false, false);
      alert("Item removed successfully.");
    };

    return {
      userItems,
      removeItem
    };
  }
});
</script>

  