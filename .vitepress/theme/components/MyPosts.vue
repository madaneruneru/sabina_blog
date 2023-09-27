<script setup>
import { data as posts } from '../composables/posts.data.ts'
</script>

<template>
  <div v-for="{ url, author, date, excerpt } of posts" :key="url">
    <hr />
    <div v-if="excerpt" v-html="excerpt"></div>
    <div class="flex justify-between">
      <span>
        by <b>{{ author }}</b> on {{ date.string }}
      </span>
      <a :href="url">Read more →</a>
    </div>
  </div>
</template>