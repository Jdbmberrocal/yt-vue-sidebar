<template>
    <main id="Home-page">
      <div class="clearfix my-3">
        <h class="float-start">Empresas</h>
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
                  <th scope="col">Nit</th>
                  <th scope="col">Razón Social</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Correo</th>
                  <th scope="col">Teleono</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody v-if="loader">
                <Loader />
              </tbody>
              <tbody v-else>
                <tr v-for="emp in data">
                  <th scope="row"> {{ emp.nit }} - {{ emp.dv }}</th>
                  <td  data-bs-toggle="modal" data-bs-target="#exampleModal">{{ emp.razon_social }}</td>
                  <td> {{ emp.tipo_empresa.name }}</td>
                  <td>{{ emp.correo }}</td>
                  <td>{{ emp.telefono }}</td>
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
          <h1 class="modal-title fs-5" id="exampleModalLabel">Crear nueva Empresa - {{ empresa.nit }} {{ empresa.razon_social }}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
         <form action="">
            <div class="row">
                <div class="col-md-2">
                    <div class="mb-3">
                        <label for="nit" class="form-label">Nit</label>
                        <input type="text" class="form-control form-control-sm" v-model="empresa.nit" v-on:change="getEmpresasColombianasNit(this.empresa.nit)" id="nit">
                    </div>
                </div>
                <div class="col-md-1">
                    <div class="mb-3">
                        <label for="dv" class="form-label">DV</label>
                        <input type="text" class="form-control form-control-sm" v-model="empresa.dv" id="dv">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-3">
                        <label for="razon_social" class="form-label">Razon Social</label>
                        <input type="text" class="form-control form-control-sm" v-model="empresa.razon_social" id="razon_social">
                    </div>
                </div>
                <div class="col-md-3">
                  <label for="razon_social" class="form-label">Tipo de documento</label>
                  <select class="form-select form-select-sm" v-model="empresa.tipo_documento_id">
                    <option selected>Selecciona una opcion</option>
                    <option v-for="option in tipo_documentos" :value="option.id">
                      {{ option.name }}
                    </option>

                  </select>
                </div>

                <div class="col-md-2">
                  <label for="razon_social " class="form-label">Paises</label>
                  <select class="form-select form-select-sm" v-model="empresa.pais_id">
                    <option selected>Selecciona una opcion</option>
                    <option v-for="option in paises" :value="option.id">
                      {{ option.name }}
                    </option>

                  </select>
                </div>
                <div class="col-md-3">
                  <label for="razon_social " class="form-label">Tipo de empresa</label>
                  <select class="form-select form-select-sm" v-model="empresa.tipo_empresa_id">
                    <option selected>Selecciona una opcion</option>
                    <option v-for="option in tipo_empresas" :value="option.id">
                      {{ option.name }}
                    </option>

                  </select>
                </div>
                <div class="col-md-3">
                  <label for="razon_social " class="form-label">Régimen</label>
                  <select class="form-select form-select-sm" v-model="empresa.tipo_regimen_id">
                    <option selected>Selecciona una opcion</option>
                    <option v-for="option in regimenes" :value="option.id">
                      {{ option.name }}
                    </option>

                  </select>
                </div>
                <div class="col-md-3">
                  <label for="razon_social " class="form-label">Respon. tributaria</label>
                  <select class="form-select form-select-sm" v-model="empresa.responsabilidad_tributaria_id">
                    <option selected>Selecciona una opcion</option>
                    <option v-for="option in responsabilidades" :value="option.id">
                      {{ option.name }}
                    </option>

                  </select>
                </div>
                <div class="col-md-3">
                  <label for="razon_social " class="form-label">Departamentos</label>
                  <select class="form-select form-select-sm" v-on:change="getMunicipios(this.empresa.departamento_id)" v-model="empresa.departamento_id">
                    <option selected>Selecciona una opcion</option>
                    <option v-for="option in departamentos" :value="option.id">
                      {{ option.name }}
                    </option>

                  </select>
                </div>
                <div class="col-md-3">
                  <label for="razon_social " class="form-label">Municipios</label>
                  <select class="form-select form-select-sm" v-model="empresa.municipio_id">
                    <option selected>Selecciona una opcion</option>
                    <option v-for="option in municipios" :value="option.id">
                      {{ option.name }}
                    </option>

                  </select>
                </div>
                <div class="col-md-3">
                    <div class="mb-3">
                        <label for="registro_comercial" class="form-label">Registro Comercial</label>
                        <input type="text" class="form-control form-control-sm" v-model="empresa.registro_comercial" id="registro_comercial">
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3">
                        <label for="direccion" class="form-label">Dirección</label>
                        <input type="text" class="form-control form-control-sm" v-model="empresa.direccion" id="direccion">
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3">
                        <label for="correo" class="form-label">Correo</label>
                        <input type="email" class="form-control form-control-sm" v-model="empresa.correo" id="correo">
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3">
                        <label for="telefono" class="form-label">Celular</label>
                        <input type="text" class="form-control form-control-sm" v-model="empresa.telefono" id="telefono">
                    </div>
                </div>
                
            </div>
            <button type="button" v-on:click="save()" class="btn btn-primary">Guardar empresa</button>
         </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          
        </div>
      </div>
    </div>
  </div>


  <!-- Modal -->
