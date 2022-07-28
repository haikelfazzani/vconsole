import React, { useState } from 'react';
import BitbucketSnippetService from '../services/BitbucketSnippetService';
import unquer from 'unquer';
import Tabs from '../utils/Tabs';

export default function FormCreateOrUpdate() {
  const params = unquer.parse(window.location.href);
  const isUpdating = params && params.s;

  const [snippetUrl, setSnippetUrl] = useState(null);
  const [disbaleBtnSubmit, setDisbaleBtnSubmit] = useState(false);

  const [state, setState] = useState({
    title: isUpdating ? localStorage.getItem('snippet-title') : '',
    filename: isUpdating ? localStorage.getItem('snippet-filename') : '',
    isPrivate: 'public'
  });

  const onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const saveOrUpdate = async (e) => {
    e.preventDefault();
    try {
      setDisbaleBtnSubmit(true);

      const formData = new FormData();
      formData.append('file', new Blob([Tabs.getContent()], { type: 'text/plain' }), state.filename);
      formData.append('title', state.title);
      formData.append('is_private', state.isPrivate === 'private');

      if (isUpdating && window.confirm('Are you sure you want to update this snippet ?')) {
        const snippetURL = await BitbucketSnippetService.update(formData, params.s);
        setSnippetUrl(snippetURL)
      }

      if (!isUpdating && window.confirm('Are you sure you want to save this snippet ?')) {
        const snippetURL = await BitbucketSnippetService.create(formData);
        setSnippetUrl(snippetURL)
      }

      setDisbaleBtnSubmit(false)
      e.target.reset();
    } catch (error) {
      setSnippetUrl(error.message)
    }
  }

  return (<div className="w-100">
    <form className="w-100" onSubmit={saveOrUpdate}>
      <div className="mb-3">
        <label>title</label>
        <input className="w-100 br7" type="text" name="title"
          value={state.title} onChange={onChange} placeholder="title" required />
      </div>

      <div className="mb-3">
        <label>filename</label>
        <input className="w-100 br7" type="text" name="filename" value={state.filename} onChange={onChange} placeholder="Main.go" required />
      </div>

      <div className="mb-4">
        <label>visibility</label>
        <select className='w-100 br7' name='isPrivate' value={state.isPrivate} onChange={onChange}>
          <option value="private">private</option>
          <option value="public">public</option>
        </select>
      </div>

      {!disbaleBtnSubmit && <button className="w-100 btn bg-green border br7 p-3" type="submit" disabled={disbaleBtnSubmit}>
        <i className='fa fa-pen mr-1'></i>{isUpdating ? 'update' : 'create'}
      </button>}
    </form>

    {snippetUrl && <div className="w-100 mt-3">
      <hr />
      <label>Snippet url</label>
      {<input className="w-100" type="text" defaultValue={snippetUrl} readOnly />}
    </div>}
  </div>);
}
