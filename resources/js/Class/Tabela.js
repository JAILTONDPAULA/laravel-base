// Variáveis para debounce da busca
let typingTimer;
// * //////////////////////////////////////////////////
// * // V2 - versão otimizada e dinamica //////////////
// * //////////////////////////////////////////////////
class TableStorage {
    static events = {
        init(){
            TableStorage.events.dom();
        },
        dom() {
            $(document).on("click","#altercolumns",TableStorage.builder.alterColumns.open);
            $(document).on("submit",".modalColumn",TableStorage.builder.alterColumns.submit);
            $(document).on("click",".paginacao.tableV2 button.number",function(){ TableStorage.pagination.selecionar($(this)); });  // * selecionar página * //
            $(document).on("click",".paginacao.tableV2 button.last" ,TableStorage.pagination.last);                                 // * ir para última página * //
            $(document).on("click",".paginacao.tableV2 .next", TableStorage.pagination.next);                                       // * próxima página * //
            $(document).on("click",".paginacao.tableV2 .back", TableStorage.pagination.prev);                                       // * página anterior * //
            $(document).on("click",".paginacao.tableV2 .first", TableStorage.pagination.first);                                     // * ir para primeira página * //
            $(document).on("change","#quantitypage.v2",TableStorage.pagination.changeQuantity);                                     // * alterar quantidade por página * //
            $(document).on("click",".linha.v2>div>svg",TableStorage.ordernation.selecionar);                                        // * ordenar colunas * //
            $(document).on("click", TableStorage.builderLines.openBoxFilter);                                                       // * mostrar filtro * //
            $(document).on("input paste", ".searchbox.v2", TableStorage.builderLines.inputSearch);                                  // * buscar filtro * //
            $(document).on("input paste",".coringa.v2",TableStorage.builderLines.selectAll);                                        // * selecionar todos os filtros * //
            $(document).on("change", ".listbox.v2 input:not(.coringa)", TableStorage.builderLines.filteredCheckeds);                // * filtrar linhas * //
            $(document).on("click","#download_xls.v2", TableStorage.xls.download);                                                  // * download xls * //
        }
    }
    // * montagem da tabela e colunas *//
    static builder = {
        startTable({id_table, htmlFunc=null, download = true, refresh = true, columns = null, contadores = [], contadoresBody = [], data = null, quantityPage = 50, regenered = false}) {
            if(!STORAGE.has(id_table)) {
                if(!columns) {
                    alert('As colunas da tabela não foram definidas');
                    return;
                }
                STORAGE.set(id_table, {
                    originTable: data||[],
                    filteredTable: data||[],
                    $element: $(`.${id_table}`),
                    columns,
                    xls: [],
                    originFilter: [],
                    filteredOrder: [],
                    order: [],
                    contadores,
                    contadoresBody,
                    htmlFunc,
                    download,
                    refresh,
                    quantityPage: 50,
                    criterio: []
                });
            } else {
                if(data) {
                    STORAGE.get(id_table).originTable = data;
                    STORAGE.get(id_table).filteredTable = data;
                }
            }

            const mytable = STORAGE.get(id_table);
            mytable.xls = mytable.columns.filter(c=>c[3]).map(c=>({ original: c[0], novoNome: c[1] }));;
            mytable.originFilter = mytable.columns.filter(c=>c[2]).map(c=>`id_${c[0]}`);
            if(mytable.criterio.length === 0 || regenered) {
                const contadoeresHtml = mytable.contadores.map(c=>{
                    mytable.contadoresBody.push(c[2]);
                    return `<div class="${c[1]||''}"><div class="${c[2][2].replace('.','')}"></div><div>${c[0]}</div></div>`;
                }).join('');
                const table = TableStorage.builder.pagination({download: mytable.download, refresh: mytable.refresh, contadores: contadoeresHtml})+`<div class="tabela">${TableStorage.builder.columns(mytable.columns)}</div>`;
                mytable.$element.html(table);
            }
            TableStorage.builderLines.generate({idTable: id_table});
        },
        columns(arr) {
            return `<div class="linha v2 cabecalho">`+
                    arr.filter(c=>c[2]).map(c=>{
                        return `<div class="filtro cl_filtro v2">`+
                                        `<svg xmlns="http://www.w3.org/2000/svg" data-chave="${c[0]}" height="16px" viewBox="0 -960 960 960" width="16px" fill="currentColor"><path d="M86-172v-125h291v125H86Zm0-245v-125h539v125H86Zm0-245v-125h788v125H86Z"/></svg>`+
                                        `<div><svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="currentColor"><path d="M470.77-200q-13.15 0-21.96-8.81T440-230.77v-223.08L224.15-726.77q-8.07-10.77-2.19-22Q227.85-760 240.77-760h478.46q12.92 0 18.81 11.23 5.88 11.23-2.19 22L520-453.85v223.08q0 13.15-8.81 21.96T489.23-200h-18.46Z" /></svg></div>`+
                                        `<span>${c[1]}</span>`+
                                        `<div class="boxfilter v2" id="id_${c[0]}" data-prop="${c[0]}">`+
                                        `<input type="text" class="searchbox v2">`+
                                        `<div class="listbox v2"></div>`+
                                    `</div>`+
                                `</div>`
                    }).join('')+
                    `</div>`;
        },
        pagination({download, refresh, contadores=''}) {
            return `<section class="paginacao tableV2" id="tabela01">`+
                        `<div class="contadores">${contadores}</div>`+
                        `<button type="button" class="first"><svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="currentColor"><path d="M217-208v-544h126v544H217Zm463 0L408-480l272-272 88 88-184 184 184 184-88 88Z"/></svg></button>`+
                        `<button type="button" class="back"><svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="currentColor"><path d="M434-208 162-480l272-272 88 88-184 184 184 184-88 88Zm276 0L438-480l272-272 88 88-183 184 183 184-88 88Z"/></svg></button>`+
                        `<button type="button" class="next"><svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="currentColor"><path d="M345-480 162-664l88-88 272 272-272 272-88-88 183-184Zm277 0L438-664l88-88 272 272-272 272-88-88 184-184Z"/></svg></button>`+
                        `<button type="button" class="last"><svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="currentColor"><path d="m280-208-88-88 184-184-184-184 88-88 272 272-272 272Zm337 0v-544h126v544H617Z"/></svg></button>`+
                        `<select id="quantitypage" class="v2">`+
                            `<option value="10">10</option>`+
                            `<option value="50" selected>50</option>`+
                            `<option value="100">100</option>`+
                            `<option value="all">ALL</option>`+
                        `</select>`+
                        `<span>0/0</span>`+
                        `<div id="download" class="buttonactiontable">`+
                            `<section id="altercolumns">`+
                                `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M200-440h240v-160H200v160Zm0-240h560v-80H200v80Zm0 560q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v252q-19-8-39.5-10.5t-40.5.5q-21 4-40.5 13.5T684-479l-39 39-205 204v116H200Zm0-80h240v-160H200v160Zm320-240h125l39-39q16-16 35.5-25.5T760-518v-82H520v160Zm0 360v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-300L643-80H520Zm300-263-37-37 37 37ZM580-140h38l121-122-37-37-122 121v38Zm141-141-19-18 37 37-18-19Z"/></svg>`+
                            `</section>`+
                            (refresh ? `<section id="refresh_table">`+
                                `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960"width="20px" fill="currentColor"><path d="M479.04-151.87q-137.11 0-232.62-95.51-95.51-95.51-95.51-232.62t95.51-232.62q95.51-95.51 232.62-95.51 71.16 0 135.71 29.22 64.55 29.21 110.51 83.89v-113.11h83.83v291.72H517.13V-600H683.7q-32-54.57-86.43-85.85-54.42-31.28-118.23-31.28-98.8 0-167.96 69.16Q241.91-578.8 241.91-480t69.17 167.97q69.16 69.16 167.96 69.16 75.57 0 136.73-43.28T702.17-400h95.24q-28.24 109.35-116.63 178.74-88.39 69.39-201.74 69.39Z" /></svg>`+
                            `</section>` : '')+
                            (download ? `<section id="download_xls" class="v2">`+
                                `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M480-322.87 268.52-534.35l63.89-65.41L434.5-497.44v-310.69h91v310.69l102.09-102.32 63.89 65.41L480-322.87Zm-237.13 171q-37.78 0-64.39-26.61t-26.61-64.39v-120h91v120h474.26v-120h91v120q0 37.78-26.61 64.39t-64.39 26.61H242.87Z" /></svg>`+
                            `</section>` : '')+
                        `</div>`+
                    `</section>`;
        },
        alterColumns: {
            open() {
                const dataClass = $(this).closest('.tabela-layout').data("clase");
                const myTable   = STORAGE.get(dataClass);
                const options   = myTable.columns.map(c=>{
                    return  `<label style="display: flex; align-items: center; gap: 8px; padding: 6px 12px; margin: 2px 0; border-radius: 4px; cursor: pointer; transition: all 0.2s ease; color: var(--surface-700); font-size: 12px; font-weight: 500;" onmouseover="this.style.backgroundColor='var(--surface-50)'" onmouseout="this.style.backgroundColor='transparent'">`+
                                `<input type="checkbox" value="${c[0]}" ${c[2]?'checked':''} style="margin: 0; cursor: pointer; accent-color: var(--primary-500);">`+
                                `<span style="flex: 1; user-select: none;">${c[1]}</span>`+
                            `</label>`;
                }).join('');
                Dialog.show('Alterar Colunas', `<input type="hidden" value="${dataClass}">`+options, 'modalColumn', 'Salvar');
            },
            submit(e) {
                e.preventDefault();
                const id      = $(this).find('input[type="hidden"]').val();
                const myTable = STORAGE.get(id);
                $(`.modalColumn`).find('input').toArray().forEach(input => {
                    myTable.columns = myTable.columns.map(col =>{
                        col[0] === input.value && (col[2] = input.checked);
                        return col;
                    });
                });
                TableStorage.builder.startTable({id_table: id, regenered: true});
                // Tabela.buscador.filtrarline();
                $('.modalColumn').find('.dialog-close').eq(0).trigger('click');
            }

        }
    }

