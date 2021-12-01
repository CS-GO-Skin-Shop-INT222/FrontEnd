export default function ({store,redirect }) {
    try{
      if (store.state.auth.user !== null) {
        return redirect('/')
      }
    }catch(error){

    }

  }