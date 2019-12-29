import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-content',
  templateUrl: './header-content.component.html',
  styleUrls: ['./header-content.component.scss']
})
export class HeaderContentComponent implements OnInit {

  public info = {
    title: {
      show: false,
      data: '' 
    },
    subTitle: {
      show: false,
      data: ''
    },
    button: {
      show: false,
      data: '',
      redirectURL: ''
    }
  };


  
  constructor() { }

  ngOnInit() {
    this.getInfo();
  }

  getInfo(){

    let path = window.location.pathname;

    switch (path) {
      case '/crear-troncal':

        this.info = {
          title: {
            show: true, 
            data: 'Crear Troncal'
          },
          subTitle: {
            show: false,
            data: ''
          },
          button:{
            show: true,
            data: 'regresar',
            redirectURL: '/troncales'
          }
        }
        break;
      
      case '/troncales':

        this.info = {
          title: {
            show: true,
            data: 'Troncales'
          },
          subTitle: {
            show: true,
            data: ''
          },
          button: {
            show: true,
            data: 'Crear Troncal',
            redirectURL: '/crear-troncal'
          }
        }
        break;
      
      case '/usuarios':

        this.info = {
          title: {
            show: true,
            data: 'Usuarios'
          },
          subTitle: {
            show: true,
            data: ''
          },
          button: {
            show: true,
            data: 'Crear Usuario',
            redirectURL: '/crear-usuario'
          }
        }
        break;

      case '/crear-usuario':

        this.info = {
          title: {
            show: true,
            data: 'Crear Usuario'
          },
          subTitle: {
            show: true,
            data: ''
          },
          button: {
            show: true,
            data: 'Regresar',
            redirectURL: '/usuarios'
          }
        }
        break;

      case '/grupos':

        this.info = {
          title: {
            show: true,
            data: 'Grupos'
          },
          subTitle: {
            show: true,
            data: ''
          },
          button: {
            show: true,
            data: 'Crear grupo',
            redirectURL: '/crear-grupo'
          }
        }
        break;

      case '/crear-grupo':

        this.info = {
          title: {
            show: true,
            data: 'Crear Grupo'
          },
          subTitle: {
            show: true,
            data: ''
          },
          button: {
            show: true,
            data: 'Regresar',
            redirectURL: '/grupos'
          }
        }
        break;
      
      case '/campanas':

        this.info = {
          title: {
            show: true,
            data: 'Campañas'
          },
          subTitle: {
            show: true,
            data: ''
          },
          button: {
            show: true,
            data: 'Crear campaña',
            redirectURL: '/crear-campana'
          }
        }
        break;

      case '/crear-campana':

        this.info = {
          title: {
            show: true,
            data: 'Crear Campana'
          },
          subTitle: {
            show: true,
            data: ''
          },
          button: {
            show: true,
            data: 'Regresar',
            redirectURL: '/campanas'
          }
        }
        break;

      case '/dashboard':

        this.info = {
          title: {
            show: true,
            data: 'Panel de control'
          },
          subTitle: {
            show: true,
            data: ''
          },
          button: {
            show: true,
            data: '',
            redirectURL: ''
          }
        }
        break;

      case '/':

        this.info = {
          title: {
            show: true,
            data: 'Llamadas'
          },
          subTitle: {
            show: true,
            data: ''
          },
          button: {
            show: true,
            data: '',
            redirectURL: ''
          }
        }
        break;
      
        

    
      default:
        if (path.indexOf('editar-usuario')> -1){
          this.info = {
            title: {
              show: true,
              data: 'Editar Usuario'
            },
            subTitle: {
              show: true,
              data: 'Usuario ' + path.split('/')[path.split('/').length - 1]
            },
            button: {
              show: true,
              data: 'Regresar',
              redirectURL: '/usuarios'
            }
          }
        }

        if (path.indexOf('editar-grupo')> -1) {
          this.info = {
            title: {
              show: true,
              data: 'Editar grupo'
            },
            subTitle: {
              show: true,
              data: 'Grupo ' + path.split('/')[path.split('/').length - 1]
            },
            button: {
              show: true,
              data: 'Regresar',
              redirectURL: '/grupos'
            }
          }
        }
        break;
    }

  }

}
