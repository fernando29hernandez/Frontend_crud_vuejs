<template>
  <div>
    <md-tabs>
      <md-tab id="tab-home" md-label="Listado" exact>
        <b-container class="bv-example-row" fluid="md">
          <b-row>
            <b-col sm="6">
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
                </md-table-row>
              </md-table>
            </b-col>

            <b-col sm="6">
              <b-container>
                <b-row>
                  <b-col col="8">
                    <ul class="list-group">
                      <li
                        class="list-group-item"
                        :class="{ active: index == currentIndex }"
                        v-for="(tutorial, index) in registros"
                        :key="index"
                        @click="setActiveRegistro(tutorial, index)"
                      >{{ tutorial.name }}</li>
                    </ul>
                  </b-col>
                  <b-col col="4">
                    <div v-if="currentRegistro">
                      <h4>Registro</h4>
                      <div>
                        <label>
                          <strong>Title:</strong>
                        </label>
                        {{ currentRegistro.name }}
                      </div>
                      <div>
                        <label>
                          <strong>Description:</strong>
                        </label>
                        {{ currentRegistro.gender }}
                      </div>
                      <div>
                        <label>
                          <strong>Status:</strong>
                        </label>
                        {{ currentRegistro.status}}
                      </div>

                      <a
                        class="badge badge-warning"
                        :href="'/tutorials/' + currentRegistro._id"
                      >Edit</a>
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
        <Add></Add>
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
import RegistroDataService from "../services/api.service";
import Add from "../components/add.component";
export default {
  name: "list",
  components: {
    Add
  },
  data() {
    return {
      registros: [],
      currentRegistro: null,
      currentIndex: -1
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

    refreshList() {
      this.retrieveRegistros();
      this.currentRegistro = null;
      this.currentIndex = -1;
    },

    setActiveRegistro(registro, index) {
      this.currentRegistro = registro;
      this.currentIndex = index;
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