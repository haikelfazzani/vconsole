import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import BitbucketSnippetService from '../../services/BitbucketSnippetService';

export default function Snippets ({ snippets }) {

  const onDelete = async (snippet) => {
    let c = window.confirm("Are you sure to delete? " + snippet.title);
    if (c) {
      let resp = await BitbucketSnippetService.delete(snippet);
      if (resp) window.location.reload();
    }
  }

  if (snippets && snippets.length > 0) {
    return (<table className="w-100 text-center br7 border">
      <thead className="bg-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">title</th>
          <th scope="col">created on</th>
          <th scope="col">updated on</th>
          <th scope="col">actions</th>
        </tr>
      </thead>
      <tbody>
        {snippets.map((snip, i) => <tr key={snip.id}>
          <th scope="row">{i + 1}</th>
          <td><i className="fa fa-file-code mr-1"></i>{snip.title}</td>
          <td>{new Date(snip.created_on).toDateString()}</td>
          <td>{new Date(snip.updated_on).toDateString()}</td>
          <td>
            <Link to={"/playground?s=" + snip.id} className="btn bg-dark mr-2">
              <i className="fas fa-edit mr-1"></i>Update
            </Link>

            <button onClick={() => { onDelete(snip); }} className="bg-danger">
              <i className="fas fa-trash mr-1"></i>delete
            </button>
          </td>
        </tr>)}
      </tbody>
    </table>);
  }
  else {
    return <Spinner />
  }
}