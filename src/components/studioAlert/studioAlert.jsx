import Swal from 'sweetalert2';


export const showStudioAlert = (title, text, icon = 'info') => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: 'OK',
    confirmButtonColor: '#f36100', 
    background: '#1a1a1a',      
    color: '#ffffff',          
    iconColor: '#f36100',  

   
    customClass: {
      popup: 'my-custom-popup'
    }
  });
};