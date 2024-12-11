<script setup lang="ts">
  const supabase = useSupabaseAuthClient();
  const user = useSupabaseUser();

  async function signout() {
    await supabase.auth.signOut();
    navigateTo('/', { replace: true });
  }
</script>

<template>
  <div>
    <h3>VendTrakVMS</h3>
    <div v-if="user">Logged in as: {{ user.email }}: <button @click="signout()">Sign Out</button></div>
    <div v-if="!user">Not logged in</div>
    <hr>
  </div>
</template>