<script setup>
import { ref } from "vue";
import useAuthUser from "@/utils/UseAuthUser";
import { useRouter } from "vue-router";

const router = useRouter();
const { login, loginWithSocialProvider } = useAuthUser();

const form = ref({
  email: "",
  password: "",
});

const handleLogin = async (event, provider) => {
  event.preventDefault();
  try {
    provider
      ? await loginWithSocialProvider(provider)
      : await login(form.value);
    router.push({ name: "me" });
  } catch (error) {
    alert(error.message);
  }
};
</script>

<template>
  <div class="max-w-lg m-auto">
    <form @submit.prevent="handleLogin($event)">
      <h1 class="text-3xl mb-5">Login</h1>
      <label>Email <input v-model="form.email" type="email" /></label>
      <label>Password <input v-model="form.password" type="password" /></label>
      <button>Login</button>
      <router-link to="/forgotPassword">Forgot Password?</router-link>
    </form>
    <div class="mt-5">
      <a @click.prevent="handleLogin($event, 'github')">Github</a>
    </div>
  </div>
</template>
