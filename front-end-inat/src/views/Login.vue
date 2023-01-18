<template>
  <div>
		<img src="@/assets/images/logo.jpeg" alt="">
		<br>

		Username: <input type="text" v-model="form.username">
		<br>
		Password: <input type="text" v-model="form.password">
		<br><br>
		
		<button @click="doLogin">
			Login
		</button>
		<br>

		<button @click="doRegister">
			Crear nuevo usuario
		</button>
	</div>
</template>

<script>
export default {
  name: 'Login',
	data: () => ({
		form: {
			username: '',
			password: '',
		}
	}),
	methods: {
		doLogin () {
			let self = this;

			this.axios.post(
				'login',
				{
					username: self.form.username,
					password: self.form.password
				}
			).then((response) => {
				
			}).catch((error) => {
				console.error(error);
			});
		},
		doRegister() {
			this.$router.push('/register');
		}
	}
}
</script>

<style lang="scss" scoped>

</style>