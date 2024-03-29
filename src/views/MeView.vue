<script setup>
import useAuthUser from "@/utils/UseAuthUser";
const { user } = useAuthUser();
</script>

<template>
  <div v-if="user">
    <div>Hello {{ user.user_metadata.first_name }}!</div>
  </div>
</template>
