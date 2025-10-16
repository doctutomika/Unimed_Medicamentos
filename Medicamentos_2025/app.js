// Configurações globais com paleta diversificada
const CHART_COLORS = [
    '#00995d', '#2196F3', '#9C27B0', '#FF9800', '#F44336',
    '#4CAF50', '#03A9F4', '#BA68C8', '#FFB74D', '#EF5350',
    '#009688', '#3F51B5', '#E91E63', '#FFC107', '#00BCD4',
    '#8BC34A', '#FF5722', '#673AB7', '#607D8B', '#795548'
];

const VIA_COLORS = {
    'VO': '#00995d',
    'IM': '#2196F3', 
    'IV': '#9C27B0',
    'SC': '#FF9800'
};

let dadosAnalise = null;
let dadosRankings = null;

// Função para carregar dados
async function carregarDados() {
    try {
        // Carregar dados da análise principal
        const responseAnalise = await fetch('dados_csv/Análise.csv');
        if (!responseAnalise.ok) throw new Error('Erro ao carregar dados de análise');
        
        // Carregar dados dos rankings
        const responseRankings = await fetch('dados_csv/15+_Princípio_Ativo.csv');
        if (!responseRankings.ok) throw new Error('Erro ao carregar dados de rankings');
        
        // Processar dados
        dadosAnalise = await processarCSV(await responseAnalise.text());
        dadosRankings = await processarCSV(await responseRankings.text());
        
        inicializarDashboard();
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        mostrarErro(`Erro ao carregar dados: ${error.message}`);
    }
}

// Função para processar CSV
function processarCSV(csvText) {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim()) {
            const values = lines[i].split(',');
            const row = {};
            headers.forEach((header, index) => {
                row[header.trim()] = values[index] ? values[index].trim() : '';
            });
            data.push(row);
        }
    }
    
    return data;
}

// Função para mostrar erro
function mostrarErro(mensagem) {
    document.body.innerHTML = `
        <div style="text-align: center; padding: 50px; color: #F44336;">
            <h2><i class="fas fa-exclamation-triangle"></i> Erro</h2>
            <p>${mensagem}</p>
        </div>
    `;
}

// Função principal de inicialização
function inicializarDashboard() {
    criarMetricasPrincipais();
    criarGraficoViaAdministracao();
    criarMetricasViaAdministracao();
    criarGraficoDrogasDestaque();
    criarGraficoTop15Valor();
    criarGraficoTop15Quantidade();
    criarGraficoTop15Glosa();
    criarGraficoOutliers();
    criarGraficoValorUnitario();
    criarGraficoGlosaPorVia();
    criarGraficoTaxaGlosa();
}

// Métricas principais
function criarMetricasPrincipais() {
    const container = document.getElementById('metricas-principais');
    
    // Dados da análise (linha 1 - Totais)
    const totalAprovado = 873029170.62;
    const totalGlosado = 20412003.05;
    const totalQuantidade = 36261864;
    const taxaGlosa = 0.1303269294213839;
    
    container.innerHTML = `
        <div class="col-12 col-md-3">
            <div class="metric-card">
                <div class="metric-value">R$ ${formatarMoeda(totalAprovado)}</div>
                <div class="metric-label">Valor Total Aprovado</div>
            </div>
        </div>
        <div class="col-12 col-md-3">
            <div class="metric-card metric-blue">
                <div class="metric-value">R$ ${formatarMoeda(totalGlosado)}</div>
                <div class="metric-label">Valor Total Glosado</div>
            </div>
        </div>
        <div class="col-12 col-md-3">
            <div class="metric-card metric-purple">
                <div class="metric-value">${formatarNumero(totalQuantidade)}</div>
                <div class="metric-label">Quantidade Total</div>
            </div>
        </div>
        <div class="col-12 col-md-3">
            <div class="metric-card metric-orange">
                <div class="metric-value">${(taxaGlosa * 100).toFixed(2)}%</div>
                <div class="metric-label">Taxa de Glosa Geral</div>
            </div>
        </div>
    `;
}

