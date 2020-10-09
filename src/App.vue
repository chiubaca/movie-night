<template>
  <nav id="nav" class="p-5 text-center">
    <router-link to="/movies">
      <span class="hover:border-black border-b-4">Movies 🎥</span>
    </router-link>
    |
    <router-link to="/tv">
      <span class="hover:border-black border-b-4">TV Shows 📺</span>
    </router-link>
  </nav>
  <h1 class="text-center text-2xl font-bold font-serif">Whatch - /wɒtʃ/</h1>
  <h2 class="text-center font-hairline text-sm">what do you want to watch?</h2>
  <router-view />
</template>

<style></style>
