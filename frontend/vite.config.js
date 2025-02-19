import { defineConfig } from 'vite';

export default defineConfig({
  // 빌드 시 참조되는 URL의 base 경로를 지정합니다.
  base: '/static/assets/',
  build: {
    // 출력 폴더를 Flask의 static 폴더 내 assets 폴더로 지정
    outDir: '../static/assets',
    emptyOutDir: true
  }
});
