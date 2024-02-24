<template>
	<div>
		<ScanListComponent v-if="scanActive" />
		<div v-else>
			<h1>Scan Data</h1>
			<button
				id="scanButton"
				@click="switchScanActive"
				:class="`button ${scanActive ? 'actived' : 'desactived'}`"
			>
				Click to Scan
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	const scanActive = ref(false);

	const switchScanActive = () => (scanActive.value = !scanActive.value);
</script>

<style scoped>
	#scanButton {
		display: block;
		margin: 0 auto;
	}
</style>
