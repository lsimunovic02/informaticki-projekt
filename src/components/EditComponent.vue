<template>
  <v-container class="pa-4">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card elevation="2">
          <v-card-title>Edit Student</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleUpdateForm">
              <v-text-field
                label="Ime"
                v-model="student.name"
                required
                outlined
              />
              <v-text-field
                label="Email"
                v-model="student.email"
                type="email"
                required
                outlined
              />
              <v-text-field
                label="Telefon"
                v-model="student.phone"
                required
                outlined
              />
              <v-btn type="submit" color="primary" block class="mt-4">
                Update
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      student: {
        name: "",
        email: "",
        phone: "",
      },
    };
  },
  mounted() {
    let id = this.$route.params.id;
    axios.get(`http://localhost:4000/api/edit-student/${id}`).then((res) => {
      this.student = res.data;
    });
  },
  methods: {
    handleUpdateForm() {
      let id = this.$route.params.id;
      axios
        .put(`http://localhost:4000/api/update-student/${id}`, this.student)
        .then(() => {
          this.$router.push("/view");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
