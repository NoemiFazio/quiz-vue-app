<script setup>
import useAuthUser from "@/utils/UseAuthUser";
const { isLoggedIn } = useAuthUser();
</script>

<template>
  <div class="flex bg-gray-500 text-white justify-between">
    <ul v-if="isLoggedIn()" class="flex gap-5 bg-gray-700 p-5">
      <li><router-link :to="{ name: 'home' }">Home</router-link></li>
      <li><router-link :to="{ name: 'me' }">Me</router-link></li>
      <li><router-link :to="{ name: 'logout' }">Logout</router-link></li>
    </ul>
    <ul v-else class="flex gap-5 bg-gray-700 p-5">
      <li><router-link :to="{ name: 'login' }">Login</router-link></li>
      <li><router-link :to="{ name: 'register' }">Register</router-link></li>
    </ul>
  </div>
</template>
