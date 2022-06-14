<template>
	<div class="box">
		<span class="header--center">Movies</span>
		<div style="display: flex; flex-direction: row; justify-content: center; margin-right: 50px">
			<div v-for="(i,ix) in 5" :key="ix">
				<v-skeleton-loader
					type="card"
					v-if="loading"
				></v-skeleton-loader>
			</div>
		</div>
		<div>
			<v-sheet
				elevation="0"
				class="container"
			>
			<v-slide-group>
				<v-slide-item v-for="item, i in movies" :key="i" class="ma-5">
					<router-link to="/movie">
						<v-card @click="goTo(i+1)" color="#eeeeee" elevation="0" max-width="300px" style="width: 100%;border-radius: 15px">
							<v-img v-if="i === 0" src="@/assets/images/episode_4.webp" height="300px"></v-img>
							<v-img v-if="i === 1" src="@/assets/images/episode_5.jpg" height="300px"></v-img>
							<v-img v-if="i === 2" src="@/assets/images/episode_6.jpg" height="300px"></v-img>
							<v-img v-if="i === 3" src="@/assets/images/episode_1.jpg" height="300px"></v-img>
							<v-img v-if="i === 4" src="@/assets/images/episode_2.webp" height="300px"></v-img>
							<v-img v-if="i === 5" src="@/assets/images/episode_3.jpg" height="300px"></v-img>
							<v-card-text class="card--title">
								{{item.title}}
							</v-card-text>
							<v-col class="card--infos">
								<span class="card--infos--data">
									{{formatData(item.release_date)}}
								</span>
								<span class="card--infos--director">
									{{item.director}}
								</span>
							</v-col>
						</v-card>
					</router-link>

				</v-slide-item>
			</v-slide-group>
			</v-sheet>
		</div>
		<span class="header--center">Characters</span>
		<v-sheet
			elevation="0"
			class="container"
		>
			<v-slide-group @change="next(e)">
				<v-slide-item v-for="item, i in characters" :key="i" class="ma-5">
					<v-card color="#eeeeee" elevation="0" style="width: 300px; border-radius: 15px">
						<v-card-text class="card--title">
							{{item.name}}
						</v-card-text>
						<v-col class="card--infos">
							<span class="card--infos--data">
								{{item.birth_year}}
							</span>
							<span class="card--infos--director">
								{{item.height/100}}
							</span>
						</v-col>

					</v-card>
				</v-slide-item>
			</v-slide-group>
		</v-sheet>
	</div>
</template>
<script>
  // Import Swiper styles
import {mapActions, mapMutations, mapState} from 'vuex'
import moment from 'moment'

export default {

  data () {
    return {
      films: '',
			loading: false,
      slide: 1,
			model: 0,
			movie1: [
				{id: 1, src: "@/assets/images/episode_1.jpg"},	
				{id: 2, src: "@/assets/images/episode_2.webp"},	
				{id: 3, src: "@/assets/images/episode_3.jpg"},	
				{id: 4, src: "@/assets/images/episode_4.webp"},	
				{id: 5, src: "@/assets/images/episode_5.jpg"},	
				{id: 6, src: "@/assets/images/episode_6.jpg"},	
			],
			slider: [
        "red", 
        "green", 
        "orange", 
        "blue", 
        "pink", 
        "purple", 
      ]
    }
  },
  created () {
    this.fecthMovies()
		this.getPeople()
		console.log('rhis', this.movie1[1].src)
  },
	computed: {
		...mapState(['movies', 'characters']),
		columns() {
      if (this.$vuetify.breakpoint.xl) {
        return 4;
      }

      if (this.$vuetify.breakpoint.lg) {
        return 3;
      }

      if (this.$vuetify.breakpoint.md) {
        return 2;
      }

      return 1;
    }
	},
  methods: {
		formatData (value) {
			return moment(value).format('DD/MM/YYYY')
		},
		...mapActions(['getMovies', 'getCharacters']),
		...mapMutations({setID: 'SET_CURRENT_ID'}),
    async fecthMovies () {
			this.loading = true
			try {
				await this.getMovies()
				this.loading = false
			} catch (error) {
				console.error(error)
			}
    },
		async getPeople () {
			try {
				// await this.getCharacters({page: 2, size: 20})
				await this.getCharacters()
			} catch (error) {
				console.error(error)
			}
		},
		goTo (id) {
			this.setID(id)
		},
		next(e) {
			console.log('e',e)
		}
  }
}
</script>
<style lang="scss">

	.container {
		max-width: 66%;
	}
	.header--center {
		padding: 20px 50px;
		font-size: 2rem;
		display: grid;
		grid-template-columns: 1fr max-content 1fr;
		grid-column-gap: 1.2rem;
		align-items: center;
	}

	.header--center::before,
	.header--center::after {
		content: "";
		display: block;
		height: 1px;
		background-color: black;
	}
	.box {
		display: flex;
		justify-content: center;
		flex-direction: column;
	}

	.card {
		&--title {
			background: rgb(255, 196, 0);
			color: #fff !important;
			text-decoration: none !important;
			padding: 5px;
		}
		&--infos {
			background: #fff;
			border: 2px solid #e5e5e5;
			border-top: none;
			font-weight: 400;
			height: 100px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
		}
	}

</style>