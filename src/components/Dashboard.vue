<template>
  <header
    class="flex h-20 w-full items-center justify-end gap-4 border-b border-gray-400 px-6"
  >
    <h1>Welcome, {{ userName }}</h1>
    <button
      @click="signOut"
      class="rounded-lg border-2 border-white px-4 py-2 text-lg transition-colors duration-300 hover:bg-white hover:text-[#141414]"
    >
      Sign out
    </button>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../../supabase";
import { useRouter } from "vue-router";

const userName = ref("");
const router = useRouter();

const fetchUserProfile = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    userName.value = user.user_metadata.full_name || user.email;
  } else {
    router.push("/");
  }
};

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error.message);
  } else {
    router.push("/");
  }
};

onMounted(fetchUserProfile);
</script>
