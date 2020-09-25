<template>
  <div class="loader-wrap">
    <div class="rounded-full loader" :class="classes"></div>
  </div>
</template>

<script>
  export default {
    name: 'Loader',
    props: ['thickness', 'size', 'color'],
    data() {
      return {
        classes: ''
      }
    },
    created() {
      const _cfg = {
        thickness : this.thickness || 4,
        size: this.size || 12,
        color: this.color || 'black'
      }
      this.classes = `w-${_cfg.size} h-${_cfg.size} border-${_cfg.thickness} border-${_cfg.color}`
    }
  }
</script>

<style>
	@keyframes loader-rotate {
		0% {
			transform: rotate(0);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	.loader {
		border-right-color: transparent !important;
    animation: loader-rotate 0.5s linear infinite;
  }
</style>