// Gráfico de via de administração
function criarGraficoViaAdministracao() {
    // Dados da análise (linha 1 - Valor Aprovado)
    const dados = [
        { via: 'VO', valor: 153692747.11, porcentagem: 17.6 },
        { via: 'IM', valor: 7455223.10, porcentagem: 0.9 },
        { via: 'IV', valor: 502227797.08, porcentagem: 57.5 },
        { via: 'SC', valor: 199707844.30, porcentagem: 22.9 }
    ];
    
    const trace = {
        x: dados.map(d => d.via),
        y: dados.map(d => d.valor),
        type: 'bar',
        marker: {
            color: dados.map(d => VIA_COLORS[d.via]),
            line: { color: '#fff', width: 2 }
        },
        text: dados.map(d => `${formatarMoeda(d.valor)}<br>(${d.porcentagem}%)`),
        textposition: 'auto',
        hovertemplate: '<b>%{x}</b><br>Valor: %{text}<extra></extra>'
    };
    
    const layout = {
        title: {
            text: 'Distribuição por Via de Administração',
            font: { size: 18, color: '#00995d' }
        },
        xaxis: { title: 'Via de Administração' },
        yaxis: { title: 'Valor Aprovado (R$)', tickformat: '$,.0f' },
        margin: { t: 60, b: 60, l: 80, r: 40 },
        showlegend: false
    };
    
    Plotly.newPlot('chart-via-administracao', [trace], layout, {responsive: true});
}

// Métricas por via de administração
function criarMetricasViaAdministracao() {
    const container = document.getElementById('metricas-via-administracao');
    
    const metricas = [
        { via: 'VO', label: 'Via Oral', valor: 'R$ 153,7M', porcentagem: '17,6%', cor: 'vo' },
        { via: 'IM', label: 'Intramuscular', valor: 'R$ 7,5M', porcentagem: '0,9%', cor: 'im' },
        { via: 'IV', label: 'Intravenosa', valor: 'R$ 502,2M', porcentagem: '57,5%', cor: 'iv' },
        { via: 'SC', label: 'Subcutânea', valor: 'R$ 199,7M', porcentagem: '22,9%', cor: 'sc' }
    ];
    
    container.innerHTML = metricas.map(m => `
        <div class="via-card ${m.cor}">
            <div class="via-title">${m.via}</div>
            <div class="via-value">${m.valor}</div>
            <div class="via-percentage">${m.porcentagem} do total</div>
            <div style="margin-top: 10px; font-size: 0.9rem;">${m.label}</div>
        </div>
    `).join('');
}

// Gráfico de drogas destaque
function criarGraficoDrogasDestaque() {
    const dados = [
        { via: 'VO', droga: 'VERZENIOS', principio: 'ABEMACICLIBE', valor: 16337119.47 },
        { via: 'IM', droga: 'SYNAGIS', principio: 'PALIVIZUMABE', valor: 3274745.79 },
        { via: 'IV', droga: 'KEYTRUDA', principio: 'PEMBROLIZUMABE', valor: 104941375.64 },
        { via: 'SC', droga: 'OPDIVO', principio: 'NIVOLUMABE', valor: 36946711.04 }
    ];
    
    const trace = {
        x: dados.map(d => `${d.droga}<br>(${d.principio})`),
        y: dados.map(d => d.valor),
        type: 'bar',
        marker: {
            color: dados.map(d => VIA_COLORS[d.via]),
            line: { color: '#fff', width: 2 }
        },
        text: dados.map(d => formatarMoeda(d.valor)),
        textposition: 'auto',
        hovertemplate: '<b>%{x}</b><br>Valor: %{text}<extra></extra>'
    };
    
    const layout = {
        title: {
            text: 'Drogas Destaque por Via de Administração',
            font: { size: 18, color: '#00995d' }
        },
        xaxis: { title: 'Medicamento (Princípio Ativo)' },
        yaxis: { title: 'Valor Aprovado (R$)', tickformat: '$,.0f' },
        margin: { t: 60, b: 80, l: 80, r: 40 },
        showlegend: false
    };
    
    Plotly.newPlot('chart-drogas-destaque', [trace], layout, {responsive: true});
}

