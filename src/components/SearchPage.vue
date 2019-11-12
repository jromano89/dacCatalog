<template>
  <div>
    <!-- navbar -->
    <nav class="navbar navbar-dark blue">
      <div class="navbar-brand d-flex flex-row" href="#">
        <img class="ds-logo" src="static/docusign-logo.png" height="26px" />
        <div class="ds-logo-text">Agreement Cloud Catalog</div>
      </div>
      <img class="float-right" src="static/dac-icon.png" height="26px" />
    </nav>
    <div class="container-fluid">
      <div class="px-2" style="background-image: url(static/bg-search.svg)">
        <div class="px-3 pt-3 pb-4">
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
                  @keydown.enter.prevent
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <!-- iterate data into item-cards -->
      <div class="card-deck px-3 py-2">
        <item-card v-for="(item, index) in filteredData" :key="index" :item="item"></item-card>
      </div>
    </div>
    <!-- footer -->
    <div class="footer">
      <div class="text-center mt-1">
        <small>©2019 Solution Architecture</small>
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
  data() {
    return {
      filteredData: [],
      search: "",
      labels: [
        {
          value: "Prepare"
        },
        {
          value: "Sign"
        },
        {
          value: "Act"
        },
        {
          value: "Manage"
        },
        {
          value: "Integrate"
        },
        {
          value: "Industry"
        }
      ]
    };
  },
  methods: {
    getfilteredData: function() {
      this.filteredData = data;
      let filteredDataBySearch = [];
      //  filter according to keyword
      if (this.search !== "") {
        this.$router.push({ path: "/", query: { search: this.search } });
        filteredDataBySearch = this.filteredData.filter(obj => {
          let tileString =
            Object.values(obj.tag).toString() + obj.desc + obj.name;
          tileString = tileString.toLowerCase();
          return tileString.indexOf(this.search.toLowerCase()) >= 0;
        });
        this.filteredData = filteredDataBySearch;
      } else {
        this.$router.push({ path: "/" });
      }
    },

    sortData: function() {
      this.filteredData = this.filteredData.sort(function(a, b) {
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
    // Read URL parameter
    let searchQuery = this.$route.query.search
    if (searchQuery != null) {
      this.search = searchQuery;
    }
    this.getfilteredData();
  }
};
</script>
