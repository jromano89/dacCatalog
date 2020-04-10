// initialize Vue application
var fullData;
var app = new Vue({
    el: "#app",
    // load item-card component
    components: {
        'item-card': window.httpVueLoader('./ItemCard.vue')
    },

    // create global variables
    data() {
        return {
            filteredData: [],
            search: '',
            labels: [
                {
                    value: 'Prepare',
                },
                {
                    value: 'Sign',
                },
                {
                    value: 'Act',
                },
                {
                    value: 'Manage',
                },
                {
                    value: 'Integrate',
                },
                {
                    value: 'Industry',
                },
            ],
        };
    },
    methods: {
        // search method 
        getfilteredData() {
            // reset to full data set
            this.filteredData = fullData;
            let filteredDataBySearch = [];

            //  filter according to keyword
            if (this.search !== '') {
                this.setQueryStringParameter('search', this.search);
                filteredDataBySearch = this.filteredData.filter((obj) => {
                    let tileString =
                        Object.values(obj.tag).toString() + obj.name;
                    tileString = tileString.toLowerCase();
                    return tileString.indexOf(this.search.toLowerCase()) >= 0;
                });
                this.filteredData = filteredDataBySearch;
            } else {
                window.history.replaceState({}, "", window.location.pathname);
            }
        },
        // unused sort method
        sortData() {
            this.filteredData = this.filteredData.sort((a, b) => {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
        },
    },

    mounted() {
        // get search param from url
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get('search');
        if (searchParam) {
            this.search = searchParam;
        } else {
            this.search = '';
        }
        // import data from json
        fetch('./catalog.json')
            .then(response => response.json())
            .then(obj => {
                fullData = obj;
                // invoke search method since components are bound to filtered data set
                this.getfilteredData();
            });
        
        // function for updating url param
        this.setQueryStringParameter = function (name, value) {
            const params = new URLSearchParams(window.location.search);
            params.set(name, value);
            window.history.replaceState({}, "", decodeURIComponent(`${window.location.pathname}?${params}`));
        }

    },
});



