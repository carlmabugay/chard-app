<script setup lang="ts">
import { useCounterStore } from './shared/stores/counter.ts';
import { storeToRefs } from 'pinia'
import { useCompanyStore } from './modules/sample/stores/useCompanyStore.ts'
import { onMounted } from 'vue'

const store = useCounterStore();
const companyStore = useCompanyStore();

const { count } = storeToRefs(store);
const { companies } = storeToRefs(companyStore);
const { increment, decrement } = store;

onMounted(() => {
  companyStore.fetchCompanies();
})

</script>

<template>
  <div class="h-screen items-center justify-center bg-black">
    <div class="w-7xl mx-auto flex-col items-center">
      <h1 class="text-4xl font-bold text-lime-300">
        {{ count }}
      </h1>

      <div class="block">
        <button
            class="text-black p-4 bg-lime-300 rounded-2xl"
            @click="increment()"
        >+</button>

        <button
            class="text-black p-4 bg-lime-300 rounded-2xl"
            @click="decrement()"
        >-</button>
      </div>

      <ul v-for="company in companies" :key="company.id">
        <li class="text-lime-300">{{ company.name }}</li>
      </ul>
    </div>

  </div>
</template>
