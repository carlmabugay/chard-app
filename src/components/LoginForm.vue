<script setup lang="ts">
import { useAuth } from '../composables/useAuth'
import { useAuthStore } from '../stores/useAuthStore'
import Label from '../shared/ui/Label.vue'

const { login } = useAuth()
const store = useAuthStore()

let email = ''
let password = ''
</script>

<template>
  <div class="bg-white outline-1 outline-gray-200 p-6 rounded-3xl max-w-md mx-auto shadow-gray-300 shadow-md">
    <h1 class="text-2xl font-bold mb-4">Welcome to Chard</h1>
    <p v-if="store.error">
      {{ store.error }}
    </p>
    <form @submit.prevent="login(email, password)">
      <div class="space-y-6">
        <div>
          <Label>Email:</Label>
          <input
              class="w-full px-4 py-3 rounded-3xl border border-gray-300 bg-gray-50/50 focus:outline-black focus:outline-offset-3"
              v-model="email"
              type="email"
              placeholder="Email"/>
        </div>
        <div>
          <Label>Password:</Label>
          <input
              class="w-full px-4 py-3 rounded-3xl border border-gray-300 bg-gray-50/50 focus:outline-black focus:outline-offset-3"
              v-model="password"
              type="password"
              placeholder="Password"
          />
        </div>
        <div class="mt-8">
          <button
              class="w-full bg-lime-300 px-4 py-3 rounded-3xl font-medium hover:cursor-pointer hover:bg-lime-300/80 focus:outline-black focus:outline-offset-3 focus:ease-inn-out"
              type="submit">
            Login
          </button>
        </div>

      </div>
    </form>
  </div>
</template>
