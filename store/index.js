// your-project/store/index.js

export const state = () => ({
  url_server:"http://backend:5000/api/",
})

export const mutations = {
  SET_url_server (state, value) {
    state.url_server = value
  }}
