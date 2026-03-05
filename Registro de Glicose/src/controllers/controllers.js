
export class Controller{

    ativarFormulario(mostrarDiv){

       mostrarDiv.hidden = false
        
    }

    desativarDisplayInicial(devInicial){
        devInicial.hidden = true;
    }

    resetarTelaInicial(hero,secaoFormulario,secaoDados,status){
        hero.hidden = false
        secaoFormulario.hidden = true
        secaoDados.hidden = true

        if(status){
            status.textContent = ""
            status.classList.remove('is-error')
        }
    }
}