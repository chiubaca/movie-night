<template>
  <nav id="nav" class="p-5 text-center flex justify-between items-baseline">
    <router-link id="logo" to="/">
      <h1 class="text-center text-2xl font-bold font-serif">Whatch - /wɒtʃ/</h1>
      <h2 class="text-center font-hairline text-sm underline">
        what do you want to watch?
      </h2>
    </router-link>

    <div id="links" class="right-0">
      <router-link
        to="/movies"
        class="hover:border-black border-b-4"
        tabindex="0"
      >
        Movies🎥
      </router-link>
      |
      <router-link to="/tv" class="hover:border-black border-b-4" tabindex="0">
        TV📺
      </router-link>
      |
      <router-link
        to="/watchlist"
        class="hover:border-black border-b-4"
        tabindex="0"
      >
        Watch List📃
      </router-link>
    </div>
  </nav>
</template>
