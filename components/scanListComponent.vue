<template>
	<div id="mainContainer">
		<h1 id="title" v-if="charaListPage.length === 0">
			Loading Chara List Page..
		</h1>
		<div id="charaListPageContainer" v-else>
			<h1>Characters in the Page</h1>
			<span v-if="charaToUpdate.length > 0" class="spanMessage"
				><div class="blueSquare"></div>
				Missing Characters
			</span>
			<h3 class="subtitle" v-else>All Characters in PostgreSQL</h3>
			<h3 v-if="false">Loading Characters on the page...</h3>
			<ul v-else id="charaListPage" ref="charaListPageRef">
				<li
					v-for="(chara, index) of charaListPage"
					:key="index"
					:class="
						charaToUpdate.some(
							(charaUpdate) => charaUpdate.charaName === chara.charaName
						)
							? 'charaPageMissing'
							: ''
					"
					class="charaListPageLi"
				>
					<a :href="chara.url" target="_blank" class="charaListPageA">
						<img :src="chara.img" :alt="`${chara.charaName} image`" />
						{{ `${index + 1}: ${chara.charaName.replaceAll('_', ' ')}` }}
					</a>
				</li>
			</ul>
		</div>
		<div id="missingList" v-if="charaToUpdate.length > 0">
			<h2>Characters to Update:</h2>
			<h2 v-if="charaToUpdateHistory.length > 0">
				Removed: {{ charaToUpdateHistory.length }}
			</h2>
			<ul class="toUpdateList">
				<li v-for="(chara, index) of charaToUpdate.toSorted()">
					<img :src="chara.img" :alt="`${chara.charaName} image`" />
					{{ `${index + 1}: ${chara.charaName}` }}
					<button
						class="removeFromListButton"
						@click="removeCharaFromList(chara.charaName)"
					>
						Remove
					</button>
				</li>
			</ul>
			<button
				id="revertChangesButton"
				:disabled="charaToUpdateHistory.length === 0"
				@click="revertCharaToUpdateListChanges"
			>
				Revert changes
			</button>
			<button
				id="removeAllCharasListButton"
				v-show="charaToUpdate.length > 0"
				:disabled="charaToUpdate.length === 0"
				@click="removeAllCharasFromToUpdateList"
			>
				Remove all characters from the list
			</button>
			<button
				id="updateButton"
				:disabled="charaToUpdate.length === 0"
				v-if="charaToUpdate.length > 0"
				@click="updateDbButton"
			>
				Update Database
			</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import type { charaList } from '~/server/func/scanCharaList';
	import type { IcharaListPage } from '~/server/models/studentsModel';

	// const pendingPage: Ref<boolean> = ref(false);
	const charaListPage: Ref<IcharaListPage[] | []> = ref([]);
	const charaListPageRef: Ref<HTMLUListElement | null> = ref(null);
	const charaToUpdate: Ref<CharaPage[]> = ref([]);
	const charaToUpdateHistory: Ref<CharaPage[]> = ref([]);

	//Fetch PostgresSQL Characters

	const { data: charasNameDB }: { data: Ref<{ charaName: string }[] | null> } =
		await useFetch('/api/getCharasDB', {
			cache: 'no-cache',
		});

	const fetchPageCharaList = async () =>
		(await useFetch('/api/getCharaListPage', { cache: 'force-cache' })).data
			.value as charaList[];
	//Fetch Page Characters

	watchEffect(async () => {
		const NumCharasDb = charasNameDB.value?.length;
		console.log('Personajes en DB:', NumCharasDb);
		const pageCharaListJSON = localStorage.getItem('pageCharaList');
		if (!pageCharaListJSON) {
			console.log('no cache detected, Fetching charaPage...\n');
			charaListPage.value = await fetchPageCharaList();
		} else {
			const pageCharaListCached: IcharaListPage[] =
				JSON.parse(pageCharaListJSON);
			const NumCharasCached = pageCharaListCached.length;
			console.log('personajes en cache:', NumCharasCached);
			charaListPage.value = pageCharaListCached;

			if (NumCharasCached !== NumCharasDb) {
				console.log('old cache, fetching charaPage...');
				charaListPage.value = [];
				localStorage.removeItem('pageCharaList');
				charaListPage.value = await fetchPageCharaList();
			}
		}
	});

	watch(charaListPage, async (charaPage) => {
		localStorage.setItem('pageCharaList', JSON.stringify(charaPage));
		console.log('charaListPage cached:', charaPage.length);
		searchNewCharas(charaPage as CharaPage[]);
		watch(charaListPageRef, (ulElement) => {
			if (ulElement) {
				const ulChildren = Array.from(ulElement.children);
				const missingCharacters = ulChildren
					.filter((li) =>
						Array.from(li.classList).some((className) =>
							className.includes('charaPageMissing')
						)
					)
					.reverse();
				missingCharacters.forEach((missingChara) => {
					ulElement.insertBefore(missingChara, ulElement.firstChild);
				});
			}
		});
	});

	function searchNewCharas(charaListPage: CharaPage[]) {
		for (const charaPag of charaListPage) {
			if (
				!charasNameDB.value?.some(
					(charasNameDB: charasNameDB) =>
						charasNameDB.charaName === charaPag.charaName
				)
			)
				charaToUpdate.value.push(charaPag);
		}
	}

	function removeCharaFromList(charaName: string) {
		const charaNotInHistoryList = !charaToUpdateHistory.value.some(
			(chara) => chara.charaName === charaName
		);
		console.log(charaNotInHistoryList);
		if (charaNotInHistoryList) {
			const chara = charaToUpdate.value.find(
				(chara) => chara.charaName === charaName
			);
			if (chara) charaToUpdateHistory.value.push(chara);
			console.log('agregado al historial:', history);
		}
		charaToUpdate.value = charaToUpdate.value.filter(
			(chara) => chara.charaName !== charaName
		);
	}

	function revertCharaToUpdateListChanges() {
		if (charaToUpdate.value.length === 0) {
			charaToUpdate.value = charaToUpdateHistory.value;
		} else {
			charaToUpdateHistory.value.forEach((charaInHistoryList) => {
				const charaExistInUpdateList = charaToUpdate.value.some(
					(charaInUpdateList) =>
						charaInUpdateList.charaName === charaInHistoryList.charaName
				);
				if (!charaExistInUpdateList)
					charaToUpdate.value.push(charaInHistoryList);
			});
		}

		charaToUpdateHistory.value = [];
	}

	function removeAllCharasFromToUpdateList() {
		charaToUpdate.value.forEach((charaInUpdateList) => {
			const charaExistInHistory = charaToUpdateHistory.value.some(
				(charaInHistory) =>
					charaInHistory.charaName === charaInUpdateList.charaName
			);
			if (!charaExistInHistory) {
				charaToUpdateHistory.value.push(charaInUpdateList);
			}
		});
		charaToUpdate.value = [];
	}

	async function updateDbButton() {
		try {
			const charaListToUpdate = charaToUpdate.value;
			const response = await $fetch('api/getCharaListPage', {
				method: 'POST',
				body: JSON.stringify(charaListToUpdate),
			});
			window.location.href = '/';
		} catch (error) {
			console.error('Error al intentar enviar los datos al backend\n', error);
			alert('Error al intentar enviar los datos al backend');
		}
	}

	interface charasNameDB {
		charaName: string;
	}
	interface CharaPage {
		charaName: string;
		img: string;
		url: string;
	}
