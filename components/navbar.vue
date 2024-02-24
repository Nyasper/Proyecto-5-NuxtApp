<template>
  <div id="navBarBody">
    <nav>
      <ul class="linksContainer">
        <NuxtLink to="/" class="img_container"><img src="/saki.webp" /></NuxtLink>
        <NuxtLink to="/" class="anchor">Inicio</NuxtLink>
        <NuxtLink to="/scanData" class="anchor">Scan Data</NuxtLink>
        <NuxtLink to="/downloadFiles" class="anchor">Download Files</NuxtLink>
      </ul>
    </nav>
  </div>
</template>

<script  setup>


</script>

<style scoped>

  #navBarBody{
    margin-top: 15px;
    margin-bottom: 72px;
  }

  .linksContainer{
    display: flex;
    text-decoration: none;
    list-style: none;
    align-items: center;
    justify-content: center;
    padding: 0 14px;
    margin-top: 20px;
    margin-bottom: 40px;
    background-color: rgb(46, 46, 46);
    width: max-content;
    height: 90px;
    margin: 0 auto;
    border-radius: 20px;
  }

  .anchor{
    
    background-color: rgb(70, 70, 70);
    border-radius: 90px;
    padding: 10px 20px;
    margin: 0 5px;
  }


  .img_container{
    height: 90%;
    margin: 0 20px;
    transition: all .2s;
  }


  .img_container > img{
    height: 100%;
    width: auto;
    object-fit: contain;
    border-radius: 20px;
  }
  .img_container:hover{
    transform: scale(1.12);
  }

</style>