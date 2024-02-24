<script setup></script>

<template>
	<Transition>
		<div>
			<navbar />
			<NuxtLoadingIndicator color="blue" />
			<main id="mainBody">
				<NuxtPage />
			</main>
		</div>
	</Transition>
</template>

<style>
	:root {
		font-family: Verdana;
		font-size: 1.05rem;
	}

	body {
		position: relative;
		background-color: rgb(24, 24, 24);
		min-height: 100%;
		color: white;
		padding-bottom: 50px;
	}

	#mainBody {
		width: 90%;
		margin: 0 auto;
		background-color: rgb(46, 46, 46);
		border-radius: 16px;
		padding: 20px;
	}

	h1 {
		font-size: 2em;
		text-align: center;
		margin-bottom: 35px;
	}

	a {
		text-decoration: none;
		color: white;
	}

	ul {
		list-style: none;
	}

	button {
		padding: 15px 20px;
		font-size: 1.3em;
		font-weight: 600;
		border: 2px solid rgb(24, 24, 24);
		color: white;
		background-color: transparent;
		cursor: pointer;
		border-radius: 40px;
	}

	button:hover {
		background-color: rgb(41, 41, 41);
		border: 2px solid rgb(255, 255, 255);
	}

	button:disabled {
		color: black;
	}

	button:disabled:hover {
		cursor: no-drop;
		background-color: transparent;
		border: 2px solid rgb(24, 24, 24);
	}
</style>
