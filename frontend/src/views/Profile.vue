<script setup>
import usersApi from "@/api/usersApi";
import {onBeforeMount, ref} from "vue";

const user = ref({})

onBeforeMount(() => {
  loadUser()
})
async function loadUser() {
  user.value = await usersApi.getUser()
}
</script>

<template>
<div class="profile-page">
  <h1 class="profile-name" v-text="user.username" />
</div>
</template>

<style lang="scss" scoped>
.profile-page {
  text-align: center;
}
</style>