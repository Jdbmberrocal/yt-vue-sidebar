<template>
    <main id="Home-page">
      <div class="clearfix my-3">
        <h class="float-start">Impuestos</h>
        <button type="button" class="btn btn-sm btn-primary float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">
          <span class="material-icons"> add </span>
        </button>
      </div>
      
      <div class="card">
        <div class="card-body">
          <div class="table-responsive" >
            <div class="autoscroll">
            <table class="table table-fixed">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Descripción</th>
                  <th scope="col">Código</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody v-if="loader">
                <Loader />
              </tbody>
              <tbody v-else>
                <tr v-for="imp in data">
                  <th scope="row"> {{ imp.name }}</th>
                  <td>{{ imp.description }}</td>
                  <td>{{ imp.code }}</td>
                  <td>
                    <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                        <button type="button" disabled class="btn btn-sm btn-info"><span class="material-icons">edit</span></button>
                        <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#ModalImpuestos"><span class="material-icons">list</span></button>
                        <button type="button" disabled class="btn btn-sm btn-danger"><span class="material-icons">delete</span></button>
                    </div>
                  </td>
                </tr>

              </tbody>
            </table>
        </div>
          </div>
        </div>
      </div>
    </main>
  
    <!-- Modal -->
  <div v-if="modal" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Crear nuevo Impuesto</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
         <form action="">
            <div class="row">
                <div class="col-md-4">
                    <div class="mb-3">
                        <label for="name" class="form-label">Nombre</label>
                        <input type="text" class="form-control form-control-sm" v-model="impuesto.name" >
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3">
                        <label for="code" class="form-label">Código</label>
                        <input type="text" class="form-control form-control-sm" v-model="impuesto.code">
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="mb-3">
                        <label for="description" class="form-label">Descripción</label>
                        <input type="text" class="form-control form-control-sm" v-model="impuesto.description">
                    </div>
                </div>

            </div>
            <button type="button" v-on:click="save()" class="btn btn-primary">Guardar Impuesto</button>
         </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          
        </div>
      </div>
    </div>
  </div>



  </template>
  <script>
  // import Select2 from 'vue3-select2-component';
  import { toast } from 'vue3-toastify';

  import { useVuelidate } from '@vuelidate/core'
  import { required, email } from '@vuelidate/validators'
  import 'vue3-toastify/dist/index.css';

  import dayjs from 'dayjs'
  import 'dayjs/locale/es'
  import customParseFormat from  'dayjs/plugin/customParseFormat'

  import Loader from '../components/Loader.vue';

  export default {
    name: 'Impuestos',
    created () {
      document.title = "Impuestos";
    },
    setup () {
      return { v$: useVuelidate() }
    },
    components:{
        Loader
    },
    data() {
        return {
            
            impuesto: {
                name: "",
                code: "",
                description: ""
                
            },
            token: '',
            data:'',
            modal: true,
  
            loader: false,
        }
    },
    
    methods: {
        async save() {
            
            try {
                
                    let options = {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json; charset=utf-8",
                            "Accept": "application/json",
                            "Authorization": 'Bearer '+this.token
                        },
                        body: JSON.stringify(this.impuesto)
                    },
                        
                    res = await fetch(window.env.API_URL+"/impuestos/store", options);
                    const { data, errors, message, success } = await res.json();

                    if (errors != undefined) {
                        for (let error in errors){
                            let value = errors[error];
                            toast.warning(value, {
                                autoClose: 3000,
                            }); 
                        }
                    }

                    if (success == true) {
                        //limpiar campos

                        this.getImpuestos()

                        toast.success("Register created", {
                            autoClose: 3000,
                        }); 
                    }
                
            } catch (err) {
              toast.warning("Error: "+err, {
                autoClose: 3000,
              });
            }

        },

        async getImpuestos() {
            try {
                let options = {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=utf-8",
                        "Accept": "application/json",
                        "Authorization": 'Bearer '+this.token
                    }
                }
                let res = await fetch(window.env.API_URL+"/impuestos", options);
                const{ success, message, data } = await res.json();
                if(success)
                {
                    this.data = data 
                    this.loader = false
                }

            } catch (err) {

                toast.warning("Error: "+err, {
                        autoClose: 3000,
                    });
            }
        },



        // async Edit(id) {
        //     try {
        //         let options = {
        //             method: "GET",
        //             headers: {
        //                 "Content-type": "application/json; charset=utf-8",
        //                 "Accept": "application/json",
        //                 "Authorization": 'Bearer '+this.token
        //             }
        //         }
        //         let res = await fetch(window.env.API_URL+"/rule/detail/"+id, options);
        //         const{ errors, success, message, data } = await res.json();
        //             if(success)
        //             {
        //                 this.rule = data 
        //             }
                    

        //     } catch (err) {

        //         console.log(err)
        //     }
        // },

        // ConfirmDelete(id)
        // {
        //     this.$swal.fire({
        //     title: "Are you sure?",
        //     showCancelButton: true,
        //     confirmButtonColor: "#3085d6",
        //     cancelButtonColor: "#d33",
        //     confirmButtonText: "Yes, delete it!"
        //     }).then((result) => {
        //         if (result.isConfirmed) {
        //             this.Delete(id)
        //         }
        //     });
        // },

        // async Delete(id) {
            
        //     try {
        //         let options = {
        //             method: "DELETE",
        //             headers: {
        //                 "Content-type": "application/json; charset=utf-8",
        //                 "Accept": "application/json",
        //                 "Authorization": 'Bearer '+this.token
        //             },
        //             body: JSON.stringify({
        //                 id:id
        //             })
        //         }
        //         let res = await fetch(window.env.API_URL+"/rule/delete", options);
        //         const{ errors, success, message, data } = await res.json();
        //             if(success)
        //             {
        //                 toast.warning("Registro eliminado", {
        //                     autoClose: 1000,
        //                 });
        //                 this.getRules()
        //             }
        //     } catch (err) {

        //         console.log(err)
        //     }
        // }


      formato_fecha: function (fecha) {
        if (!fecha) return ''
        dayjs.extend(customParseFormat)
        return dayjs(fecha).format('DD MMMM YYYY', 'es')
      }
    
    },
    
    mounted() {

        this.token = localStorage.getItem('user_token')
        this.loader = true

        this.getImpuestos()

    }

  }
  </script>

<style lang="scss">
.autoscroll{
  overflow-y: scroll;
    overflow-x: scroll;
    height: fit-content;
    max-height: 66.4vh;
}

.table thead{
    position: sticky; 
    top: 0px;
}
</style>