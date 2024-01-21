import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Empresas from '../views/Empresas/Empresas.vue'
import Calendario from '../views/Calendario/Calendario.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			name:'home',
			path: '/',
			component: Home

		},
		{
			path: '/empresas',
			component: Empresas
		},
		{
			name: 'calendario',
			path: '/calendario',
			component: Calendario
		},
		{
			name: 'login',
			path: '/login',
			component: Login
		},
		{
			name: 'register',
			path: '/register',
			component: Register
		},
		{
			path: '/impuestos',
			component: () => import('../views/Impuestos.vue')
		},
	],
})

router.beforeEach(async (to, from, next) => {
	const user = localStorage.getItem('user')
    const token = localStorage.getItem('user_token')

	// if (user && token && to.name === 'login') {
	// if (user && token) {
	// 	//validar si el token no se ha vencido
	// 	const payload = JSON.parse(atob(token.split('.')[1]));
	// 	const expirationTimeInSeconds = payload.exp;
	// 	const currentTimeInSeconds = Math.floor(Date.now() / 1000);

	// 	// console.log(expirationTimeInSeconds/3600)

	// 	if (expirationTimeInSeconds < currentTimeInSeconds) {
	// 		// El token ha expirado
	// 		console.log('El token ha expirado');
	// 		next({name: "login"})
	// 	}
	// 	// } else {
	// 	// 	// El token aún es válido
	// 	// 	console.log('El token es válido');
	// 	// 	next({name: "home"})
	// 	// }
	// // }else if(!user && !token){
	// // 	next({name: "login"})
	// // }

	if (!user && !token && to.name !== 'login' && to.name !== 'register') {
	  next({name: "login"})
	}
	if (user && token && to.name === 'login') {
	  next({name: "home"})
	}
	else next()
  })

export default router