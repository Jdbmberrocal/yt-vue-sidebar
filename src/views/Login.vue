<template>
	<main id="about-page">
		<section class="vh-100">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col col-xl-10">
                <div class="card" style="border-radius: 1rem;">
                <div class="row g-0">
                    <div class="col-md-6 col-lg-5 d-none d-md-block">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                        alt="login form" class="img-fluid" style="border-radius: 1rem 0 0 1rem;" />
                    </div>
                    <div class="col-md-6 col-lg-7 d-flex align-items-center">
                    <div class="card-body p-4 p-lg-5 text-black">

                        <form>

                        <div class="d-flex align-items-center mb-3 pb-1">
                            <i class="fas fa-cubes fa-2x me-3" style="color: #ff6219;"></i>
                            <span class="h1 fw-bold mb-0">App Impuestos</span>
                        </div>

                        <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Ingresa a tu cuenta</h5>
                        <form>
                            <div class="form-outline mb-4">
                                <input type="email" id="email"  v-model="email" class="form-control form-control-lg" />
                                <label class="form-label" for="email">Correo</label>
                            </div>

                            <div class="form-outline mb-4">
                                <input type="password" id="password"  v-model="password" class="form-control form-control-lg" />
                                <label class="form-label" for="password">Contraseña</label>
                            </div>

                            <div class="pt-1 mb-4">
                                <button class="btn btn-dark btn-lg btn-block" :disabled="!email.length || !password.length" v-on:click="login" type="button">Login</button>
                            </div>
                        </form>

                        <a class="small text-muted" href="#!">Recuperar contraseña?</a>
                        <p class="mb-5 pb-lg-2" style="color: #393f81;">Todavía no tientes cuenta? <router-link to="/register" style="color: #393f81;">Registrate aquí</router-link></p>
                        <a href="#!" class="small text-muted">Terms of use.</a>
                        <a href="#!" class="small text-muted">Privacy policy</a>
                        </form>

                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
	</main>
</template>
<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  name: 'Login',
  metaInfo: {
    title: 'Mis Impuestos Colombia'
  },
  created () {
    document.title = "Iniciar Sesión";
  },
  components:{
        // Menu
    },
    data()
    {
        return{
            email: '',
            password: '',
        }
    },
    methods:{
        async login()
        {
            try {
            let options = {
              method: "POST",
              headers: {
                "Content-type": "application/json; charset=utf-8",
                "Accept": "application/json"
              },
              body: JSON.stringify({
                email: this.email,
                password: this.password
              })
            },
              res = await fetch(window.env.API_URL+"/auth/login", options);
              const { status, data, errors, accessToken, message, user } = await res.json();
            if(status)
            {
                
                localStorage.setItem('user', JSON.stringify(user))
                localStorage.setItem('user_token', accessToken)
                this.$router.push({name:'home'})
            }

            if(message == "Unauthorized")
            {
                toast.warning("Error: No proporcionó los datos correctos para iniciar sesión", {
                    autoClose: 3000,
                });
            }else if(message == "inactivo"){
                toast.warning("Error: Su cuenta está inactiva", {
                    autoClose: 3000,
                });
            }

            if (errors != undefined) {
                for (let error in errors){
                    let value = errors[error];
                    toast.warning(value, {
                        autoClose: 3000,
                    }); 
                }
            }


          } catch (er) {
            toast.warning("Error: "+er.message, {
                autoClose: 3000,
            });
          }

            
        }
    },
    mounted()
    {
        // toastr.info('Are you the 6 fingered man?')
        let user = localStorage.getItem('user_token')
        if(user)
        {
            this.$router.push({name:'home'})
        }

    },

}
</script>