// Top 15 por valor aprovado
function criarGraficoTop15Valor() {
    // Dados da seção 1 do arquivo 15+_Princípio_Ativo
    const dados = [
        { ranking: 1, principio: 'PEMBROLIZUMABE', valor: 104941375.64 },
        { ranking: 2, principio: 'TRASTUZUMABE DERUXTECANA', valor: 37083773.74 },
        { ranking: 3, principio: 'NIVOLUMABE', valor: 36946711.04 },
        { ranking: 4, principio: 'USTEQUINUMABE', valor: 31951847.73 },
        { ranking: 5, principio: 'DARATUMUMABE', valor: 30681981.05 },
        { ranking: 6, principio: 'DUPILUMABE', valor: 28055940.13 },
        { ranking: 7, principio: 'INFLIXIMABE', valor: 26645615.00 },
        { ranking: 8, principio: 'LENALIDOMIDA', valor: 22299906.59 },
        { ranking: 9, principio: 'BEVACIZUMABE', valor: 22254982.95 },
        { ranking: 10, principio: 'PERTUZUMABE', valor: 19665148.37 },
        { ranking: 11, principio: 'SECUQUINUMABE', valor: 19235724.00 },
        { ranking: 12, principio: 'TRASTUZUMABE', valor: 18967313.13 },
        { ranking: 13, principio: 'VEDOLIZUMABE', valor: 17916880.91 },
        { ranking: 14, principio: 'OCRELIZUMABE', valor: 17593872.64 },
        { ranking: 15, principio: 'ABEMACICLIBE', valor: 16337119.47 }
    ];
    
    const trace = {
        x: dados.map(d => d.valor),
        y: dados.map(d => `${d.ranking}. ${d.principio}`),
        type: 'bar',
        orientation: 'h',
        marker: {
            color: CHART_COLORS.slice(0, 15),
            line: { color: '#fff', width: 1 }
        },
        text: dados.map(d => formatarMoeda(d.valor)),
        textposition: 'auto',
        hovertemplate: '<b>%{y}</b><br>Valor: %{text}<extra></extra>'
    };
    
    const layout = {
        title: {
            text: 'Top 15 Princípios Ativos por Valor Aprovado',
            font: { size: 18, color: '#00995d' }
        },
        xaxis: { title: 'Valor Aprovado (R$)', tickformat: '$,.0f' },
        yaxis: { title: 'Princípio Ativo' },
        margin: { t: 60, b: 60, l: 200, r: 40 },
        showlegend: false,
        height: 600
    };
    
    Plotly.newPlot('chart-top-15-valor', [trace], layout, {responsive: true});
}

// Top 15 por quantidade
function criarGraficoTop15Quantidade() {
    // Dados da seção 2 do arquivo 15+_Princípio_Ativo
    const dados = [
        { ranking: 104, principio: 'FLUORURACILA', quantidade: 15877086 },
        { ranking: 92, principio: 'GENCITABINA', quantidade: 2140734 },
        { ranking: 5, principio: 'DARATUMUMABE', quantidade: 1591686 },
        { ranking: 60, principio: 'FOLINATO DE CÁLCIO', quantidade: 1544292 },
        { ranking: 166, principio: 'CICLOFOSFAMIDA', quantidade: 1510803 },
        { ranking: 78, principio: 'CARBOPLATINA', quantidade: 1407189 },
        { ranking: 155, principio: 'IFOSFAMIDA', quantidade: 1392766 },
        { ranking: 9, principio: 'BEVACIZUMABE', quantidade: 1089096 },
        { ranking: 136, principio: 'FOLINATO DE CALCIO', quantidade: 597710 },
        { ranking: 7, principio: 'INFLIXIMABE', quantidade: 553094 },
        { ranking: 36, principio: 'PACLITAXEL', quantidade: 552420 },
        { ranking: 10, principio: 'PERTUZUMABE', quantidade: 470582 },
        { ranking: 1, principio: 'PEMBROLIZUMABE', quantidade: 464958 },
        { ranking: 47, principio: 'IRINOTECANO', quantidade: 410725 },
        { ranking: 32, principio: 'RITUXIMABE', quantidade: 391218 }
    ];
    
    const trace = {
        x: dados.map(d => d.quantidade),
        y: dados.map(d => `${d.ranking}. ${d.principio}`),
        type: 'bar',
        orientation: 'h',
        marker: {
            color: CHART_COLORS.slice(0, 15),
            line: { color: '#fff', width: 1 }
        },
        text: dados.map(d => formatarNumero(d.quantidade)),
        textposition: 'auto',
        hovertemplate: '<b>%{y}</b><br>Quantidade: %{text}<extra></extra>'
    };
    
    const layout = {
        title: {
            text: 'Top 15 Princípios Ativos por Quantidade Aprovada',
            font: { size: 18, color: '#00995d' }
        },
        xaxis: { title: 'Quantidade Aprovada', tickformat: ',.0f' },
        yaxis: { title: 'Princípio Ativo' },
        margin: { t: 60, b: 60, l: 200, r: 40 },
        showlegend: false,
        height: 600
    };
    
    Plotly.newPlot('chart-top-15-quantidade', [trace], layout, {responsive: true});
}

