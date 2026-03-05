export class MedicaoController {
    constructor(model){
        this.model = model
    }

    enviarFormulario(event){
        event.preventDefault();

        const nome = document.querySelector('#nome').value.trim().toLowerCase()
        const data = document.querySelector('#data').value
        const medicao = parseFloat(document.querySelector('#medicao').value.replace(',', '.'))

        const resultado = this.model.salvar({ nome, data, medicao })

        const status = document.querySelector('#mostrar-status')

        if(!resultado.ok){
            status.textContent = resultado.erro
            status.classList.add('is-error')

            setTimeout(()=>{
                status.textContent = ''
                status.classList.remove('is-error')
            },2500)
            return
        }

        status.textContent = 'Medicao salva com sucesso'
        status.classList.remove('is-error')

        setTimeout(() =>{
            status.textContent = ''
        },2500)
        event.target.reset();
    }

    classificarMedicao(valor){
        if(valor < 70)return 'baixo'
        if(valor > 180) return 'alto'
        return 'normal'
    }

    mostrarRegistros(){
        const dadosSection = document.querySelector('#mostrar-dados')
        const lista = document.querySelector('#lista')
        const medicoes = this.model.listar()

        lista.innerHTML = ''

        if(medicoes.length === 0){
            lista.innerHTML = '<li>Nenhum registro salvo ainda.</li>'
        } else {
            medicoes.forEach((item) => {
                const dataBr = new Date(`${item.data}T00:00:00`).toLocaleDateString('pt-BR')
                const medicaoBr = Number(item.medicao).toLocaleString('pt-BR')
                const nivel = this.classificarMedicao(Number(item.medicao))

                const li = document.createElement('li')
                li.textContent = `Nome: ${item.nome} | Data: ${dataBr} | Medicao: ${medicaoBr} mg/dl | Nivel: ${nivel}`
                lista.appendChild(li)
            })
        }

        dadosSection.hidden = false
    }
}
