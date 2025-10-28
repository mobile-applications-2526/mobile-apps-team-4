import { MapMode } from '@/types';
import { create } from 'zustand';

interface MapStore {
  mode: MapMode,
  setMode: (mode: MapMode) => void;
};

const useMapStore = create<MapStore>((set) => ({
  mode: 'standard',
  setMode: (mode: MapMode) => set({ mode }),
}));

export default useMapStore;