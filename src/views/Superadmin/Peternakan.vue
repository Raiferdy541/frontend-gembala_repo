<script>
import { mapActions, mapState } from "pinia";
import useAuthStore from "@/stores/auth";
import d$superadmin from "@/stores/superadmin/superadmin";
import d$auth from "@/stores/auth";
import { ubahTanggal } from "@/utils/locale/ubahTanggal";
import { number } from "yup";

export default {
  metaInfo: () => ({
    title: "Peternakan",
  }),
  data: () => ({
    pageTitle: "Peternakan",
    // DataTable
    dt: {
      column: [
        {
          name: "nama_peternakan",
          th: "Nama Peternakan",
        },
        {
          name: "alamat",
          th: "Alamat Peternakan",
        },
      ],
      action: [
        {
          text: "Monitoring Peternakan",
          color: "info",
          event: "monitoring-peternakan",
        },
        {
          text: "Edit Peternakan",
          color: "warning",
          event: "edit-peternakan",
        },
        {
          text: "Lihat Admin",
          color: "primary",
          event: "lihat-pengguna",
        },
        {
          text: "Edit Admin",
          color: "warning",
          event: "edit-data-pengguna",
        },
        {
          text: "Hapus akun",
          color: "danger",
          event: "hapus-akun",
        },
      ],
    },
    modal: {
      // setPremium: false,
      // setFree: false,
      ubahPeternakan: false,
      ubahDataAdmin: false,
      hapusAkun: false,
      lihatPengguna: false,
    },
    input: {
      peternakan: null,
      id_peternakan: null,
      nama_peternakan: null,
      nama_pengguna: null,
      nomor_telepon: null,
      email: null,
      id_user: null,
      alamat: null,
      months: 3,
    },
    loading: false,
  }),
  computed: {
    ...mapState(d$superadmin, ["g$users", "g$peternakan"]),
  },
  async mounted() {
    this.a$getPeternakan().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(useAuthStore, ["a$logout"]),
    ...mapActions(d$superadmin, [
      "a$getDataUsers",
      "a$getNewToken",
      "a$getPeternakan",
      // "a$setPremiumFarm",
      // "a$setFreeFarm",
      "a$editAdmin",
      "a$editPeternakan",
      "a$delAdmin",
    ]),
    ...mapActions(d$auth, ["a$login"]),
    async logout() {
      await this.a$logout();
      this.notify("Logout Berhasil!");
      this.$router.push({ name: "Login" });
    },

    async monitoringPeternakan(row) {
      const { id_peternakan, nama_peternakan } = row;
      const data = {
        id_peternakan,
      };
      try {
        const login = await this.a$getNewToken(data);
        if (login === "Login Berhasil!") {
          this.$router.push({ name: "Home" });
          this.notify(`Lihat ${nama_peternakan} berhasil!`);
        }
      } catch (error) {
        this.notify(error, false);
      }
    },

    triggerLihatPengguna(row) {
      this.input.peternakan = row;
      this.modal.lihatPengguna = true;
    },

    async triggerHapusAkun(row) {
      try {
        const {
          user: [{ id_user }],
        } = row;
        this.input = {
          id_user,
        };
        this.input.peternakan = row;
        this.modal.hapusAkun = true;
      } catch (error) {
        this.clearInput();
        this.notify(error, false);
      }
    },

    async triggerUbahPeternakan(row) {
      this.modal.ubahPeternakan = true;
      this.loadingModal = true;
     
      try {
        const { id_peternakan, nama_peternakan, alamat } = row;
        this.input = {
          id_peternakan,
          nama_peternakan,
          alamat,
        };
      } catch (error) {
        this.notify(error, false);
      }
      this.loadingModal = false;
    },

    async triggerUbahDataAdmin(row) {
      this.modal.ubahDataAdmin = true;
      this.loadingModal = true;
     
      try {
        const {
          user: [{ id_user, nama_pengguna, email, nomor_telepon }],
        } = row;
        this.input = {
          id_user,
          nama_pengguna,
          email,
          nomor_telepon,
        };
      } catch (error) {
        this.notify(error, false);
      }
      this.loadingModal = false;
    },

    async updateDataAdmin() {
      this.loading = true;
      try {
        const { id_user, nama_pengguna, email, nomor_telepon, nama_peternakan } = this.input;
        const data = {
          id_user,
          nama_pengguna,
          email,
          nomor_telepon,
          nama_peternakan,
        };
        console.log(data);
        await this.a$editAdmin(data);
        await this.a$getPeternakan();
        this.modal.ubahDataAdmin = false;
        this.notify(`Edit data admin Sukses!`);
      } catch (error) {
        this.notify(error.message, false);
      }
      this.loading = false;
    },

    
    async updatePeternakan() {
      this.loading = true;
      try {
        const { id_peternakan, nama_peternakan, alamat } = this.input;
        const data = {
          id_peternakan,
          nama_peternakan,
          alamat,
        };
        console.log(data);
        await this.a$editPeternakan(data);
        await this.a$getPeternakan();
        this.modal.ubahPeternakan = false;
        this.notify(`Edit peternakan Sukses!`);
      } catch (error) {
        this.notify(error, false);
      }
      this.loading = false;
    },

    async delAdmin() {
      this.loading = true;
      try {
        const { id_user } = this.input;
        const data = {
          id_user,
        };
        console.log(data);
        await this.a$delAdmin(data);
        // Setelah operasi berhasil, perbarui data atau lakukan apa yang diperlukan
        await this.a$getPeternakan();
        // Setelah pembaruan data berhasil, tutup modal
        this.modal.hapusAkun = false;
        this.notify(`Peternakan berhasil dihapus`);
      } catch (error) {
        this.notify(error, false);
      }
      this.loading = false;
    },
  },
};
</script>

