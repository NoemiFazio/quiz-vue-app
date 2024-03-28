<script setup>
import { RouterView } from "vue-router";
import AppHeader from "@/components/AppHeader.vue";
//da qui sotto esperimenti
// import { reactive, onMounted } from "vue";
// import supabase from "@/utils/UseSupabase";

// const state = reactive({
//   loading: false,
// });

// onMounted(() => {
//   supabase.auth.onAuthStateChange((_, session) => {
//     state.loading = true;
//     if (!session) {
//       router.push("/login");
//     } else {
//       setUser(session ? session.user : null);
//       router.forward();
//     }
//     state.loading = false;
//   });
// });
</script>

<template>
  <div class="container">
    <AppHeader />
    <RouterView />
  </div>
</template>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px;
}
</style>
