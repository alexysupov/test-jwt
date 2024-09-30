<script setup>
import VInputText from "@/components/UI-kit/VInputText.vue";
import VButton from "primevue/button";
import VToast from "primevue/toast"
import {reactive} from "vue";
import {useRouter} from "vue-router";
import {useUserStore} from "@/store/user";
import {useToast} from "primevue/usetoast";

const userStore = useUserStore()
const toast = useToast();

const user = reactive({
  username: 'test',
  password: '12345678'
})

const router = useRouter()

async function login() {
  try {
    await userStore.login(user.username, user.password)
    await router.push('/')
  } catch (e) {
    toast.add({
      severity: 'error',
      summary: e.response.data.message
    })
  }
}

</script>

<template>
  <div class="login-page">
    <h1>Login</h1>
    <form class="login-form">
      <VInputText
          v-model="user.username"
          @keyup.enter="login"
      />
      <VInputText
          v-model="user.password"
          @keyup.enter="login"
      />
      <VButton @click="login">
        Отправить
      </VButton>
    </form>
  </div>
  <VToast position="bottom-right" />
</template>

<style lang="scss" scoped>
h1 {
  text-align: center;
  font-size: 26px;
}
.login-form {
  padding: 1rem;
  display: grid;
  gap: 1.5rem;
}
</style>