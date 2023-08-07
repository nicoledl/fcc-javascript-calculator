// Archivo store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

// Definir el estado inicial
const initialState = {
  value: "",
  formula: "",
  result: "",
};

// Crear un slice (reducer + acciones) utilizando createSlice
const machineStatusSlice = createSlice({
  name: "machineStatus",
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
    setFormula: (state, action) => {
      state.formula = action.payload;
    },
    setResult: (state, action) => {
      state.result = action.payload;
    },
  },
});

// Obtener el reducer generado automáticamente por createSlice
const machineStatusReducer = machineStatusSlice.reducer;

// Obtener las acciones generadas automáticamente por createSlice
const { setValue, setFormula, setResult } = machineStatusSlice.actions;

// Crear la store con configureStore
const store = configureStore({
  reducer: machineStatusReducer,
});

export { setValue, setFormula, setResult, store };
