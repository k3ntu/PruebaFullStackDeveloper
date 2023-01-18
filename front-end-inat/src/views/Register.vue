<template>
	<div>
		<p>
			Crear nuevo usuario
		</p>

		<br>
		<div>
			Username: <input type="text" v-model="user.username">
			<br>
			Email: <input type="text" v-model="user.email">
			<br>
			Password: <input type="password" v-model="user.password">
			<br>
			<button @click="doRegister">
				Enviar
			</button>
		</div>

	</div>
</template>

<script>
export default {
	name: 'Register',
	data: () => ({
		user: {
			username: '',
			email: '',
			password: '',
		}
	}),
	methods: {
		doRegister () {
			
		}
	}
}
</script>

<style lang="scss" scoped>

</style>