<template>
  <main-layout :title="pageTitle" disable-padding>
    <template #header>
      <div class="row align-items-center">
        <div class="col-auto">
          <h3>Daftar {{ pageTitle }}</h3>
        </div>
        <div class="col text-right">
          <base-button type="register-without-activate">
            <router-link
              to="/auth/register-without-activate"
              style="color: white"
            >
              <i class="fa-solid fa-user-plus"></i>
              <span>Daftar akun tanpa aktivasi</span>
            </router-link>
          </base-button>
          <base-button type="register">
            <router-link to="/auth/register" style="color: white">
              <i class="fa-solid fa-user-plus"></i>
              <span>Daftar akun dengan aktivasi</span>
            </router-link>
          </base-button>
          <base-button type="exit" @click="logout" style="color: white">
            <i class="fas fa-arrow-right-from-bracket"></i>
            <span>Keluar</span>
          </base-button>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$peternakan.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$peternakan"
        :columns="dt.column"
        :actions="dt.action"
        @monitoring-peternakan="monitoringPeternakan"
        @lihat-pengguna="triggerLihatPengguna"
        @edit-data-pengguna="triggerUbahDataAdmin"
        @edit-peternakan="triggerUbahPeternakan"
        @hapus-akun="triggerHapusAkun"
      />
    </template>

    <template #modal>
      <!-- edit peternakan -->
      <modal-comp v-model:show="modal.ubahPeternakan" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Edit {{ pageTitle }}</h3>
        </template>
        <template #body>
          <div v-if="loadingModal">
            <i class="fa fa-spinner fa-spin"></i> Sedang memuat...
          </div>
          <div v-else>
            <form-comp v-if="modal.ubahPeternakan">
              <div class="row">
                <div class="col-12">
                  <field-form
                    v-slot="{ field }"
                    v-model="input.nama_peternakan"
                    type="text"
                    name="nama_peternakan"
                  >
                    <base-input
                      v-bind="field"
                      placeholder="Nama Peternakan"
                      label="Nama Peternakan"
                      required
                    ></base-input>
                  </field-form>
                </div>
                <!-- Kode kandang -->
                <div class="col-12">
                  <field-form
                    v-slot="{ field }"
                    v-model="input.alamat"
                    type="text"
                    name="alamat"
                  >
                    <base-input
                      v-bind="field"
                      placeholder="Alamat Peternakan"
                      label="Alamat Peternakan"
                      required
                    ></base-input>
                  </field-form>
                </div>
              </div>
            </form-comp>
          </div>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.ubahPeternakan = false">
            Batal
          </base-button>
          <base-button type="primary" @click="updatePeternakan()">
            <span v-if="!loading">Simpan perubahan</span>
            <span v-else>
              <i class="fa fa-spinner fa-spin"></i> Sedang menyimpan...
            </span>
          </base-button>
        </template>
      </modal-comp>

      <!-- Lihat pengguna -->
      <modal-comp v-model:show="modal.lihatPengguna" modal-classes="modal-lg">
        <template #header>
          <h3 class="modal-title">Identitas Admin</h3>
        </template>
        <template v-if="modal.lihatPengguna" #body>
          <div style="max-height: 500px; overflow-y: 800px; overflow-x: hidden">
            <!-- <h3 class="my-3">
              Daftar Peternakan {{ input.peternakan.nama_peternakan }}
            </h3> -->
            <empty-result
              v-if="!input.peternakan.user.length"
              :text="`Pengguna`"
            />
            <div class="m-3" v-for="item in input.peternakan.user">
              <!-- <hr class="m-0" /> -->
              <!-- Nama pengguna -->
              <div class="row">
                <div class="col-5">
                  <span style="font-weight: 400">Nama</span>
                </div>
                <div class="col">
                  :
                  <span style="font-weight: 200">{{ item.nama_pengguna }}</span>
                </div>
              </div>

              <!-- Email -->
              <div class="row">
                <div class="col-5">
                  <span style="font-weight: 400">Email</span>
                </div>
                <div class="col">
                  :
                  <span style="font-weight: 200">{{ item.email }}</span>
                </div>
              </div>

              <!-- Nomor telepon -->
              <div class="row">
                <div class="col-5">
                  <span style="font-weight: 400">Nomor Telepon</span>
                </div>
                <div class="col">
                  :
                  <span style="font-weight: 200">{{ item.nomor_telepon }}</span>
                </div>
              </div>

              <!-- Role -->
              <div class="row">
                <div class="col-5">
                  <span style="font-weight: 400">Peran</span>
                </div>
                <div class="col">
                  :
                  <span style="font-weight: 200">{{ item.role }}</span>
                </div>
              </div>

              <!-- Status -->
              <div class="row">
                <div class="col-5">
                  <span style="font-weight: 400">Status</span>
                </div>
                <div class="col">
                  :
                  <span style="font-weight: 200">{{ item.status }}</span>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #footer>
          <!-- <base-button type="secondary" @click="modal.ubahDataAdmin = true">
            Edit Data Admin
          </base-button> -->
          <base-button type="secondary" @click="modal.lihatPengguna = false">
            Tutup
          </base-button>
        </template>
      </modal-comp>

      <!-- Modal untuk mengedit data admin -->
      <modal-comp v-model:show="modal.ubahDataAdmin" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Edit Identitas Admin</h3>
        </template>
        <template #body>
          <!-- Form untuk mengedit data admin -->
          <form-comp v-if="modal.ubahDataAdmin">
            <div class="row">
              <div class="col-12">
                <field-form
                  v-slot="{ field }"
                  v-model="input.email"
                  type="text"
                  name="email"
                >
                  <base-input
                    v-bind="field"
                    placeholder="Email"
                    label="Email"
                    required
                  ></base-input>
                </field-form>
                <field-form
                  v-slot="{ field }"
                  v-model="input.nama_pengguna"
                  type="text"
                  name="nama_pengguna"
                >
                  <base-input
                    v-bind="field"
                    placeholder="Nama"
                    label="Nama"
                    required
                  ></base-input>
                </field-form>
                <field-form
                  v-slot="{ field }"
                  v-model="input.nomor_telepon"
                  type="text"
                  name="nomor_telepon"
                >
                  <base-input
                    v-bind="field"
                    placeholder="Nomor Telepon"
                    label="Nomor Telepon"
                    required
                  ></base-input>
                </field-form>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <!-- Tambahkan tombol Simpan Perubahan -->
          <base-button type="secondary" @click="modal.ubahDataAdmin = false">
            Batal
          </base-button>
          <base-button type="primary" @click="updateDataAdmin()">
            Simpan Perubahan
          </base-button>
        </template>
      </modal-comp>
      <!-- Hapus admin -->
      <modal-comp v-model:show="modal.hapusAkun" modal-classes="modal-sm">
        <template #header>
          <h3 class="modal-title">Hapus Akun Peternakan</h3>
        </template>
        <template v-if="modal.hapusAkun" #body>
          <p>
            Yakin ingin menghapus akun peternakan
            <strong>{{ input.peternakan.nama_peternakan }}?</strong>
          </p>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.hapusAkun = false">
            Batal
          </base-button>
          <base-button type="danger" @click="delAdmin()"
            ><span v-if="!loading">Hapus</span>
            <span v-else>
              <i class="fa fa-spinner fa-spin"></i> Sedang menghapus...
            </span></base-button
          >
        </template>
      </modal-comp>
    </template>
  </main-layout>
</template>
