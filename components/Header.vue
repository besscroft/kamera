<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li><a @click="router.push('/')">首页</a></li>
          <li><a @click="router.push('/cosplay')">Cosplay</a></li>
          <li><a @click="router.push('/tietie')">集邮</a></li>
          <li><a @click="router.push('/timeline')">时光相册</a></li>
          <li><a @click="router.push('/about')">关于</a></li>
        </ul>
      </div>
      <a class="btn btn-ghost normal-case text-xl" @click="router.push('/')">云淑故事集</a>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a @click="router.push('/')">首页</a></li>
        <li><a @click="router.push('/cosplay')">Cosplay</a></li>
        <li><a @click="router.push('/tietie')">集邮</a></li>
        <li><a @click="router.push('/timeline')">时光相册</a></li>
        <li><a @click="router.push('/about')">关于</a></li>
      </ul>
    </div>
    <div class="navbar-end flex items-center">
      <DarkToggle />
    </div>
  </div>
</template>

<style scoped>

</style>