// Top 15 por taxa de glosa
function criarGraficoTop15Glosa() {
    // Dados da seção 3 do arquivo 15+_Princípio_Ativo
    const dados = [
        { ranking: 193, principio: 'CARMUSTINA', taxa: 94.68 },
        { ranking: 169, principio: 'ELRANATAMABE', taxa: 94.67 },
        { ranking: 207, principio: 'PEMETREXEDE HEPTAIDRATADO', taxa: 83.24 },
        { ranking: 103, principio: 'ETANERCEPTE', taxa: 32.04 },
        { ranking: 115, principio: 'POLATUZUMABE VEDOTINA', taxa: 29.70 },
        { ranking: 79, principio: 'DENOSUMABE', taxa: 24.64 },
        { ranking: 64, principio: 'BETADINUTUXIMABE', taxa: 22.92 },
        { ranking: 129, principio: 'TALQUETAMABE', taxa: 21.59 },
        { ranking: 185, principio: 'AFATINIBE', taxa: 20.40 },
        { ranking: 107, principio: 'TREMELIMUMABE', taxa: 15.66 },
        { ranking: 154, principio: 'SUNITINIBE', taxa: 15.52 },
        { ranking: 122, principio: 'INOTUZUMABE OZOGAMICINA', taxa: 13.30 },
        { ranking: 7, principio: 'INFLIXIMABE', taxa: 11.66 },
        { ranking: 187, principio: 'DAUNORRUBICINA', taxa: 11.40 },
        { ranking: 146, principio: 'GENTUZUMABE OZOGAMICINA', taxa: 10.00 }
    ];
    
    const trace = {
        x: dados.map(d => d.taxa),
        y: dados.map(d => `${d.ranking}. ${d.principio}`),
        type: 'bar',
        orientation: 'h',
        marker: {
            color: dados.map(d => d.taxa > 50 ? '#F44336' : d.taxa > 20 ? '#FF9800' : '#4CAF50'),
            line: { color: '#fff', width: 1 }
        },
        text: dados.map(d => `${d.taxa.toFixed(2)}%`),
        textposition: 'auto',
        hovertemplate: '<b>%{y}</b><br>Taxa de Glosa: %{text}<extra></extra>'
    };
    
    const layout = {
        title: {
            text: 'Top 15 Princípios Ativos por Taxa de Glosa',
            font: { size: 18, color: '#00995d' }
        },
        xaxis: { title: 'Taxa de Glosa (%)', tickformat: ',.1f' },
        yaxis: { title: 'Princípio Ativo' },
        margin: { t: 60, b: 60, l: 200, r: 40 },
        showlegend: false,
        height: 600
    };
    
    Plotly.newPlot('chart-top-15-glosa', [trace], layout, {responsive: true});
}

// Gráfico de outliers
function criarGraficoOutliers() {
    const dados = [
        { produto: 'SPINRAZA', principio: 'NUSINERSENA', valor: 425062.90, zscore: 471.67 },
        { produto: 'BESPONSA', principio: 'INOTUZUMABE OZOGAMICINA', valor: 102159.31, zscore: 9.36 },
        { produto: 'ILARIS', principio: 'CANAQUINUMABE', valor: 77168.33, zscore: 6.33 },
        { produto: 'NINLARO', principio: 'IXAZOMIBE', valor: 8558.63, zscore: 8.19 },
        { produto: 'FASLODEX', principio: 'FULVESTRANTO', valor: 4588.82, zscore: 2.52 }
    ];
    
    const trace = {
        x: dados.map(d => d.valor),
        y: dados.map(d => `${d.produto}<br>(${d.principio})`),
        type: 'scatter',
        mode: 'markers',
        marker: {
            size: dados.map(d => Math.max(20, Math.min(60, d.zscore / 10))),
            color: dados.map(d => d.zscore > 100 ? '#F44336' : d.zscore > 10 ? '#FF9800' : '#4CAF50'),
            line: { color: '#fff', width: 2 }
        },
        text: dados.map(d => `Z-Score: ${d.zscore.toFixed(2)}<br>Valor: ${formatarMoeda(d.valor)}`),
        hovertemplate: '<b>%{y}</b><br>%{text}<extra></extra>'
    };
    
    const layout = {
        title: {
            text: 'Medicamentos com Valor Unitário Extremo (Outliers)',
            font: { size: 18, color: '#00995d' }
        },
        xaxis: { 
            title: 'Valor Unitário (R$)', 
            tickformat: '$,.0f',
            type: 'log'
        },
        yaxis: { title: 'Medicamento (Princípio Ativo)' },
        margin: { t: 60, b: 60, l: 200, r: 40 },
        showlegend: false,
        height: 400
    };
    
    Plotly.newPlot('chart-outliers', [trace], layout, {responsive: true});
}

