<template>
  <b-container class="bv-example-row" fluid="md">
    <b-row>
      <b-col cols="3"></b-col>
      <b-col cols="8">
        <div class="md-layout">
          <md-card class="md-layout-item md-size-50 md-small-size-100">
            <md-card-header>
              <div class="md-title">Registro</div>
            </md-card-header>
            <md-card-content>
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="name">Name</label>
                  <md-input id="name" required v-model="registro.name" name="name" />
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="gender">Gender</label>
                  <md-input id="gender" required v-model="registro.gender" name="gender" />
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="age">Age</label>
                  <md-input id="age" required v-model="registro.age" name="age" />
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="address">Address</label>
                  <md-input id="address" required v-model="registro.address" name="address" />
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="city">City</label>
                  <md-input id="city" required v-model="registro.city" name="city" />
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="country">Country</label>
                  <md-input id="country" required v-model="registro.country" name="country" />
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="status">Status</label>
                  <md-input id="status" required v-model="registro.status" name="status" />
                </md-field>
              </div>
            </md-card-content>
            <md-progress-bar md-mode="indeterminate" v-if="sending" />

            <md-card-actions>
              <div v-if="bandera">
                <b-button variant="success" :disabled="sending" @click="update">Update Registro</b-button>
              </div>
              <div v-else>
                <md-button
                  type="submit"
                  class="md-primary"
                  :disabled="sending"
                  v-on:click="save"
                >Create Registro</md-button>
              </div>
            </md-card-actions>
            <md-snackbar :md-active.sync="Saved">El registro a sido creado!</md-snackbar>
            <md-snackbar :md-active.sync="varUpdated">El registro a sido Actualizado!</md-snackbar>
          </md-card>
        </div>
      </b-col>
      <b-col cols="2"></b-col>
    </b-row>
  </b-container>
</template>

<script>
import RegistroDataService from "../services/api.service";

export default {
  name: "add",
  props: {
    registroProp: {
      type: Object,
      default: () => ({
        _id: null,
        name: null,
        age: null,
        gender: null,
        address: null,
        city: null,
        country: null,
        status: null
      })
    },
    updated: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      registro: this.registroProp,
      sending: false,
      Saved: false,
      bandera: this.updated,
      varUpdated:false,
    };
  },
  watch: {
    registroProp: function() {
      this.registro = this.registroProp;
    },
    updated: function() {
      this.bandera = this.updated;
    }
  },
  methods: {
    save() {
      var data = {
        name: this.registro.name,
        gender: this.registro.gender,
        age: this.registro.age,
        address: this.registro.address,
        city: this.registro.city,
        country: this.registro.country,
        status: this.registro.status
      };

      this.sending = true;

      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.sending = false;
        this.new();
      }, 1500);
      RegistroDataService.create(data)
        .then(response => {
          console.log(response.data);
          this.Saved = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    update() {
      var data = {
        _id: this.registro._id,
        name: this.registro.name,
        gender: this.registro.gender,
        age: this.registro.age,
        address: this.registro.address,
        city: this.registro.city,
        country: this.registro.country,
        status: this.registro.status
      };

      this.sending = true;

      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.sending = false;
        this.new();
      }, 1500);
      RegistroDataService.update(data._id,data)
        .then(response => {
          console.log(response.data);
          this.varUpdated = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    new() {
      this.registro = {};
    }
  }
};
</script>

<style>
</style>