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

const key = 'teamPage';
const withSaga = injectSaga({ key, saga, mode: DAEMON });
const withReducer = injectReducer({ key, reducer });

export function TeamPage(props) {
  const {
    getProjectCollectionData,
    projectCollection,
    getProjectList,
    projectList,
    CreateProject,
  } = props;

  const [projectName, setProjectName] = React.useState('');
  const [projectDescription, setProjectDescription] = React.useState('');
  const [versionType, setVersionType] = React.useState('');
  const [sprintCount, setSprintCount] = React.useState('');
  const [sprintDate, setSprintDate] = React.useState('');

  React.useEffect(() => {
    getProjectCollectionData();
  }, []);

  const handleChange = () => {
    getProjectList();
  };

  const isCreateDisabled = () => {
    return (
      isEmpty(projectName) ||
      isEmpty(projectDescription) ||
      isEmpty(sprintCount) ||
      isEmpty(sprintDate) ||
      isEmpty(versionType)
    );
  };

  const onCreateClick = () => {
    CreateProject({
      Name: projectName,
      Description: projectDescription,
      State: versionType,
      Capabilities: sprintCount,
      LastUpdateTime: sprintDate,
    });
  };

  return (
    <div className="container">
      <div className="page-title">Create Team</div>
      <div className="page-subtitle">
        Select project Collection name to get list of teams, To create new team,
        please provide team details and click on create button
      </div>
      <div className="container-1">
        <div className="row justify-content-start project-collection">
          <label className="col-3">Project Collection Name</label>
          <select className="col-4 custom-select" onChange={handleChange}>
            {projectCollection &&
              projectCollection.value &&
              projectCollection.value.map(projColObj => (
                <React.Fragment key={projColObj.id}>
                  <option value={projColObj.id}>{projColObj.name}</option>
                </React.Fragment>
              ))}
          </select>
        </div>
        <div className="row justify-content-start project">
          <label className="col-3">Project</label>
          <select className="col-4 custom-select" onChange={handleChange}>
            {projectCollection &&
              projectCollection.value &&
              projectCollection.value.map(projColObj => (
                <React.Fragment key={projColObj.id}>
                  <option value={projColObj.id}>{projColObj.name}</option>
                </React.Fragment>
              ))}
          </select>
        </div>
      </div>
      <div className="container-2">
        <table className="table table-layout">
          <thead>
            <tr>
              <th scope="col">Team Name</th>
              <th scope="col">Team Description</th>
              <th scope="col">Team Members</th>
              <th scope="col">Start Iteration</th>
              <th scope="col">End Iteration</th>
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
                    setSprintCount(e.target.value);
                  }}
                />
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
              </td>
            </tr>
          </tbody>
        </table>
        <p className="text-right">
          <button
            type="button"
            className="btn btn-primary"
            disabled={isCreateDisabled()}
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
              <th scope="col">Team Name</th>
              <th scope="col">Description</th>
              <th scope="col">Project Name</th>
              <th scope="col">Team Id</th>
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
                  <td>{projLstObj.description}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function mapStateToProps({ teamPage }) {
  return {
    isFetching: teamPage ? teamPage.isFetching : false,
    isError: teamPage ? teamPage.isError : false,
    projectCollection: teamPage ? teamPage.projectCollection : {},
    projectList: teamPage ? teamPage.projectList : {},
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
)(TeamPage);
