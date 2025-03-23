<template>
  <div class="bg-black text-white min-h-screen">    
  <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:bg-white focus:text-black focus:p-2">
    Skip to main content
  </a>
<Header />
  <main id="main-content" role="main" >
    <section 
    v-if="!isLoading && moviesList && moviesList.length > 0" 
      class="p-6" 
      aria-labelledby="popular-movies-heading"
      role="region"
    >
      <h2 id="popular-movies-heading" class="text-xl md:text-2xl font-semibold mb-4">
        Popular Movies
      </h2>
      <ul 
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        role="list"
        aria-live="polite" 
      >
      <li 
      v-for="(movie, index) in moviesList" 
      :key="movie.id" 
      class="relative group"
      role="listitem"
      :aria-posinset="index + 1"
      :aria-setsize="moviesList.length"
    >
    <router-link :to="`/movie/details/${movie.imdbID}`" class="block">

      <div
        class="netflix-card relative flex-shrink-0 w-[150px] md:w-[200px] lg:w-[240px] h-[300px] rounded-md overflow-hidden cursor-pointer transition-transform duration-300 ease-out"
        @mouseenter="setHoveredID(movie.imdbID)"
        @mouseleave="setHoveredID(null)"
      >
        <div class="relative w-full h-full overflow-hidden">
          <img 
            :src="movie.Poster" 
            :alt="movie.Title" 
            class="w-full h-full object-cover transition-transform duration-500 ease-out"
            :class="{ 'scale-110': isHoveredID === movie.imdbID }"
          
          />
        </div>
        
        <transition name="fade">
          <div 
            v-if="isHoveredID === movie.imdbID"
            class="absolute inset-0 bg-black/10 backdrop-blur-sm transition-opacity duration-500 flex items-start p-3"
          >
            <h3 class="text-white font-semibold text-sm md:text-base px-2 py-1 rounded">
              {{ movie.Title }}
            </h3>
          </div>
        </transition>
      </div>
    </router-link>
    </li>

      </ul>
      <div 
      v-if="error"
      role="alert"
      class="text-red-500 p-4 text-center"
      >
      <span class="sr-only">Error:</span>
      {{ error }}
    </div>
  </section>
  <div 
    v-else
    role="alert"
    aria-busy="true"
    aria-live="assertive"
    class="text-center p-4  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
  >
    <div 
      v-for="n in 10" 
      :key="n"
      class="netflix-card relative flex-shrink-0 w-[150px] md:w-[200px] lg:w-[240px] h-[300px] rounded-md overflow-hidden cursor-pointer transition-transform duration-300 ease-out"
      aria-hidden="true"
    >
      <div class="relative w-full h-full overflow-hidden bg-gray-800 animate-pulse">
        <div class="w-full h-full bg-gray-700"></div>
      </div>
      
      <transition name="fade">
        <div 
          v-if="false" 
          aria-hidden="true"
        >
          <h3 class="text-white font-semibold text-sm md:text-base px-2 py-1 rounded">
            Loading...
          </h3>
        </div>
      </transition>
    </div>
    <span class="sr-only">Loading content, please wait...</span>
  </div>
   
  </main>

</div>
  </template>
  
  <script setup>
  
  import { ref, onMounted } from 'vue';
  import Header from '@/components/Header.vue';
  import fetchOmdbApi from '@/services/requestHandler.js';

  let isLoading = ref(false);
  let isHoveredID  = ref(0)
  let moviesList = ref([])

  onMounted(async () => {
    isLoading.value = true;
    // Temporarily hardcoding the API key for demonstration purposes and avoiding the env thing for now :).

    const res = await fetchOmdbApi('http://www.omdbapi.com/?s=action&apikey=c926617f');
    moviesList.value = res.Search;
    isLoading.value = false;
  
});


   function setHoveredID(id) {
     isHoveredID.value = id;
    }

  </script>

  <style scoped >
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>