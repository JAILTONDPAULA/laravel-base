// Variáveis para debounce da busca
let typingTimer;
const typingDelay = 300;

$(document).ready(function(){
    $(document).on("click",".linha>div>svg",Tabela.ordem.selecionar)
    $(document).on("input paste", ".searchbox", function() {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
            Tabela.buscador.filtrar.call(this);
        }, typingDelay);
    });
    $(document).on("input paste",".coringa",Tabela.buscador.selecionaTodos)           // * filtro subcaixas dos filtros
    $(document).on("change",".listbox input:not(.coringa)",Tabela.buscador.filtrarCk) // * filtro subcaixas dos filtros

    $(document).on("click", function(e) {
        const $target = $(e.target);
        const $clickedFilter = $target.closest('.cl_filtro');

        if ($clickedFilter.length) {
            // Fecha todos os outros filtros
            $('.cl_filtro').not($clickedFilter).find('.boxfilter').css({
                height: "0px", padding: "0px", "box-shadow": "none"
            });

            // Se clicou em elemento interativo (input, label, searchbox), mantém aberto
            if ($target.is('.boxfilter *')) {
                return;
            }

            // Se clicou fora do boxfilter, abre o filtro
            if (!$target.closest('.boxfilter').length) {
                Tabela.buscador.mostrar.call($clickedFilter[0]);
            }
        } else {
            // Clicou fora de qualquer filtro - fecha todos
            $('.cl_filtro .boxfilter').css({
                height: "0px", padding: "0px", "box-shadow": "none"
            });
        }
    });

    $(document).on("click","#download_xls",Tabela.download)

    $(document).on("click",".paginacao button.number",function(){ Paginacao.selecionar(this) })
    $(document).on("click",".paginacao .next",Paginacao.next)
    $(document).on("click",".paginacao .back",Paginacao.prev)
    $(document).on("click","#tabela01 .last" ,function() { Paginacao.last() })
    $(document).on("click","#tabela01 .first",Paginacao.buttons)
    $(document).on("change","#quantitypage",Tabela.alterpage.change);


});