<div class="modal fade" id="ModalImpuestos" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Listado de impuestos</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
            
            <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="impuesto_id" value="1">
                <label class="form-check-label" for="flexCheckDefault">
                    RENTA GRANDES CONTRIBUYENTES
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="impuesto_id" value="2">
                <label class="form-check-label" for="flexCheckDefault">
                    RENTA PERSONAS JURÍDICAS
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="impuesto_id" value="3">
                <label class="form-check-label" for="flexCheckDefault">
                    RENTA PERSONAS NATURALES
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="impuesto_id" value="4">
                <label class="form-check-label" for="flexCheckDefault">
                    ACTIVOS EN EL EXTERIOR - Declaración anual
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="impuesto_id" value="5">
                <label class="form-check-label" for="flexCheckDefault">
                    IVA BIMESTRAL
                </label>
            </div>

        </form>
        <pre>{{ impuesto_id }}</pre>
      </div>
      <!-- <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div> -->
    </div>
  </div>
</div>

  
  </template>
  <script>
  // import Select2 from 'vue3-select2-component';
  import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

  import Loader from '../../components/Loader.vue';

  export default {
    name: 'Empresas',
    created () {
      document.title = "Empresas";
    },
    components:{
        Loader
    },
    data() {
        return {
            
            empresa: {

                nit: "",
                dv: "",
                razon_social: "",
                tipo_documento_id: "",
                pais_id: "",
                user_id: "",
                tipo_empresa_id: "",
                tipo_regimen_id: "",
                responsabilidad_tributaria_id: "",
                municipio_id: "",
                departamento_id: "",
                registro_comercial: "",
                direccion: "",
                correo: "",
                telefono: "",
            },
            impuesto_id:[],
            token: '',
            data:'',
            modal: true,
            tipo_documentos:'',
            paises:'',
            empresas_colombia:'',
            tipo_empresas:'',
            regimenes:'',
            responsabilidades:'',
            departamentos:'',
            municipios:'',
            loader: false,

        }
    },
    methods: {
        async save(id) {
            
            try {
                if(id)
                {
                    let options = {
                        method: "PUT",
                        headers: {
                            "Content-type": "application/json; charset=utf-8",
                            "Accept": "application/json",
                            "Authorization": 'Bearer '+this.token
                        },
                        body: JSON.stringify(this.empresa)
                    },
                        
                    res = await fetch(window.env.API_URL+"/empresas/update/"+id , options);
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

                        this.empresa.nit = ""
                        this.empresa.dv = ""
                        this.empresa.razon_social = ""
                        this.empresa.tipo_documento_id = ""
                        this.empresa.pais_id = ""
                        this.empresa.user_id = ""
                        this.empresa.tipo_empresa_id = ""
                        this.empresa.tipo_regimen_id = ""
                        this.empresa.responsabilidad_tributaria_id = ""
                        this.empresa.municipio_id = ""
                        this.empresa.departamento_id = "",
                        this.empresa.registro_comercial = ""
                        this.empresa.direccion = ""
                        this.empresa.correo = ""
                        this.empresa.telefono = ""

                        this.getEmpresas()
                        toast.success("Register updated", {
                            autoClose: 3000,
                        });
                    }
                }else{
                    let options = {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json; charset=utf-8",
                            "Accept": "application/json",
                            "Authorization": 'Bearer '+this.token
                        },
                        body: JSON.stringify(this.empresa)
                    },
                        
                    res = await fetch(window.env.API_URL+"/empresas/store", options);
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
                        this.empresa.nit = ""
                        this.empresa.dv = ""
                        this.empresa.razon_social = ""
                        this.empresa.tipo_documento_id = ""
                        this.empresa.pais_id = ""
                        this.empresa.user_id = ""
                        this.empresa.tipo_empresa_id = ""
                        this.empresa.tipo_regimen_id = ""
                        this.empresa.responsabilidad_tributaria_id = ""
                        this.empresa.municipio_id = ""
                        this.empresa.departamento_id = "",
                        this.empresa.registro_comercial = ""
                        this.empresa.direccion = ""
                        this.empresa.correo = ""
                        this.empresa.telefono = ""


                        this.getEmpresas()

                        toast.success("Register created", {
                            autoClose: 3000,
                        }); 
                    }
                }
            } catch (err) {
              toast.warning("Error: "+err, {
                autoClose: 3000,
              });
            }

        },

        async getEmpresas() {
            try {
                let options = {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=utf-8",
                        "Accept": "application/json",
                        "Authorization": 'Bearer '+this.token
                    }
                }
                let res = await fetch(window.env.API_URL+"/empresas", options);
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

        async getTipoDocumentos() {
            try {
                let options = {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=utf-8",
                        "Accept": "application/json",
                        "Authorization": 'Bearer '+this.token
                    }
                }
                let res = await fetch(window.env.API_URL+"/tipodocumentos", options);
                const{ success, message, data } = await res.json();
                if(success)
                {
                    this.tipo_documentos = data 
                }

            } catch (err) {

                toast.warning("Error: "+err, {
                        autoClose: 3000,
                    });
            }
        },

        async getTipoEmpresas() {
            try {
                let options = {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=utf-8",
                        "Accept": "application/json",
                        "Authorization": 'Bearer '+this.token
                    }
                }
                let res = await fetch(window.env.API_URL+"/tipo_empresas", options);
                const{ success, message, data } = await res.json();
                if(success)
                {
                    this.tipo_empresas = data 
                }

            } catch (err) {

                toast.warning("Error: "+err, {
                        autoClose: 3000,
                    });
            }
        },
        async getPaises() {
            try {
                let options = {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=utf-8",
                        "Accept": "application/json",
                        "Authorization": 'Bearer '+this.token
                    }
                }
                let res = await fetch(window.env.API_URL+"/paises", options);
                const{ success, message, data } = await res.json();
                if(success)
                {
                    this.paises = data 
                }

            } catch (err) {

                toast.warning("Error: "+err, {
                        autoClose: 3000,
                    });
            }
        },

        async getRegimenes() {
            try {
                let options = {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=utf-8",
                        "Accept": "application/json",
                        "Authorization": 'Bearer '+this.token
                    }
                }
                let res = await fetch(window.env.API_URL+"/regimenes", options);
                const{ success, message, data } = await res.json();
                if(success)
                {
                    this.regimenes = data 
                }

            } catch (err) {

                toast.warning("Error: "+err, {
                        autoClose: 3000,
                    });
            }
        },

        async getResponsabilidades() {
            try {
                let options = {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=utf-8",
                        "Accept": "application/json",
                        "Authorization": 'Bearer '+this.token
                    }
                }
                let res = await fetch(window.env.API_URL+"/responsabilidades", options);
                const{ success, message, data } = await res.json();
                if(success)
                {
                    this.responsabilidades = data 
                }

            } catch (err) {

                toast.warning("Error: "+err, {
                        autoClose: 3000,
                    });
            }
        },

        async getDepartamentos() {
            try {
                let options = {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=utf-8",
                        "Accept": "application/json",
                        "Authorization": 'Bearer '+this.token
                    }
                }
                let res = await fetch(window.env.API_URL+"/departamentos", options);
                const{ success, message, data } = await res.json();
                if(success)
                {
                    this.departamentos = data
                    
                }

            } catch (err) {

                toast.warning("Error: "+err, {
                        autoClose: 3000,
                    });
            }
        },

        async getMunicipios(iddepartamento) {
            try {
                let options = {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=utf-8",
                        "Accept": "application/json",
                        "Authorization": 'Bearer '+this.token
                    }
                }
                let res = await fetch(window.env.API_URL+"/municipios/search/"+iddepartamento, options);
                const{ success, message, data } = await res.json();
                if(success)
                {
                    this.municipios = data 
                }

            } catch (err) {

                toast.warning("Error: "+err, {
                        autoClose: 3000,
                    });
            }
        },



        async getEmpresasColombianasNit(nit) {
            try {
                let options = {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=utf-8",
                        "Accept": "application/json",
                        "Authorization": 'Bearer '+this.token
                    }
                }
                let res = await fetch(window.env.API_URL+"/empresascolombianas/"+nit, options);
                const{ success, message, data } = await res.json();
                if(success)
                {
                    this.empresas_colombia = data 
                    this.empresa.razon_social = data[0].razon_social
                    this.empresa.direccion = data[0].direccion_comercial
                    this.empresa.correo = data[0].correo_comercial
                    this.empresa.dv = this.DigitoVerificacion(this.empresa.nit)
                    console.log(this.empresa.departamento_id.text)
                    
                }

            } catch (err) {

                toast.warning("Error: "+err, {
                        autoClose: 3000,
                    });
            }
        },

        DigitoVerificacion ( myNit )  {
            var vpri,
                x,
                y,
                z;
            
            // Se limpia el Nit
            myNit = myNit.replace ( /\s/g, "" ) ; // Espacios
            myNit = myNit.replace ( /,/g,  "" ) ; // Comas
            myNit = myNit.replace ( /\./g, "" ) ; // Puntos
            myNit = myNit.replace ( /-/g,  "" ) ; // Guiones
            
            // Se valida el nit
            if  ( isNaN ( myNit ) )  {
              console.log ("El nit/cédula '" + myNit + "' no es válido(a).") ;
              return "" ;
            };
            
            // Procedimiento
            vpri = new Array(16) ; 
            z = myNit.length ;

            vpri[1]  =  3 ;
            vpri[2]  =  7 ;
            vpri[3]  = 13 ; 
            vpri[4]  = 17 ;
            vpri[5]  = 19 ;
            vpri[6]  = 23 ;
            vpri[7]  = 29 ;
            vpri[8]  = 37 ;
            vpri[9]  = 41 ;
            vpri[10] = 43 ;
            vpri[11] = 47 ;  
            vpri[12] = 53 ;  
            vpri[13] = 59 ; 
            vpri[14] = 67 ; 
            vpri[15] = 71 ;

            x = 0 ;
            y = 0 ;
            for  ( var i = 0; i < z; i++ )  { 
              y = ( myNit.substr (i, 1 ) ) ;
              // console.log ( y + "x" + vpri[z-i] + ":" ) ;

              x += ( y * vpri [z-i] ) ;
              // console.log ( x ) ;    
            }

            y = x % 11 ;
            // console.log ( y ) ;

            return ( y > 1 ) ? 11 - y : y ;
        }

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
    },
    mounted() {

        this.token = localStorage.getItem('user_token')
        this.loader = true
        this.getEmpresas()

        this.getTipoDocumentos()
        this.getPaises()
        this.getTipoEmpresas()
        this.getRegimenes()
        this.getResponsabilidades()
        this.getDepartamentos()

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