    static xls = {
        download() {
            const myTable = STORAGE.get($(".tabela-layout").data("clase"));
            // ? ====: modelo { original: 'nome_coordenador', novoNome: 'EQUIPE' } :=== ? //
            // ? ====: modelo { original: prop json, novoNome: coluna xls } :=== ? //
            // Validar se window.xls existe, é array e tem valores
            if (!myTable.xls || !Array.isArray(myTable.xls) || myTable.xls.length === 0) {
                alert("XLS não configurado");
                return;
            }
            const dados = myTable.filteredTable;
            const dadosParaExportar = dados.map(item => {
                const novoItem = {};
                myTable.xls.forEach(col => {
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
    }

    static builderLines = {
        generate({idTable, render=true})
        {
            const myTable  = STORAGE.get(idTable);
            const original = myTable.originTable;
            TableStorage.builderLines.order(myTable);
            let filtered   = original;
            myTable.order.map((o,i)=>{
                const $element = $(`#${o}`);
                const prop  = $element.data("prop");
                const value = $element.data("valores");

                if (Array.isArray(value)) {
                    if (value.length > 0) {
                        // Se tem itens selecionados, filtra normalmente
                        filtered = filtered.filter(i=>value.some(v=> v == (i[prop]||"null") ))
                    } else {
                        // Se não tem nada selecionado, mostra lista vazia
                        filtered = []
                    }
                }

                const contem = filtered?filtered.map(p => p[prop]):[];
                const opcoes = [...new Set(original.map(p => p[prop]))]
                    .sort(TableStorage.ordernation.smartSort)
                    .map(i =>`<label><input type="checkbox" value="${i}" ${contem.some(v=>v==i)?"checked":""}>${TableStorage.builderLines.fomart.all(i)}</label>`)
                    .join('');
                if(parseInt($element.css("height")) <= 2 ){ $(`#${o} .listbox`).html(`<label><input type="checkbox" value="&" class="coringa v2" ${original.length===filtered.length?"checked":""}></label>`+opcoes); }
                // original = filtered;
            });
            filtered = myTable.criterio.length>0?TableStorage.ordernation.ordenarPorCriterios(filtered,myTable.criterio):filtered;
            myTable.filteredTable = filtered;
            // Tabela.indicador()
            if(render) {
                myTable.$element.find(".tabela .linha:not(.cabecalho)").remove();
                TableStorage.pagination.buttons(idTable);
            }
            TableStorage.counts.builder(idTable);
        },
        fomart: {
            all(data){
                if(!data){ return 'vazio'; }
                data = TableStorage.builderLines.fomart.dateBR(data);
                return data;
            },
            dateBR(data) {
                if(/\d{4}-\d{2}-\d{2}/.test(data)) {
                    const partes = data.split(' ');
                    return partes[0].split('-').reverse().join('/')+(partes[1] ? ` ${partes[1]}` : '');
                }
                return data;
            }
        },
        order(myTable) {
            myTable.order         = [];
            myTable.filteredOrder = myTable.filteredOrder;
            const visitados       = new Set();
            for (const item of myTable.filteredOrder) {
                if (myTable.originFilter.includes(item) && !visitados.has(item)) {
                    myTable.order.push(item);
                    visitados.add(item);
                }
            }
            for (const item of myTable.originFilter) {
                if (!visitados.has(item)) {
                    myTable.order.push(item);
                }
            }

        },
        html(myTable,list) {
            const columnas  = myTable.columns.map(c=>c[2]);
            const functions = myTable.htmlFunc.cell.filter((_, index)=>columnas[index]);
            const lines    = list.map((r,i)=>{
                return myTable.htmlFunc.line(r,i,functions);
            }).join('');
            myTable.$element.find(".tabela").append(lines);
        },
        render(myTable, element, index) {
            const columnas  = myTable.columns.map(c=>c[2]);
            const functions = myTable.htmlFunc.cell.filter((_, index)=>columnas[index]);
            return myTable.htmlFunc.line(element,index,functions);
        },
        openBoxFilter(e) {
            const $target        = $(e.target);
            const $clickedFilter = $target.closest('.cl_filtro.v2');
            if ($clickedFilter.length) {
                // Fecha todos os outros filtros
                $('.cl_filtro.v2').not($clickedFilter).find('.boxfilter').css({
                    height: "0px", padding: "0px", "box-shadow": "none"
                });

                // Se clicou em elemento interativo (input, label, searchbox), mantém aberto
                if ($target.is('.boxfilter.v2 *')) {
                    return;
                }

                // Se clicou fora do boxfilter:not(.v2), abre o filtro
                if (!$target.closest('.boxfilter.v2').length) {
                    Tabela.buscador.mostrar.call($clickedFilter[0]);
                }
            } else {
                // Clicou fora de qualquer filtro - fecha todos
                $('.cl_filtro.v2 .boxfilter').css({
                    height: "0px", padding: "0px", "box-shadow": "none"
                });
            }
        },
        inputSearch(e) {
            clearTimeout(typingTimer);
            typingTimer = setTimeout(_=>TableStorage.builderLines.filteredList.call(this), 300);
        },
        filteredList() {
            // Função para normalizar texto (remove acentos, ç->c, etc.)
            const normalizeText = (text) => {
                return text
                    .normalize('NFD') // Decompor caracteres acentuados
                    .replace(/[\u0300-\u036f]/g, '') // Remove diacríticos (acentos)
                    .replace(/ç/gi, 'c') // ç e Ç -> c
                    .toLowerCase();
            };

            const normalizedInput = normalizeText(this.value);
            const text = new RegExp(normalizedInput, "i");
            const $options = $(this).siblings(".listbox").find("label");

            $.each($options,(i,o)=>{
                const value   = ($(o).find("input").val());
                const coringa = (["&","null"].includes(value));
                const normalizedValue = normalizeText(value);
                if(!coringa && !text.test(normalizedValue)) {
                    $(o).slideUp(200);
                } else {
                    $(o).slideDown(200, function(){ $(this).css({display:"flex"}) });
                }
            });
        },
        selectAll() {
            $(this).closest(".listbox").find("input").prop("checked",this.checked);
            this.checked && $(this).closest(".listbox").find("input:not(.coringa)").eq(0).trigger("change");
            const id              = $(this).closest(".boxfilter").attr("id");
            const myTable         = STORAGE.get($(this).closest('.tabela-layout').data("clase"));
            myTable.filteredOrder = myTable.filteredOrder.filter(item => item !== id);
        },
        filteredCheckeds() {
            const filtro  = $(this).closest(".listbox").find("input:not(.coringa):checked").map((i,o)=>o.value).get();
            $(this).closest(".boxfilter").data("valores",filtro);
            const n       = $(this).closest(".listbox").find("input:not(.coringa)").length;
            const n2      = $(this).closest(".listbox").find("input:not(.coringa):checked").length;
            const id      = $(this).closest(".boxfilter").attr("id");
            const idTable = $(this).closest('.tabela-layout').data("clase");
            const myTable = STORAGE.get(idTable);
            myTable.filteredOrder.includes(id) || myTable.filteredOrder.push(id);
            if(n > n2) {
                $(this).closest('.cl_filtro').find('div>svg,>span').css({background:"var(--orange-500)"})
            } else {
                $(this).closest('.cl_filtro').find('div>svg').css({background:"#0000"});
                $(this).closest('.cl_filtro').find('>span').css({background:"#0000"})
            }
            myTable.$element.find(".tabela .linha:not(.cabecalho)").remove();
            TableStorage.builderLines.generate({idTable, render: true});
        },
    }

    static counts = {
        builder(idTbale) {
            const myTable = STORAGE.get(idTbale);
            const tabela  = myTable.filteredTable;
            myTable.contadoresBody.forEach((contador) => {
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
    }

    static ordernation = {
        selecionar(e) {
            e.stopPropagation();
            const id        = $(this).closest('.tabela-layout').data("clase");
            const myTable   = STORAGE.get(id);
            const chave     = this.dataset.chave;
            const index     = myTable.criterio.findIndex(c=> c.chave === chave);
            let  lista      = myTable.filteredTable;
            if($(this).is(".asc")) {
                $(this).replaceWith(`<svg xmlns="http://www.w3.org/2000/svg" data-chave="${chave}" class="desc" height="16px" viewBox="0 -960 960 960" width="16px" fill="var(--orange-500)"><path d="M412-114v-470L210-383l-96-97 366-366 366 366-96 98-202-202v470H412Z"/></svg>`)
                index === -1 ? myTable.criterio.push({ chave, ordem: 'desc' }) : myTable.criterio[index].ordem = 'desc';
            } else if($(this).is(".desc")) {
                $(this).replaceWith(`<svg xmlns="http://www.w3.org/2000/svg" data-chave="${chave}" height="16px" viewBox="0 -960 960 960" width="16px" fill="var(--surface-900)"><path d="M86-172v-125h291v125H86Zm0-245v-125h539v125H86Zm0-245v-125h788v125H86Z"/></svg>`)
                index === -1 ? null : myTable.criterio.splice(index,1);
            } else {
                $(this).replaceWith(`<svg xmlns="http://www.w3.org/2000/svg" data-chave="${chave}" class="asc" height="16px" viewBox="0 -960 960 960" width="16px" fill="var(--orange-500)"><path d="M412-114v-470L210-383l-96-97 366-366 366 366-96 98-202-202v470H412Z"/></svg>`)
                index === -1 ? myTable.criterio.push({ chave, ordem: 'asc' }) : myTable.criterio[index].ordem = 'asc';
            }
            myTable.filteredTable = TableStorage.ordernation.ordenarPorCriterios(lista,myTable.criterio);
            myTable.$element.find(".tabela .linha:not(.cabecalho)").remove();
            TableStorage.pagination.buttons(id);
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
        },
        smartSort(a, b) {
            const A = String(a).trim();
            const B = String(b).trim();
            const aNum = Number(A);
            const bNum = Number(B);
            const aIsNum = !isNaN(aNum) && A !== "";
            const bIsNum = !isNaN(bNum) && B !== "";
            // Se ambos forem números (inteiro ou float), ordena numericamente
            if (aIsNum && bIsNum) {
                return aNum - bNum;
            }
            // Caso contrário, usa o comportamento normal de texto
            return A.localeCompare(B);
        }
    }

    static pagination = {
        buttons(id) {
            const myTable = STORAGE.get(id);
            myTable.$element.find("button.number").remove();                                       // * remover botões antigos
            let   buttons = ""                                                                     // * html button
            const param   = Math.min(10, Math.ceil(myTable.filteredTable.length/myTable.quantityPage)); // * definir se será mostrado 10 ou menos buttões
            for (let i = 0;i < param; i++) {
                buttons+=`<button type="button" class="number">${i+1}</button>`                    // * montar botões e números
            }
            myTable.$element.find("button.back").after(buttons||`<button type="button" class="number">1</button>`)                                    // * adiciona na tela botões
            myTable.$element.find("button.number").eq(0).addClass("selected")                      // * selecionar página 1
            const $firstButton = myTable.$element.find("button.number").eq(0);
            TableStorage.pagination.selecionar($firstButton);
        },
        selecionar($button) {
            const id           = $button.closest('.tabela-layout').data("clase");
            const myTable      = STORAGE.get(id);
            const numberButton = parseInt($button.text());
            const $pagination  = $button.closest('.paginacao');
            $pagination.find("button.number").removeClass("selected");                          // * remover item checado
            $button.addClass("selected");                                                       // * adicionar o botão atual como checado
            // * reordenar bitton * //
            if(numberButton < (myTable.filteredTable.length/myTable.quantityPage) && $button.next().is(".next")) {
                $button.after(`<button type="button" class="number">${numberButton+1}</button>`);
                $pagination.find(".back").next().remove();
            }else if($button.prev().is(".back") && numberButton != 1){
                $pagination.find('.back').after(`<button type="button" class="number">${numberButton-1}</button>`);
                $pagination.find(".next").prev().remove();
            }
            // * definir registro de inicio e fim * //
            const inicio  = ((numberButton-1)*myTable.quantityPage);
            const fim     = inicio+myTable.quantityPage;
            const pagina  = myTable.filteredTable.slice(inicio,fim);
            // $(".tabela").data("linhas",JSON.stringify(pagina))  // * atualizar lista a ser visualizadda no data * //
            $pagination.find(".first,.back").prop("disabled", (numberButton == 1)); // * desabilitar botão inicial se for necessário
            $pagination.find("span").text(`${inicio+1} até ${(inicio)+pagina.length} de ${myTable.filteredTable.length}`);  // * desabilitar botão final   se for necessário
            myTable.$element.find(".tabela").find(".linha:not(.cabecalho)").remove();
            TableStorage.builderLines.html(myTable,pagina);
            // myTable.$element.find(".tabela").append(.map(Table.htmlFunc).join(''));
        },
        first() {
            const id      = $(this).closest('.tabela-layout').data("clase");
            TableStorage.pagination.buttons(id);
        },
        last() {
            const id           = $(this).closest('.tabela-layout').data("clase");
            const myTable      = STORAGE.get(id);
            let   buttons      = "";                                                                   // * html button
            myTable.$element.find("button.number").remove();                                           // * remover todos os número
            let   numero       = Math.ceil(myTable.filteredTable.length/myTable.quantityPage);
            const param        = Math.min(10, numero);                                                 // * definir quantidade botão
            for (let i = 0;i < param; i++) {                                                   // * montar bottão
                buttons = `<button type="button" class="number">${numero}</button>`+buttons
                numero--
            }
            myTable.$element.find("button.back").after(buttons);                                  // * inserir botão
            myTable.$element.find("button.number").eq(-1).addClass("selected").trigger("click")          // * selecionar bottão
        },
        next() {
            $(this).closest(".paginacao").find(".selected").next().trigger("click");
        },
        prev() {
            $(this).closest(".paginacao").find(".selected").prev().trigger("click");
        },
        changeQuantity() {
            const id      = $(this).closest('.tabela-layout').data("clase");
            const myTable = STORAGE.get(id);
            myTable.quantityPage = $(this).val() === "all" ? myTable.filteredTable.length : parseInt($(this).val());
            TableStorage.pagination.buttons(id);
        }
    }

}

const STORAGE = new Map();
$(document).ready(_=>TableStorage.events.init());
