export class MedicaoModel{
    chave = 'medicao'

    salvar({nome,data,medicao}){
        if(!nome || !data || !medicao){
            return {ok:false,erro:'Preencha todos os campos!!'}
        }

        const medicoesAtuais = this.listar();

        const novaMedicao = {nome,data,medicao}
        medicoesAtuais.push(novaMedicao)

        localStorage.setItem(this.chave, JSON.stringify(medicoesAtuais))

        return {ok:true, dados: novaMedicao}
    }

    listar(){
        return JSON.parse(localStorage.getItem(this.chave)) || [];
    }
}
