<template>
    <div v-if="isEmpty" class="text-center text-[#1b3c59] text-lg font-medium">
        No Tech Listings
    </div>
</template>

<script lang="ts">
    const isEmpty = computed(() => myListings.value.length === 0);
</script>