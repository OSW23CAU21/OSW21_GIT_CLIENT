import React from 'react';
import Menubar from '../components/menubar/Menubar';
import UnstagedStaged from '../components/unstagedstaged/UnstagedStaged';
import FileManagement from '../components/filemanagement/FileManagement';
import GitFab from '../components/gitfab/GitFab.js';

const Workspace = () => {
  return (
    <div>
      <Menubar />
      <FileManagement />
      <UnstagedStaged />
      <GitFab/>
    </div>
  );
};

export default Workspace;
