<template>
	<div class="movies">
		<v-alert v-if="success" type="success">
      Publsh send!
    </v-alert>
		<span class="header--center">{{currentMovie.title}}</span>
		<v-sheet class="container-box">
			<div>
				<v-col>Descrição</v-col>
				<div>
					{{currentMovie.opening_crawl}}
				</div>
				<v-row class="d-flex justify-space-between my-5 mx-2">
					Data de lançamento
					<div>
						{{formatData(currentMovie.release_date)}}
					</div>
				</v-row>
				<v-row>
					<v-col>
						<div>Diretor</div>
						<div>
							{{currentMovie.director}}
						</div>
					</v-col>
					<v-col>
						<div>Produtor</div>
						<div>
							{{currentMovie.producer}}
						</div>
					</v-col>
				</v-row>
			</div>
			<v-row>
				<v-container class="image">
					<v-img v-if="currentId === 1" src="@/assets/images/episode_4.webp" class="image-box"></v-img>
					<v-img v-if="currentId === 2" src="@/assets/images/episode_5.jpg" class="image-box"></v-img>
					<v-img v-if="currentId === 3" src="@/assets/images/episode_6.jpg" class="image-box"></v-img>
					<v-img v-if="currentId === 4" src="@/assets/images/episode_1.jpg" class="image-box"></v-img>
					<v-img v-if="currentId === 5" src="@/assets/images/episode_2.webp" class="image-box"></v-img>
					<v-img v-if="currentId === 6" src="@/assets/images/episode_3.jpg" class="image-box"></v-img>
				</v-container>
			</v-row>

		</v-sheet>
		<span class="header--center">Characters of the movies</span>
			<v-sheet
			elevation="0"
			class="container"
		>
			<v-slide-group>
				<v-slide-item v-for="item, i in charactersMovie" :key="i" class="ma-5">
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
		<span class="header--center">Write a view</span>
		<v-sheet
		elevation="0"
		class="container--forms"
		>
			<v-row>
				<v-col>
					<label>Your name</label>
					<v-text-field
						solo
						flat
						class="input"
						height="40"
						v-model="message.name"
					></v-text-field>
				</v-col>
				<v-col>
					<label>Your e-mail</label>
					<v-text-field
						solo
						flat
						class="input"
						v-model="message.email"
					></v-text-field>
				</v-col>
			</v-row>
			<v-col style="padding: 0; margin:10px 0">
				<label>Review</label>
				<v-textarea flat solo class="input-textarea" height="84" v-model="message.mess"></v-textarea>
			</v-col>
		</v-sheet>
		<div class="" style="display: flex; justify-content: flex-end; margin: 20px 80px">
			<v-btn class="bs--gree" color="" @click="send">Publish</v-btn>
		</div>
	</div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import moment from 'moment'
export default {
	data () {
		return {
			message: {
				name: '',
				email: '',
				mess: ''
			},
			success: false
		}
	},
	async created () {
		await this.fetchMovieId()
	},
	computed: {
		...mapState(['currentId', 'currentMovie', 'charactersMovie']),
	},
	methods: {
		...mapActions(['goToMovie', 'sendMessage']),
		formatData (value) {
			return moment(value).format('DD/MM/YYYY')
		},
		async fetchMovieId () {
			let id = this.currentId
			await this.goToMovie(id)
		},
		async send () {
			let message = {
				name: this.message.name,
				email: this.message.email,
				mess: this.message.mess,
			}
			window.scrollTo( 0, 0 );
			this.success = true
			try {
				console.log('POST: ', message)
				this.sendMessage({message})
			} catch(error) {
				console.error(error)
			}
		}
	},
	watch: {
	}
}
</script>
<style lang="scss" scoped>

.movies {
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}

.image {
	width: 356px;
	&--box {
		border-radius: 10px !important;
		width: 300px !important;
		height: 400px !important;	
	}
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

	.container-box {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		margin: 20px 80px;
		height: 500px;
	}

	.container {
		&--forms {
			margin: 5px 80px;
		}
	}

	.input {
		border: 2px solid #e5e5e5;
		height: 52px;
	}

	.input-textarea {
		border: 2px solid #e5e5e5;
		height: 100px;
		margin: 0;
		padding: 0;
	}

	.v-text-field.v-text-field--solo .v-input__control {
		min-height: 40px;
		max-height: 40px !important;
	}
	.v-input__control {
		min-height: 40px;
		max-height: 40px !important;
	}

	.bs--gree {
		background: greenyellow !important;
	}
</style>