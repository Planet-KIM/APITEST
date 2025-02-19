import { Editor, rootCtx } from '@milkdown/core';
import { commonmark } from '@milkdown/preset-commonmark';
import { nord } from '@milkdown/theme-nord';

Editor.make()
  .config((ctx) => {
    // 에디터가 붙을 DOM 요소 지정 (index.html에 미리 생성해둔 #editor)
    ctx.set(rootCtx, document.getElementById('editor'));
  })
  .use(commonmark)
  .use(nord)
  .create();
