<template>
  <div>
    <nav class="navbar navbar-dark blue">
      <a class="navbar-brand" href="#">
        <img src="static/docusign-icon.png" height="25">
        DocuSign Agreement Cloud Catalog
      </a>
    </nav>
    <div class="container-fluid">
      <div class="m-3">
        <!-- searchbar -->
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
        <div class="d-flex flex-row">
          <!-- checkboxes -->
          <div id="checkboxes" class="mx-3 mt-3">
            <div
              v-for="(checkbox,index) in checkboxes"
              :key="index"
              :class="`form-check form-check-inline border-radius check-button ${checkbox.value}`"
            >
              <input
                class="form-check-input"
                type="checkbox"
                v-model="checkbox.checked"
                v-on:change="getfilteredData"
              >
              <label class="form-check-label">{{ checkbox.value }}</label>
            </div>
          </div>
          <!-- sort button -->
          <span class="mr-3 mt-3 ml-auto">
          <button type="button" class="btn btn-sm btn-primary blue" v-on:click="sortData">Sort A-Z</button>
          </span>
        </div>
      </div>
      <div class="card-deck">
        <!-- iterate data into item-cards -->
        <item-card v-for="(item, index) in filteredData" :key="index" :item="item"></item-card>
      </div>
    </div>
    <!-- footer -->
    <div class="footer">
      <div class="text-center">
        <small>©2019 North America Solution Engineering</small>
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
      let checkedFiters = this.checkboxes.filter(obj => obj.checked);
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
      checkboxes: [
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
      // then filter according to keyword
      if (this.search !== "") {
        filteredDataBySearch = this.filteredData.filter(obj => {
          let tileString =
            Object.values(obj.tag).toString() + obj.desc + obj.name;
          tileString = tileString.toLowerCase();
          return tileString.indexOf(this.search.toLowerCase()) >= 0;
        });
        this.filteredData = filteredDataBySearch
      }
    },
    sortData: function() {
      this.filteredData = this.filteredData.sort(function(a, b){
        var nameA = a.name.toUpperCase(); 
        var nameB = b.name.toUpperCase(); 
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    }
  },
  mounted() {
    this.getfilteredData();
  }
};
</script>
