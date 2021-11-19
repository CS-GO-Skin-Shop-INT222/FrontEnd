export default function ({ store, redirect }) {
  try{
    if(store.state === null){
      return redirect('/')
    }else{
  
      if (store.state.auth.user.state === undefined || store.state.auth.user.state === null ) {
        return redirect('/')
      }
      if(store.state.auth.user.state !== undefined || store.state.auth.user.state === 'admin' ){
        console.log("wtf")
        return redirect('/admin/management')
      }
    }
  }catch(error){
    return redirect('/')
  }

  }