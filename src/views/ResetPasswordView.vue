<script setup>
import useAuthUser from "@/utils/UseAuthUser";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const { update } = useAuthUser();

const form = ref({
  email: "",
  password: "",
});

const handleUpdatePassword = async () => {
  await update({ email: form.value.email, password: form.value.password });
  router.push({
    name: "login",
  });
  alert(`Password modified`);
};
</script>

<template>
  <h1>IO IN VERITA' SONO IL RESET PASSWORD!!!</h1>
  <form class="max-w-lg m-auto" @submit.prevent="handleUpdatePassword()">
    <h1 class="text-3xl mb-5">Reset the password</h1>
    <label>Email <input v-model="form.email" type="email" /></label>
    <label>Password <input v-model="form.password" type="password" /></label>
    <button>Reset Password</button>
  </form>
</template>