Tabela = class {

    static download() {
        // ? ====: modelo { original: 'nome_coordenador', novoNome: 'EQUIPE' } :=== ? //
        // ? ====: modelo { original: prop json, novoNome: coluna xls } :=== ? //

        // Validar se window.xls existe, é array e tem valores
        if (!window.xls || !Array.isArray(window.xls) || window.xls.length === 0) {
            alert("XLS não configurado");
            return;
        }

        let dados =JSON.parse($(".tabela").data("linhas"))

        const dadosParaExportar = dados.map(item => {
            const novoItem = {};
            window.xls.forEach(col => {
                novoItem[col.novoNome] = item[col.original];
            });
            return novoItem;
        });


        const ws = XLSX.utils.json_to_sheet(dadosParaExportar);

        // Cria um workbook com essa planilha
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Relatorio");

        // Gera e baixa o arquivo
        XLSX.writeFile(wb, "relatorio.xlsx");
    }

    static func = _ => { alert("Função estática 'func' ainda não foi definida!"); };
    static indicador = _=>null;

    static buscador = {
        // ? =====> filtros de buscar nas caixas <===== ? //
        mostrar() {
            $(this).find('.boxfilter').css({
                height: 'fit-content',
                padding: '2px',       // ou padding original que preferir
                'box-shadow': '1px 1px 1px 1px #0002'   // volta ao padrão original
            }).find("[type=tel]").focus();

        },
        ocultar() {
            const el = this;
            setTimeout(() => {
                if (!el.contains(document.activeElement)) {
                    // Alterar CSS do filho .boxfilter dentro do .cl_filtro que perdeu o foco
                    $(el).find('.boxfilter').css({
                        height: "0px",
                        padding: "0px",
                        "box-shadow": "none"
                    });
                }
            }, 25);
        },
        filtrar() {
            var texto  = new RegExp(this.value,"i")
            var opcoes = $(this).siblings(".listbox").find("label")
            $.each(opcoes,(i,o)=>{
                let corringa  = ($(o).find("input").data("prop") === "coringa")
                let value     = ($(o).find("input").val())
                if(!corringa && !texto.test(value)) {
                    $(o).slideUp(200)
                } else {
                    $(o).slideDown(200,function(){ $(this).css({display:"flex"}) })
                }
            })
        },
        // ? ====> selecionar opções <===== ? //
        selecionaTodos() {
            $(this).closest(".listbox").find("input").prop("checked",this.checked)
            this.checked && $(this).closest(".listbox").find("input:not(.coringa)").eq(0).trigger("change")
            let id = $(this).closest(".boxfilter").attr("id")
            window.filterorder = window.filterorder || [];
            window.filterorder = window.filterorder.filter(item => item !== id);
        },
        filtrarCk() {
            let filtro = $(this).closest(".listbox").find("input:not(.coringa):checked").map((i,o)=>o.value).get();
            $(this).closest(".boxfilter").data("valores",filtro)
            let n  = $(this).closest(".listbox").find("input:not(.coringa)").length
            let n2 = $(this).closest(".listbox").find("input:not(.coringa):checked").length
            let id = $(this).closest(".boxfilter").attr("id")
            window.filterorder = window.filterorder || [];
            window.filterorder.includes(id) || window.filterorder.push(id)

            if(n > n2) {
                $(this).closest('.cl_filtro').find('div>svg,>span').css({background:"var(--p-orange-500)"})
            } else {
                $(this).closest('.cl_filtro').find('div>svg').css({background:"#0000"});
                $(this).closest('.cl_filtro').find('>span').css({background:"#0000"})
                // if($(this).closest('.cl_filtro').find('>svg').css("background")=="#0000") {
                // }
            }

            Tabela.buscador.filtrarline()
        },
        filtrarline(idline=null) {
            let original = JSON.parse($(".tabela").data("original"))
            Tabela.buscador.ordernador()
            let filtrada = original
            window.ordemfinal.map((o,i)=>{
                let prop   = $(`#${o}`).data("prop")
                let value  = $(`#${o}`).data("valores")

                if (Array.isArray(value)) {
                    if (value.length > 0) {
                        // Se tem itens selecionados, filtra normalmente
                        filtrada = filtrada.filter(i=>value.some(v=> v == (i[prop]||"null") ))
                    } else {
                        // Se não tem nada selecionado, mostra lista vazia
                        filtrada = []
                    }
                }

                let contem = filtrada?filtrada.map(p => p[prop]):[]
                let opcoes = [...new Set(original.map(p => p[prop]))]
                .sort()
                .map(i =>`<label><input type="checkbox" value="${i}" ${contem.some(v=>v==i)?"checked":""}>${i}</label>`)
                .join('')
                if(parseInt($(`#${o}`).css("height")) <= 2 ){ $(`#${o} .listbox`).html(`<label><input type="checkbox" value="&" class="coringa" ${original.length===filtrada.length?"checked":""}></label>`+opcoes); }
                original = filtrada;
            });
            filtrada = window.criterio?Tabela.ordem.ordenarPorCriterios(filtrada,window.criterio):filtrada
            $(".tabela").data("linhas",JSON.stringify(filtrada))
            Tabela.indicador()
            if(!idline) {
                $(".tabela .linha:not(.cabecalho)").remove()
                Paginacao.buttons()
            }
            !idline ? Paginacao.buttons() : $(`.idline${idline}`).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
            Tabela.buscador.contador(filtrada)
        },
        contador(tabela) {
            window.contadores.forEach((contador) => {
                const [tipo, campo, seletor, valor] = contador;
                let resultado = 0;

                switch (tipo) {
                    case "Q":
                        // Conta valores únicos
                        const unicos = new Set(tabela.map(item => item[campo]));
                        resultado = unicos.size;
                        break;

                    case "P":
                        // Conta a quantidade de registros que têm um valor específico na propriedade
                        if (valor === undefined) {
                            console.warn(`Tipo P requer um valor para filtrar. Contador: [${contador.join(', ')}]`);
                            resultado = 0;
                        } else {
                            resultado = tabela.filter(item => item[campo] === valor).length;
                        }
                        break;

                    case "S":
                        // Soma valores simples (convertendo string para número)
                        resultado = tabela.reduce((acc, item) => {
                            const valor = parseFloat(item[campo]) || 0;
                            return acc + valor;
                        }, 0);
                        break;

                    case "R":
                        // Soma valores e formata como moeda Real
                        resultado = tabela.reduce((acc, item) => {
                            const valor = parseFloat(item[campo]) || 0;
                            return acc + valor;
                        }, 0);
                        // Formata como Real
                        resultado = resultado.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        });
                        break;

                    default:
                        console.warn(`Tipo ${tipo} não reconhecido.`);
                        return;
                }
                $(seletor).text(resultado);
            });
        },
        ordernador() {
            window.ordemfinal  = [];
            window.filterorder = window.filterorder?window.filterorder:[]
            const visitados = new Set();

            for (const item of window.filterorder) {
                if (window.filterorigin.includes(item) && !visitados.has(item)) {
                    window.ordemfinal.push(item);
                    visitados.add(item);
                }
            }

            for (const item of window.filterorigin) {
                if (!visitados.has(item)) {
                    window.ordemfinal.push(item);
                }
            }

        },
    }

    static ordem = {

        selecionar(e) {
            e.stopPropagation();
            window.criterio = window.criterio?window.criterio:[];
            let chave       = this.dataset.chave;
            let index       = window.criterio.findIndex(c=> c.chave === chave);
            let lista       = JSON.parse($(".tabela").data("linhas"))
            if($(this).is(".asc")) {
                $(this).replaceWith(`<svg xmlns="http://www.w3.org/2000/svg" data-chave="${chave}" class="desc" height="16px" viewBox="0 -960 960 960" width="16px" fill="var(--p-orange-500)"><path d="M412-114v-470L210-383l-96-97 366-366 366 366-96 98-202-202v470H412Z"/></svg>`)
                index === -1 ? window.criterio.push({ chave, ordem: 'desc' }) : window.criterio[index].ordem = 'desc';
            } else if($(this).is(".desc")) {
                $(this).replaceWith(`<svg xmlns="http://www.w3.org/2000/svg" data-chave="${chave}" height="16px" viewBox="0 -960 960 960" width="16px" fill="#fff"><path d="M86-172v-125h291v125H86Zm0-245v-125h539v125H86Zm0-245v-125h788v125H86Z"/></svg>`)
                index === -1 ? null : window.criterio.splice(index,1);
            } else {
                $(this).replaceWith(`<svg xmlns="http://www.w3.org/2000/svg" data-chave="${chave}" class="asc" height="16px" viewBox="0 -960 960 960" width="16px" fill="var(--p-orange-500)"><path d="M412-114v-470L210-383l-96-97 366-366 366 366-96 98-202-202v470H412Z"/></svg>`)
                index === -1 ? window.criterio.push({ chave, ordem: 'asc' }) : window.criterio[index].ordem = 'asc';
            }
            let tabela = Tabela.ordem.ordenarPorCriterios(lista,window.criterio)
            $(".tabela").data("linhas",JSON.stringify(tabela))
            $(".tabela .linha:not(.cabecalho)").remove()
            Paginacao.buttons()
            // $(".tabela").append(tabela.map(Tabela.func).join(''))
        },

        ordenarPorCriterios(array, criterios) {
            return array.sort((a, b) => {
                for (let criterio of criterios) {
                    let { chave, ordem } = criterio;
                    let valA = a[chave];
                    let valB = b[chave];

                    const isNullish = val => val === null || val === undefined;

                    // Regra especial para null/undefined
                    if (isNullish(valA) && isNullish(valB)) continue;
                    if (isNullish(valA)) return ordem === 'asc' ? 1 : -1;
                    if (isNullish(valB)) return ordem === 'asc' ? -1 : 1;

                    // Detecta se é string de data no formato yyyy-mm-dd ou yyyy-mm-dd hh:mm:ss
                    const isDateString = str =>
                        typeof str === 'string' &&
                        /^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})?$/.test(str);

                    // Detecta se é um número ou string que representa um número (inteiro ou float)
                    const isNumeric = val =>
                        (typeof val === 'number' && !isNaN(val)) ||
                        (typeof val === 'string' && /^-?\d+(\.\d+)?$/.test(val) && !isNaN(parseFloat(val)));

                    // Converte para Date se for data
                    if (isDateString(valA) && isDateString(valB)) {
                        valA = new Date(valA);
                        valB = new Date(valB);
                    } else if (isNumeric(valA) && isNumeric(valB)) {
                        // Converte para float se for numérico (ou string numérica)
                        valA = parseFloat(valA);
                        valB = parseFloat(valB);
                    } else {
                        // Comparação padrão (string ou número)
                        if (typeof valA === 'string') valA = valA.toLowerCase();
                        if (typeof valB === 'string') valB = valB.toLowerCase();
                    }

                    if (valA < valB) return ordem === 'asc' ? -1 : 1;
                    if (valA > valB) return ordem === 'asc' ? 1 : -1;
                    // Se forem iguais, passa para o próximo critério
                }
                return 0;
            });
        }
    }

    static alterpage = {
        change() {
            Paginacao.itens = $(this).val() === "all" ? JSON.parse($(".tabela").data("original")).length : parseInt($(this).val());
            Tabela.buscador.filtrarline();
        }
    }
}

