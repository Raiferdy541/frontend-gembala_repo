import { defineStore } from "pinia";
import * as s$ternak from "@/services/masterData/ternak";
import * as s$kandang from "@/services/masterData/daftarkandang";
import * as s$pakan from "@/services/masterData/pakan";
// import * as s$customer from "@/services/customer";
// import * as s$commodity from "@/services/commodity";
// import * as s$driver from "@/services/driver";
// import * as s$device from "@/services/device";
// import * as s$unit from "@/services/unit";

const u$dropdown = defineStore({
  id: "dropdown",
  state: () => ({
    jenisKelamin: ["Jantan", "Betina"],
    statusSehat: ["Sehat", "Sakit", "Sembuh"],
    statusKeluar: ["Jual", "Mati", "Sembelih"],
    varietas: [],
    fasePemeliharaan: [],
    fase: [],
    statusKeluar: [],
    kandang: [],
    pakan: [],
    // customer: [],
    // commodity: [],
    // driver: [],
    // truck: [],
    // tank: [],
    // unit: [],
    // status: [
    //   { id: 0, name: "Siap Dikirim" },
    //   { id: 1, name: "Sedang Dikirim" },
    //   { id: 2, name: "Selesai" },
    //   { id: 3, name: "Tidak Terkirim" },
    // ],
  }),

  actions: {
    // async a$ddJenisKelamin() {
    //   try {
    //     const { data } = await s$ternak.listJenisKelamin();
    //     this.jenisKelamin = data;
    //   } catch ({ error }) {
    //     this.jenisKelamin = [];
    //     throw error;
    //   }
    // },
    async a$ddVarietas() {
      try {
        const { data } = await s$ternak.listVarietas();
        this.varietas = data;
      } catch ({ error }) {
        this.varietas = [];
        throw error;
      }
    },
    async a$ddStatusSehat() {
      try {
        const { data } = await s$ternak.listStatusSehat();
        this.statusSehat = data;
      } catch ({ error }) {
        this.statusSehat = [];
        throw error;
      }
    },
    async a$ddFasePemeliharaan() {
      try {
        const { data } = await s$ternak.listFase();
        this.fasePemeliharaan = data;
      } catch ({ error }) {
        this.fasePemeliharaan = [];
        throw error;
      }
    },
    async a$ddStatusKeluar() {
      try {
        const { data } = await s$ternak.listStatusKeluar();
        this.statusKeluar = data;
      } catch ({ error }) {
        this.statusKeluar = [];
        throw error;
      }
    },
    async a$ddKandang(request) {
      try {
        const { data } = await s$kandang.list(request);
        this.kandang = data;
      } catch {
        error;
      }
      {
        this.kandang = [];
        throw error;
      }
    },
    async a$listFase() {
      try {
        const { data } = await s$ternak.listFase();
        this.fase = data;
      } catch ({ error }) {
        this.fase = [];
        throw error;
      }
    },
    async a$listKandang(request) {
      try {
        const { data } = await s$kandang.list(request);
        this.kandang = data;
      } catch ({ error }) {
        this.kandang = [];
        throw error;
      }
    },
    async a$ddPakan(request) {
      try {
        const { data } = await s$pakan.list(request);
        this.pakan = data;
      } catch ({ error }) {
        this.pakan = [];
        throw error;
      }
    },
    // async a$ddCustomer() {
    //   try {
    //     const { data } = await s$customer.list();
    //     this.customer = data;
    //   } catch ({ error }) {
    //     this.customer = [];
    //     throw error;
    //   }
    // },
    // async a$ddDriver() {
    //   try {
    //     const { data } = await s$driver.list();
    //     this.driver = data;
    //   } catch ({ error }) {
    //     this.driver = [];
    //     throw error;
    //   }
    // },
    // async a$ddCommodity() {
    //   try {
    //     const { data } = await s$commodity.list();
    //     this.commodity = data;
    //   } catch ({ error }) {
    //     this.commodity = [];
    //     throw error;
    //   }
    // },
    // async a$ddTank(request) {
    //   try {
    //     if (!request) {
    //       this.tank = [];
    //       return;
    //     }
    //     const { data } = await s$customer.tank(request);
    //     this.tank = data;
    //   } catch ({ error }) {
    //     this.tank = [];
    //     throw error;
    //   }
    // },
    // async a$ddTruck() {
    //   try {
    //     const { data } = await s$device.list();
    //     this.truck = data;
    //   } catch ({ error }) {
    //     this.truck = [];
    //     throw error;
    //   }
    // },
    // async a$ddUnit() {
    //   try {
    //     const { data } = await s$unit.list();
    //     this.unit = data;
    //   } catch ({ error }) {
    //     this.unit = [];
    //     throw error;
    //   }
    // },
  },
  getters: {
    // g$ddCustomer: (state) => state.customer.map(({ id, name }) => ({ id, name })),
    // g$ddDriver: (state) => state.driver.map(({ id, name }) => ({ id, username: name })),
    // g$ddCommodity: (state) => state.commodity.map(({ id, name }) => ({ id, name })),
    // g$ddTank: (state) => state.tank.map(({ id, name, quantity }) => ({ id, name, quantity })),
    // g$ddUnit: (state) => state.unit.map(({ id, name }) => ({ id, name })),
    // g$ddStatusFalse: (state) => state.status.map(({ id, name }) => ({ id, name })).filter((obj) => obj.id <= 1),
    // g$ddStatusTrue: (state) => state.status.map(({ id, name }) => ({ id, name })).filter((obj) => obj.id >= 2),
    // g$ddTruck: (state) => state.truck.map(({ id, truckNumber }) => ({ id, name: truckNumber })),
    g$ddJenisKelamin: (state) => state.jenisKelamin,
    g$ddStatusSehat: (state) => state.statusSehat,
    g$ddStatusKeluar: (state) => state.statusKeluar,
    g$ddVarietas: (state) => state.varietas.map(({ id_varietas, nama_varietas }) => ({ id: id_varietas, name: nama_varietas })),
    g$ddFasePemeliharaan: (state) => state.fasePemeliharaan.map(({ id_fp, fase }) => ({ id: id_fp, name: fase })),
    g$ddKandang: (state) => state.kandang.map(({ id_kandang, nama_kandang }) => ({ id: id_kandang, name: nama_kandang })),
    g$ddPakan: (state) => state.pakan.map(({ id_pakan, nama_pakan }) => ({ id: id_pakan, name: nama_pakan })),
    // Dashboard
    g$listVarietas: (state) => state.varietas.map(({ id_varietas, nama_varietas }) => ({ id: id_varietas, name: nama_varietas })),
    g$listFase: (state) => state.fase.map(({ id_fp, fase }) => ({ id: id_fp, name: fase })),
    g$listKandang: (state) => state.kandang.map(({ id_kandang, nama_kandang }) => ({ id: id_kandang, name: nama_kandang })),
  },
});

export default u$dropdown;
