export default function ({ store, redirect }) {
    console.log(store.state.auth.user.state)
    if (store.state.auth.user.state === undefined) {
      return redirect('/')
    }
  }