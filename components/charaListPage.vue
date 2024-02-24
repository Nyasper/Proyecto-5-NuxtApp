<template>
  <div id="getCharasDBContainer" >
    <h1 id="title" v-if="vif">Loading Data...</h1>
    <div id="charaListPage" v-else>
      <h1>{{ label }}</h1>
      <span v-if="charaToUpdate.length>0"><div class="blueSquare"></div>Missing Characters</span>
      <h3 class="subtitle" v-else>All Characters in PostgreSQL</h3>
      <ul id="dbList">
        <li v-for="(chara, index) of vfor" :key="chara.charaname" :class="charaToUpdate.some(charaUpdate => charaUpdate.charaName === chara.charaname) ? 'missing' : ''" >
          <img :src="chara.img" :alt="`${chara.charaName} image`">
          <a :href="`https://bluearchive.wiki/wiki/${chara.charaName}`" target="_blank">{{`${index+1}: ${chara.charaName.replaceAll('_',' ')}`}}</a>
        </li>
      </ul>
    </div>
    <div id="missingList" v-if="charaToUpdate.length>0">
      <h2>Missing Characters List:</h2>
      <ul class="toUpdateList" >
        <li v-for="(chara,index) of charaToUpdate" >{{`${index+1}: ${chara.charaname}`}}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>

  defineProps(['vif','vfor','label','charaToUpdate'])


</script>

