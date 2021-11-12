Vue.component('vue-multiselect', window.VueMultiselect.default)

const app = new Vue({
    el: "#vue-app",
	components: { Multiselect: window.VueMultiselect.default },
    data() {
        return {
			somethingIsBrokenMessage: null,
			somethingIsBrokenSelectedArea: null,
			newRequestMessage: null,
			newRequestSelectedArea: null,
			newEmail: null,
			newEmailDomain: null,	
			newEmailError: true,
			newEmailCreated: false,
			newEmailPassword: null,
            catalogData: [],
			commonSearchesData: [],
            weeklyTip: null,
			weeklyTipDismissedId: null,
            filteredData: [],
            search: "",
			timerSearch: null,
            labels: [
                { value: "Prepare" },
                { value: "Sign" },
                { value: "Act" },
                { value: "Manage" },
                { value: "Integrate" },
                { value: "Industry" },
            ],
            sorts: [
                {value: "CLM / Gen / Negotiate / Insight"},
                {value: "eSign"},
                {value: "Admin"},
                {value: "Partners"},
                {value: "Verticals"},
            ],
            domains: [
                {value: "tallydemo.com"},
                {value: "clmdemo.com"},
                {value: "esigndemo.com"}
            ]
        };
    },
    methods: {
		showSomethingIsBrokenModal(){
			this.somethingIsBrokenMessage = "";
			this.somethingIsBrokenSelectedArea = null;
			$('#somethingIsBrokenModal').modal('show');
		},
		showNewRequestModal(){
			this.newRequestMessage = "";
			this.newRequestSelectedArea = null;
			$('#newRequestModal').modal('show');
		},
		showNewEmailModal(){
			this.newEmailCreated = false;
			this.newEmailError = false;
			this.newEmail = "";
			this.newEmailDomain = null;
			$('#newEmailModal').modal('show');
		},
		validateSomethingIsBroken(){
			return this.somethingIsBrokenMessage != null && this.somethingIsBrokenMessage.trim() != "" && this.somethingIsBrokenSelectedArea != null;
		},
		validateNewRequest(){
			return this.newRequestMessage != null && this.newRequestMessage.trim() != "" && this.newRequestSelectedArea != null;
		},
		validateNewEmail(){
			return this.newEmail != null && this.newEmail.trim() != "" && this.newEmailDomain != null;
		},
		convertNameToEmail (){
			return this.newEmail.replace (" ", ".").replace (" ", ".").replace (" ", ".").replace (" ", ".").replace (" ", ".").replace (" ", ".").trim() + "@" + this.newEmailDomain.value;
		},
		getEmailLoginPage (){
			return "https://webmail." + this.newEmailDomain.value;
		},
		sendSomethingIsBroken(){
			fetch("https://templates.tallydemo.com/services/sendSomethingIsBrokenToSlack.php",
			{
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				method: "POST",
				body: JSON.stringify({area: this.somethingIsBrokenSelectedArea.value, message: this.somethingIsBrokenMessage.trim()})
			});
			$('#somethingIsBrokenModal').modal('hide');
		},
		sendNewRequest(){
			fetch("https://templates.tallydemo.com/services/sendNewRequestToSlack.php",
			{
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				method: "POST",
				body: JSON.stringify({area: this.newRequestSelectedArea.value, message: this.newRequestMessage.trim()})
			});
			$('#newRequestModal').modal('hide');
		},
		sendNewEmail(){
			this.newEmailCreated = false;
			this.newEmailError = false;
			fetch("https://templates.tallydemo.com/services/createDemoInbox.php",
			{
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				method: "POST",
				body: JSON.stringify({domain: this.newEmailDomain.value, name: this.newEmail.trim()})
			})
			.then((res) => res.text())
			.then((data) => {
				if (data == "error"){
					this.newEmailError = true;
				}
				else{
					this.newEmailCreated = true;
					this.newEmailPassword = data;
				}
			});
			$('#newRequestModal').modal('hide');
		},
		saveDismissed(){
			localStorage.setItem ("catalogTipDismissedId", this.weeklyTip.id);
			this.makeToast ("You won't see that particular tip anymore", "success");
		},
		loadDismissed(){
			this.weeklyTipDismissedId = localStorage.getItem ("catalogTipDismissedId");
		},
		showWeeklyTip(){
			return (this.weeklyTipDismissedId == null && this.weeklyTip != null && this.weeklyTip != undefined && this.weeklyTip.tip != null && this.weeklyTip.tip != "" && this.weeklyTipDismissedId != this.weeklyTip.id) 
			|| (this.weeklyTip != null && this.weeklyTipDismissedId != null && this.weeklyTipDismissedId != this.weeklyTip.id);
		},
		makeToast(txt, variantType, append = true) {
			this.toastCount++
			this.$bvToast.toast(txt, {
			  title: 'SE Catalog',
			  variant: variantType,
			  autoHideDelay: 2500,
			  appendToast: append,
			  solid: true
			})
		},
        searchCatalog() {
            if (this.search !== "") {
				if (this.timerSearch == null){
					this.timerSearch = setTimeout(() => this.saveSearchForStats (), 750);
				}
				else{
					clearTimeout(this.timerSearch);
					this.timerSearch = setTimeout(() => this.saveSearchForStats (), 750);
				}

                this.setQueryStringParameter("search", this.search);
                this.filteredData = this.catalogData.filter((obj) => {
                    let searchValue = this.search.replace(/\s+/g, '').toLowerCase();
                    let searchString =
                        Object.values(obj.tags).toString() + obj.name + obj.search;
                    searchString = searchString.replace(/\s+/g, '').toLowerCase();
                    return searchString.indexOf(searchValue) >= 0;
                });
            } else {
                this.filteredData = this.catalogData;
                window.history.replaceState({}, "", window.location.pathname);
            }

            $(document).ready(function() {
                let jumbotrons = $(".filterJumbotron");
                for (let jumbotron of jumbotrons) {
                    if (jumbotron.getElementsByClassName('card').length == 0) {
                        jumbotron.style.display = 'none'
                    } else {
                        jumbotron.style.display = 'block'
                    }
                }
            });
            
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
		saveSearchForStats(){
            if (this.search !== "") {
				fetch("https://templates.tallydemo.com/services/addCatalogSearch.php",
				{
					method: "POST",
					body: JSON.stringify({s: this.search})
				});
			}
		},
		loadMostCommonSearches(){
			fetch("https://templates.tallydemo.com/services/getCommonSearches.php")
				.then((res) => res.json())
				.then((data) => {
					this.commonSearchesData = data;
				});
		},
		placeholderForSearch(){
			if (this.commonSearchesData.length > 0){
				return "Search by product, partner, or industry. Most common searches: " + this.commonSearchesData[0].search_text + ", " + this.commonSearchesData[1].search_text + ", " + this.commonSearchesData[2].search_text + " and " + this.commonSearchesData[3].search_text;
			}
			else{
				return "Search by product, partner, or industry.";
			}
		}
    },
    mounted() {
        fetch("./catalog.json?v3")
            .then((res) => res.json())
            .then((data) => {
                this.catalogData = data;
                this.initSearch();
                this.searchCatalog();
            });
        fetch("./tip.json?v4")
            .then((res) => res.json())
            .then((data) => {
                this.weeklyTip = data;
            });
		this.loadDismissed();
		this.loadMostCommonSearches();
    },
});
