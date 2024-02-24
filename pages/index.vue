<template>
	<div>
		<h1>Pagina home</h1>
		<button @click="() => (ocultar = !ocultar)">Ocultar</button>
	</div>

	<br />
	<br />
</template>

<script setup>
	const ocultar = ref(true);
</script>

<style scoped></style>
