export default function ({ store, redirect }) {
    try{
        if(store.state.auth.user.state === 'admin'){
            return redirect('/admin/management')
          }
    }catch(error){

    }

  }