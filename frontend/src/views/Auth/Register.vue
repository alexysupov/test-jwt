<script setup>
import { useVuelidate } from '@vuelidate/core'
import {required, minLength, maxLength} from '@vuelidate/validators'
import VToast from "primevue/toast"
import VInputText from "@/components/UI-kit/VInputText.vue";
import VButton from "primevue/button";
import {reactive} from "vue";
import authApi from "@/api/authApi";
import {useRouter} from "vue-router";
import {useToast} from "primevue/usetoast";

const user = reactive({
  username: 'test',
  password: '12345678'
})

const router = useRouter()
const toast = useToast()

const v$ = useVuelidate({
  user: {
    username: {
      required
    },
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(24)
    }
  }
}, { user })

async function register() {
  if (v$.value.$touch() || v$.value.$error) {
    return
  }

  try {
    await authApi.register(user.username, user.password)
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
  <div class="register-page">
    <h1>Register page</h1>
    <form class="register-form">
      <VInputText
        :validation="v$.user.username"
        v-model="user.username"
        @keyup.enter="register"
      />
      <VInputText
        :validation="v$.user.password"
        v-model="user.password"
        @keyup.enter="register"
      />
      <VButton @click="register">
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
.register-form {
  padding: 1rem;
  display: grid;
  gap: 1.5rem;
}
</style>