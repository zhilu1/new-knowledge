<template>
  <div class="demoBlock card">
    <h1>{{title}}</h1>
    <div>
      <!-- message slot -->
      <slot name="message"></slot>
    </div>

    <div>
      <!-- code slot -->
      <slot name="code"></slot>
    </div>

    <div>
      <!-- result slot -->
      <slot name="result"></slot>
    </div>
  </div>

</template>

<script>
export default {
  name: 'DemoCard',
  props: {
    title: {
      String,
      default: "write title"
    }
  },

}
</script>

<style scoped>
.card {
  border: 1px solid;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}
.demoBlock {
  display: block;
  width: fit-content;
  text-align: left;
  /* float: left; */
  margin: 10em auto;
  padding: 2%;
}
</style>