<template>
  <div class="getCharasContainer">
    <GetCharasButton :clickEvent="getCharasPage" label="Obtener Personajes de la Pagina" />
    <ul v-if="showPageCharas" id="charaPageList">
      <li v-for="(chara, index) of charactersPage">{{`${index+1}: ${chara}`}}</li>
    </ul>
  </div>
</template>


<script setup>

  const charactersPage = ref(null)
  const showPageCharas = ref(false)
  const dataFetched = ref(false)


/*
  const getCharasPage = async()=> {

    try {

      if ( !dataFetched.value ) {

        const { data } = await useFetch('/api/getCharasPage')
        // const { pending, data } = await useLazyFetch('/api/posts')
        charactersPage.value = data.value
        showPageCharas.value = !showPageCharas.value
        dataFetched.value = true

      } else {
        showPageCharas.value = !showPageCharas.value
      }
      

    } catch (error) {
      console.error('Error fetching /api/pageCharacters')
    }
   
  }

*/

</script>


<style scoped>

  .getCharasContainer{
    background-color: rgb(46, 46, 46);
    border-radius: 20px;
    padding: 20px;
  }

  #charaPageList{
    background-color: rgb(46, 46, 46);
    padding: 0 10px;
    max-height: 400px;
    margin-top: 30px;
    border-radius: 20px;
    transform: scaleY(1.1);
    overflow: auto;
  }

  li{
    margin: 8px 0;
  }

</style>