<template>
	<div v-if="downloadFiles.length > 0">
		<div id="downloadFilesContainer">
			<div id="charaFilesListContainer">
				<h1>{{ downloadFiles.length }} Personajes para Descargar Archivos</h1>
				<ul id="filesToUpdateList" ref="ulRef">
					<li
						v-for="chara of (downloadFiles as ICharaFiles[])"
						class="chara"
						:class="
							charaFilesToDownload.some(
								(charaInList) => charaInList.charaName === chara.charaName
							)
								? 'seleccionado'
								: ''
						"
						@click="addOneFileToUpdate(chara.charaName)"
					>
						<img
							class="charaProfileImg"
							:src="chara.pageImageProfileUrl"
							:alt="`${chara.charaName} image`"
						/>
						{{ chara.charaName }}
					</li>
				</ul>
			</div>
			<div
				id="charaFilesToDownloadContainer"
				v-show="charaFilesToDownload.length > 0"
			>
				<h2 style="text-align: center">
					{{ charaFilesToDownload.length }}
					Personajes Seleccionados
				</h2>
				<ul id="charasToDownload">
					<li
						v-for="(chara, index) in charaFilesToDownload"
						:key="index"
						@click="cancelOneFileToUpdate(chara.charaName)"
					>
						<img
							:src="chara.pageImageProfileUrl"
							:alt="chara.charaName + ' image'"
						/>
						{{ `${index + 1}: ${chara.charaName}` }}
					</li>
				</ul>
			</div>
		</div>
		<div id="buttonsContainer">
			<button
				id="downloadAllFilesButton"
				@click="downloadAllFilesButton"
				:disabled="downloadFiles.length === charaFilesToDownload.length"
			>
				Download All Files
			</button>
			<button
				id="revertButton"
				@click="() => (charaFilesToDownload = [])"
				:disabled="charaFilesToDownload.length === 0"
			>
				Revert
			</button>
			<button
				id="updateDBButton"
				@click="updateDB"
				:disabled="charaFilesToDownload.length === 0"
			>
				Update DB
			</button>
		</div>
	</div>
	<h1 v-else style="width: 100%; text-align: center">
		Todos los archivos de Personajes YA descargados.
	</h1>
</template>

<script lang="ts" setup>
	import type { ICharaFiles } from '~/server/models/studentsModel';

	const ulRef: Ref<HTMLUListElement | null> = ref(null);
	const charaFilesToDownload: Ref<ICharaFiles[] | []> = ref([]);

	const { data: downloadFiles }: { data: Ref<ICharaFiles[] | []> } =
		await useFetch('/api/getFilesToDownload');

	watch(downloadFiles, (files) => {
		console.log('detectado cambio en download files', files);
	});

	function addOneFileToUpdate(charaName: string) {
		const existInList = charaFilesToDownload.value.some(
			(charaInUpdateList) => charaInUpdateList.charaName === charaName
		);
		if (!existInList) {
			const chara = downloadFiles.value.find(
				(chara) => chara.charaName === charaName
			);
			if (chara) charaFilesToDownload.value.push(chara as never);
		}
	}

	function cancelOneFileToUpdate(charaName: string) {
		const existInList = charaFilesToDownload.value.find(
			(chara) => chara.charaName === charaName
		);
		if (existInList) {
			charaFilesToDownload.value = charaFilesToDownload.value.filter(
				(charaInList) => charaInList.charaName !== existInList.charaName
			);
		}
	}

	function downloadAllFilesButton() {
		charaFilesToDownload.value = downloadFiles.value;
	}

	async function updateDB() {
		await $fetch('/api/getFilesToDownload', {
			method: 'POST',
			body: JSON.stringify(charaFilesToDownload.value),
		});
		window.location.reload();
	}
</script>

<style scoped>
	#downloadFilesContainer {
		display: flex;
		max-height: 62vh;
		overflow-y: auto;
	}
	#charaFilesListContainer {
		/* max-width: 75%; */
		min-width: 70%;
		overflow-y: auto;
	}

	#downloadFilesListContainer > span {
		margin-right: 15px;
	}

	#filesToUpdateList {
		display: flex;
		flex-flow: row wrap;
		gap: 15px;
	}

	#charaFilesToDownloadContainer {
		overflow-y: auto;
		width: 100%;
	}

	#charasToDownload {
		display: flex;
		flex-flow: column wrap;
	}

	#charasToDownload > li {
		display: flex;
		align-items: center;
		margin: 10px 0;
		padding: 8px;
		border-radius: 10px;
		cursor: pointer;
	}

	#charasToDownload > li:hover {
		background-color: rgb(24, 24, 24);
	}

	#charasToDownload > li > img {
		height: 50px;
		margin-right: 10px;
	}
	.chara {
		display: flex;
		align-items: center;
		margin: 10px 0;
		font-size: 20px;
		font-weight: 400;
		background-color: rgb(95, 95, 95);
		padding: 10px 15px;
		border-radius: 20px;
		cursor: pointer;
		width: max-content;
	}
	.charaProfileImg {
		width: 60px;
		height: auto;
		margin-right: 10px;
	}

	.seleccionado {
		background-color: rgb(24, 24, 24);
	}
	#buttonsContainer {
		display: flex;
		margin-top: 20px;
		gap: 10px;
	}

	#downloadAllFilesButton {
		display: block;
		margin-left: auto;
		margin-right: 50px;
	}

	#revertButton {
		margin: 0 5px;
	}

	#updateDBButton {
		margin-left: auto;
		margin-right: 66px;
		display: block;
	}
</style>
