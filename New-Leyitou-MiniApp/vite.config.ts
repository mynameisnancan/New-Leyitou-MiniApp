import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni'
import UniKuRoot from '@uni-ku/root';

export default defineConfig(async () => {
  return {
    plugins: [UniKuRoot(), uni()]
  };
});