// Gráfico de valor unitário por via
function criarGraficoValorUnitario() {
    const dados = [
        { via: 'VO', valor: 53.78, desvio: 901.08 },
        { via: 'IM', valor: 48.17, desvio: 1431.78 },
        { via: 'IV', valor: 15.38, desvio: 10915.61 },
        { via: 'SC', valor: 336.13, desvio: 12129.97 }
    ];
    
    const trace = {
        x: dados.map(d => d.via),
        y: dados.map(d => d.valor),
        type: 'bar',
        marker: {
            color: dados.map(d => VIA_COLORS[d.via]),
            line: { color: '#fff', width: 2 }
        },
        text: dados.map(d => `R$ ${d.valor.toFixed(2)}<br>Desvio: R$ ${d.desvio.toFixed(2)}`),
        textposition: 'auto',
        hovertemplate: '<b>%{x}</b><br>%{text}<extra></extra>'
    };
    
    const layout = {
        title: {
            text: 'Valor Unitário Médio por Via de Administração',
            font: { size: 18, color: '#00995d' }
        },
        xaxis: { title: 'Via de Administração' },
        yaxis: { title: 'Valor Unitário Médio (R$)', tickformat: '$,.2f' },
        margin: { t: 60, b: 60, l: 80, r: 40 },
        showlegend: false
    };
    
    Plotly.newPlot('chart-valor-unitario', [trace], layout, {responsive: true});
}

// Gráfico de glosa por via
function criarGraficoGlosaPorVia() {
    const dados = [
        { via: 'VO', glosa: 256657.68, porcentagem: 1.26 },
        { via: 'IM', glosa: 203752.81, porcentagem: 1.00 },
        { via: 'IV', glosa: 25819.15, porcentagem: 0.13 },
        { via: 'SC', glosa: 6261014.70, porcentagem: 30.67 }
    ];
    
    const trace = {
        labels: dados.map(d => d.via),
        values: dados.map(d => d.glosa),
        type: 'pie',
        marker: {
            colors: dados.map(d => VIA_COLORS[d.via]),
            line: { color: '#fff', width: 2 }
        },
        textinfo: 'label+percent',
        textposition: 'auto',
        hovertemplate: '<b>%{label}</b><br>Valor: %{text}<br>Porcentagem: %{percent}<extra></extra>'
    };
    
    const layout = {
        title: {
            text: 'Distribuição de Glosas por Via',
            font: { size: 18, color: '#00995d' }
        },
        showlegend: true,
        legend: { orientation: 'v', x: 1.1, y: 0.5 }
    };
    
    Plotly.newPlot('chart-glosa-por-via', [trace], layout, {responsive: true});
}

// Gráfico de taxa de glosa por via
function criarGraficoTaxaGlosa() {
    const dados = [
        { via: 'VO', taxa: 8.07 },
        { via: 'IM', taxa: 5.94 },
        { via: 'IV', taxa: 13.41 },
        { via: 'SC', taxa: 16.39 }
    ];
    
    const trace = {
        x: dados.map(d => d.via),
        y: dados.map(d => d.taxa),
        type: 'bar',
        marker: {
            color: dados.map(d => d.taxa > 15 ? '#F44336' : d.taxa > 10 ? '#FF9800' : '#4CAF50'),
            line: { color: '#fff', width: 2 }
        },
        text: dados.map(d => `${d.taxa.toFixed(2)}%`),
        textposition: 'auto',
        hovertemplate: '<b>%{x}</b><br>Taxa de Glosa: %{text}<extra></extra>'
    };
    
    const layout = {
        title: {
            text: 'Taxa de Glosa por Via de Administração',
            font: { size: 18, color: '#00995d' }
        },
        xaxis: { title: 'Via de Administração' },
        yaxis: { title: 'Taxa de Glosa (%)', tickformat: ',.1f' },
        margin: { t: 60, b: 60, l: 80, r: 40 },
        showlegend: false
    };
    
    Plotly.newPlot('chart-taxa-glosa', [trace], layout, {responsive: true});
}

// Funções utilitárias
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(valor);
}

function formatarNumero(valor) {
    return new Intl.NumberFormat('pt-BR').format(valor);
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', carregarDados);
