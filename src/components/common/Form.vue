<template>
  <div class="p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
    <form action="">
      <div class="mb-5">
        <label for="name" class="block mb-2 font-bold">Name</label>
        <input class="border shadow p-3 w-full rounded" id="name" type="text" placeholder="Joe Doe">
      </div>
      <div class="mb-8">
        <label for="twitter" class="block mb-2 font-bold">Twitter</label>
        <input class="border shadow p-3 w-full rounded" id="twitter" type="text" placeholder="@joedoe">
        <p class="text-sm text-red-400 mt-2">Twitter username is required!</p>
      </div>
      <button class="block w-full bg-blue-500 text-blue-100 rounded-lg p-4 font-bold">Submit</button>
    </form>
  </div>
  <!-- <label class="block mt-5" for="test">123</label>
  <input type="checkbox" class="rounded text-pink-500 border-primary" id="test"/> -->

  

<span class="box-decoration-slice bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-2 ...">
  Hello<br />
  World
</span>
  <br />
<span class="box-decoration-clone hover:box-decoration-slice bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-2 ...">
  Hello<br />
  World
</span>

<div class="table w-full ...">
  <div class="table-header-group ...">
    <div class="table-row">
      <div class="table-cell text-left ...">Song</div>
      <div class="table-cell text-left ...">Artist</div>
      <div class="table-cell text-left ...">Year</div>
    </div>
  </div>
  <div class="table-row-group">
    <div class="table-row">
      <div class="table-cell ...">The Sliding Mr. Bones (Next Stop, Pottersville)</div>
      <div class="table-cell ...">Malcolm Lockyer</div>
      <div class="table-cell ...">1961</div>
    </div>
    <div class="table-row">
      <div class="table-cell ...">Witchy Woman</div>
      <div class="table-cell ...">The Eagles</div>
      <div class="table-cell ...">1972</div>
    </div>
    <div class="table-row">
      <div class="table-cell ...">Shining Star</div>
      <div class="table-cell ...">Earth, Wind, and Fire</div>
      <div class="table-cell ...">1975</div>
    </div>
  </div>
</div>

<div v-html="'https://s3.ypcloud.com/guide/Susan/crm-topic-1.md?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=mikiypcloud%2F20240709%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240709T125515Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=eb3495face0c3320d74f48ec6bb36f1cd63089a85460fc2aea59d8eb1881d2bc'"></div>
</template>

