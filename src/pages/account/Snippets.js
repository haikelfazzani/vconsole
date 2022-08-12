import React from 'react';
import { Link } from 'react-router-dom';
import BitbucketSnippetService from '../../services/BitbucketSnippetService';

function Snippets({ snippets }) {

  const onDelete = async (snippet) => {
    if (window.confirm("Are you sure to delete? " + snippet.title)) {
      let resp = await BitbucketSnippetService.delete(snippet);
      if (resp) window.location.reload();
    }
  }

  const onGetComments = async (snippet) => {
    let resp = await BitbucketSnippetService.getListComments(snippet.id);
  }

  if (snippets && snippets.length > 0) {
    return (<div className='w-100'>

      <header className='w-100 d-flex align-center justify-between p-4 border-bottom light-shadow'>
        <h3 className='m-0'><i className='fa fa-stream mr-2'></i>Your Snippets ({snippets.length})</h3>
        <p>{new Date().toDateString()}</p>
      </header>

      <ul className='w-100 h-100 bg-dark grid-3 overflow p-4'>
        {snippets.reverse().map((snip, i) => <li className='w-100 bg-dark border fit-content light-shadow p-3 br7' key={snip.id}>

          <div>
            <h2 className='mt-0 text-truncate'><i className="fa fa-file-code mr-1"></i>{snip.title}</h2>
            <small>created on: {new Date(snip.created_on).toDateString()}</small>
            <br />
            <small>updated on: {new Date(snip.updated_on).toDateString()}</small>
          </div>

          <div className='w-100 d-flex mt-3'>
            <Link to={"/playground?s=" + snip.id} className="mr-2 btn bg-transparent blue pl-0">
              <i className="fas fa-edit mr-1"></i>Update
            </Link>

            <button onClick={() => { onDelete(snip); }} className="danger bg-transparent">
              <i className="fas fa-trash mr-1"></i>delete
            </button>

            {/* <button onClick={() => { onGetComments(snip); }} className="btn bg-danger">
              <i className="fas fa-trash mr-1"></i>get
            </button> */}
          </div>

        </li>)}
      </ul>
    </div>);
  }
  else {
    return <p className='p-3'><i className='fa fa-info-circle mr-1'></i>No snippets are found..</p>
  }
}

export default React.memo(Snippets)