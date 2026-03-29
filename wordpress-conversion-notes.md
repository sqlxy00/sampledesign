# WordPress変換しやすいように行った修正

- デザインを変えずに、インライン style を一部 CSS クラスへ移動
- Contact フォームに id / name / required / autocomplete を追加
- ボタンを submit に修正
- Contact Form 7 などへ移植しやすい name 属性へ整理
- main の inline padding を共通クラス化
- ナビゲーションに aria-current を追加
- ハンバーガーメニューの scroll lock を修正
- フォーカストラップを追加
- reveal 用 JS セレクタを実HTMLに合わせて修正
- 動画プレースホルダーの inline onclick を除去し JS バインドへ変更
- CSS の .section-title-recruit セレクタ漏れを修正

## WordPress化の推奨分割
- header.php
- footer.php
- front-page.php または page-home.php 相当
- page-works.php
- page-contact.php
- functions.php で style.css / script.js を enqueue

## Contact Form 7 へ差し替えるとき
現在の name は以下を想定
- your-name
- your-email
- your-message
