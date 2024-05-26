<template>
  <div class="flex h-screen w-full flex-col items-center justify-center gap-12">
    <h1 class="text-5xl">Login Page</h1>
    <form
      class="flex w-full max-w-[390px] flex-col gap-4"
      @submit.prevent="login"
    >
      <input
        class="rounded-lg border-2 border-white bg-transparent py-2 pl-2 outline-none"
        type="email"
        placeholder="Your email"
        v-model="email"
      />
      <input
        class="rounded-lg border-2 border-white bg-transparent py-2 pl-2 outline-none"
        type="password"
        placeholder="Your Password"
        v-model="password"
      />
      <button
        type="submit"
        class="rounded-lg border-2 border-white px-4 py-2 text-lg transition-colors duration-300 hover:bg-white hover:text-[#141414]"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../../supabase";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const checkUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    router.push("/employee");
  }
};

const login = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (error) {
    console.error("Error logging in:", error.message);
  }
  if (data.user) {
    router.push("/employee");
  }
};

onMounted(checkUser);
</script>
