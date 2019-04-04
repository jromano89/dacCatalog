<template>
  <div>
    <nav class="navbar navbar-dark blue">
      <a class="navbar-brand" href="#">
        <img src="/static/docusign-icon.png" height="25">
        DocuSign Agreement Cloud Catalog
      </a>
    </nav>
    <div class="container-fluid">
      <div class="spacing">
        <!-- the search bar form -->
        <form v-on:submit="getfilteredData">
          <div class="form-row">
            <div class="col-lg">
              <input
                type="text"
                class="form-control"
                placeholder="Search Demo Content"
                v-model="search"
                v-on:keyup="getfilteredData"
              >
            </div>
          </div>
        </form>
        <!-- check boxes -->
        <div id="checkboxes" class="spacing">
          <div
            v-for="(tag,index) in tags"
            :key="index"
            class="form-check form-check-inline check-button"
            :class="`${tag.value}`"
          >
            <input
              class="form-check-input"
              type="checkbox"
              v-model="tag.checked"
              v-on:change="getfilteredData"
            >
            <label class="form-check-label">{{ tag.value }}</label>
          </div>
        </div>
      </div>
      <!-- end of checkboxes -->
      <div class="card-columns">
        <!-- iterate data -->
        <item-card v-for="(item, index) in filteredData" :key="index" :item="item"></item-card>
      </div>
    </div>
    <div class="footer">
  <div class="text-center">
    <small>North America Solution Engineering</small>
  </div>
</div>
  </div>
</template>

<script>
import ItemCard from "./ItemCard";
import data from "../data/data";

export default {
  name: "SearchPage",
  components: {
    "item-card": ItemCard
  },
  computed: {
    selectedFilters: function() {
      let filters = [];
      let checkedFiters = this.tags.filter(obj => obj.checked);
      checkedFiters.forEach(element => {
        filters.push(element.value);
      });
      return filters;
    }
  },
  data() {
    return {
      filteredData: [],
      search: "",
      tags: [
        {
          checked: false,
          value: "Prepare"
        },
        {
          checked: false,
          value: "Sign"
        },
        {
          checked: false,
          value: "Act"
        },
        {
          checked: false,
          value: "Manage"
        },
        {
          checked: false,
          value: "Integrate"
        },
        {
          checked: false,
          value: "Industry"
        }
      ]
    };
  },
  methods: {
    getfilteredData: function() {
      this.filteredData = data;
      let filteredDataByfilters = [];
      let filteredDataBySearch = [];
      // first check if filters were selected
      if (this.selectedFilters.length > 0) {
        filteredDataByfilters = this.filteredData.filter(obj =>
          this.selectedFilters.every(val => obj.tag[val] != null)
        );
        this.filteredData = filteredDataByfilters;
      }
      // then filter according to keyword, for now this only affects the name attribute of each data
      if (this.search !== "") {
        filteredDataBySearch = this.filteredData.filter(
          obj =>
            Object.values(obj.tag)
              .toString()
              .toLowerCase()
              .indexOf(this.search.toLowerCase()) >= 0
        );
        this.filteredData = filteredDataBySearch;
      }
    }
  },
  mounted() {
    this.getfilteredData();
  }
};
</script>
