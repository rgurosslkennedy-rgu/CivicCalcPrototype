const NGN_TO_USD_RATE = 1500.0;
const ZWG_TO_USD_RATE = 25.0;
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
    
    // Fixed: Linked correctly to 'current-currency-picker' to fix the drop-down crash
    const currPicker = document.getElementById('current-currency-picker');
    if (currPicker) {
        currPicker.innerHTML = '';
        if (country === 'ng') {
            currPicker.innerHTML = `<option value="LOCAL">Nigerian Naira (₦)</option><option value="USD">USD ($)</option>`;
        } else {
            currPicker.innerHTML = `<option value="LOCAL">Zimbabwe Gold (ZWG)</option><option value="USD">USD ($)</option>`;
        }
    }

    document.getElementById('secondary-form-flow').style.display = 'block';
    
    const strategyWrapper = document.getElementById('strategy-wrapper-node');
    if (strategyWrapper) strategyWrapper.style.display = 'block';
    
    const childrenWrapper = document.getElementById('children-wrapper');
    if (childrenWrapper) childrenWrapper.style.display = (country === 'zw') ? 'block' : 'none';
    
    toggleEmploymentFields(document.getElementById('employment-status').value);
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
    const yearsLabel = document.getElementById('years-label');
    if (yearsLabel) {
        yearsLabel.textContent = (status === 'informal') ? l.microYears : l.years;
    }
}

function toggleEmploymentFields(status) {
    const finFieldset = document.getElementById('financial-fieldset');
    const sectorWrapper = document.getElementById('sector-wrapper-node');
    const country = document.getElementById('country-picker').value;
    
    if (status === 'unemployed') {
        if (finFieldset) finFieldset.style.display = 'none';
        if (sectorWrapper) sectorWrapper.style.display = 'none';
    } else {
        if (finFieldset) finFieldset.style.display = 'block';
        if (sectorWrapper) sectorWrapper.style.display = (status === 'formal' && country === 'ng') ? 'block' : 'none';
        updateLabelsByStatus();
    }
}

function toggleStrategyFields(strategy) {
    const granDiv = document.getElementById('granular-inputs');
    if (!granDiv) return;
    granDiv.style.display = (strategy === 'granular') ? 'block' : 'none';
    if (strategy === 'granular') regenerateYearInputs();
}

