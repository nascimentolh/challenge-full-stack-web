<template>
  <header class="header">
    <h1 class="title">
      <router-link to="/dashboard">GRUPO A</router-link>
    </h1>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style>
.header {
  grid-area: header;
  background-color: rgb(190, 0, 0);
  border-bottom: 5px solid #ddd;

  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 1.2rem;
  color: #fff;
  font-weight: bold;
  flex-grow: 1;
  text-align: center;
}

.title a {
  color: #fff;
  text-decoration: none;
}
</style>