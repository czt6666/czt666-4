<template>
  <div class="sidebar">
    <h2>菜单</h2>
    <ul>
      <li>首页</li>
      <li>关于</li>
      <li>联系</li>
    </ul>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.sidebar {
  width: 200px;
  background: #fff;
  padding: 1rem;
  border-right: 1px solid #ddd;

  @media (max-width: 1024px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #ddd;
  }
}
</style>
