import React, { PureComponent } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/jsx/jsx';

import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/fold/foldgutter.css'

import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchtags';

import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/xml-fold';

export default class Editor extends PureComponent {

  constructor () {
    super();
    this.codeMirror = null;
  }

  autoComplete = cm => {
    const hintOptions = { disableKeywords: false, completeSingle: true, completeOnSingleClick: false };
    this.codeMirror.showHint(hintOptions);
  };

  render () {    
    const options = {
      mode: 'jsx',
      theme: 'monokai',
      lineNumbers: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      autoCloseTags: true,
      matchTags: true,
      foldGutter: true,
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
      extraKeys: { 'Ctrl-Space': this.autoComplete }
    };

    return (
      <CodeMirror
        editorDidMount={editor => { this.codeMirror = editor }}
        autoCursor={false}
        onChange={this.props.onChange}
        value={this.props.value}
        ref="CodeMirror"
        options={options}
      />
    );
  }
}