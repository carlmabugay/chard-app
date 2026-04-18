<script setup lang="ts">
import { useAuthStore } from '../stores/useAuthStore'
import { useAuth } from '../composables/useAuth'

const store = useAuthStore()
const { logout } = useAuth()
</script>

<template>
  <div class="p-10">
    <h1>Welcome {{ store.user?.name }}</h1>

    <button @click="logout" class="ui-btn-secondary mt-4">
      Logout
    </button>
  </div>
</template>