import {Controller} from './src/controllers/controllers.js'
import {MedicaoController} from'./src/controllers/medicaoController.js'
import { MedicaoModel } from './src/models/medicaoModel.js'

const displayForm = new Controller()

// controle de medição

const model = new MedicaoModel()
const controllers = new MedicaoController(model)

const bntMostrarFormulario = document.querySelector('#mostrar-formulario')


bntMostrarFormulario.addEventListener('click', ()=>{
    
    const DisplayInicial = document.querySelector('.hero')
    const form = document.querySelector('#secao-formulario')

    displayForm.ativarFormulario(form)

    displayForm.desativarDisplayInicial(DisplayInicial)

})

const form = document.querySelector('.form')
const botaoMostrarRegistros = document.querySelector('#mostrar-registros')

form.addEventListener('submit',(event) => controllers.enviarFormulario(event))
botaoMostrarRegistros.addEventListener('click', () => controllers.mostrarRegistros())

// voltar ao status inicial da pagina

const bntSair = document.querySelector('#sair')

bntSair.addEventListener('click', () =>{
    const hero = document.querySelector('.hero')
    const secaoFormulario = document.querySelector('#secao-formulario')
    const secaoDados = document.querySelector('#mostrar-dados')
    const status = document.querySelector('#mostrar-status')

    displayForm.resetarTelaInicial(hero,secaoFormulario,secaoDados,status)
})

// footer

const anoAtual = document.querySelector('#ano-atual')

if(anoAtual){
    anoAtual.textContent = new Date().getFullYear();
}