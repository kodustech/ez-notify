import { auth } from 'firebase';

export default function({ redirect }) {
  if (!auth().currentUser) {
   redirect('/login')
  }
  /* setTimeout(() => {
    const user = localStorage.getItem('currentUser');
    const fireUser = auth().currentUser;
    
    console.log('auth().currentUser', fireUser)
    console.log('user', user)
    
    if(user && !fireUser) {
      console.log('eeeee')
    } else if (!fireUser && !user) {
      redirect('/login')
    }
  }, 300); */
}
