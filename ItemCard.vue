<template>
  <div class="card border-0 p-2 mx-auto m-sm-2">
    <div class="text-center">
      <img :src="item.logo" height="50px" />
      <div class="card-body p-0">
        <h5 class="card-title text-dark my-2"><span v-html="item.name"></span></h5>
        <div class="mx-2">
          
          <b-icon variant="secondary" class="h2 border border-secondary rounded p-1 mx-1" icon="link-45deg" v-if="item.demos" :id="`demos-${item.name}`" ></b-icon>
          <b-popover v-if="item.demos" :target="`demos-${item.name}`" title="Demos" html="true" triggers="hover" placement="bottomright">
            <a v-for="resource in item.demos" :key="resource.title" :href="resource.url" target="_blank">&#8226; {{resource.title}}<br /></a>
          </b-popover>

          <b-icon variant="secondary" class="h2 border border-secondary rounded p-1 mx-1" icon="file-earmark-text-fill" v-if="item.docs" :id="`docs-${item.name}`" ></b-icon>
          <b-popover v-if="item.docs" :target="`docs-${item.name}`" title="Documentation" html="true" triggers="hover" placement="bottomright">
            <a v-for="resource in item.docs" :key="resource.title" :href="resource.url" target="_blank">&#8226; {{resource.title}}<br /></a>
          </b-popover>
          
          <b-icon variant="secondary" class="h2 border border-secondary rounded p-1 mx-1" icon="play-circle-fill" v-if="item.videos" :id="`videos-${item.name}`" ></b-icon>
          <b-popover v-if="item.videos" :target="`videos-${item.name}`" title="Videos" html="true" triggers="hover" placement="bottomright">
            <a v-for="resource in item.videos" :key="resource.title" :href="resource.url" target="_blank">&#8226; {{resource.title}}<br /></a>
          </b-popover>

          <b-icon variant="secondary" class="h2 border border-secondary rounded p-1 mx-1" icon="info-circle-fill" v-if="item.resources" :id="`resources-${item.name}`" ></b-icon>
          <b-popover v-if="item.resources" :target="`resources-${item.name}`" title="Resources" html="true" triggers="hover" placement="bottomright">
            <a v-for="resource in item.resources" :key="resource.title" :href="resource.url" target="_blank">&#8226; {{resource.title}}<br /></a>
          </b-popover>

          <a :href="item.git" v-if="item.git != null" target="_blank">
            <b-icon variant="secondary" class="h2 border border-secondary rounded p-1 mx-1" icon="github"></b-icon>
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