</script>

<style>
	#mainContainer {
		display: flex;
		justify-content: space-around;
		margin-top: 40px;
	}

	#title {
		width: 100%;
	}

	#charaListPageContainer {
		max-height: 66vh;
		width: 100%;
		padding: 0 20px;
		overflow-y: auto;
		border-radius: 20px;
	}

	.charaListPageLi > a {
		display: flex;
		padding: 10px 15px;
		margin: 10px 0;
		gap: 15px;
		align-items: center;
		font-size: 18px;
		border-radius: 20px;
	}

	.charaListPageLi > a:hover {
		background-color: rgb(37, 37, 37);
	}

	.charaPageMissing {
		background-color: rgb(60, 60, 165);
		margin: 25px 0;
	}

	#missingList {
		min-width: 25%;
		padding: 0 10px;
		display: flex;
		flex-flow: column wrap;
	}

	#charaPage {
		display: flex;
		flex-flow: column nowrap;
		overflow: auto;
		padding: 10px 10px;
		margin-top: 30px;
		border-radius: 20px;
	}

	#showCharaPageButton {
		display: block;
		background-color: rgb(51, 51, 51);
		color: white;
		font-size: 20px;
		font-weight: 400;
		margin: 0 auto;
		border: solid 1px white;
		padding: 15px 10px;
		border-radius: 20px;
	}

	.blueSquare {
		background-color: rgb(60, 60, 165);
		margin-right: 10px;
		border-radius: 100%;
		display: inline-block;
		width: 15px;
		height: 15px;
	}

	.subtitle {
		margin: 20px 0;
		text-align: center;
		color: rgb(35, 105, 35);
	}

	#missingList {
		width: 25%;
		overflow: auto;
	}

	.toUpdateList {
		padding: 10px 10px;
		margin-top: 30px;
		border-radius: 20px;
	}

	.toUpdateList > li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 15px;
		padding: 15px;
	}
	.toUpdateList > li:hover {
		background-color: rgb(37, 37, 37);
		border-radius: 20px;
	}

	.removeFromListButton {
		padding: 5px 10px;
		margin-left: auto;
		font-size: 0.9em;
	}

	#removeAllCharasListButton {
		display: block;
		margin: 15px auto;
	}

	#revertChangesButton {
		display: block;
		margin: 15px auto;
	}

	#updateButton {
		position: relative;
		margin-top: auto;
	}

	::-webkit-scrollbar {
		width: 12px; /* Ancho de la barra de desplazamiento */
	}

	::-webkit-scrollbar-thumb {
		background-color: rgb(
			24,
			24,
			24
		); /* Color de la parte desplazada de la barra */
		border-radius: 6px; /* Bordes redondeados */
	}

	::-webkit-scrollbar-track {
		background-color: rgb(
			75,
			74,
			74
		); /* Color de la parte no desplazada de la barra */
	}

	/* Estilos adicionales para navegadores basados en WebKit (Chrome, Safari) */
	::-webkit-scrollbar-button {
		display: none; /* Oculta los botones de la barra de desplazamiento (flechas) */
	}
</style>