function regenerateYearInputs() {
    const country = document.getElementById('country-picker').value;
    const count = parseInt(document.getElementById('years-field').value) || 1;
    const container = document.getElementById('dynamic-year-rows-container');
    if (!container) return;
    container.innerHTML = '';
    
    let headerLabel = document.createElement('label');
    headerLabel.style.color = '#0d6efd';
    headerLabel.style.marginBottom = '0.5rem';
    headerLabel.style.display = 'block';
    headerLabel.textContent = "Provide Historical/Actual Salaries Earned:";
    container.appendChild(headerLabel);
    
    let localName = country === 'ng' ? "Naira (₦)" : "ZWG";

    for (let i = 0; i < count; i++) {
        let div = document.createElement('div');
        div.className = 'form-group';
        div.style.marginTop = '0.6rem';
        div.style.borderBottom = '1px dashed #dee2e6';
        div.style.paddingBottom = '0.6rem';
        
        div.innerHTML = `
            <label style="font-weight:bold; color:#495057;">Sequence Year ${i + 1} Salary Entry:</label>
            <div class="granular-row">
                <input type="number" class="gran-salary-input" placeholder="Amount" value="0" min="0">
                <select class="gran-currency-select">
                    <option value="LOCAL">${localName}</option>
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
    const sector = document.getElementById('sector-picker').value;
    const str = localizedStrings[lang] || localizedStrings['en'];
    const currentRate = country === 'ng' ? NGN_TO_USD_RATE : ZWG_TO_USD_RATE;

    let htmlOutput = ''; let resourceOutput = ''; let totalContributionsFund = 0;
    let baseSalaryValue = parseFloat(document.getElementById('salary-field').value) || 0;
    const period = document.getElementById('income-period').value;
    const trackingSpanYears = parseInt(document.getElementById('years-field').value) || 1;
    
    // Fixed: Maps currency fields accurately to avoid evaluation errors
    const baseCurrency = document.getElementById('current-currency-picker').value;

    let baselineMonthlySalary = period === 'yearly' ? baseSalaryValue / 12 : baseSalaryValue;
    if (baseCurrency === 'USD') { baselineMonthlySalary = baselineMonthlySalary * currentRate; }

    let computedSalariesHistory = [];
    if (status !== 'unemployed') {
        if (strategy === 'baseline') {
            for (let i = 0; i < trackingSpanYears; i++) { computedSalariesHistory.push(baselineMonthlySalary); }
        } else {
            const salaryNodes = document.querySelectorAll('.gran-salary-input');
            const currencyNodes = document.querySelectorAll('.gran-currency-select');
            for (let i = 0; i < salaryNodes.length; i++) {
                let rawAmount = parseFloat(salaryNodes[i].value) || 0;
                let monthlyValue = period === 'yearly' ? rawAmount / 12 : rawAmount;
                if (currencyNodes[i].value === 'USD') {
                    computedSalariesHistory.push(monthlyValue * currentRate);
                } else { computedSalariesHistory.push(monthlyValue); }
            }
        }
    }

    const formatCurrency = (val) => {
        if (country === 'ng') {
            return "NGN ₦" + val.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
        } else {
            return "USD $" + (val / ZWG_TO_USD_RATE).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
        }
    };

    htmlOutput = `<h3>${str.node}: ${country === 'ng' ? 'Nigeria' : 'Zimbabwe'} (${region.toUpperCase()})</h3>`;

    if (country === 'ng') {
        let nhiaEE = 0; let nhiaER = 0; let nhiaDesc = '';
        if (status === 'formal') {
            if (sector === 'public') {
                nhiaEE = baselineMonthlySalary * 0.0175; nhiaER = baselineMonthlySalary * 0.0325;
                nhiaDesc = 'Formal Public Sector NHIA Program';
            } else {
                nhiaEE = baselineMonthlySalary * 0.05 * 0.5; nhiaER = baselineMonthlySalary * 0.05 * 0.5;
                nhiaDesc = 'Formal Private Sector Shared Plan';
            }
            computedSalariesHistory.forEach(w => { totalContributionsFund += (w * 0.18 * 12); });
            
            htmlOutput += `<p><strong>${str.tracked}:</strong> ${trackingSpanYears} ${str.years}</p>
                           <p><strong>${str.cumulative}:</strong> ${formatCurrency(totalContributionsFund)}</p>
                           <p><strong>NHIA Employee Medical Deduction (Monthly):</strong> ${formatCurrency(nhiaEE)}</p>
                           <p><strong>NHIA Employer Medical Match (Monthly):</strong> ${formatCurrency(nhiaER)}</p>`;
            
            if (age >= 50) {
                htmlOutput += `<div class="warning-text">⚙️ <strong>${str.ret_ok}</strong></div>`;
            } else {
                let yearsToRetire = 50 - age;
                let futureValue = totalContributionsFund * Math.pow(1 + 0.10, yearsToRetire);
                let todaysEquivalentValue = futureValue / Math.pow(1 + REGIONAL_DEFAULT_INFLATION, yearsToRetire);
                let immediateClawback25 = totalContributionsFund * 0.25;
                let retString = str.ret_later.replace("{AGE}", "50");
                
                htmlOutput += `<div class="warning-text">
                    <p><strong>${retString}</strong> ${formatCurrency(futureValue)}</p>
                    <p><strong>✨ ${str.pv_eq}:</strong> ${formatCurrency(todaysEquivalentValue)}</p>
                    <hr style="border:0; border-top:1px solid #ffecb5; margin:0.5rem 0;">
                    <p style="font-size:0.9rem; color:#b00000; margin:0 0 0.5rem 0;">💸 <strong>Actionable Separation Asset:</strong> Legally eligible to extract a one-time 25% emergency drawdown cash payout of <strong>${formatCurrency(immediateClawback25)}</strong> after 4 months consecutive joblessness.</p>
                    <p style="font-size:0.85rem; margin:0; opacity:0.8;">💼 ${str.exit_ng}</p>
                </div>`;
            }
            resourceOutput = `
                <div class="resource-card"><h4>NHIA Medical Care Access Package</h4><p>Your current tier (${nhiaDesc}) unlocks comprehensive baseline primary care, outpatient consultations, immunization plans, and essential generic pharmaceuticals list coverage.</p></div>
                <div class="resource-card"><h4>PenCom Uncredited Contributions Audit</h4><p>If your account balance doesn't reflect your past income, access the PenCom Uncredited Platform to file formal penalty claims against your employer.</p></div>
            `;
        } else if (status === 'informal') {
            computedSalariesHistory.forEach(w => { totalContributionsFund += (w * 0.10 * 12); });
            htmlOutput += `<p><strong>${str.micro_opt}:</strong> ${trackingSpanYears} ${str.years}</p>
                           <p><strong>${str.micro_proj}:</strong> ${formatCurrency(totalContributionsFund)}</p>
                           <div class="warning-text">💡 ${str.micro_exit}</div>`;
            resourceOutput = `
                <div class="resource-card"><h4>PenCom Personal Pension Plan (PPP) Portal</h4><p>Access guidelines and the active step-by-step registration framework for informal trade networks and self-employed cooperative operators.</p></div>
                <div class="resource-card"><h4>NHIA Group Individual Health Insurance Program (GIFSHIP)</h4><p>Informal sector traders can access the baseline health insurance framework for a flat contribution of ₦15,000 annually per individual.</p></div>
            `;
        } else { 
            htmlOutput += `<p>${str.unemp_ng}</p>`; 
            resourceOutput = `<div class="resource-card"><h4>National Directorate of Employment (NDE)</h4><p>Provides vocational training pathways and small enterprise micro-start grants for citizens between formal roles.</p></div>`;
        }
    } else { 
        if (status === 'formal') {
            const ceilingCap = 700 * ZWG_TO_USD_RATE;
            computedSalariesHistory.forEach(w => { totalContributionsFund += (Math.min(w, ceilingCap) * 0.09 * 12); });
            htmlOutput += `<p><strong>${str.tracked}:</strong> ${trackingSpanYears} ${str.years}</p>
                           <p><strong>${str.nssa}:</strong> ${formatCurrency(totalContributionsFund)}</p>`;
            
            let childrenSubsidyBonus = children * 35.00 * ZWG_TO_USD_RATE * 12;
            if (children > 0) {
                htmlOutput += `<p><strong>Matched Annual Child Dependency Welfare Support:</strong> ${formatCurrency(childrenSubsidyBonus)}</p>`;
            }
            
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
            if(children > 0) { resourceOutput += `<div class="resource-card"><h4>Department of Social Development Welfare Registry</h4><p>Active child dependency bonus detected (${children} children). Triggers a means-tested dependent supplement allocation index directly across local district tables.</p></div>`; }
        } else { 
            htmlOutput += `<p>${str.unemp_zw}</p>`; 
            resourceOutput = `<div class="resource-card"><h4>Assisted Medical Treatment Orders (AMTO)</h4><p>Provides healthcare facility fee waivers processed through your regional Department of Social Welfare table.</p></div>`;
        }
    }
    document.getElementById('output-box').innerHTML = htmlOutput;
    document.getElementById('resource-box-container').innerHTML = resourceOutput;
    setView('output');
}

document.addEventListener("DOMContentLoaded", function() {
    initTerritory('ng');
});
