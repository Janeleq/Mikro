<template>
    <NavigationBar />
    <div style="margin-left: 55px;">
        <br />
        <div class="container">
            <h3 class="margin-top: 5px;">Explore Latest Stock News</h3>

            <select name="stock_region" v-model="selected_topic" @change="created" class="mb-2">
                <option disabled value="">Please select one topic</option>
                <option v-for="topic of topics" :value="topic.value" :key="topic.id">
                    {{ topic.key }}
                </option>
            </select>
            <br />
            Sort: &nbsp;
            <button class="rounded-pill p-1" @click="changeStatus($event)" value="EARLIEST" style="font-size: small">
                Oldest
            </button>
            &nbsp;
            <button class="rounded-pill p-1" @click="changeStatus($event)" value="LATEST" style="font-size: small">
                Latest
            </button>
            <div id="content" class="row mt-3">

                <div v-for="article of articles" :key="article.id" class=" col-md-4 p-1 card mb-3"
                    style="font-size:12px">
                    <span v-if="article.banner_image">
                        <img class="card-img-top w-100" style="max-height: 300px; width: auto;"
                            :src="article.banner_image" />
                    </span>

                    <span v-else>
                        <img class="card-img-top w-100" style="height: auto; width: auto;"
                            src=../assets/ui/noArticle.jpg>
                    </span>

                    {{ article.time_published.substring(5, 7) + "/" + article.time_published.substring(7, 8) + "/" +
                article.time_published.substring(0, 4) + ", " + article.time_published.substring(10, 11) + "." +
                article.time_published.substring(11, 13) }}
                    <div class="card-body p-4">
                        <span v-for="topic of article.topics" :key="topic.id">
                            <span v-if="!(article.topics.indexOf(topic) == article.topics.length - 1)">
                                <span class="text-primary card-text mb-0">{{ topic.topic }} | </span>
                            </span>
                            <span v-else> <span class="text-primary card-text mb-0">{{ topic.topic }}</span> </span>
                        </span>
                        <h6 class="card-title">{{ article.title }}</h6>
                        <p class="card-text">{{ article.summary }}</p>
                        <div class="d-flex"><img class="rounded-circle flex-shrink-0 me-3 fit-cover" width="50"
                                height="50" src="../assets/ui/article_author.jpg" />
                            <div class="row">
                                <div class="col-sm-8">
                                    <span v-if="article.authors.length == 0">
                                        <p class="fw-bold mb-0">No identified author :(</p>
                                    </span>
                                    <span v-else>
                                        <p class="fw-bold mb-0">{{ article.authors[0] }}</p>
                                    </span>
                                </div>
                                <div class="col-sm-4 col-md-6">
                                    <a :href="article.url" target="__blank" style="font-size: 10px"
                                        class="btn btn-primary">Read More 🔍</a>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>


</template>
<style></style>

<script>
import NavigationBar from '../components/NavigationBar.vue';
import axios from 'axios'

export default
    {
        name: 'ArticlesPage',
        components: {
            NavigationBar

        },

        data() {
            return {
                articles: [],
                topics: [{ key: 'Technology', value: 'technology' },
                { key: 'Financial Markets', value: 'financial_markets' },
                { key: 'Energy & Transportation', value: 'energy_transportation' },
                { key: 'Finance', value: 'finance' },
                { key: 'Life Sciences', value: 'life_sciences' },
                { key: 'Manufacturing', value: 'manufacturing' },
                { key: 'Real Estate', value: 'real_estate' },
                { key: 'Retail & Wholesale', value: 'retail_wholesale' },
                ],
                selected_topic: '',
                selected_status: ''
            }
        },

        props:
        {

        },

        methods:
        {
            // 117L1A3KOH0DR96N. ALPHA VANTAGE API KEY
            created: function () {
                console.log("--- Loading News ---")
                console.log(this.selected_topic)

                let api_endpoint = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=${this.selected_topic}&limit=20&sort=${this.selected_status}&apikey=117L1A3KOH0DR96N`
                // Marketaux api key
                // let api_endpoint = `https://api.marketaux.com/v1/news/all?countries=${this.selected_stock_region}&filter_entities=true&limit=20&sort=${sort_status}api_token=HsxIoJ9mPcGwUbyCJGCfNgiyLyi92MEDXpaH10zN`
                axios.get(api_endpoint)
                    .then(response => {
                        console.log(response.data.feed)

                        this.articles = response.data.feed
                    })

                    .catch(error => {
                        console.log(error)
                    })
            },

            // Sort By Earliest or Latest Article Date
            changeStatus: function (e) {
                console.log("--- Change Display Status ---", e.target.value)
                this.selected_status = e.target.value
                this.created()
            }
        },

        beforeMount() {
            this.created()
        }
    }
</script>