<!-- Todo: styling this page -->
<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div>
    <h1 class="text-3xl">Thanks for registering!</h1>
    <p>
      Please confirm your email to finishing registering:
      {{ $route.query.email }}
    </p>
    <RouterLink to="/">Go Back</RouterLink>
  </div>
</template>
