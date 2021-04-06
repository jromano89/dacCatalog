const app = new Vue({
    el: "#vue-app",
    data() {
        return {
            catalogData: [],
            filteredData: [],
            search: "",
            labels: [
                { value: "Prepare" },
                { value: "Sign" },
                { value: "Act" },
                { value: "Manage" },
                { value: "Integrate" },
                { value: "Industry" },
            ],
        };
    },
    methods: {
        searchCatalog() {
            if (this.search !== "") {
                this.setQueryStringParameter("search", this.search);
                this.filteredData = this.catalogData.filter((obj) => {
                    let searchString =
                        Object.values(obj.tags).toString() + obj.name + obj.search;
                    searchString = searchString.toLowerCase();
                    return searchString.indexOf(this.search.toLowerCase()) >= 0;
                });
            } else {
                this.filteredData = this.catalogData;
                window.history.replaceState({}, "", window.location.pathname);
            }
        },
        setQueryStringParameter(name, value) {
            var params = new URLSearchParams(window.location.search);
            params.set(name, value);
            window.history.replaceState(
                {},
                "",
                decodeURIComponent(`${window.location.pathname}?${params}`)
            );
        },
        initSearch() {
            var urlParams = new URLSearchParams(window.location.search);
            var searchParam = urlParams.get("search");
            if (searchParam) {
                this.search = searchParam;
            } else {
                this.search = "";
            }
        },
    },
    mounted() {
        fetch("./catalog.json?v2")
            .then((res) => res.json())
            .then((data) => {
                this.catalogData = data;
                this.initSearch();
                this.searchCatalog();
            });
    },
});
