# Dashboard Avançado - Análise de Medicamentos Unimed CNU

## 📊 Visão Geral

Dashboard interativo para análise estratégica de medicamentos da Unimed CNU, desenvolvido com base em dados médicos filtrados por especialistas. O projeto apresenta insights clínicos e recomendações estratégicas para gestão de custos farmacêuticos.

## 🎯 Objetivos

- **Análise de Custos**: Identificar medicamentos de maior impacto financeiro
- **Insights Médicos**: Fornecer dados filtrados por especialistas
- **Recomendações Estratégicas**: Guiar negociações e protocolos
- **Monitoramento**: Acompanhar outliers e altas taxas de glosa

## 📈 Principais Métricas

### Sumário Executivo
- **Valor Total Aprovado**: R$ 873.029.170,62
- **Valor Total Glosado**: R$ 20.412.003,05
- **Quantidade Total**: 36.261.864 unidades
- **Taxa de Glosa Geral**: 13,03%

### Distribuição por Via de Administração
- **IV (Intravenosa)**: R$ 502,2M (57,5%) - Dominância oncológica
- **SC (Subcutânea)**: R$ 199,7M (22,9%) - Maior valor unitário
- **VO (Oral)**: R$ 153,7M (17,6%) - Maior diversidade
- **IM (Intramuscular)**: R$ 7,5M (0,9%) - Menor volume

## 🏆 Rankings Médicos

### Top 5 Princípios Ativos por Valor
1. **PEMBROLIZUMABE** - R$ 104,9M (KEYTRUDA)
2. **TRASTUZUMABE DERUXTECANA** - R$ 37,1M (ENHERTU)
3. **NIVOLUMABE** - R$ 36,9M (OPDIVO)
4. **USTEQUINUMABE** - R$ 31,9M (STELARA)
5. **DARATUMUMABE** - R$ 30,7M (DALINVI)

### Top 5 por Quantidade (Medicamentos Cotidianos)
1. **FLUORURACILA** - 15,9M unidades
2. **GENCITABINA** - 2,1M unidades
3. **DARATUMUMABE** - 1,6M unidades
4. **FOLINATO DE CÁLCIO** - 1,5M unidades
5. **CICLOFOSFAMIDA** - 1,5M unidades

### Top 5 por Taxa de Glosa (Críticos)
1. **CARMUSTINA** - 94,68% glosa
2. **ELRANATAMABE** - 94,67% glosa
3. **PEMETREXEDE HEPTAIDRATADO** - 83,24% glosa
4. **ETANERCEPTE** - 32,04% glosa
5. **POLATUZUMABE VEDOTINA** - 29,70% glosa

## ⚠️ Casos Especiais

### Outlier Crítico: SPINRAZA (NUSINERSENA)
- **Valor Unitário**: R$ 425.062,90
- **Z-Score**: 471,67 (extremamente acima da média)
- **Finalidade**: AME (Atrofia Muscular Espinhal)
- **Recomendação**: Protocolo específico necessário

## 💡 Insights Estratégicos

### Concentração de Custos
- **Princípio de Pareto**: 46 princípios ativos (21,6%) geram 80% do valor
- **Oportunidade**: Negociação focada nos top performers
- **Gestão**: Monitoramento contínuo dos medicamentos críticos

### Análise por Via
- **IV Dominante**: 57,5% do valor - protocolos oncológicos especializados
- **SC Alto Custo**: Maior valor unitário - critérios rigorosos necessários
- **VO Diversidade**: Maior número de medicamentos únicos

## 🎨 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos responsivos com paleta diversificada
- **JavaScript** - Interatividade e lógica de negócio
- **Plotly.js** - Visualizações interativas
- **Font Awesome** - Ícones profissionais

## 📁 Estrutura do Projeto

```
Medicamentos_2025/
├── index.html              # Dashboard principal
├── styles.css              # Estilos com paleta diversificada
├── app.js                  # Lógica e visualizações
├── dados_csv/
│   ├── Análise.csv         # Dados médicos filtrados
│   └── 15+_Princípio_Ativo.csv # Rankings médicos
└── README.md               # Documentação
```

## 🚀 Como Usar

1. **Acesso**: Abra `index.html` em qualquer navegador moderno
2. **Navegação**: Use as seções para explorar diferentes análises
3. **Interação**: Clique nos gráficos para detalhes
4. **Responsivo**: Funciona em desktop, tablet e mobile

## 📊 Funcionalidades

### Visualizações Interativas
- Gráficos de barras para rankings
- Gráficos de pizza para distribuições
- Scatter plots para outliers
- Métricas em tempo real

### Análises Médicas
- Dados filtrados por especialistas
- Insights clínicos integrados
- Recomendações baseadas em evidências
- Identificação de padrões anômalos

### Recomendações Estratégicas
- **Negociação**: Foco em medicamentos de alto impacto
- **Protocolos**: Critérios para medicamentos críticos
- **Gestão**: Monitoramento de outliers e altas glosas

## 📅 Período de Análise

**Últimos 12 meses** - Dados atualizados e validados por especialistas médicos.

## 👥 Público-Alvo

- Gestores de Saúde
- Especialistas Médicos
- Equipe de Negociação
- Auditores Médicos
- Diretoria Executiva

## 🔄 Próximos Passos

1. **Feedback**: Coleta de sugestões dos usuários
2. **Melhorias**: Ajustes baseados na avaliação
3. **Atualizações**: Dados mensais
4. **Expansão**: Novas análises e métricas

---

**Desenvolvido para Unimed CNU**  
*Análise baseada em dados médicos filtrados por especialistas*
