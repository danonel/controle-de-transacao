const Toast = {
  init(){
    this.hideTimeout = null;

    this.el = document.createElement('div');
    this.el.className = 'toast';
    document.body.appendChild(this.el)
  },
  
  show(mensagem , state){
    clearTimeout(this.hideTimeout);
    this.el.textContent = mensagem;
    this.el.className = 'toast toast--visible'

    if(state){
      this.el.classList.add(`toast--${state}`)
    }

    this.hideTimeout = setTimeout(() => {
      this.el.classList.remove('toast--visible')
    },1500)
  }
}

document.addEventListener('DOMContentLoaded', () => Toast.init())