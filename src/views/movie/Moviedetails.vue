
<template>
  <div class="p-6 text-white min-h-screen">
    <Header/>

    <main aria-labelledby="movieData-title">
      <section
      
         v-if="!isFetching "
        class="flex flex-col md:flex-row items-center md:items-start gap-6"
      >
        <figure class="w-full md:w-1/3">
          <img
            :src="movieData.Poster"
            :alt="`movie poster of ${movieData.Title}`"
            class="w-full h-[700px] rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
          />
          <figcaption class="sr-only">movieData Poster</figcaption>
        </figure>
        <div class="md:w-2/3 space-y-4">
          <h2 id="movie-title" class="text-4xl font-extrabold text-white">
            {{ movieData.Title }}
          </h2>
          <p class="text-lg text-gray-300 leading-relaxed">{{ movieData.Plot }}</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <p class="font-semibold text-lg">
              <span class="text-gray-400">Year:</span>
              <span class="text-red-400">{{ movieData.Year }}</span>
            </p>
            <p class="font-semibold text-lg">
              <span class="text-gray-400">Genre:</span>
              <span class="text-red-400">{{ movieData.Genre }}</span>
            </p>
            <p class="font-semibold text-lg">
              <span class="text-gray-400">Director:</span>
              <span class="text-red-400">{{ movieData.Director }}</span>
            </p>
            <p class="font-semibold text-lg">
              <span class="text-gray-400">IMDB Rating:</span>
              <span class="text-yellow-400">{{ movieData.imdbRating }}</span>
            </p>
          </div>
        </div>
      </section>
      <section
        v-else
        class="flex flex-col md:flex-row items-center md:items-start gap-6"
            >
        <figure class="w-full md:w-1/3">
          <div class="w-full h-[700px] bg-gray-600 rounded-lg animate-pulse"></div>
          <figcaption class="sr-only">movieData Poster</figcaption>
        </figure>
        <div class="md:w-2/3 space-y-4">
          <div class="h-10 bg-gray-700 rounded animate-pulse"></div>
          <div class="h-6 bg-gray-700 rounded animate-pulse"></div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div class="h-6 bg-gray-700 rounded animate-pulse"></div>
            <div class="h-6 bg-gray-700 rounded animate-pulse"></div>
            <div class="h-6 bg-gray-700 rounded animate-pulse"></div>
            <div class="h-6 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
            </section>
    </main>
  </div>
</template>

<script setup >
import fetchOmdbApi from '@/services/requestHandler.js';
import Header from '@/components/Header.vue';
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

let isFetching = ref(false)
let movieData = ref({});

onMounted(async()=>{
  // Temporarily hardcoding the API key for demonstration purposes and avoiding the env thing for now:).

  isFetching.value = true;
  const route = useRoute();
  const { id } = route.params;
  let res = await fetchOmdbApi(`http://www.omdbapi.com/?i=${id}&apikey=c926617f`)
  movieData.value = res;
  isFetching.value = false;
})
</script>
