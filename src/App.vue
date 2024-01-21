<template>
	<div class="app">
		
		<!-- Sidebar -->
		<Sidebar v-if="$route.name !== 'login' && $route.name !== 'register'"/>
		<!-- || this.$route.name != 'register' -->
		<!-- Content -->
		<router-view />
	</div>
</template>

<script setup>
// import { useRouter } from 'vue-router';
import Sidebar from './components/Sidebar.vue'


// export default {

// };


</script>

<style lang="scss">
:root {
	--primary: #4ade80;
	--primary-alt: #22c55e;
	--grey: #64748b;
	--dark: #1e293b;
	--dark-alt: #334155;
	--light: #f1f5f9;
	--sidebar-width: 300px;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Fira sans', sans-serif;
}

body {
	background: var(--light);
}

button {
	cursor: pointer;
	appearance: none;
	border: none;
	outline: none;
	background: none;
}

.app {
	display: flex;

	main {
		flex: 1 1 0;
		padding: 2rem;

		@media (max-width: 1024px) {
			padding-left: 6rem;
		}
	}
}

.form-control, .form-select{
	border-radius: 0px !important;
	border: 1px solid #49df80;
}

.form-control:focus, .form-select:focus{
	border: 2px solid #49df80;
}
</style>