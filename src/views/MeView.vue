<script setup>
import useAuthUser from "@/utils/UseAuthUser";
const { user } = useAuthUser();
console.log(user);
</script>

<template>
  <div v-if="user">
    <!--user_metadata is the key supabase nests all arbitrary meta data under-->
    <div>Hello {{ user.user_metadata.first_name }}!</div>
  </div>
</template>
