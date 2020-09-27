<template>
  <nav id="nav" class="p-5 text-center">
    <router-link to="/movies">
      <span class="hover:border-black border-b-4">Films 🎥</span>
    </router-link>
  </nav>
  <h1 class="text-center text-2xl font-bold">Whatch</h1>
  <h2 class="text-center text-l font-bold p-2">🤔 What to Watch? 🤔</h2>
  <h3 class="text-center text-sm">
    Select some movies or shows you have previously enjoyed. We'll give you some
    recomendations based on these preferences.
  </h3>
  <router-view />
</template>

<style></style>
