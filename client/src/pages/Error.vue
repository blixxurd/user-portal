<template>
  <div class="container mx-auto text-center">
    <h1 class="font-bold text-6xl">{{errorCode}}</h1>
    <p class="py-10">
      {{errorMessage}}
    </p>
    <router-link to="/" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-orange-500 hover:bg-orange-400 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange active:bg-orange-700 transition duration-150 ease-in-out">
      Go Back Home
    </router-link>
  </div>
</template>


<script>
  export default {
    name: 'Error',
    props: ['code', 'message'],
    data() {
      return {
        errorCode: this.code ? this.code : '404',
        errorMessage: this.message ? this.message : 'Sorry - this page was not found!'
      }
    }
  }
</script>