<template>
  <v-container class="pa-4">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card elevation="2">
          <v-card-title>Uredi Studenta</v-card-title>
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
                Ažuriraj
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
import { useToast } from "vue-toastification";

const toast = useToast();

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
      const id = this.$route.params.id;
      axios
        .put(`http://localhost:4000/api/update-student/${id}`, this.student)
        .then(() => {
          toast.success("Student je uspješno ažuriran!");
          this.$router.push({ name: "view" });
        })
        .catch((error) => {
          console.error(error);
          toast.error("Greška pri ažuriranju studenta. Pokušajte ponovno.");
        });
    },
  },
};
</script>
