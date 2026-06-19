const NGN_TO_USD_RATE = 1500.0;
const REGIONAL_DEFAULT_INFLATION = 0.12;

const regions = {
    ng: ["Anambra State", "Enugu State", "Lagos State", "Kano State", "FCT Abuja"],
    zw: ["Harare Province", "Bulawayo Province", "Manicaland", "Midlands"]
};

const countryLanguages = {
    ng: [ {code: "en", name: "English"}, {code: "ig", name: "Igbo (Asụsụ Igbo)"}, {code: "yo", name: "Yoruba (Èdè Yorùbá)"} ],
    zw: [ {code: "en", name: "English"}, {code: "sn", name: "Shona (chiShona)"} ]
};

function setView(view) {
    if (view === 'control') {
        document.getElementById('control-panel').classList.add('active');
        document.getElementById('output-panel').classList.remove('active');
    } else {
        document.getElementById('control-panel').classList.remove('active');
        document.getElementById('output-panel').classList.add('active');
        window.scrollTo(0,0);
    }
}

function initTerritory(country) {
    const langPicker = document.getElementById('lang-picker');
    if (!langPicker) return;
    langPicker.innerHTML = '';
    
    countryLanguages[country].forEach(l => {
        const opt = document.createElement('option');
        opt.value = l.code;
        opt.textContent = l.name;
        langPicker.appendChild(opt);
    });
    
    document.getElementById('secondary-form-flow').style.display = 'block';
    
    const usdWrapper = document.getElementById('usd-toggle-wrapper');
    if (usdWrapper) usdWrapper.style.display = (country === 'ng') ? 'flex' : 'none';
    
    const strategyWrapper = document.getElementById('strategy-wrapper-node');
    if (strategyWrapper) strategyWrapper.style.display = (country === 'ng') ? 'block' : 'none';
    
    const childrenWrapper = document.getElementById('children-wrapper');
    if (childrenWrapper) childrenWrapper.style.display = (country === 'zw') ? 'block' : 'none';

    toggleRegionsData(country);
    changeLanguage(langPicker.value);
}
function toggleRegionsData(country) {
    const picker = document.getElementById('region-picker');
    if (!picker) return;
    picker.innerHTML = '';
    regions[country].forEach(r => {
        const opt = document.createElement('option');
        opt.value = r.toLowerCase().replace(/ /g, '-');
        opt.textContent = r;
        picker.appendChild(opt);
    });
    regenerateYearInputs();
}

function changeLanguage(lang) {
    if (typeof labels === 'undefined' || !labels[lang]) return;
    const l = labels[lang];
    document.getElementById('main-title').textContent = l.title;
    document.getElementById('main-subtitle').textContent = l.subtitle;
    document.getElementById('summary-title').textContent = l.summaryTitle;
    document.getElementById('resources-title').textContent = l.resourcesTitle;
    document.getElementById('btn-back').textContent = l.back;
    document.getElementById('btn-run').textContent = l.run;
    updateLabelsByStatus();
}

function updateLabelsByStatus() {
    const langEl = document.getElementById('lang-picker');
    const lang = langEl && langEl.value ? langEl.value : 'en';
    if (typeof labels === 'undefined' || !labels[lang]) return;
    const l = labels[lang];
    const status = document.getElementById('employment-status').value;
    const incomeLabel = document.getElementById('income-label');
    const yearsLabel = document.getElementById('years-label');
    if (incomeLabel && yearsLabel) {
        if (status === 'informal') {
            incomeLabel.textContent = "Estimated Periodic Revenue Inflow";
            yearsLabel.textContent = l.microYears;
        } else {
            incomeLabel.textContent = l.income;
            yearsLabel.textContent = l.years;
        }
    }
}

function toggleEmploymentFields(status) {
    const finFieldset = document.getElementById('financial-fieldset');
    if (status === 'unemployed') {
        finFieldset.style.display = 'none';
    } else {
        finFieldset.style.display = 'block';
        updateLabelsByStatus();
    }
}

