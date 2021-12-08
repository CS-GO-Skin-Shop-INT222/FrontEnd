export default function ({ store, redirect }) {
    try{
      if (store.state.auth.user.state === undefined || store.state.auth.user.state === null ) {
        return redirect('/')
      }
    }catch(error){
      return redirect('/')
    }

  }