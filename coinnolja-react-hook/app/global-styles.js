import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url(https://fonts.googleapis.com/earlyaccess/notosanskr.css);


  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }

  body {
    font-family: 'Noto Sans KR', 'NotoSansCJKkr', NotoSansCJKkr;
  }

  body.fontLoaded {
    font-family: 'NotoSansCJKkr';
  }
  body strong { font-weight: bold; }
  img {
    max-width: 100%;
  }
  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: 'NotoSansCJKkr';
    line-height: 1.5em;
  }
  .RichEditor-root {
    background: #fff;
    border: 1px solid #ddd;
    font-family: 'NotoSansCJKkr';
    font-size: 14px;
    padding: 15px;
  }
  
  .RichEditor-editor {
    border-top: 1px solid #ddd;
    cursor: text;
    font-size: 16px;
    margin-top: 10px;
  }
  
  .RichEditor-editor .public-DraftEditorPlaceholder-root,
  .RichEditor-editor .public-DraftEditor-content {
    margin: 0 -15px -15px;
    padding: 15px;
    position: absolute;    
    color: #a6a6a6;
  }

  .RichEditor-editor .public-DraftEditor-content {
    margin: 0 -15px -15px;
    padding: 15px;
    position: relative;    
    color: #313131;
  }
  
  .RichEditor-editor .public-DraftEditor-content {
    min-height: 100px;
  }
  
  .RichEditor-hidePlaceholder .public-DraftEditorPlaceholder-root {
    display: none;
    
  }
  
  .RichEditor-editor .RichEditor-blockquote {
    border-left: 5px solid #eee;
    color: #666;
    font-family: 'NotoSansCJKkr';
    font-style: italic;
    margin: 16px 0;
    padding: 10px 20px;
  }
  
  .RichEditor-editor .public-DraftStyleDefault-pre {
    background-color: rgba(0, 0, 0, 0.05);
    font-family: 'Inconsolata', 'Menlo', 'Consolas', monospace;
    font-size: 16px;
    padding: 20px;
  }
  
  .RichEditor-controls {
    font-family: 'NotoSansCJKkr';
    font-size: 15px;
    // margin-bottom: 5px;
    user-select: none;
  }
  
  .RichEditor-styleButton {
    color: #999;
    cursor: pointer;
    margin-right: 16px;
    padding: 2px 0;
    display: inline-block;
    font-weight: 900;
  }
  
  .RichEditor-activeButton {
    color: #5890ff;
  }
  .grecaptcha-badge{
    visibility: collapse !important;  
  }
  
 
`;

export default GlobalStyle;
