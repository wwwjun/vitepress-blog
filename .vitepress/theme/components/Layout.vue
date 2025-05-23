<template>
  <div class="post-list">
    <h1>博客文章</h1>
    <ul>
      <li v-for="post in pagedPosts" :key="post.path">
        <a :href="post.path">{{ post.title }}</a>
        <p>{{ post.summary }}</p>
        <small>{{ post.date }}</small>
      </li>
    </ul>

    <div class="pagination">
      <button @click="prevPage" :disabled="page === 1">上一页</button>
      <span>第 {{ page }} 页</span>
      <button @click="nextPage" :disabled="page === totalPages">下一页</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePosts } from '../composables/usePosts'

const posts = usePosts()
const page = ref(1)
const pageSize = 5

const totalPages = Math.ceil(posts.length / pageSize)

const pagedPosts = computed(() => {
  const start = (page.value - 1) * pageSize
  return posts.slice(start, start + pageSize)
})

function prevPage() {
  if (page.value > 1) page.value--
}
function nextPage() {
  if (page.value < totalPages) page.value++
}
</script>
