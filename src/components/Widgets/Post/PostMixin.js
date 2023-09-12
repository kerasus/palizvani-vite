import { APIGateway } from 'src/api/APIGateway.js'

const mixinAuth = {
  methods: {
    uploadAudio (files, updateUploadingProgressBar, onFileUpload, onError) {
      const formData = new FormData()
      formData.append('file', files[0])
      formData.append('type', 'SOUND')
      this.$axios.post(APIGateway.media.APIAdresses.base, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          const { loaded, total } = progressEvent
          const percentage = Math.floor((loaded * 100) / total)
          updateUploadingProgressBar(percentage + '%')
        }
      })
        .then((response) => {
          onFileUpload(response.data.file)
        })
        .catch(() => {
          onError()
        })
    },
    uploadVideo (files, updateUploadingProgressBar, onFileUpload, onError) {
      const formData = new FormData()
      formData.append('file', files[0])
      formData.append('type', 'VIDEO')
      this.$axios.post(APIGateway.media.APIAdresses.base, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          const { loaded, total } = progressEvent
          const percentage = Math.floor((loaded * 100) / total)
          updateUploadingProgressBar(percentage + '%')
        }
      })
        .then((response) => {
          onFileUpload(response.data.file)
        })
        .catch(() => {
          onError()
        })
    }
  }
}

export default mixinAuth
