<template>
  <div class="card p-2 m-2" style="min-width: 18rem;">
    <div class="text-center">
      <img v-if="item.dac == true" class="float-left" src="static/placeholder.png" width="25">
      <img :src="item.logo" width="100">
      <div class="card-body">
        <h5 class="card-title">{{ item.name}}</h5>
        <small class="card-text">{{ item.desc}}</small>
        <div class="mt-3">

          <a :href="item.link" v-if="item.link != null" target="_blank">
            <img class="mx-2" src="static/link-icon.png" width="30">
          </a>
          <a :href="item.script" v-if="item.script != null" target="_blank">
            <img class="mx-2" src="static/script-icon.png" width="30">
          </a>
          <a :href="item.clickthrough" v-if="item.clickthrough != null" target="_blank">
            <img class="mx-2" src="static/clickthrough-icon.png" width="30">
          </a>
          <a :href="item.video" v-if="item.video != null" target="_blank">
            <img class="mx-2" src="static/video-icon.png" width="30">
          </a>
        </div>
      </div>
      <div class="my-1">
        <span v-for="(value, key) in item.tag" :key="key" :class="`badge ${key}`">{{ value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // this component expects a prop of type object
    item: {
      type: Object,
      required: true
    }
  }
};
</script>

