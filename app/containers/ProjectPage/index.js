import React, { memo } from 'react';
import { connect } from 'react-redux';
import './index.css';
import { getProjectCollection, getProjectList, CreateProject } from './actions';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { compose } from 'redux';
import saga from './saga';
import reducer from './reducer';
import { DAEMON } from '../../constants/text';
import { isEmpty } from 'lodash';

const key = 'projectPage';
const withSaga = injectSaga({ key, saga, mode: DAEMON });
const withReducer = injectReducer({ key, reducer });

export function ProjectPage(props) {
  const {
    getProjectCollectionData,
    projectCollection,
    getProjectList,
    projectList,
    CreateProject,
  } = props;

  const [projectName, setProjectName] = React.useState('');
  const [projectDescription, setProjectDescription] = React.useState('');
  const [versionType, setVersionType] = React.useState('1');
  const [sprintCount, setSprintCount] = React.useState('');
  const [sprintDate, setSprintDate] = React.useState('');
  const [projectCollectionID, setProjectCollectionID] = React.useState(false);
  const [showErrors, setShowErrors] = React.useState(false);

  React.useEffect(() => {
    getProjectCollectionData();
  }, []);

  React.useEffect(() => {
    !isEmpty(projectCollection) &&
      !isEmpty(projectCollection.value) &&
      setProjectCollectionID(projectCollection.value[0].id);
  }, [projectCollection]);

  const handleChange = e => {
    setProjectCollectionID(e.target.value);
    getProjectList();
  };

  const isCreateDisabled = () => {
    return (
      isEmpty(projectName) ||
      isEmpty(projectDescription) ||
      isEmpty(sprintCount) ||
      isEmpty(sprintDate) ||
      isEmpty(versionType) ||
      isEmpty(projectCollectionID)
    );
  };

  const onCreateClick = () => {
    if (isCreateDisabled()) {
      setShowErrors(true);
    } else {
      setShowErrors(false);
      CreateProject({
        Name: projectName,
        Description: projectDescription,
        State: versionType,
        Capabilities: sprintCount,
        LastUpdateTime: sprintDate,
      });
    }
  };

  return (
    <div className="container">
      <div className="page-title">Create Project</div>
      <div className="page-subtitle">
        Select project Collection name to get list of projects, To create new
        project, please provide project details and click on create button
      </div>
      <div className="container-1">
        <div className="row justify-content-start">
          <label className="col-3">Project Collection Name</label>
          <div className="col-4 relative">
            <select
              className="custom-select"
              value={projectCollectionID}
              onChange={handleChange}
            >
              {projectCollection &&
                projectCollection.value &&
                projectCollection.value.map(projColObj => (
                  <React.Fragment key={projColObj.id}>
                    <option value={projColObj.id}>{projColObj.name}</option>
                  </React.Fragment>
                ))}
            </select>
            {isEmpty(projectCollection) && showErrors && (
              <div className="error-description">
                Please select a Collection
              </div>
            )}
          </div>
        </div>
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
                <input
                  type="text"
                  name="projectName"
                  value={projectName}
                  placeholder="Project 1"
                  onChange={e => {
                    setProjectName(e.target.value);
                  }}
                />
                {isEmpty(projectName) && showErrors && (
                  <div className="error-description">Name is Required</div>
                )}
              </td>
              <td>
                <input
                  type="text"
                  name="projectDescription"
                  value={projectDescription}
                  placeholder="Project 1"
                  onChange={e => {
                    setProjectDescription(e.target.value);
                  }}
                />
              </td>
              <td>
                <select
                  name="versionType"
                  value={versionType}
                  className="custom-select"
                  onChange={e => {
                    setVersionType(e.target.value);
                  }}
                >
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  name="sprintCount"
                  value={sprintCount}
                  placeholder="0"
                  onChange={e => {
                    let count = e.target.value;
                    count >= 0 && setSprintCount(count);
                  }}
                />
                {isEmpty(sprintCount) && showErrors && (
                  <div className="error-description">
                    Sprint Count is Required
                  </div>
                )}
              </td>
              <td>
                <input
                  type="date"
                  name="SprintStartDate"
                  value={sprintDate}
                  placeholder=""
                  onChange={e => {
                    setSprintDate(e.target.value);
                  }}
                />
                {isEmpty(sprintDate) && showErrors && (
                  <div className="error-description">
                    Sprint Start Date is Required
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <p className="text-right">
          <button
            type="button"
            className="btn btn-primary"
            onClick={onCreateClick}
          >
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
            {projectList &&
              projectList.value &&
              projectList.value.map(projLstObj => (
                <tr key={projLstObj.id}>
                  <td>{projLstObj.name}</td>
                  <td>{projLstObj.id}</td>
                  <td>{projLstObj.description}</td>
                  <td>{projLstObj.state}</td>
                  <td>{projLstObj.visibility}</td>
                  <td>
                    <button type="button" className="btn btn-link">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function mapStateToProps({ projectPage }) {
  return {
    isFetching: projectPage ? projectPage.isFetching : false,
    isError: projectPage ? projectPage.isError : false,
    projectCollection: projectPage ? projectPage.projectCollection : {},
    projectList: projectPage ? projectPage.projectList : {},
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProjectCollectionData: () => dispatch(getProjectCollection()),
    getProjectList: () => dispatch(getProjectList()),
    CreateProject: params => dispatch(CreateProject(params)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withSaga,
  withReducer,
  memo,
)(ProjectPage);
