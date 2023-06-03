const git = require('isomorphic-git'); // importing Isomorpihic git.
const fs = require('fs');

// git 저장소 경로 설정
git.plugins.set('fs', fs);

// branch 생성 함수
async function createBranch(rootPath, branchName) {
    await git.branch({ fs, dir: rootPath, ref: branchName });
    console.log(`Branch '${branchName}' created.`);
}

// branch 삭제 함수
async function deleteBranch(rootPath, branchName) {
    await git.deleteRef({ fs, dir: rootPath, ref: `refs/heads/${branchName}` });
    console.log(`Branch '${branchName}' deleted.`);
}

// branch 이름 변경 함수
async function renameBranch(rootPath, oldName, newName) {
    const commitOid = await git.resolveRef({ fs, dir: rootPath, ref: `refs/heads/${oldName}` });
    await git.deleteRef({ fs, dir: rootPath, ref: `refs/heads/${oldName}` });
    await git.writeRef({ fs, dir: rootPath, ref: `refs/heads/${newName}`, value: commitOid });
    console.log(`Branch '${oldName}' renamed to '${newName}'.`);
}

// branch 체크아웃 함수
async function checkoutBranch(rootPath, branchName) {
    await git.checkout({ fs, dir: rootPath, ref: branchName });
    console.log(`Checked out branch '${branchName}'.`);
}

module.exports = {createBranch, deleteBranch, renameBranch, checkoutBranch};
