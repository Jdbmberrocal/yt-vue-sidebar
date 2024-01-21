<template>
    <main id="Home-page">
      <div class="clearfix my-3">
        <h3 class="float-start">Calendario</h3>
        <button type="button" class="btn btn-sm btn-primary float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">
          <span class="material-icons"> add </span>
        </button>
      </div>
      
      <div class="card">
        <div class="card-body">
          <!-- <div class="table-responsive" >
            <div class="autoscroll">
            <table class="table table-fixed">
              <thead>
                <tr>
                  <th scope="col">Impuesto</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Nit</th>
                  <th scope="col">Hasta</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody v-if="loader">
                <Loader />
              </tbody>
              <tbody v-else>
                <tr v-for="cal in data">
                  <th scope="row"> {{ cal.impuesto.name }}</th>
                  <td>{{ cal.nombre }}</td>
                  <td> {{ formato_fecha(cal.fecha) }}</td>
                  <td>{{ cal.nit }}</td>
                  <td>{{ cal.hasta }}</td>
                  <td>{{ cal.tipo }}</td>
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
          </div> -->

          <DataTable :data="data" :columns="columns" :options="{responsive:true,  lengthMenu:[[10, 25, 50, -1],[10, 25, 50, 'All']], autoWidth:false, dom:'Bfrtip', language:{
            search:'buscar', zeroRecords:'nohay registros para mostrar', info:'mostrando del _START_ a _END_ de _TOTAL_ registros', paginate:{ first:'Primero', previous:'Anterior',next:'Siguiente', last:'Ultimo'}
          },buttons:botones, select:true}" class="display cell-border table">
            <thead>
                <tr>
                    <th>Impuesto</th>
                    <th>Nombre</th>
                    <th>Nit</th>
                    <th>Hasta</th>
                    <th>Fecha</th>
                    <th>Tipo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
        </DataTable>
          
        </div>
      </div>
    </main>
  
    <!-- Modal -->
  <div v-if="modal" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Crear nuevo Calendario Tributario</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
         <form action="">
            <div class="row">
                <div class="col-md-3">
                  <label for="razon_social" class="form-label">Impuestos</label>
                  <select class="form-select form-select-sm" v-model="calendario.impuesto_id">
                    <option selected>Selecciona una opcion</option>
                    <option v-for="option in impuestos" :value="option.id">
                      {{ option.name }}
                    </option>
                  </select>
                  <div class="input-errors" v-for="error of v$.calendario.impuesto_id.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                  </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Nombre</label>
                        <input type="text" class="form-control form-control-sm" v-model="calendario.nombre" >
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3">
                        <label for="fecha" class="form-label">Fecha</label>
                        <input type="date" class="form-control form-control-sm" v-model="calendario.fecha">
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="mb-3">
                        <label for="nit" class="form-label">Nit</label>
                        <input type="text" class="form-control form-control-sm" max="2" v-model="calendario.nit">
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="mb-3">
                        <label for="hasta" class="form-label">Hasta</label>
                        <input type="text" class="form-control form-control-sm" max="2" v-model="calendario.hasta">
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3">
                        <label for="tipo" class="form-label">Tipo</label>
                        <select class="form-select form-select-sm" v-model="calendario.tipo">
                          <option selected>Selecciona una opcion</option>
                          <option value="uno">Uno</option>
                          <option value="dos">Dos</option>
                          <option value="rango">Rango</option>

                        </select>
                    </div>
                </div>
                

                
            </div>
            <button type="button" v-on:click="save()" class="btn btn-primary">Guardar Calendario</button>
         </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          
        </div>
      </div>
    </div>
  </div>



  </template>
  <script >
    import { ref } from "vue";

  import { toast } from 'vue3-toastify';

  import DataTable from 'datatables.net-vue3';
  import DataTablesCore from 'datatables.net-bs5';
  import Select from 'datatables.net-select';
  import 'datatables.net-responsive';
  import Buttons from 'datatables.net-buttons-bs5'
  import ButtonsHtml5 from 'datatables.net-buttons/js/buttons.html5'

  import print from 'datatables.net-buttons/js/buttons.print'
  import pdfmake from 'pdfmake'
  import pdfFonts from 'pdfmake/build/vfs_fonts'
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  import jsZip from 'jszip'
  window.JSZip = jsZip
  
  DataTable.use(DataTablesCore);
  DataTable.use(pdfmake)
  DataTable.use(ButtonsHtml5)
  DataTable.use(Select)
  

  import { useVuelidate } from '@vuelidate/core'
  import { required, email } from '@vuelidate/validators'
  import 'vue3-toastify/dist/index.css';

  import dayjs from 'dayjs'
  import 'dayjs/locale/es'
  import customParseFormat from  'dayjs/plugin/customParseFormat'

  import Loader from '../../components/Loader.vue';




  export default {
    name: 'Calendario Tributario',
    created () {
      document.title = "Calendario Tributario";
    },
    setup () {
      return { v$: useVuelidate() }
    },
    components:{
        Loader,
        DataTable
    },
    data() {
        return {
            
            calendario: {
                impuesto_id: "",
                nombre: "",
                fecha: "",
                nit: "",
                hasta: "",
                tipo: "",
                
            },
            token: '',
            data:'',
            modal: true,
            impuestos:'',
  
            loader: false,

            columns : [
              { data: 'impuesto.name' },
              { data: 'nombre' },
              { data: 'nit' },
              { data: 'hasta' },
              { data: 'fecha' },
              { data: 'tipo' },
              { data: 'id',
                render: function (data, type) {

    
                        // return '<a href="">' + data + '</a>';

                        return '<div class="btn-group btn-group-sm" role="group" aria-label="Basic example">'
                          +'<button type="button" class="btn btn-info"><span class="material-icons" style="font-size:15px;">edit</span></button>'
                          +'<button type="button" class="btn btn-danger"><span class="material-icons" style="font-size:15px;">delete</span></button>'
                        +'</div>'
                    
    
                    // return data;
                  }
                }
            ],
            botones:[
              {
                title:'Reportes',
                extend:'excelHtml5',
                // text:'<span class="material-icons">picture_as_pdf</span> CSV',
                className:'btn btn-sm btn-success'
              },
              {
                title:'Reportes',
                extend:'pdfHtml5',
                className:'btn btn-sm btn-danger'
              },
              {
                title:'Reportes',
                extend:'print',
                className:'btn btn-sm btn-dark'
              },
              {
                title:'Reportes',
                extend:'copy',
                className:'btn btn-sm btn-info',
                
              }
            ]
        }
    },
    validations () {
      return {
        calendario: {
          impuesto_id: { required }
        }
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
                        body: JSON.stringify(this.calendario)
                    },
                        
                    res = await fetch(window.env.API_URL+"/calendarios/store", options);
                    const { data, errors, message, success } = await res.json();

                    if (errors != undefined) {
                        for (let error in errors){
                            let value = errors[error];
                            toast.warning(value, {
                                autoClose: 3000,
                            }); 
                        }
                    }

                    if(message == 'Unauthenticated.')
                    {
                      this.$router.push({name:'login'})
                    }

                    if (success == true) {
                        //limpiar campos

                        this.getCalendarios()

                        toast.success("Registro creado", {
                            autoClose: 3000,
                        }); 
                    }
                
            } catch (err) {
              toast.warning("Error: "+err, {
                autoClose: 3000,
              });
            }

        },

        async getCalendarios() {
            try {
                let options = {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=utf-8",
                        "Accept": "application/json",
                        "Authorization": 'Bearer '+this.token
                    }
                }
                let res = await fetch(window.env.API_URL+"/calendarios", options);
                const{ success, message, data } = await res.json();
                if(success)
                {
                    this.data = data
                    this.loader = false
                }

                if(message == 'Unauthenticated.')
                {
                  this.$router.push({name:'login'})
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
                    this.impuestos = data 
                }

                if(message == 'Unauthenticated.')
                {
                  this.$router.push({name:'login'})
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
        this.getCalendarios()

        this.getImpuestos()

    }

  }
  </script>

<style lang="css">
@import 'bootstrap';
@import 'datatables.net-bs5';

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