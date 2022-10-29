import { defineStore } from "pinia";
import * as s$pemasukan from "@/services/fase/pemasukan";

const u$pemasukan = defineStore({
  id: "pemasukan",
  state: () => ({
    pemasukan: [],
    pemasukanThisMonth: [],
    kandang: [],
    kandangSlice: [],
    kandangSlice1: [],
  }),
  actions: {
    // Pemasukan
    async a$pemasukanList() {
      try {
        const { data } = await s$pemasukan.list();
        this.pemasukan = data.list;
      } catch ({ error }) {
        this.pemasukan = [];
        throw error;
      }
    },

    // Pemasukan This Month
    async a$pemasukanListThisMonth() {
      try {
        const { data } = await s$pemasukan.listThisMonth();
        this.kandang = data.total_by_kandang;
        this.pemasukanThisMonth = data;

        function splitIntoChunk(arr, chunk) {
          let tempArray = [];
          for (let i = 0; i < arr.length; i += chunk) {
            tempArray.push(arr.slice(i, i + chunk));
          }
          return tempArray;
        }
        const chunk = 5;
        this.kandangSlice = splitIntoChunk(this.kandang, chunk);
        this.kandangSlice1 = this.kandangSlice[0];
        this.kandangSlice.splice(0, 1);
        console.log("ini header", this.kandangSlice1);
        console.log("ini body", this.kandangSlice);
      } catch ({ error }) {
        this.kandang = [];
        throw error;
      }
    },
  },

  getters: {
    g$pemasukan: (state) => state.pemasukan,
    g$pemasukanThisMonth: (state) => state.pemasukanThisMonth,
    g$kandang: (state) => state.kandang,
    g$kandangSlice: (state) => state.kandangSlice,
    g$kandangSlice1: (state) => state.kandangSlice1,
  },
});

export default u$pemasukan;
