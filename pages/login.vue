<script setup lang="ts">
  definePageMeta({
    middleware: ['auth'],
  });

  const supabase = useSupabaseAuthClient();

  async function signInWithDiscord() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'discord'
    })
  }
</script>

<template>
  <div>
    Login
    <button @click="signInWithDiscord()">Sign In with Discord</button>
  </div>
</template>