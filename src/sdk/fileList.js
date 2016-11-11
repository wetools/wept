import api from './api'

export function getFileList() {
  return api({
    url: '/fileList'
  })
}

export function getFileInfo(filePath) {
  return api({
    url: '/fileInfo',
    query: { filePath }
  })
}

export function removeFile(filePath) {
  return api({
    method: 'post',
    url: '/removeFile',
    query: { filePath }
  })
}