Paginacao = class{

    static itens = 50;

    static buttons() {

        var lista = JSON.parse($(".tabela").data("linhas"))                                // * buscar lista atual dos itens
        $("#tabela01").find("button.number").remove()                                      // * remover botões númericos para atualizar
        var buttons = ""                                                                   // * html button
        var param   = (lista.length/Paginacao.itens) > 10 ? 10 : (lista.length/Paginacao.itens)                    // * definir se será mostrado 10 ou menos buttões
        for (let i = 0;i < param; i++) {
            buttons+=`<button type="button" class="number">${i+1}</button>`                // * montar botões e números
        }
        $("#tabela01").find("button.back").after(buttons)                                  // * adiciona na tela botões

        $(`#tabela01 button.number`).eq(0).addClass("selected")           // * selecionar página 1
        Paginacao.selecionar($(`button.number`).eq(0)[0])
    }

    static selecionar(button) {

        var lista  = JSON.parse($(".tabela").data("linhas"))                                 // * seleciona lista na tela
        $(button).closest(".paginacao").find("button.number").removeClass("selected")        // * remover item checado
        $(button).addClass("selected")                                                       // * adicionar o botão atual como checado
        // * reordenar bitton * //
        if(parseInt($(button).text()) < (lista.length/Paginacao.itens) && $(button).next().is(".next")) {
            $(button).after(`<button type="button" class="number">${parseInt($(button).text())+1}</button>`)
            $(button).closest('.paginacao').find(".back").next().remove()
        }else if($(button).prev().is(".back") && $(button).text() != "1"){
            $(button).closest('.paginacao').find('.back').after(`<button type="button" class="number">${parseInt($(button).text())-1}</button>`)
            $(button).closest('.paginacao').find(".next").prev().remove()
        }
        // * definir registro de inicio e fim * //
        var inicio  = ((parseInt($(button).text())-1)*Paginacao.itens)
        var fim     = inicio+Paginacao.itens
        var pagina  = lista.slice(inicio,fim)
        // $(".tabela").data("linhas",JSON.stringify(pagina))  // * atualizar lista a ser visualizadda no data * //
        $(button).closest(".paginacao").find(".first,.back").prop("disabled",($(button).text() == "1")) // * desabilitar botão inicial se for necessário
        $(button).closest(".paginacao").find("span").text(`${inicio+1} até ${(inicio)+pagina.length} de ${lista.length}`)  // * desabilitar botão final   se for necessário
        $(".tabela").find(".linha:not(.cabecalho)").remove()
        $(".tabela").append(pagina.map(Tabela.func).join(''))

    }

    static last() {
        $("#tabela01").find("button.number").remove()                                      // * remover todos os número
        var lista   = JSON.parse($(".tabela").data("linhas"))                              // * pegar lista atual
        var buttons = ""                                                                   // * html button
        var param   = Math.ceil(lista.length/Paginacao.itens) <= 10 ? Math.ceil(lista.length/Paginacao.itens) : 10 // * definir quantidade botão
        var numero  = Math.ceil(lista.length/Paginacao.itens)
        for (let i = 0;i < param; i++) {                                                   // * montar bottão
            buttons = `<button type="button" class="number">${numero}</button>`+buttons
            numero--
        }
        $("#tabela01").find("button.back").after(buttons)                                  // * inserir botão
        $(`#tabela01 button.number`).eq(-1).addClass("selected").trigger("click")          // * selecionar bottão
    }

    static next() {
        $(this).closest(".paginacao").find(".selected").next().trigger("click")
    }

    static prev() {
        $(this).closest(".paginacao").find(".selected").prev().trigger("click")
    }
}

