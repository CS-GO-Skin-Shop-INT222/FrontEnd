export default function ({ store, redirect }) {
    if (store.state.auth.user.state === undefined) {
      return redirect('/')
    }
    if(store.state.auth.user.state === 'admin'){
      return redirect('/admin/management')
    }
  }