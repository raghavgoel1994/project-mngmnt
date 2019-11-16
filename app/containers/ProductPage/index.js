/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';
import { connect } from 'react-redux';
import './index.css';

export function ProductPage(props) {
  return (
    <div className="container">
      <div className="page-title">Create Project</div>
      <div className="page-subtitle">
        Select project Collection name to get list of projects, To create new
        project, please provide project details and click on create button
      </div>
      <div className="row justify-content-start container-1">
        <label className="col-3">Project Collection Name</label>
        <select className="col-4 custom-select">
          <option selected>Choose...</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div className="container-2">
        <table className="table table-layout">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Version Type</th>
              <th scope="col">Sprint Count</th>
              <th scope="col">Sprint Start Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="text" placeholder="Project 1" />
              </td>
              <td>
                <input type="text" placeholder="Project 1" />
              </td>
              <td>
                <select className="custom-select">
                  <option selected>Choose...</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </td>
              <td>
                <input type="number" placeholder="0" />
              </td>
              <td>
                <input type="date" placeholder="" />
              </td>
            </tr>
          </tbody>
        </table>
        <p className="text-right">
          <button type="button" className="btn btn-primary">
            Create
          </button>
        </p>
      </div>
      <div className="container-3">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Project Name</th>
              <th scope="col">Project Id</th>
              <th scope="col">Description</th>
              <th scope="col">state</th>
              <th scope="col">Visibility</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Test project</td>
              <td>project id</td>
              <td>test</td>
              <td>0</td>
              <td>1</td>
              <td>
                <button type="button" className="btn btn-link">
                  edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function mapStateToProps({ global }) {
  return {
    userInfo: global.userInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductPage);
