import React, { PureComponent } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/mdn-like.css';
import 'codemirror/mode/jsx/jsx';

import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/show-hint.css'; 

import 'codemirror/addon/edit/closebrackets';

export default class Editor extends PureComponent {

  constructor() {
    super()
    this.codeMirror = null;
  }

  autoComplete = cm => {

    const hintOptions = {
      disableKeywords: false,
      completeSingle: false,
      completeOnSingleClick: false
    };

    this.codeMirror.showHint(hintOptions);
  };

  render () {
    const options = {
      mode: 'jsx',
      theme: 'mdn-like',
      lineNumbers: true,
      completeSingle: true,
      matchBrackets: true,
      autoCloseBrackets:true,
      extraKeys: {
        'Ctrl-Space': this.autoComplete
      }
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