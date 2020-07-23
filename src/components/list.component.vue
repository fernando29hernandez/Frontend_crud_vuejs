<template>
  <div>
    <md-tabs>
      <md-tab id="tab-home" md-label="Listado" exact @click="retrieveRegistros">
        <b-container class="bv-example-row" fluid="md">
          <b-row>
            <b-col md="10">
              <md-table v-model="registros" md-card>
                <md-table-toolbar>
                  <h1 class="md-title">Registros List</h1>
                </md-table-toolbar>
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell md-label="ID" md-sort-by="_id" md-numeric>{{ item._id }}</md-table-cell>
                  <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
                  <md-table-cell md-label="Gender" md-sort-by="gender">{{ item.gender }}</md-table-cell>
                  <md-table-cell md-label="Age" md-sort-by="age">{{ item.age }}</md-table-cell>
                  <md-table-cell md-label="Address" md-sort-by="address">{{ item.address }}</md-table-cell>
                  <md-table-cell md-label="City" md-sort-by="city">{{ item.city }}</md-table-cell>
                  <md-table-cell md-label="Country" md-sort-by="country">{{ item.country }}</md-table-cell>
                  <md-table-cell md-label="Status" md-sort-by="status">{{ item.status }}</md-table-cell>
                  <md-table-cell md-label="Acciones">
                    <div class="mt-3">
                      <b-button-group>
                        <b-button variant="success" @click="setUpdatedRegistro(item)">Update</b-button>
                        <b-button variant="info" @click="setActiveRegistro(item)">View</b-button>
                        <div>
                          <md-dialog-confirm
                            :md-active.sync="active"
                            md-title="Delete this registro"
                            md-content="Desea eliminar el registro"
                            md-confirm-text="Yes"
                            md-cancel-text="No"
                            @md-cancel="onCancel"
                            @md-confirm="deleteRegistro(item._id)"
                          />
                          <b-button variant="danger" @click="active = true">Delete</b-button>
                        </div>
                      </b-button-group>
                    </div>
                  </md-table-cell>
                </md-table-row>
              </md-table>
            </b-col>

            <b-col md="2">
              <b-container>
                <b-row>
                  <b-col cols="12">
                    <div v-if="currentRegistro._id">
                      <md-button class="md-accent" v-on:click="close">
                        <delete-icon />Close
                      </md-button>

                      <h4>Registro</h4>
                      <div>
                        <label>
                          <strong>Name:</strong>
                        </label>
                        {{ currentRegistro.name }}
                      </div>
                      <div>
                        <label>
                          <strong>Gender:</strong>
                        </label>
                        {{ currentRegistro.gender }}
                      </div>
                      <div>
                        <label>
                          <strong>Age:</strong>
                        </label>
                        {{ currentRegistro.age }}
                      </div>
                      <div>
                        <label>
                          <strong>Address</strong>
                        </label>
                        {{ currentRegistro.address }}
                      </div>
                      <div>
                        <label>
                          <strong>Country:</strong>
                        </label>
                        {{ currentRegistro.country }}
                      </div>
                      <div>
                        <label>
                          <strong>City:</strong>
                        </label>
                        {{ currentRegistro.city }}
                      </div>
                      <div>
                        <label>
                          <strong>Status:</strong>
                        </label>
                        {{ currentRegistro.status}}
                      </div>
                    </div>
                    <div v-else>
                      <br />
                      <p>Please click on a Registro...</p>
                    </div>
                  </b-col>
                </b-row>
              </b-container>
            </b-col>
          </b-row>
        </b-container>
      </md-tab>

      <md-tab id="tab-pages" md-label="Formulario">
        <div v-if="bandera">
            <Add v-bind:registro-prop.sync="currentRegistro" v-bind:updated.sync="bandera"></Add>
      
        </div>
        <div v-else>
            <Add ></Add>
      
        </div>
      </md-tab>
    </md-tabs>
  </div>  
</template>

<script>
import RegistroDataService from "../services/api.service";
import Add from "../components/add.component";
import DeleteIcon from "vue-material-design-icons/Delete.vue";
export default {
  name: "list",
  components: {
    Add,
    DeleteIcon
  },
  data() {
    return {
      registros: [],
      currentRegistro:{
        _id: null,
        name: null,
        age: null,
        gender: null,
        address: null,
        city: null,
        country: null,
        status: null
      },
      confimacionEliminacion: false,
      active: false,
      bandera: false,
    };
  },
  methods: {
    retrieveRegistros() {
      RegistroDataService.getAll()
        .then(response => {
          this.registros = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteRegistro(id) {
      RegistroDataService.delete(id)
        .then(response => {
          this.retrieveRegistros();
          this.registros = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    close() {
      this.currentRegistro = {
        _id: null,
        name: null,
        age: null,
        gender: null,
        address: null,
        city: null,
        country: null,
        status: null
        };
        this.bandera=false;
    },
    refreshList() {
      this.retrieveRegistros();
      this.currentRegistro = {
        _id: null,
        name: null,
        age: null,
        gender: null,
        address: null,
        city: null,
        country: null,
        status: null
        
      };
      this.bandera=false;
    },

    setActiveRegistro(registro) {
      this.currentRegistro = registro;
      this.bandera=false;
    },
    setUpdatedRegistro(registro) {
      this.currentRegistro = registro;
      this.bandera =true;
    },
    onConfirm() {
      this.confimacionEliminacion = "Yes";
    },
    onCancel() {
      this.confimacionEliminacion = "No";
    }
  },
  mounted() {
    this.retrieveRegistros();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
}
</style>