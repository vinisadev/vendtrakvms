<script setup lang="ts">
  definePageMeta({
    middleware: ['auth'],
  });

  const supabase = useSupabaseAuthClient();

  async function signInWithDiscord() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'discord'
      // options: { redirectTo: 'dashboard' } // the redirectTo option doesn't work
    })
    // navigateTo('dashboard'); // This doesn't work, it navigates prior to the oauth handshake completing and then the handshake lands on the index page and ignores the middleware.
  }
</script>

<template>
  <div>
    Login
    <button @click="signInWithDiscord()">Sign In with Discord</button>
  </div>
</template>