export const isEmpty = (control)=>{
    if(control){
        return false;
    }else{

        return true;
    }
}
export const isLetter = (control)=>{
    if(!control.match(/^[a-zA-Z]+$/)){
        return false;
    }else{

        return true;
    }
}

export const isEmail = (control)=>{
    let lastAtPos = control.lastIndexOf("@");
      let lastDotPos = control.lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          control.indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          control.length - lastDotPos > 2
        )
      ) {
        return false;
      }else{
          return true;
      }
}