function toggleStrategyFields(strategy) {
    const granDiv = document.getElementById('granular-inputs');
    if (!granDiv) return;
    const country = document.getElementById('country-picker').value;
    granDiv.style.display = (strategy === 'granular' && country === 'ng') ? 'block' : 'none';
    if (strategy === 'granular' && country === 'ng') regenerateYearInputs();
}

function regenerateYearInputs() {
    const country = document.getElementById('country-picker').value;
    const startYear = parseInt(document.getElementById('start-year').value) || 2026;
    const count = parseInt(document.getElementById('years-field').value) || 1;
    const container = document.getElementById('dynamic-year-rows-container');
    if (!container) return;
    container.innerHTML = '';
    if (country !== 'ng') return;
    
    let headerLabel = document.createElement('label');
    headerLabel.style.color = '#0d6efd';
    headerLabel.style.marginBottom = '0.5rem';
    headerLabel.style.display = 'block';
    headerLabel.textContent = "Provide Historical/Actual Salaries Earned:";
    container.appendChild(headerLabel);
    
    for (let i = 0; i < count; i++) {
        let displayYear = startYear - i;
        let div = document.createElement('div');
        div.className = 'form-group';
        div.style.marginTop = '0.6rem';
        div.style.borderBottom = '1px dashed #dee2e6';
        div.style.paddingBottom = '0.6rem';
        
        div.innerHTML = `
            <label style="font-weight:bold; color:#495057;">Year ${displayYear} Salary Entry:</label>
            <div class="granular-row">
                <input type="number" class="gran-salary-input" data-year="${displayYear}" placeholder="Amount" value="0" min="0">
                <select class="gran-currency-select" data-year="${displayYear}">
                    <option value="LOCAL">Local Currency (₦)</option>
                    <option value="USD">USD ($)</option>
                </select>
            </div>`;
        container.appendChild(div);
    }
}
function executeCivicEngine() {
    const country = document.getElementById('country-picker').value;
    const lang = document.getElementById('lang-picker').value;
    const region = document.getElementById('region-picker').value;
    const status = document.getElementById('employment-status').value;
    const age = parseInt(document.getElementById('age-field').value) || 0;
    const children = parseInt(document.getElementById('children-field').value) || 0;
    const strategy = document.getElementById('calc-strategy').value;
    const str = localizedStrings[lang] || localizedStrings['en'];
    
    let htmlOutput = ''; let resourceOutput = ''; let totalContributionsFund = 0;
    let baseSalaryValue = parseFloat(document.getElementById('salary-field').value) || 0;
    const period = document.getElementById('income-period').value;
    const trackingSpanYears = parseInt(document.getElementById('years-field').value) || 1;
    let baselineMonthlySalary = period === 'yearly' ? baseSalaryValue / 12 : baseSalaryValue;
    let computedSalariesHistory = [];

    if (status !== 'unemployed') {
        if (strategy === 'baseline' || country === 'zw') {
            for (let i = 0; i < trackingSpanYears; i++) {
                computedSalariesHistory.push(baselineMonthlySalary);
            }
        } else {
            const salaryNodes = document.querySelectorAll('.gran-salary-input');
            const currencyNodes = document.querySelectorAll('.gran-currency-select');
            
            for (let i = 0; i < salaryNodes.length; i++) {
                let rawAmount = parseFloat(salaryNodes[i].value) || 0;
                let isYearly = period === 'yearly';
                let monthlyValue = isYearly ? rawAmount / 12 : rawAmount;
                let currencyType = currencyNodes[i].value;
                
                if (currencyType === 'USD' && country === 'ng') {
                    computedSalariesHistory.push(monthlyValue * NGN_TO_USD_RATE);
                } else {
                    computedSalariesHistory.push(monthlyValue);
                }
            }
        }
    }

    const useUSD = (country === 'ng') && document.getElementById('convert-usd-checkbox')?.checked;
    const formatCurrency = (val) => {
        if (useUSD) return "USD $" + (val / NGN_TO_USD_RATE).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
        return country === 'ng' ? "NGN ₦" + val.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : "USD $" + val.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    };

    htmlOutput = `<h3>${str.node}: ${country === 'ng' ? 'Nigeria' : 'Zimbabwe'} (${region.toUpperCase()})</h3>`;

    if (country === 'ng') {
        if (status === 'formal') {
            computedSalariesHistory.forEach(w => { totalContributionsFund += (w * 0.18 * 12); });
            htmlOutput += `<p><strong>${str.tracked}:</strong> ${trackingSpanYears} ${str.years}</p>
                           <p><strong>${str.cumulative}:</strong> ${formatCurrency(totalContributionsFund)}</p>`;
            if (age >= 50) {
                htmlOutput += `<div class="warning-text">⚙️ <strong>${str.ret_ok}</strong></div>`;
            } else {
                let yearsToRetire = 50 - age;
                let futureValue = totalContributionsFund * Math.pow(1 + 0.10, yearsToRetire);
                let todaysEquivalentValue = futureValue / Math.pow(1 + REGIONAL_DEFAULT_INFLATION, yearsToRetire);
                let retString = str.ret_later.replace("{AGE}", "50");
                htmlOutput += `<div class="warning-text">
                    <p><strong>${retString}</strong> ${formatCurrency(futureValue)}</p>
                    <p><strong>✨ ${str.pv_eq}:</strong> ${formatCurrency(todaysEquivalentValue)}</p>
                    <hr style="border:0; border-top:1px solid #ffecb5; margin:0.5rem 0;">
                    <p style="font-size:0.85rem; margin:0;">💼 ${str.exit_ng}</p>
                </div>`;
            }
            resourceOutput = `<div class="resource-card"><h4>PenCom Voluntary Additional Framework</h4><p>File options to increase statutory assets.</p></div>`;
        } else if (status === 'informal') {
            computedSalariesHistory.forEach(w => { totalContributionsFund += (w * 0.10 * 12); });
            htmlOutput += `<p><strong>${str.micro_opt}:</strong> ${trackingSpanYears} ${str.years}</p>
                           <p><strong>${str.micro_proj}:</strong> ${formatCurrency(totalContributionsFund)}</p>
                           <div class="warning-text">💡 ${str.micro_exit}</div>`;
        } else {
            htmlOutput += `<p>${str.unemp_ng}</p>`;
        }
    } else { 
        if (status === 'formal') {
            const ceilingCap = 700;
            computedSalariesHistory.forEach(w => { totalContributionsFund += (Math.min(w, ceilingCap) * 0.09 * 12); });
            htmlOutput += `<p><strong>${str.tracked}:</strong> ${trackingSpanYears} ${str.years}</p>
                           <p><strong>${str.nssa}:</strong> ${formatCurrency(totalContributionsFund)}</p>`;
            if (age >= 60 || (age >= 55 && trackingSpanYears >= 7)) {
                htmlOutput += `<div class="warning-text">🎉 <strong>${str.ret_ok}</strong></div>`;
            } else {
                let yearsToRetire = 60 - age;
                let futureValue = totalContributionsFund * Math.pow(1 + 0.06, yearsToRetire);
                let todaysEquivalentValue = futureValue / Math.pow(1 + 0.05, yearsToRetire);
                let retString = str.ret_later.replace("{AGE}", "60");
                htmlOutput += `<div class="warning-text">
                    <p><strong>${retString}</strong> ${formatCurrency(futureValue)}</p>
                    <p><strong>✨ ${str.pv_eq}:</strong> ${formatCurrency(todaysEquivalentValue)}</p>
                    <hr style="border:0; border-top:1px solid #ffecb5; margin:0.5rem 0;">
                    <p style="font-size:0.85rem; margin:0;">🛑 ${str.exit_zw}</p>
                </div>`;
            }
            if(children > 0) { resourceOutput += '<div class="resource-card"><h4>Social Welfare Grant Registry</h4><p>Dependent supplements tracking active.</p></div>'; }
        } else {
            htmlOutput += `<p>${str.unemp_zw}</p>`;
        }
    }
    document.getElementById('output-box').innerHTML = htmlOutput;
    document.getElementById('resource-box-container').innerHTML = resourceOutput || '<div class="resource-card"><h4>Standard Regional Protections Apply</h4><p>Context records are matched automatically.</p></div>';
    setView('output');
}

document.addEventListener("DOMContentLoaded", function() {
    initTerritory('ng');
});
