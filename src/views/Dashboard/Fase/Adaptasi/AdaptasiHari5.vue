<script>
import { mapActions, mapState } from "pinia";
import d$adaptasi from "@/stores/fase/adaptasi";
import { ubahTanggal } from "@/utils/locale/ubahTanggal";
import d$dropdown from "@/stores/dropdown";
import { trigger } from "@vue/reactivity";

export default {
  metaInfo: () => ({
    title: "Fase Adaptasi",
  }),
  data: () => ({
    pageTitle: "Fase Adaptasi",
    input: {
      id_ternak: "",
      id_kandang: "",
      treatment1: true,
      treatment2: true,
      treatment3: true,
      treatment4: true,
    },
    //UI
    modal: {
      createAdaptasi: false,
    },
    loading: false,
    loadingModal: false,
    // DataTable
    dt: {
      column: [
        {
          th: "Tanggal",
          render: ({ tanggal_adaptasi }) => ubahTanggal(tanggal_adaptasi),
        },
        {
          name: "id_ternak",
          th: "ID Ternak",
        },
        {
          th: "Kode Kandang",
          render: ({ kandang }) => kandang.kode_kandang,
        },
        {
          th: "Grooming",
          render: ({ treatments }) =>
            Object.values(treatments)[0]
              ? '<i class="fas fa-solid fa-check text-success" style="font-size: 30px;"></i>'
              : '<i class="fas fa-solid fa-x text-danger" style="font-size: 20px;"></i>',
        },
        {
          th: "Sanitasi",
          render: ({ treatments }) =>
            Object.values(treatments)[1]
              ? '<i class="fas fa-solid fa-check text-success" style="font-size: 30px;"></i>'
              : '<i class="fas fa-solid fa-x text-danger" style="font-size: 20px;"></i>',
        },
        {
          th: "Wormectin",
          render: ({ treatments }) =>
            Object.values(treatments)[2]
              ? '<i class="fas fa-solid fa-check text-success" style="font-size: 30px;"></i>'
              : '<i class="fas fa-solid fa-x text-danger" style="font-size: 20px;"></i>',
        },
        {
          th: "Complete Feed",
          render: ({ treatments }) =>
            Object.values(treatments)[3]
              ? '<i class="fas fa-solid fa-check text-success" style="font-size: 30px;"></i>'
              : '<i class="fas fa-solid fa-x text-danger" style="font-size: 20px;"></i>',
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$adaptasi, ["g$adaptasiHariKe5", "g$getTreatment"]),
    ...mapState(d$dropdown, ["g$ddListAdaptasiHari5", "g$ddKandang"]),
    modals() {
      return Object.values(this.modal).includes(true);
    },
  },

  watch: {
    modals(val) {
      if (!val) {
        this.clearInput();
      }
    },
  },

  async mounted() {
    await this.a$adaptasiHariKe5().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$adaptasi, [
      "a$adaptasiHariKe5",
      "a$createAdaptasi",
      "a$getTreatment",
    ]),
    ...mapActions(d$dropdown, ["a$ddListAdaptasiHari5", "a$ddKandang"]),
    clearInput() {
      this.input = {
        id_ternak: "",
        id_kandang: "",
        treatment1: true,
        treatment2: true,
        treatment3: true,
        treatment4: true,
      };
    },

    async triggerCreateAdaptasi() {
      this.modal.createAdaptasi = true;
      this.loadingModal = true;
      await this.a$getTreatment(5);
      await this.a$ddKandang();
      this.a$ddListAdaptasiHari5();
      this.loadingModal = false;
    },

    async createAdaptasi() {
      this.loading = true;
      try {
        const {
          id_ternak,
          id_kandang,
          treatment1,
          treatment2,
          treatment3,
          treatment4,
        } = this.input;
        const data = {
          id_ternak: id_ternak.id_ternak,
          id_kandang: id_kandang.id,
          treatments: [
            {
              id_treatment: treatment1 ? 12 : null,
              step: 5,
              treatment: treatment1 ? "Grooming" : null,
            },
            {
              id_treatment: treatment2 ? 13 : null,
              step: 5,
              treatment: treatment2 ? "Sanitasi" : null,
            },
            {
              id_treatment: treatment3 ? 14 : null,
              step: 5,
              treatment: treatment3 ? "Wormectin" : null,
            },
            {
              id_treatment: treatment4 ? 15 : null,
              step: 5,
              treatment: treatment4 ? "Complete Feed" : null,
            },
          ],
        };
        await this.a$createAdaptasi(data);
        this.modal.createAdaptasi = false;
        this.notify("Berhasil membuat adaptasi baru", true);
        this.a$adaptasiHariKe5();
        this.a$ddListAdaptasiHari5();
      } catch (error) {
        this.notify(error, false);
      }
      this.loading = false;
    },

    onChange(value) {
      this.input.id_kandang = {
        id: value.kandang.id_kandang,
        name: value.kandang.kode_kandang,
      };
    },
  },
};
</script>

<template>
  <main-layout :title="pageTitle" disable-padding>
    <template #header>
      <div class="col-sm">
        <div class="row">
          <span class="text-center m-2">
            <router-link to="../adaptasi">
              <base-button type="secondary" class="btn-lg text-dark">
                Summary
              </base-button>
            </router-link>
          </span>
          <span class="text-center m-2">
            <router-link to="data-adaptasi">
              <base-button type="success1" class="btn-lg text-white">
                {{ pageTitle }}
              </base-button>
            </router-link>
          </span>
          <span class="text-center m-2">
            <router-link to="langkah-kerja">
              <base-button type="secondary" class="btn-lg text-dark">
                Langkah Kerja
              </base-button>
            </router-link>
          </span>
        </div>
      </div>
      <div class="row align-items-center mt-3">
        <div class="col-auto">
          <h3>Daftar {{ pageTitle }}</h3>
        </div>
        <div class="col-auto">
          <span class="text-center m-2">
            <router-link to="data-adaptasi">
              <base-button type="secondary" class="btn-sm text-dark">
                Hari ke-1
              </base-button>
            </router-link>
          </span>
          <span class="text-center m-2">
            <router-link to="data-adaptasi-2">
              <base-button type="secondary" class="btn-sm text-dark">
                Hari ke-2
              </base-button>
            </router-link>
          </span>
          <span class="text-center m-2">
            <router-link to="data-adaptasi-3">
              <base-button type="secondary" class="btn-sm text-dark">
                Hari ke-3
              </base-button>
            </router-link>
          </span>
          <span class="text-center m-2">
            <router-link to="data-adaptasi-4">
              <base-button type="secondary" class="btn-sm text-dark">
                Hari ke-4
              </base-button>
            </router-link>
          </span>
          <span class="text-center m-2">
            <router-link to="data-adaptasi-5">
              <base-button type="success1" class="btn-sm text-white">
                Hari ke-5
              </base-button>
            </router-link>
          </span>
        </div>
        <div class="col text-right">
          <base-button type="success" @click="triggerCreateAdaptasi">
            <span>Tambah {{ pageTitle }}</span>
          </base-button>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$adaptasiHariKe5.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$adaptasiHariKe5"
        :columns="dt.column"
      />
    </template>

    <template #modal>
      <!-- Create Adaptasi -->
      <modal-comp v-model:show="modal.createAdaptasi" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Tambah {{ pageTitle }} Baru</h3>
        </template>
        <template #body>
          <div v-if="loadingModal">
            <i class="fa fa-spinner fa-spin"></i> Sedang memuat...
          </div>
          <div v-else>
            <form-comp v-if="modal.createAdaptasi">
              <div class="row">
                <!-- rf_id = qr_id -->
                <div class="col-12">
                  <base-input name="kandang" label="QR ID">
                    <multi-select
                      @select="onChange"
                      v-model="input.rf_id"
                      :options="g$ddListAdaptasiHari2"
                      label="rf_id"
                      track-by="rf_id"
                      placeholder="Pilih QR ID"
                      :show-labels="false"
                    />
                  </base-input>
                </div>

                <!-- id_kandang -->
                <div class="col-12">
                  <base-input name="id_kandang" label="ID Kandang">
                    <multi-select
                      v-model="input.id_kandang"
                      :options="g$ddKandang"
                      label="name"
                      track-by="id"
                      placeholder="Pilih ID Kandang"
                      :show-labels="false"
                    />
                  </base-input>
                </div>

                <!-- Treatment 1 -->
                <div class="col-6">
                  <base-input name="treatment1">
                    <base-checkbox v-model="input.treatment1" name="treatment1">
                      1. {{ g$getTreatment[0].treatment }}
                    </base-checkbox>
                  </base-input>
                </div>

                <!-- Treatment 2 -->
                <div class="col-6">
                  <base-input name="treatment2">
                    <base-checkbox v-model="input.treatment2" name="treatment2">
                      2. {{ g$getTreatment[1].treatment }}
                    </base-checkbox>
                  </base-input>
                </div>

                <!-- Treatment 3 -->
                <div class="col-6">
                  <base-input name="treatment3">
                    <base-checkbox v-model="input.treatment3" name="treatment3">
                      3. {{ g$getTreatment[2].treatment }}
                    </base-checkbox>
                  </base-input>
                </div>

                <!-- Treatment 4 -->
                <div class="col-6">
                  <base-input name="treatment4">
                    <base-checkbox v-model="input.treatment4" name="treatment4">
                      4. {{ g$getTreatment[3].treatment }}
                    </base-checkbox>
                  </base-input>
                </div>
              </div>
            </form-comp>
          </div>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.createAdaptasi = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="createAdaptasi">
            <span v-if="!loading">Tambah {{ pageTitle }}</span>
            <span v-else>
              <i class="fa fa-spinner fa-spin"></i> Sedang menambahkan...
            </span>
          </base-button>
        </template>
      </modal-comp>
    </template>
  </main-layout>
</template>
