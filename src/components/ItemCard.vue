<template>
  <div class="card p-3">
    <div class="text-center">
      <img v-if="item.dac == true" class="float-left" src="static/placeholder.png" width="25">
      <img v-if="item.dac == true" class="float-right" src="static/dac-icon.png" width="25">
      <img :src="item.logo" width="100">
      <div class="card-body">
        <h5 class="card-title">{{ item.name}}</h5>
        <small class="card-text">{{ item.desc}}</small>
        <div>
          <a :href="item.script" v-if="item.script != null" target="_blank">
            <img class="spacing" src="static/documentation-icon.png" width="30">
          </a>
          <a :href="item.invision" v-if="item.invision != null" target="_blank">
            <img class="spacing" src="static/invision-icon.png" width="30">
          </a>
          <a :href="item.video" v-if="item.video != null" target="_blank">
            <img class="spacing" src="static/video-icon.png" width="30">
          </a>
        </div>
      </div>
      <div>
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

