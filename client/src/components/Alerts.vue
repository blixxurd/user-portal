<template>
  <div class="border-t-4 px-4 py-2 shadow-sm my-2" :class="alertExtras.class" v-if="display" role="alert">
    <div class="flex items-center">
      <svg class="h-6 w-6 mr-3" :class="alertExtras.iconClass" fill="none" viewBox="0 0 24 24" stroke="currentColor" v-if="!!icon">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="alertExtras.icon" />
      </svg>
      <div>
        <p class="font-bold">{{title}}</p>
        <p class="text-sm">{{message}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Alerts',
    props: ['type', 'title', 'message', 'icon'],
    computed: {
      alertExtras() {
        /* https://heroicons.com/ */
        if(this.type=="danger") {
          return {class: "bg-red-100 border-red-400", icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", iconClass: "text-red-400"}
        }
        if (this.type=="success") {
          return {class: "bg-green-100 border-green-400", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", iconClass: "text-green-400"}
        }
        if (this.type=="info") {
          return {class: "bg-blue-100 border-blue-400", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", iconClass: "text-blue-400"}
        }
        return {class: "", icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9", iconClass: ""};
      },
      display() {
        return !!this.title || !!this.message;
      }
    }
  }
</script>