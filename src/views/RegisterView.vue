<script setup>
import { ref } from "vue";
import useAuthUser from "@/utils/UseAuthUser";
import { useRouter } from "vue-router";

const router = useRouter();
const { register } = useAuthUser();

const form = ref({
  name: "",
  email: "",
  password: "",
});

const handleSubmit = async () => {
  try {
    await register({
      email: form.value.email,
      password: form.value.password,
      name: form.value.name,
    });

    router.push({
      name: "emailConfirmation",
      query: { email: form.value.email },
    });
  } catch (error) {
    alert(error.message);
  }
};
</script>

<template>
  <form class="max-w-lg m-auto" @submit.prevent="handleSubmit">
    <h1 class="text-3xl mb-5">Register</h1>
    <label>Name <input v-model="form.name" type="text" /></label>
    <label>Email <input v-model="form.email" type="email" /></label>
    <label>Password <input v-model="form.password" type="password" /></label>
    <button>Register</button>
  </form>
</template>
