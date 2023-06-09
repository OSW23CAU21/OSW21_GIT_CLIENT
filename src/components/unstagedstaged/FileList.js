import React, {useState} from 'react';
import './filelist.css';
const {ipcRenderer} = window.require('electron');

const sendSelectedFiles = async (selectedFiles, length) => { //getting FileInfo from backend "main.js" using electron.
    try {
        return await ipcRenderer.invoke('SUS_GitAdd', selectedFiles, length);
    } catch {
        console.error('Error : gitAdd');
    }
};

const FileList = ({files, onFileSelect, buttonName}) => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileClick = file => {
        if (selectedFiles.includes(file)) {
            setSelectedFiles(selectedFiles.filter(selected => selected !== file));
        } else {
            setSelectedFiles([...selectedFiles, file]);
        }
    };

    const handleButtonClick = async () => {
        sendSelectedFiles(selectedFiles, selectedFiles.length).then(onFileSelect);
        setSelectedFiles([]);
    };

    return (
        <>
            <div className="scrollable-list">
                <ul>
                    {files.map((file, index) => (
                        <li
                            key={index}
                            onClick={() => handleFileClick(file)}
                            style={{
                                cursor: 'pointer',
                                backgroundColor: selectedFiles.includes(file) ? 'lightblue' : '',
                            }}
                        >
                            {file.status + ':    ' + file.name }
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={handleButtonClick}>{buttonName}</button>
        </>

    );
};

export default FileList;
