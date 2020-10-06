<template>
  <div class="card p-2 mx-auto m-sm-2">
    <div class="text-center">
      <img :src="item.logo" width="100" />
      <div class="card-body px-0">
        <h5 class="card-title"><span v-html="item.name"></span></h5>
        <small class="card-text">{{ item.desc }}</small>
        <div class="mt-3">
          <a :href="item.link" v-if="item.link != null" target="_blank">
            <img class="mx-2" src="img/link-icon.png" width="30" />
          </a>
          <a :href="item.script" v-if="item.script != null" target="_blank">
            <img class="mx-2" src="img/script-icon.png" width="30" />
          </a>
          <a :href="item.invision" v-if="item.invision != null" target="_blank">
            <img class="mx-2" src="img/invision-icon.png" width="30" />
          </a>
          <img v-if="item.videos" :id="`${item.desc}`" class="mx-2" src="img/video-icon.png" width="30"/>
          <b-popover v-if="item.videos" :target="`${item.desc}`" title="Videos" html="true" triggers="hover">
            <a v-for="video in item.videos" :key="video.title" :href="video.url" target="_blank">&#8226; {{video.title}}<br /></a>
          </b-popover>
          <a :href="item.pdf" v-if="item.pdf != null" target="_blank">
            <img class="mx-2" src="img/pdf-icon.png" width="30" />
          </a>
          <a :href="item.ppt" v-if="item.ppt != null" target="_blank">
            <img class="mx-2" src="img/ppt-icon.png" width="30" />
          </a>
          <a :href="item.builder" v-if="item.builder != null" target="_blank">
            <img class="mx-2" src="img/builder-icon.png" width="30" />
          </a>
          <a :href="item.sf" v-if="item.sf != null" target="_blank">
            <img class="mx-2" src="img/sf-icon.png" width="30" />
          </a>
          <a :href="item.ace" v-if="item.ace != null" target="_blank">
            <img class="mx-2" src="img/ace-icon.png" width="30" />
          </a>
          <a :href="item.pkg" v-if="item.pkg != null" target="_blank">
            <img class="mx-2" src="img/pkg-icon.png" width="30" />
          </a>
          <a :href="item.folder" v-if="item.folder != null" target="_blank">
            <img class="mx-2" src="img/folder-icon.png" width="30" />
          </a>
        </div>
      </div>
      <div class="mb-0">
        <span
          v-for="(value, key) in item.tag"
          :key="key"
          :class="`badge ${key}`"
          >{{ value }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: {
    // this component expects a prop of type object
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

